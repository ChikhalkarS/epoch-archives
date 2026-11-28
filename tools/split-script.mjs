#!/usr/bin/env node
// Split scripts/<slug>.md into scenes (~4-8 s each) and write a storyboard skeleton.
// Keeps existing prompt/motion/type for scenes whose narration is unchanged.
// Usage: node tools/split-script.mjs <slug> [--max-words 16]
import fs from 'node:fs';
import { r, exists, readJson, plainVO } from './lib.mjs';

const [slug, ...flags] = process.argv.slice(2);
if (!slug) { console.error('Usage: node tools/split-script.mjs <slug> [--max-words 16]'); process.exit(1); }
const MAX = flags.includes('--max-words') ? +flags[flags.indexOf('--max-words') + 1] : 16;

const md = fs.readFileSync(r('scripts', `${slug}.md`), 'utf8').split(/^## Short candidates/m)[0];
const sections = [];
for (const block of md.split(/^## /m).slice(1)) {
  const [title, ...body] = block.split('\n');
  const text = body.filter((l) => l.trim()).join(' ');
  sections.push({ title: title.replace(/^Beat \w+ - /, '').trim(), text });
}

const words = (s) => plainVO(s).split(/\s+/).filter(Boolean).length;
// Break an over-long sentence at commas into chunks of <= MAX words.
function splitLong(x) {
  const out = []; let cur = '';
  for (const part of x.split(/(?<=,)\s+/)) {
    if (cur && words(cur + ' ' + part) > MAX) { out.push(cur); cur = part; } else cur = cur ? `${cur} ${part}` : part;
  }
  if (cur) out.push(cur);
  return out;
}
const scenes = [];
for (const sec of sections) {
  const sents = sec.text.split(/(?<=[।?!][”"]?(?:\s*\[F\d+\])*)\s+(?!\[F)/).map((x) => x.trim()).filter(Boolean)
    .flatMap((x) => (words(x) > MAX ? splitLong(x) : [x]));
  let cur = [], first = true;
  const flush = () => {
    if (!cur.length) return;
    const raw = cur.join(' ');
    if (!raw.replace(/\[F\d+\]/g, '').trim()) { cur = []; return; }
    const sources = [...new Set([...raw.matchAll(/\[(F\d+)\]/g)].map((m) => m[1]))];
    scenes.push({ chapter: first ? sec.title : undefined, vo: raw.replace(/\s*\[F\d+\]/g, '').trim(), sources });
    cur = []; first = false;
  };
  for (const s of sents) {
    if (cur.length && words(cur.join(' ') + ' ' + s) > MAX) flush();
    cur.push(s);
  }
  flush();
}

const motions = ['zoom-in', 'pan-right', 'zoom-out', 'pan-left'];
const outPath = r('storyboards', `${slug}.json`);
const old = exists(outPath) ? readJson(outPath) : { scenes: [], shorts: [] };
const byVo = new Map(old.scenes.map((s) => [s.vo, s]));
const sb = {
  slug, music: old.music,
  scenes: scenes.map((s, i) => {
    const prev = byVo.get(s.vo) || {};
    return { id: `s${String(i + 1).padStart(2, '0')}`, ...(s.chapter ? { chapter: s.chapter } : {}),
      type: prev.type || 'image', ...(prev.reuse ? { reuse: prev.reuse } : {}), motion: prev.motion || motions[i % 4], vo: s.vo, prompt: prev.prompt || '', sources: s.sources };
  }).concat(old.scenes.filter((s) => s.short_only)), // keep Shorts-only scenes
  shorts: old.shorts || [],
};
fs.writeFileSync(outPath, JSON.stringify(sb, null, 2) + '\n');
const total = sb.scenes.reduce((a, s) => a + words(s.vo), 0);
console.log(`${sb.scenes.length} scenes, ${total} words -> ${outPath}`);
for (const s of sb.scenes) console.log(`${s.id}${s.chapter ? ` [${s.chapter}]` : ''} (${words(s.vo)}w) ${s.vo}`);
