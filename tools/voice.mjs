#!/usr/bin/env node
// Generate one Hindi voice file per storyboard scene using the voice in config/channel.json.
// Usage: node tools/voice.mjs <slug> [--force] [--only s03]
import fs from 'node:fs';
import { r, channel, loadStoryboard, run, duration, mkdirp, exists } from './lib.mjs';

const [slug, ...flags] = process.argv.slice(2);
if (!slug) { console.error('Usage: node tools/voice.mjs <slug> [--force] [--only <sceneId>]'); process.exit(1); }
const force = flags.includes('--force');
const only = flags.includes('--only') ? flags[flags.indexOf('--only') + 1] : null;

const v = channel().voice;
const sb = loadStoryboard(slug);
const outDir = r('assets', slug, 'voice');
mkdirp(outDir);
const tmp = r('assets', slug, 'voice', '.tmp.txt');

let total = 0;
for (const s of sb.scenes) {
  if (only && s.id !== only) continue;
  const out = `${outDir}/${s.id}.mp3`;
  if (!s.vo?.trim()) { console.log(`${s.id}: no narration, skipped`); continue; }
  if (exists(out) && !force) { total += duration(out); console.log(`${s.id}: exists`); continue; }
  fs.writeFileSync(tmp, s.vo.trim());
  if (v.engine === 'edge-tts') {
    const args = ['--voice', v.voice_id, `--rate=${v.rate || '+0%'}`, `--pitch=${v.pitch || '+0Hz'}`, '-f', tmp, '--write-media', out];
    if (process.env.HTTPS_PROXY) args.unshift('--proxy', process.env.HTTPS_PROXY);
    run('edge-tts', args);
  } else if (v.engine === 'gtts') {
    run('gtts-cli', ['-l', 'hi', '-f', tmp, '-o', out]);
  } else {
    throw new Error(`Voice engine "${v.engine}" not wired yet. Supported: edge-tts, gtts`);
  }
  const d = duration(out); total += d;
  console.log(`${s.id}: ${d.toFixed(1)}s`);
}
fs.rmSync(tmp, { force: true });
console.log(`Total narration: ${(total / 60).toFixed(2)} min`);
