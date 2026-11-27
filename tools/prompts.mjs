#!/usr/bin/env node
// Build assets/<slug>/PROMPTS.md (paste-ready prompts with the style-guide prefix/suffix) and storyboards/<slug>.md.
// Usage: node tools/prompts.mjs <slug>
import fs from 'node:fs';
import { r, loadStoryboard, mkdirp } from './lib.mjs';

const slug = process.argv[2];
if (!slug) { console.error('Usage: node tools/prompts.mjs <slug>'); process.exit(1); }
const guide = fs.readFileSync(r('config/style-guide.md'), 'utf8');
const grab = (label) => guide.split(`**${label} (copy exactly):**`)[1].split('```')[1].trim();
const PREFIX = grab('PREFIX'), SUFFIX = grab('SUFFIX');
const NEG = guide.split('**Negative prompt')[1].split('```')[1].trim();
const sb = loadStoryboard(slug);

const missing = sb.scenes.filter((s) => !s.prompt && !s.reuse).map((s) => s.id);
if (missing.length) console.warn(`WARN scenes without prompt: ${missing.join(', ')}`);

mkdirp(r('assets', slug, 'images'));
mkdirp(r('assets', slug, 'clips'));
let p = `# ${slug} - prompts\n\nSave each image as \`assets/${slug}/images/<id>.png\` (clips: \`assets/${slug}/clips/<id>.mp4\`). 16:9.\nNegative prompt (if the tool has one): ${NEG}\n`;
for (const s of sb.scenes.filter((x) => !x.reuse)) {
  p += `\n## ${s.id}${s.type === 'clip' ? ' (CLIP)' : ''}${s.chapter ? ` - ${s.chapter}` : ''}\n\`\`\`\n${PREFIX} ${s.prompt}${SUFFIX}\n\`\`\`\n`;
  if (s.type === 'clip' && s.clip_motion) p += `Clip motion: ${s.clip_motion}\n`;
}
fs.writeFileSync(r('assets', slug, 'PROMPTS.md'), p);

let m = `# ${slug} - storyboard\n\n| Scene | Chapter | Type | Motion | Narration | Visual | Facts |\n|---|---|---|---|---|---|---|\n`;
for (const s of sb.scenes) m += `| ${s.id} | ${s.chapter || ''} | ${s.type} | ${s.motion} | ${s.vo} | ${s.prompt} | ${(s.sources || []).join(' ')} |\n`;
m += `\n## Shorts\n`;
for (const sh of sb.shorts || []) m += `- **${sh.id}** (${sh.mode || 'blur'}): ${sh.scenes.join(', ')} - hook: ${sh.hook || ''}\n`;
fs.writeFileSync(r('storyboards', `${slug}.md`), m);
console.log(`Wrote assets/${slug}/PROMPTS.md and storyboards/${slug}.md (${sb.scenes.length} scenes)`);
