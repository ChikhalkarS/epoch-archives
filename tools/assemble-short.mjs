#!/usr/bin/env node
// Assemble one Short/Reel: Flow clips + stills cut exactly to the ElevenLabs voice timing,
// ambient clip sound low, optional music bed, Hindi captions and on-screen labels, loudness -14 LUFS.
// Usage: node tools/assemble-short.mjs <slug> <short-id> [--preview] [--no-captions] [--no-labels]
// Inputs (folder assets/<slug>/shorts/<short-id>/):
//   voice.mp3|wav|m4a                     ElevenLabs take (required for exact timing)
//   <sid>.mp4|mov|webm  or  <sid>.png|jpg|jpeg|webp   one per shot, sid like short1-s03
//   music.mp3|wav|m4a (optional)          royalty-free bed, log it in shorts/<slug>/CREDITS.md
// Needs shorts/<slug>/<short-id>.shots.json and .timing.json (tools/build-shorts.mjs, tools/time-voice.mjs).
// Output: renders/<slug>/shorts/<short-id>.mp4 (+ .srt). Missing visuals render as a labelled card.
import fs from 'node:fs';
import path from 'node:path';
import { r, run, exists, mkdirp, duration, channel } from './lib.mjs';

const args = process.argv.slice(2);
const [slug, id] = args.filter((a) => !a.startsWith('--'));
const preview = args.includes('--preview');
const captions = !args.includes('--no-captions');
const labels = !args.includes('--no-labels');
if (!slug || !id) { console.error('Usage: node tools/assemble-short.mjs <slug> <short-id> [--preview] [--no-captions] [--no-labels]'); process.exit(1); }

const cfg = channel();
const W = preview ? 540 : 1080, H = preview ? 960 : 1920, FPS = 30;
const AMBIENT = 0.2, MUSIC = cfg.style?.music_volume ?? 0.12;
const inDir = r('assets', slug, 'shorts', id);
const outDir = r('renders', slug, 'shorts');
const work = path.join(outDir, '.work', id);
mkdirp(work);

const shotsFile = r('shorts', slug, `${id}.shots.json`);
const timingFile = r('shorts', slug, `${id}.timing.json`);
if (!exists(shotsFile)) { console.error(`Missing ${shotsFile}. Run: node tools/build-shorts.mjs ${slug}`); process.exit(1); }
const { shots } = JSON.parse(fs.readFileSync(shotsFile, 'utf8'));
const find = (base, exts) => exts.map((e) => path.join(inDir, `${base}.${e}`)).find(exists);
const voice = find('voice', ['mp3', 'wav', 'm4a']);
const music = find('music', ['mp3', 'wav', 'm4a']);

let timing;
if (exists(timingFile)) {
  timing = JSON.parse(fs.readFileSync(timingFile, 'utf8'));
  if (timing.shots.length !== shots.length) { console.error(`Timing has ${timing.shots.length} lines, script has ${shots.length}. Re-run tools/time-voice.mjs ${slug} ${id}`); process.exit(1); }
} else {
  if (voice) { console.error(`Voice found but no timing. Run first: node tools/time-voice.mjs ${slug} ${id}`); process.exit(1); }
  console.log('No voice yet: using estimated durations (silent preview).');
  let t = 0;
  timing = { total: 0, shots: shots.map((s) => { const st = t; t += s.est; return { start: st, end: t, dur: s.est }; }) };
  timing.total = t;
}

const enc = ['-c:v', 'libx264', '-preset', preview ? 'veryfast' : 'medium', '-crf', preview ? '28' : '19', '-pix_fmt', 'yuv420p', '-r', String(FPS)];
const aenc = ['-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '2'];
const report = [];

function motion(s, N) { // slow camera move for stills, chosen by shot size
  const zIn = `1+0.08*on/${N}`, cx = `iw/2-(iw/zoom/2)`, cy = `ih/2-(ih/zoom/2)`;
  if (s.size === 'EWS' || s.size === 'WS') return `z='1.08':x='(iw-iw/zoom)*on/${N}':y='${cy}'`; // gentle pan
  if (s.size === 'ECU') return `z='1.10-0.06*on/${N}':x='${cx}':y='${cy}'`; // slight pull-back
  return `z='${zIn}':x='${cx}':y='${cy}'`; // push-in
}

function segment(s, i) {
  // frame-exact: segment length from rounded cumulative boundaries, so 24 cuts never drift off the voice
  const f0 = Math.round(timing.shots[i].start * FPS), f1 = Math.round(timing.shots[i].end * FPS);
  const dur = Math.max(2, f1 - f0) / FPS;
  const out = path.join(work, `${s.sid}.mp4`);
  const clip = find(s.sid, ['mp4', 'mov', 'webm']);
  const img = find(s.sid, ['png', 'jpg', 'jpeg', 'webp']);
  const N = Math.round(dur * FPS);
  let inputs, vf, af, kind, note = '';
  if (clip) {
    const cd = duration(clip);
    kind = 'clip';
    if (cd < dur) note = `clip ${cd.toFixed(1)} s < shot ${dur.toFixed(1)} s: last frame held`;
    inputs = ['-i', clip];
    vf = `scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1,fps=${FPS},tpad=stop_mode=clone:stop_duration=${Math.max(0, dur - cd + 0.5).toFixed(2)}`;
    const hasAudio = run('ffprobe', ['-v', 'error', '-select_streams', 'a', '-show_entries', 'stream=index', '-of', 'csv=p=0', clip]).trim() !== '';
    if (hasAudio) af = `[0:a]volume=${AMBIENT},apad,atrim=0:${dur.toFixed(3)},aresample=48000[a]`;
  } else if (img) {
    kind = 'still';
    inputs = ['-loop', '1', '-i', img];
    vf = `scale=${W * 2}:${H * 2}:force_original_aspect_ratio=increase,crop=${W * 2}:${H * 2},zoompan=${motion(s, N)}:d=${N}:s=${W}x${H}:fps=${FPS},setsar=1`;
  } else {
    kind = 'MISSING';
    inputs = ['-f', 'lavfi', '-i', `color=c=0x1c1814:s=${W}x${H}:r=${FPS}`];
    vf = `drawbox=x=0:y=0:w=iw:h=ih:color=0x8a5a3c@0.35:t=${Math.round(W / 60)},setsar=1`;
  }
  const silent = ['-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo'];
  const fc = `[0:v]${vf}[v];` + (af || `[1:a]atrim=0:${dur.toFixed(3)}[a]`);
  run('ffmpeg', ['-y', '-v', 'error', ...inputs, ...silent, '-filter_complex', fc, '-map', '[v]', '-map', '[a]', '-frames:v', String(N), '-t', dur.toFixed(4), ...enc, ...aenc, out]);
  report.push({ n: i + 1, sid: s.sid, kind, dur: +dur.toFixed(2), note });
  return out;
}

// --- captions (ASS, rendered by libass with the bundled Noto fonts) ---
const assTime = (t) => { const cs = Math.max(0, Math.round(t * 100)); const h = Math.floor(cs / 360000), m = Math.floor(cs / 6000) % 60, s = Math.floor(cs / 100) % 60; return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(cs % 100).padStart(2, '0')}`; };
const srtTime = (t) => { const ms = Math.round(t * 1000); return `${String(Math.floor(ms / 3600000)).padStart(2, '0')}:${String(Math.floor(ms / 60000) % 60).padStart(2, '0')}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')},${String(ms % 1000).padStart(3, '0')}`; };
const clean = (v) => v.replace(/\.\.\./g, '').replace(/\s+/g, ' ').trim();
function buildSubs() {
  const fs1 = Math.round(H * 0.036), fs2 = Math.round(H * 0.04);
  const L = ['[Script Info]', 'ScriptType: v4.00+', `PlayResX: ${W}`, `PlayResY: ${H}`, 'WrapStyle: 0', '',
    '[V4+ Styles]',
    'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding',
    `Style: Cap,Noto Sans Devanagari,${fs1},&H00FFFFFF,&H00FFFFFF,&H00000000,&H64000000,-1,0,0,0,100,100,0,0,1,${Math.round(fs1 / 9)},${Math.round(fs1 / 18)},2,${Math.round(W * 0.08)},${Math.round(W * 0.08)},${Math.round(H * 0.30)},1`,
    `Style: Label,Noto Sans Devanagari,${fs2},&H0040C8F5,&H0040C8F5,&H00000000,&H64000000,-1,0,0,0,100,100,0,0,1,${Math.round(fs2 / 8)},0,8,${Math.round(W * 0.06)},${Math.round(W * 0.06)},${Math.round(H * 0.14)},1`,
    '', '[Events]', 'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text'];
  const srt = [];
  shots.forEach((s, i) => {
    const { start, end } = timing.shots[i];
    const text = clean(s.vo);
    srt.push(`${srt.length + 1}\n${srtTime(start)} --> ${srtTime(end)}\n${text}\n`);
    const label = (s.onscreen || '').replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, '').replace(/\s+/g, ' ').trim(); // emoji have no glyphs in the burned-in font
    if (labels && label) L.push(`Dialogue: 1,${assTime(start)},${assTime(end)},Label,,0,0,0,,${label}`);
    if (!captions) return;
    // 2-4 word chunks, timed by character share inside the line (word-by-word feel, readable on a phone)
    const w = text.split(' ');
    const chunks = [];
    for (let k = 0; k < w.length;) { const take = w.length - k === 4 ? 4 : Math.min(3, w.length - k); chunks.push(w.slice(k, k + take).join(' ')); k += take; }
    const chars = chunks.reduce((a, c) => a + c.length, 0) || 1;
    const speakEnd = Math.max(start + 0.3, end - 0.15);
    let t = start + 0.05;
    for (const c of chunks) { const d = (speakEnd - start) * (c.length / chars); L.push(`Dialogue: 0,${assTime(t)},${assTime(Math.min(t + d, end))},Cap,,0,0,0,,${c}`); t += d; }
    const missing = report[i] && report[i].kind === 'MISSING';
    if (missing) L.push(`Dialogue: 2,${assTime(start)},${assTime(end)},Label,,0,0,${Math.round(H * 0.45)},,{\\fs${Math.round(H * 0.025)}\\c&H00B0B0B0&}${s.sid}  ${s.size} ${s.angle}  (missing)`);
  });
  fs.writeFileSync(path.join(work, 'subs.ass'), L.join('\n') + '\n');
  return srt;
}

// --- build ---
const parts = shots.map(segment);
const list = path.join(work, 'list.txt');
fs.writeFileSync(list, parts.map((p) => `file '${p}'`).join('\n'));
const joined = path.join(work, 'joined.mp4');
run('ffmpeg', ['-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', joined]);
const srt = buildSubs();

mkdirp(outDir);
const out = path.join(outDir, `${id}${preview ? '-preview' : ''}.mp4`);
const ins = ['-i', joined];
const mix = ['[0:a]aresample=48000[amb]'];
let n = 1, labelsIn = ['[amb]'];
if (voice) { ins.push('-i', voice); mix.push(`[${n}:a]aresample=48000,apad[vo]`); labelsIn.push('[vo]'); n++; }
if (music) { ins.push('-stream_loop', '-1', '-i', music); mix.push(`[${n}:a]aresample=48000,volume=${MUSIC},afade=t=in:d=1.5[mu]`); labelsIn.push('[mu]'); n++; }
const total = timing.total;
mix.push(`${labelsIn.join('')}amix=inputs=${labelsIn.length}:duration=first:normalize=0,atrim=0:${total.toFixed(3)},afade=t=out:st=${Math.max(0, total - 0.6).toFixed(2)}:d=0.6,loudnorm=I=-14:TP=-1.5:LRA=11[aout]`);
const subsRel = path.relative(r(''), path.join(work, 'subs.ass'));
const vf = `[0:v]subtitles=${subsRel}:fontsdir=assets/fonts[vout]`;
run('ffmpeg', ['-y', '-v', 'error', ...ins, '-filter_complex', `${vf};${mix.join(';')}`, '-map', '[vout]', '-map', '[aout]', '-t', total.toFixed(3), ...enc, ...aenc, '-movflags', '+faststart', out], { cwd: r('') });
fs.writeFileSync(path.join(outDir, `${id}.srt`), srt.join('\n'));

const missing = report.filter((x) => x.kind === 'MISSING');
console.log(`Wrote ${path.relative(r(''), out)} (${duration(out).toFixed(2)} s, ${W}x${H}) + ${id}.srt`);
console.log(`Voice: ${voice ? path.basename(voice) : 'none (silent preview)'} | Music: ${music ? path.basename(music) : 'none'} | Shots: ${report.length - missing.length}/${report.length} have visuals`);
for (const x of report) if (x.kind === 'MISSING' || x.note) console.log(`  ${x.sid}: ${x.kind}${x.note ? ' - ' + x.note : ''}`);
