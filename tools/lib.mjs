// Shared helpers for the studio tools. Node 18+, FFmpeg on PATH.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const r = (...p) => path.join(ROOT, ...p);

export const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
export const channel = () => readJson(r('config/channel.json'));

export function loadStoryboard(slug) {
  const p = r('storyboards', `${slug}.json`);
  if (!fs.existsSync(p)) throw new Error(`Missing storyboard: ${p}`);
  const sb = readJson(p);
  if (!Array.isArray(sb.scenes) || !sb.scenes.length) throw new Error('Storyboard has no scenes');
  return sb;
}

export function run(cmd, args, opts = {}) {
  return execFileSync(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 1 << 26, ...opts }).toString();
}

export function duration(file) {
  return parseFloat(run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]));
}

export const mkdirp = (d) => fs.mkdirSync(d, { recursive: true });
export const exists = (p) => fs.existsSync(p);

// ---- Voice markup (see skills/studio/hindi-script/STYLE.md, section 9) ----
//   [रुकें]  or  [रुकें 1.2]   silence (default 0.6 s, max 3 s)
//   {रानी} “...”   a quoted line spoken by a cast voice from config/channel.json voice.cast
//   {धीमे} ...।     any cast style applied up to the end of the sentence
const PAUSE = /\[रुकें(?:\s+([\d.]+))?\]/g;
export const FACT = /\s*\[F\d+\]/g;

// Text as heard/read: markup removed (for subtitles, word counts, Flow packs).
export function plainVO(vo = '') {
  return vo.replace(FACT, '').replace(PAUSE, ' ').replace(/\{[^}]+\}\s*/g, '').replace(/[“”"]/g, '')
    .replace(/\s+/g, ' ').trim();
}

// Split narration into segments: { text, role } for speech, { pause: seconds } for silence.
export function parseVO(vo = '') {
  const out = [];
  const speak = (text, role) => { const t = text.replace(/[“”"]/g, '').replace(/\s+/g, ' ').trim(); if (t) out.push({ text: t, role }); };
  const parts = vo.replace(FACT, '').split(PAUSE); // [text, secs, text, secs, ...]
  for (let i = 0; i < parts.length; i += 2) {
    let rest = parts[i] || '';
    // role tags: {role} “quoted”  |  {role} text up to the end of the sentence
    const tag = /\{([^}]+)\}\s*(“[^”]*”|"[^"]*"|[^।?!]*[।?!]?)/g;
    let last = 0, m;
    while ((m = tag.exec(rest))) {
      speak(rest.slice(last, m.index), null);
      speak(m[2], m[1].trim());
      last = tag.lastIndex;
    }
    speak(rest.slice(last), null);
    if (i + 1 < parts.length) out.push({ pause: Math.min(3, parseFloat(parts[i + 1]) || 0.6) });
  }
  return out;
}
export const hasMarkup = (vo = '') => /\[रुकें|\{[^}]+\}/.test(vo);
