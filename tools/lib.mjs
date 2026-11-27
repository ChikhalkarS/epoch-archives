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
