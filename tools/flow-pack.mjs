#!/usr/bin/env node
// Build a Google Flow pack: one ordered list of generations (prompt + ingredients + aspect + save path)
// that the owner or Claude in Chrome works through inside Flow. Re-run any time: done shots are ticked
// from the files already on disk.
//
// Usage: node tools/flow-pack.mjs <slug> <short1|short2|...|long|stills>
//   short<N>  vertical 9:16 clips for that Short  -> assets/<slug>/clips/<id>.v.mp4
//   long      16:9 clips for scenes with type "clip" -> assets/<slug>/clips/<id>.mp4
//   stills    16:9 images for every other scene    -> assets/<slug>/images/<id>.png
// Writes flow/projects/<slug>/<pack>.md and .json.
import fs from 'node:fs';
import { r, readJson, loadStoryboard, mkdirp, exists, plainVO } from './lib.mjs';

const [slug, pack] = process.argv.slice(2);
if (!slug || !pack) { console.error('Usage: node tools/flow-pack.mjs <slug> <short1|long|stills>'); process.exit(1); }

const guide = fs.readFileSync(r('config/style-guide.md'), 'utf8');
const grab = (label) => {
  const part = guide.split(`**${label} (copy exactly):**`)[1];
  if (!part) { console.error('flow-pack: the claymation prompt prefix is gone (2D noir since 2026-11-28).\nUse the make-short skill and `node tools/build-shorts.mjs <city>` (prompts/library.json) for Flow prompts.'); process.exit(1); }
  return part.split('```')[1].trim();
};
const PREFIX = grab('PREFIX');
const sb = loadStoryboard(slug);
const lib = readJson(r('flow/library/ingredients.json')).ingredients
  .filter((i) => i.scope === 'global' || i.scope === slug);
const byId = Object.fromEntries(sb.scenes.map((s) => [s.id, s]));
const src = (s) => (s.reuse ? byId[s.reuse] : s); // the scene whose visual is actually generated

// ---- which scenes, which format ----
let scenes, mode, aspect;
if (pack.startsWith('short')) {
  const sh = (sb.shorts || []).find((x) => x.id === pack);
  if (!sh) { console.error(`No ${pack} in storyboards/${slug}.json`); process.exit(1); }
  scenes = sh.scenes.map((id) => byId[id]); mode = 'clip'; aspect = '9:16';
} else if (pack === 'long') {
  scenes = sb.scenes.filter((s) => !s.short_only && src(s).type === 'clip'); mode = 'clip'; aspect = '16:9';
} else if (pack === 'stills') {
  scenes = sb.scenes.filter((s) => !s.short_only && src(s).type !== 'clip'); mode = 'image'; aspect = '16:9';
} else { console.error(`Unknown pack "${pack}"`); process.exit(1); }

const CAMERA = {
  'zoom-in': 'slow gentle push-in', 'zoom-out': 'slow gentle pull-back', 'pan-left': 'slow pan to the left',
  'pan-right': 'slow pan to the right', static: 'locked-off camera, only subtle movement in the scene',
};
const ORDER = { style: 0, character: 1, set: 2, object: 3 };

function ingredientsFor(s) {
  if (Array.isArray(s.ingredients)) return s.ingredients;
  const p = (s.prompt || '').toLowerCase();
  const hits = lib.filter((i) => i.kind !== 'style' && i.match.some((m) => p.includes(m)))
    .sort((a, b) => ORDER[a.kind] - ORDER[b.kind]).slice(0, 2).map((i) => i.id);
  return ['STY-clay', ...hits];
}

// ---- build shots (one per unique visual, in first-appearance order) ----
const seen = new Map(), shots = [];
for (const s of scenes) {
  const v = src(s);
  if (!v || !v.prompt) { console.warn(`WARN ${s.id}: no prompt`); continue; }
  if (seen.has(v.id)) { const o = seen.get(v.id); if (s.id !== o.scene && !o.also.includes(s.id)) o.also.push(s.id); continue; }
  const ing = ingredientsFor(v);
  const frame = aspect === '9:16' ? 'vertical 9:16 composition, subject centred for a phone screen' : 'cinematic 16:9 composition';
  const tail = mode === 'clip'
    ? `Camera: ${CAMERA[v.motion] || CAMERA['zoom-in']}${v.clip_motion ? `; ${v.clip_motion}` : ''}. Stop-motion movement, slightly stepped. ${frame}. Ambient sound only, no speech, no music, no text, no letters, no watermark, no logos.`
    : `${frame}, no text, no letters, no watermark, no logos, no modern objects unless stated.`;
  const save = mode === 'clip'
    ? `assets/${slug}/clips/${v.id}${aspect === '9:16' ? '.v' : ''}.mp4`
    : `assets/${slug}/images/${v.id}.png`;
  const shot = {
    n: shots.length + 1, scene: v.id, also: s.id === v.id ? [] : [s.id], mode, aspect,
    ingredients: ing, prompt: `${PREFIX} ${v.prompt}. ${tail}`, save, done: exists(r(save)),
    vo: plainVO(s.vo),
  };
  seen.set(v.id, shot); shots.push(shot);
}

// ---- write ----
const dir = r('flow', 'projects', slug); mkdirp(dir);
const missingImg = [...new Set(shots.flatMap((s) => s.ingredients))]
  .filter((id) => !exists(r('flow/library/images', `${id}.png`)));
const json = { slug, pack, flow_project: `EAS ${slug}`, mode, aspect, generations: shots.length,
  done: shots.filter((s) => s.done).length, ingredients_needed: [...new Set(shots.flatMap((s) => s.ingredients))], shots };
fs.writeFileSync(`${dir}/${pack}.json`, JSON.stringify(json, null, 2) + '\n');

const name = (id) => lib.find((i) => i.id === id)?.flow_name || id;
let md = `# Flow pack: ${slug} / ${pack}\n\n`;
md += `Flow project: **EAS ${slug}** · ${mode === 'clip' ? 'Video' : 'Image'} · ${aspect} · ${shots.length} generations (${json.done} done)\n\n`;
md += `Ingredients to have in the project: ${json.ingredients_needed.map((i) => `\`${i}\` (${name(i)})`).join(', ')}\n`;
if (missingImg.length) md += `\n> Library images not built yet: ${missingImg.join(', ')}. Run CHROME-PROMPTS.md prompt A first.\n`;
md += `\nRe-run \`node tools/flow-pack.mjs ${slug} ${pack}\` to refresh ticks from files on disk.\n`;
for (const s of shots) {
  md += `\n## ${s.done ? '[x]' : '[ ]'} ${String(s.n).padStart(2, '0')} · ${s.scene}${s.also.length ? ` (also ${s.also.join(', ')})` : ''}\n`;
  md += `- Ingredients: ${s.ingredients.map((i) => `\`${i}\``).join(' + ')}\n- Save as: \`${s.save}\`\n`;
  if (s.vo) md += `- Narration (for judging the shot, not for Flow): ${s.vo}\n`;
  md += `\n\`\`\`\n${s.prompt}\n\`\`\`\n`;
}
fs.writeFileSync(`${dir}/${pack}.md`, md);
console.log(`flow/projects/${slug}/${pack}.md  ${shots.length} generations, ${json.done} done` +
  (missingImg.length ? `\n  library images missing: ${missingImg.join(', ')}` : ''));
