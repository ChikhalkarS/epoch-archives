#!/usr/bin/env node
// Generate one Hindi voice file per storyboard scene using the voice in config/channel.json.
// Voice markup in narration (STYLE.md section 9): [रुकें] / [रुकें 1.2] = silence, {role} “...” = cast voice
// from channel.json voice.cast, {धीमे} ... = slower narrator for one sentence. Segments are joined with FFmpeg.
// Usage: node tools/voice.mjs <slug> [--force] [--only s03]
// Test without network: EAS_FAKE_TTS=1 (writes tones sized to the text, to check pauses and timing).
import fs from 'node:fs';
import { r, channel, loadStoryboard, run, duration, mkdirp, exists, parseVO, plainVO, hasMarkup } from './lib.mjs';

const [slug, ...flags] = process.argv.slice(2);
if (!slug) { console.error('Usage: node tools/voice.mjs <slug> [--force] [--only <sceneId>]'); process.exit(1); }
const force = flags.includes('--force');
const only = flags.includes('--only') ? flags[flags.indexOf('--only') + 1] : null;

const v = channel().voice;
const cast = v.cast || {};
const sb = loadStoryboard(slug);
const outDir = r('assets', slug, 'voice');
mkdirp(outDir);
const tmp = r('assets', slug, 'voice', '.tmp.txt');
const segDir = r('assets', slug, 'voice', '.seg');

const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
const ok = (f) => { try { return duration(f) > 0.3; } catch { return false; } };

function synthOnce(text, out, role) {
  const c = (role && cast[role]) || {};
  if (role && !cast[role]) console.warn(`  WARN unknown role {${role}}: using narrator`);
  fs.writeFileSync(tmp, text);
  if (process.env.EAS_FAKE_TTS) { // ~2 words/s tone, for offline tests of pauses and timing
    const secs = Math.max(0.5, text.split(/\s+/).length / 2);
    run('ffmpeg', ['-y', '-v', 'error', '-f', 'lavfi', '-i', `sine=f=${role ? 660 : 440}:d=${secs}`, '-ar', '24000', '-ac', '1', out]);
  } else if (v.engine === 'edge-tts') {
    const args = ['--voice', c.voice_id || v.voice_id, `--rate=${c.rate || v.rate || '+0%'}`, `--pitch=${c.pitch || v.pitch || '+0Hz'}`,
      '-f', tmp, '--write-media', out];
    if (process.env.HTTPS_PROXY) args.unshift('--proxy', process.env.HTTPS_PROXY);
    run('edge-tts', args);
  } else if (v.engine === 'gtts') {
    run('gtts-cli', ['-l', 'hi', '-f', tmp, '-o', out]);
  } else {
    throw new Error(`Voice engine "${v.engine}" not wired yet. Supported: edge-tts, gtts`);
  }
}

function synth(text, out, role, label) {
  for (let attempt = 1; ; attempt++) {
    try {
      synthOnce(text, out, role);
      if (ok(out)) return true;
      throw new Error('empty audio');
    } catch (e) {
      fs.rmSync(out, { force: true });
      if (attempt >= 5) { console.error(`${label}: failed after 5 tries (${String(e.message).split('\n')[0]})`); process.exitCode = 1; return false; }
      sleep(3000 * attempt);
    }
  }
}

// Speech segments + silences -> one mp3.
function synthMarked(vo, out, label) {
  mkdirp(segDir);
  const inputs = [];
  for (const [i, seg] of parseVO(vo).entries()) {
    if (seg.pause) { inputs.push(['-f', 'lavfi', '-t', String(seg.pause), '-i', 'anullsrc=r=24000:cl=mono']); continue; }
    const f = `${segDir}/${label}-${i}.mp3`;
    if (!synth(seg.text, f, seg.role, `${label}.${i}`)) return false;
    inputs.push(['-i', f]);
  }
  const n = inputs.length;
  const filt = inputs.map((_, i) => `[${i}:a]aresample=24000,aformat=channel_layouts=mono[a${i}]`).join(';') +
    ';' + inputs.map((_, i) => `[a${i}]`).join('') + `concat=n=${n}:v=0:a=1[out]`;
  run('ffmpeg', ['-y', '-v', 'error', ...inputs.flat(), '-filter_complex', filt, '-map', '[out]', '-c:a', 'libmp3lame', '-b:a', '64k', out]);
  return ok(out);
}

let total = 0;
for (const s of sb.scenes) {
  if (only && s.id !== only) continue;
  const out = `${outDir}/${s.id}.mp3`;
  if (!s.vo?.trim()) { console.log(`${s.id}: no narration, skipped`); continue; }
  if (exists(out) && !force && ok(out)) { total += duration(out); console.log(`${s.id}: exists`); continue; }
  const done = hasMarkup(s.vo) ? synthMarked(s.vo, out, s.id) : synth(plainVO(s.vo), out, null, s.id);
  if (!done || !exists(out)) continue;
  const d = duration(out); total += d;
  console.log(`${s.id}: ${d.toFixed(1)}s${hasMarkup(s.vo) ? ' (markup)' : ''}`);
}
fs.rmSync(tmp, { force: true });
fs.rmSync(segDir, { recursive: true, force: true });
console.log(`Total narration: ${(total / 60).toFixed(2)} min`);
