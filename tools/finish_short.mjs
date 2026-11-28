#!/usr/bin/env node
// Finish a Short on the owner's Mac: Flow clips + one voice file (+ optional music) -> final vertical MP4.
// Usage:  node finish_short.mjs "/path/to/folder" [--no-captions]
// The folder must contain:
//   - the Flow clips (.mp4/.mov), named so they sort in order: S01.mp4 ... S11.mp4
//   - one voice file (.mp3/.wav/.m4a), e.g. the ElevenLabs download
//   - optional: a music file whose name contains "music" (royalty-free, e.g. YouTube Audio Library). If absent,
//     a copyright-free ambient pad is synthesised by ffmpeg itself.
//   - optional: lines.txt (one spoken line per clip, in order) -> burned-in Hindi captions synced to the voice.
// What it does: mutes the clips' own audio, splits the voice into lines at its pauses, gives each clip exactly the
// time of its line (trims longer clips, gently slows / holds shorter ones), ducks the music under the voice,
// normalises loudness to -14 LUFS (YouTube), and writes <folder>/final-short.mp4 (1080x1920, 30 fps, H.264/AAC).
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve(process.argv[2] || '.');
const noCaptions = process.argv.includes('--no-captions');
const run = (cmd, args) => execFileSync(cmd, args, { encoding: 'utf8', maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'pipe'] });
const runErr = (args) => spawnSync('ffmpeg', args, { encoding: 'utf8', maxBuffer: 1 << 28 }).stderr || '';
const dur = (f) => parseFloat(run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]));
const nat = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

const files = fs.readdirSync(dir).filter((f) => !f.startsWith('.') && !f.startsWith('final-'));
const clips = files.filter((f) => /\.(mp4|mov|m4v)$/i.test(f)).sort(nat).map((f) => path.join(dir, f));
const audio = files.filter((f) => /\.(mp3|wav|m4a|aac)$/i.test(f));
const musicFile = audio.find((f) => /music/i.test(f));
const voiceFile = audio.find((f) => !/music/i.test(f));
if (!clips.length || !voiceFile) { console.error('Need video clips and one voice file in', dir); process.exit(1); }
const voice = path.join(dir, voiceFile);
const VD = dur(voice);
console.log(`Clips (${clips.length}), in this order:`); clips.forEach((c, i) => console.log(`  ${i + 1}. ${path.basename(c)}`));
console.log(`Voice: ${voiceFile} (${VD.toFixed(1)} s)  Music: ${musicFile || 'synthesised ambient pad (copyright-free)'}`);

// 1) Speech segments from the voice's pauses.
const log = runErr(['-hide_banner', '-i', voice, '-af', 'silencedetect=noise=-35dB:d=0.3', '-f', 'null', '-']);
const sil = []; let s0 = null;
for (const l of log.split(/[\r\n]+/)) {
  const a = l.match(/silence_start: ([\d.]+)/); if (a) s0 = parseFloat(a[1]);
  const b = l.match(/silence_end: ([\d.]+)/); if (b && s0 !== null) { sil.push([s0, parseFloat(b[1])]); s0 = null; }
}
let segs = []; let cur = 0;
for (const [a, b] of sil) { if (a - cur > 0.25) segs.push([cur, a]); cur = b; }
if (VD - cur > 0.25) segs.push([cur, VD]);
// Merge the closest neighbours until there is one segment per clip.
while (segs.length > clips.length) {
  let k = 0, g = Infinity;
  for (let i = 0; i < segs.length - 1; i++) { const gap = segs[i + 1][0] - segs[i][1]; if (gap < g) { g = gap; k = i; } }
  segs.splice(k, 2, [segs[k][0], segs[k + 1][1]]);
}
let starts;
if (segs.length === clips.length) {
  starts = segs.map((s) => s[0]); starts[0] = 0;
  console.log('Voice split into', segs.length, 'lines at its pauses.');
} else {
  console.log(`Found ${segs.length} lines for ${clips.length} clips; sharing time in proportion to clip length.`);
  const L = clips.map(dur), T = L.reduce((x, y) => x + y, 0); starts = []; let acc = 0;
  L.forEach((l) => { starts.push(acc); acc += (l / T) * VD; });
}
const END = VD + 0.8;
const D = starts.map((s, i) => (i + 1 < starts.length ? starts[i + 1] : END) - s);

// 2) Video: each clip fitted to its line, scaled to 1080x1920, concatenated. Clip audio is dropped.
const inputs = []; const parts = [];
clips.forEach((c, i) => {
  inputs.push('-i', c);
  const cd = dur(c), d = D[i];
  const slow = cd >= d ? 1 : Math.min(1.25, d / cd); // slow at most to 0.8x speed
  const hold = Math.max(0, d - cd * slow + 0.05);
  parts.push(`[${i}:v]setpts=${slow.toFixed(4)}*(PTS-STARTPTS),tpad=stop_mode=clone:stop_duration=${hold.toFixed(3)},` +
    `trim=duration=${d.toFixed(3)},setpts=PTS-STARTPTS,scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,format=yuv420p,setsar=1[v${i}]`);
});
parts.push(`${clips.map((_, i) => `[v${i}]`).join('')}concat=n=${clips.length}:v=1:a=0[vcat]`);

// 3) Captions from lines.txt, timed to the voice lines (Devanagari font that ships with macOS).
let vout = '[vcat]';
const linesPath = path.join(dir, 'lines.txt');
if (!noCaptions && fs.existsSync(linesPath)) {
  const lines = fs.readFileSync(linesPath, 'utf8').split('\n').map((l) => l.trim()).filter(Boolean);
  const t = (x) => { const h = Math.floor(x / 3600), m = Math.floor((x % 3600) / 60), s = (x % 60).toFixed(2).padStart(5, '0'); return `${h}:${String(m).padStart(2, '0')}:${s}`; };
  const wrap = (s) => { const w = s.split(' '); const out = []; let ln = ''; for (const x of w) { if ((ln + ' ' + x).trim().length > 26) { out.push(ln.trim()); ln = x; } else ln += ' ' + x; } out.push(ln.trim()); return out.join('\\N'); };
  const ev = lines.slice(0, clips.length).map((l, i) => {
    const a = segs.length === clips.length ? segs[i][0] : starts[i], b = segs.length === clips.length ? segs[i][1] + 0.2 : starts[i] + D[i] - 0.1;
    return `Dialogue: 0,${t(a)},${t(b)},Cap,,0,0,0,,${wrap(l)}`;
  });
  const ass = `[Script Info]\nPlayResX: 1080\nPlayResY: 1920\nScaledBorderAndShadow: yes\n\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\nStyle: Cap,Kohinoor Devanagari,64,&H00F1E3C6,&H0040A0E0,&H00171A1E,&H96000000,-1,0,0,0,100,100,0,0,1,5,2,2,90,90,330,1\n\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n${ev.join('\n')}\n`;
  fs.writeFileSync(path.join(dir, '.captions.ass'), ass);
  parts.push(`[vcat]ass='${path.join(dir, '.captions.ass').replace(/'/g, "\\'").replace(/:/g, '\\:')}'[vcap]`); vout = '[vcap]';
  console.log('Burning captions from lines.txt');
}

// 4) Audio: voice + music ducked under it, loudness -14 LUFS.
const vi = clips.length;
inputs.push('-i', voice);
let musicLabel;
if (musicFile) {
  inputs.push('-stream_loop', '-1', '-i', path.join(dir, musicFile));
  parts.push(`[${vi + 1}:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo,volume=0.35,atrim=duration=${END.toFixed(2)}[mus]`);
} else {
  // Own synthesised dark ambient pad (A minor drone with slow swells): 100% copyright-free.
  const ex = '0.22*sin(2*PI*55*t)*(0.6+0.4*sin(2*PI*0.07*t))+0.16*sin(2*PI*82.41*t)*(0.6+0.4*sin(2*PI*0.05*t+1))' +
    '+0.10*sin(2*PI*110*t)*(0.7+0.3*sin(2*PI*0.09*t+2))+0.07*sin(2*PI*130.81*t)*(0.5+0.5*sin(2*PI*0.11*t))+0.05*sin(2*PI*164.81*t)*(0.5+0.5*sin(2*PI*0.13*t+3))';
  parts.push(`aevalsrc='${ex}':s=48000:d=${END.toFixed(2)},lowpass=f=900,aecho=0.8:0.6:160|320:0.35|0.2,pan=stereo|c0=c0|c1=c0,volume=0.9[mus]`);
}
parts.push(`[${vi}:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo,apad=pad_dur=0.8,asplit=2[vo][vsc]`);
parts.push(`[mus]afade=t=in:d=1.5,afade=t=out:st=${(END - 1.5).toFixed(2)}:d=1.5[mf]`);
parts.push(`[mf][vsc]sidechaincompress=threshold=0.03:ratio=8:attack=20:release=500[duck]`);
parts.push(`[vo][duck]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[aout]`);

const out = path.join(dir, 'final-short.mp4');
console.log('Rendering ...');
run('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...inputs, '-filter_complex', parts.join(';'),
  '-map', vout, '-map', '[aout]', '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', '-pix_fmt', 'yuv420p',
  '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', '-t', END.toFixed(2), out]);
fs.rmSync(path.join(dir, '.captions.ass'), { force: true });
console.log(`Done: ${out} (${dur(out).toFixed(1)} s)`);
D.forEach((d, i) => console.log(`  ${path.basename(clips[i])}: ${d.toFixed(1)} s`));
