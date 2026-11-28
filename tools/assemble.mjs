#!/usr/bin/env node
// Assemble a long video + vertical Shorts from storyboards/<slug>.json using FFmpeg only (light on an 8 GB Mac).
// Usage: node tools/assemble.mjs <slug> [--preview] [--shorts-only] [--long-only]
//   --preview  renders 960x540 fast, for quick review.
// Per scene: uses assets/<slug>/clips/<id>.mp4 if present, else assets/<slug>/images/<id>.(png|jpg|webp) with
// a slow camera move, else a warm placeholder card. Audio: assets/<slug>/voice/<id>.mp3.
// Scenes with short_only: true (e.g. a Short's own hook) are left out of the long video.
// Shorts: storyboard.shorts[] = { id, scenes: [ids], mode: 'blur' (framed, default) | 'fill' (centre-crop) }.
// A native vertical clip assets/<slug>/clips/<id>.v.mp4 (from a Flow short pack) is used as-is in Shorts.
import fs from 'node:fs';
import { r, channel, loadStoryboard, run, duration, mkdirp, exists } from './lib.mjs';

const [slug, ...flags] = process.argv.slice(2);
if (!slug) { console.error('Usage: node tools/assemble.mjs <slug> [--preview] [--shorts-only] [--long-only]'); process.exit(1); }
const preview = flags.includes('--preview');
const cfg = channel();
const sb = loadStoryboard(slug);
const [LW, LH] = preview ? [960, 540] : [1920, 1080];
const FPS = cfg.formats.long.fps;
const PAD = cfg.style.scene_padding_seconds ?? 0.35;
const enc = ['-c:v', 'libx264', '-preset', preview ? 'veryfast' : 'medium', '-crf', preview ? '28' : '20', '-pix_fmt', 'yuv420p', '-r', String(FPS)];
const aenc = ['-c:a', 'aac', '-b:a', '160k', '-ar', '48000', '-ac', '2'];

const A = (...p) => r('assets', slug, ...p);
const outDir = r('renders', slug);
const work = r('renders', slug, '.work');
mkdirp(work);

const findFile = (dir, id, exts) => exts.map((e) => A(dir, `${id}.${e}`)).find(exists);

function motionExpr(m, N) {
  const zIn = `1+0.12*on/${N}`, zOut = `1.12-0.12*on/${N}`;
  const cx = `iw/2-(iw/zoom/2)`, cy = `ih/2-(ih/zoom/2)`;
  switch (m) {
    case 'zoom-out': return `z='${zOut}':x='${cx}':y='${cy}'`;
    case 'pan-left': return `z='1.12':x='(iw-iw/zoom)*(1-on/${N})':y='${cy}'`;
    case 'pan-right': return `z='1.12':x='(iw-iw/zoom)*on/${N}':y='${cy}'`;
    case 'static': return `z='1':x='0':y='0'`;
    default: return `z='${zIn}':x='${cx}':y='${cy}'`;
  }
}

function renderScene(s, vert = false) {
  const voice = A('voice', `${s.id}.mp3`);
  const dur = exists(voice) ? duration(voice) + PAD : (s.duration || 4);
  const out = `${work}/${s.id}${vert ? '-v' : ''}${preview ? '-p' : ''}.mp4`;
  const vid = s.reuse || s.id; // reuse: show another scene's image/clip with this scene's motion
  const clip = vert ? findFile('clips', `${vid}.v`, ['mp4', 'mov', 'webm']) : findFile('clips', vid, ['mp4', 'mov', 'webm']);
  if (vert && !clip) return null; // no native vertical clip: Short uses the 16:9 render, reframed
  const [W, H] = vert ? (preview ? [540, 960] : [1080, 1920]) : [LW, LH];
  const img = findFile('images', vid, ['png', 'jpg', 'jpeg', 'webp']);
  const N = Math.ceil(dur * FPS);
  let vIn, vf, kind;
  if (clip) {
    kind = 'clip';
    vIn = ['-stream_loop', '-1', '-i', clip];
    vf = `scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1,fps=${FPS}`;
  } else if (img) {
    kind = 'image';
    vIn = ['-i', img];
    vf = `scale=${W * 2}:${H * 2}:force_original_aspect_ratio=increase,crop=${W * 2}:${H * 2},` +
      `zoompan=${motionExpr(s.motion, N)}:d=${N}:s=${W}x${H}:fps=${FPS},setsar=1`;
  } else {
    kind = 'placeholder';
    vIn = ['-f', 'lavfi', '-i', `color=c=0x8a5a3c:s=${W}x${H}:r=${FPS}`];
    vf = `vignette=PI/4,setsar=1`;
  }
  const aIn = exists(voice) ? ['-i', voice] : ['-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo'];
  run('ffmpeg', ['-y', '-v', 'error', ...vIn, ...aIn, '-filter:v', vf, '-filter:a', 'apad',
    '-map', '0:v', '-map', '1:a', '-t', dur.toFixed(3), ...enc, ...aenc, out]);
  return { id: s.id, file: out, dur, kind, vo: s.vo || '', shortOnly: !!s.short_only };
}

function concat(parts, out) {
  const list = `${work}/list-${Date.now()}.txt`;
  fs.writeFileSync(list, parts.map((p) => `file '${p.file}'`).join('\n'));
  run('ffmpeg', ['-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', out]);
  fs.rmSync(list);
}

function withMusic(inFile, out) {
  const music = sb.music ? r(sb.music) : findFile('music', 'bed', ['mp3', 'wav', 'm4a']);
  if (!music || !exists(music)) { fs.renameSync(inFile, out); return false; }
  const vol = cfg.style.music_volume ?? 0.12;
  run('ffmpeg', ['-y', '-v', 'error', '-i', inFile, '-stream_loop', '-1', '-i', music, '-filter_complex',
    `[1:a]volume=${vol},afade=t=in:d=2[m];[0:a][m]amix=inputs=2:duration=first:normalize=0[a]`,
    '-map', '0:v', '-map', '[a]', '-c:v', 'copy', ...aenc, out]);
  fs.rmSync(inFile);
  return true;
}

const ts = (t) => {
  const ms = Math.round(t * 1000), h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(ms % 1000).padStart(3, '0')}`;
};
function srt(parts, out) {
  let t = 0, n = 1, lines = [];
  for (const p of parts) {
    const sents = p.vo.split(/(?<=[।?!.])\s+/).map((x) => x.trim()).filter(Boolean);
    const chars = sents.reduce((a, x) => a + x.length, 0) || 1;
    const speak = p.dur - PAD;
    let st = t;
    for (const x of sents) {
      const d = speak * (x.length / chars);
      lines.push(`${n++}\n${ts(st)} --> ${ts(st + d)}\n${x}\n`);
      st += d;
    }
    t += p.dur;
  }
  fs.writeFileSync(out, lines.join('\n'));
}

function chapters(parts) {
  const marks = sb.scenes.filter((s) => !s.short_only).map((s, i) => ({ s, i })).filter(({ s }) => s.chapter);
  let lines = [];
  for (const { s, i } of marks) {
    const t = parts.slice(0, i).reduce((a, p) => a + p.dur, 0);
    const mm = Math.floor(t / 60), ss = Math.floor(t % 60);
    lines.push(`${mm}:${String(ss).padStart(2, '0')} ${s.chapter}`);
  }
  if (lines.length && !lines[0].startsWith('0:00')) lines.unshift('0:00 Intro');
  return lines.join('\n');
}

function vertical(inFile, out, mode = 'blur') {
  const [VW, VH] = preview ? [540, 960] : [1080, 1920];
  const fill = `[0:v]scale=${VW}:${VH}:force_original_aspect_ratio=increase,crop=${VW}:${VH},setsar=1[v]`;
  run('ffmpeg', ['-y', '-v', 'error', '-i', inFile, '-filter_complex', mode === 'fill' ? fill :
    `[0:v]split[a][b];[a]scale=${VW}:${VH}:force_original_aspect_ratio=increase,crop=${VW}:${VH},boxblur=20:2[bg];` +
    `[b]scale=${VW}:-2[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,setsar=1[v]`,
    '-map', '[v]', '-map', '0:a', ...enc, ...aenc, out]);
}

// ---- run ----
console.log(`Rendering ${sb.scenes.length} scenes${preview ? ' (preview)' : ''}...`);
const parts = sb.scenes.map((s) => { const p = renderScene(s); console.log(`  ${p.id} ${p.kind} ${p.dur.toFixed(1)}s`); return p; });
const suffix = preview ? '-preview' : '';
const report = [];

if (!flags.includes('--shorts-only')) {
  const raw = `${work}/long-raw.mp4`, long = `${outDir}/${slug}-long${suffix}.mp4`;
  const longParts = parts.filter((p) => !p.shortOnly);
  concat(longParts, raw);
  const music = withMusic(raw, long);
  srt(longParts, `${outDir}/${slug}-long.hi.srt`);
  const ch = chapters(longParts);
  if (ch) fs.writeFileSync(`${outDir}/${slug}-chapters.txt`, ch + '\n');
  const d = duration(long);
  report.push(`LONG  ${long}  ${(d / 60).toFixed(2)} min${music ? '' : '  (no music bed found)'}`);
  const { min_minutes: lo, max_minutes: hi } = cfg.formats.long;
  if (d < lo * 60 || d > hi * 60) report.push(`  WARN long video is outside ${lo}-${hi} min`);
}

if (!flags.includes('--long-only')) {
  for (const sh of sb.shorts || []) {
    // Per scene: native 9:16 Flow clip (clips/<id>.v.mp4) if present, else the 16:9 render reframed (blur|fill).
    const sel = sh.scenes.map((id) => parts.find((p) => p.id === id)).filter(Boolean).map((p) => {
      const v = renderScene(sb.scenes.find((s) => s.id === p.id), true);
      if (v) return v;
      const file = `${work}/${p.id}-r${sh.mode === 'fill' ? 'f' : 'b'}${preview ? '-p' : ''}.mp4`;
      vertical(p.file, file, sh.mode);
      return { ...p, file };
    });
    if (!sel.length) continue;
    const out = `${outDir}/${slug}-${sh.id}${suffix}.mp4`;
    concat(sel, out);
    const d = duration(out);
    report.push(`SHORT ${out}  ${d.toFixed(1)}s`);
    const { min_seconds: lo, max_seconds: hi } = cfg.formats.short;
    if (d < lo || d > hi) report.push(`  WARN short is outside ${lo}-${hi} s`);
  }
}

const missing = parts.filter((p) => p.kind === 'placeholder').map((p) => p.id);
if (missing.length) report.push(`Placeholders (no image/clip yet): ${missing.join(', ')}`);
console.log('\n' + report.join('\n'));
