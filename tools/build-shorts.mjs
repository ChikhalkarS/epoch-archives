#!/usr/bin/env node
// Build Shorts/Reels production files from the prompt library.
// Usage: node tools/build-shorts.mjs <slug>
// Reads:  config/channel.json, prompts/library.json, shorts/<slug>/shorts.json
// Writes: shorts/<slug>/<short-id>.md (one per Short), prompts/LIBRARY.md
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const slug = process.argv[2];
if (!slug) { console.error('Usage: node tools/build-shorts.mjs <slug>'); process.exit(1); }

const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
const cfg = read('config/channel.json');
const lib = read('prompts/library.json');
const data = read(`shorts/${slug}/shorts.json`);
const T = cfg.shorts_template;
const ST = lib.style;
const RUNGS = ['EWS', 'WS', 'MS', 'MCU', 'CU', 'ECU'];
const warnings = [];

const fill = (s, vars) => s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
const charTags = Object.fromEntries(Object.entries(lib.characters).map(([k, c]) => [k, c.scene_tag]));
const stripTts = (s) => s.replace(/\[[a-z ]+\]/g, '').replace(/\.\.\./g, ' ').trim();
const words = (s) => stripTts(s).split(/\s+/).filter(Boolean).length;

function introLines(episode, city) {
  const ord = T.ordinals[String(episode)] || `${episode}वें`;
  const split = (s) => fill(s, { ordinal: ord, city }).split(/(?<=।)\s+/);
  const [v1, v2] = split(T.intro_line);
  const [t1, t2] = split(T.intro_tts);
  return { vo: { '@intro1': v1, '@intro2': v2, '@follow': T.follow_line }, tts: { '@intro1': t1, '@intro2': t2, '@follow': T.follow_line } };
}

function expandShot(shot, intro) {
  const s = { ...shot };
  s.vo = intro.vo[s.vo] || s.vo;
  s.tts = intro.tts[s.tts] || s.tts;
  let prompt, motion, size = s.size, angle = s.angle, asset = s.asset, chars = [];
  if (s.bhediya) {
    const t = lib.bhediya_shots[s.bhediya];
    if (!t) throw new Error(`Unknown bhediya shot template: ${s.bhediya}`);
    const vars = { ...charTags, ...(s.vars || {}) };
    prompt = fill(t.prompt, vars); motion = fill(t.motion, vars);
    size = size || t.size; angle = angle || t.angle; asset = asset || t.asset;
    s.template = `${s.bhediya} v${t.version}`;
  } else {
    prompt = fill(s.prompt, charTags); motion = s.motion;
  }
  for (const k of Object.keys(lib.characters)) {
    if ((s.bhediya ? lib.bhediya_shots[s.bhediya].prompt : s.prompt).includes(`{${k}}`) || prompt.includes(k)) chars.push(k);
  }
  const framing = `${lib.framing.sizes[size]}, ${lib.framing.angles[angle]}`;
  s.fullPrompt = `${ST.prefix}${framing}: ${prompt}${ST.suffix_9x16}`;
  s.motionFull = motion + (chars.length ? ` Keep ${chars.join(', ')} identical to the reference image(s).` : '');
  Object.assign(s, { size, angle, asset, chars: [...new Set(chars)] });
  return s;
}

function check(sh, shots) {
  const w = shots.reduce((a, s) => a + words(s.tts), 0);
  const roles = shots.map((s) => s.role);
  if (roles[0] !== 'hook') warnings.push(`${sh.id}: first shot must be the hook`);
  if (!roles.includes('brand')) warnings.push(`${sh.id}: brand intro missing`);
  if (!roles.includes('interaction')) warnings.push(`${sh.id}: viewer line missing`);
  if (!roles.includes('comment')) warnings.push(`${sh.id}: comment question missing`);
  if (roles[roles.length - 1] !== 'follow') warnings.push(`${sh.id}: must end with the follow line`);
  if (w < 140 || w > 175) warnings.push(`${sh.id}: ${w} words (target 140-165, max 175)`);
  shots.forEach((s, i) => {
    if (words(s.tts) > 20) warnings.push(`${sh.id} shot ${i + 1}: ${words(s.tts)} words in one shot; split the line`);
    if (s.role !== 'brand' && s.role !== 'follow' && s.role !== 'hook' && !s.facts?.length && !['interaction', 'comment', 'outro', 'twist', 'payoff'].includes(s.role)) warnings.push(`${sh.id} shot ${i + 1}: story line without a fact ID`);
    if (i === 0) return;
    const p = shots[i - 1];
    const jump = Math.abs(RUNGS.indexOf(s.size) - RUNGS.indexOf(p.size));
    if (jump < 2 && s.angle === p.angle) warnings.push(`${sh.id} shot ${i}->${i + 1}: ${p.size}/${p.angle} -> ${s.size}/${s.angle} (change size by 2 steps or change angle)`);
    if (s.bhediya && p.bhediya && s.bhediya === p.bhediya) warnings.push(`${sh.id} shot ${i}->${i + 1}: same Bhediya shot twice in a row`);
  });
  return w;
}

function charSheet(key) {
  const c = lib.characters[key];
  const identity = `EYES: ${c.eyes}\nSKIN/FUR: ${c.skin}\nHAIR: ${c.hair}\nOUTFIT: ${c.outfit}`;
  const closeup = `${ST.sheet_style}. Ultra-detailed portrait of ${key}: ${c.summary}. ${c.age_build}. Chest-up framing, front view, facing camera, plain cool grey background, even soft studio light.\n${identity}\nEXPRESSION: ${c.expression}\nNOTES: ${c.notes} Sharp focus on the eyes.`;
  const sheet = `${ST.sheet_style}. Character reference sheet of the same character, 16:9 landscape, three panels side by side on one seamless cool grey studio background. Left panel (about 45% of width): bust-up portrait from the chest up, front view, facing camera. Center panel: full body standing straight, front view, arms relaxed, feet visible, filling about 90% of panel height. Right panel: full body standing straight, rear view from directly behind, heels visible. Even studio lighting, identical look across all three panels.\nIDENTITY:\n${identity}`;
  const role = `Image 1 defines ${key}'s face, ${key === 'BHEDIYA' ? 'fur' : 'hair'} and clothing. Do not use the grey background or the panel layout.`;
  return { c, closeup, sheet, role };
}

function renderShort(sh) {
  const intro = introLines(sh.episode, data.city);
  const shots = sh.shots.map((s) => expandShot(s, intro));
  const w = check(sh, shots);
  const secs = (n) => Math.max(1.2, Math.round((n / 2.6) * 10) / 10);
  const chars = [...new Set(shots.flatMap((s) => s.chars))];
  const clips = shots.filter((s) => s.asset === 'clip').length;
  const L = [];
  L.push(`# ${cfg.show.name} - एपिसोड ${sh.episode}: ${sh.title}`);
  L.push(`<!-- Built by tools/build-shorts.mjs from shorts/${slug}/shorts.json + prompts/library.json v${lib.library_version}. Edit those, not this file. -->`);
  L.push(`City: ${data.city} | Format: 9:16, 1080x1920 | Words: ${w} | ~${Math.round(w / 2.6)}-${Math.round(w / 2.4)} s at speed 1.1-1.15 | Shots: ${shots.length} (${clips} clips, ${shots.length - clips} stills) | Status: waiting on Gate 1`);
  L.push('');
  L.push(`**Twist:** ${sh.twist}  `);
  L.push(`**Teaser:** ${sh.teaser}  `);
  L.push(`**On-screen hook (first 2 s):** ${sh.hook_onscreen}`);
  L.push('');
  L.push('## Voice (ElevenLabs)');
  L.push(`- ${cfg.voice.model}, ${cfg.voice.voice_name}, ${cfg.voice.post_filter}. Speed about 1.1-1.15.`);
  L.push('- Narrator: भेड़िया. Audio tags are optional; delete any that sound odd. "..." = short pause.');
  L.push('- Over 65 s? Raise speed slightly or drop one story shot. Never drop the intro, viewer line, comment ask, teaser or follow line.');
  L.push('');
  L.push('### Paste into ElevenLabs');
  L.push('```');
  shots.forEach((s) => L.push(s.tts));
  L.push('```');
  L.push('');
  L.push('## Characters (make once, attach as reference in every shot they appear in)');
  L.push('Full close-up and sheet prompts: `prompts/LIBRARY.md`. Save the chosen images at the paths below so every episode reuses them.');
  for (const k of chars) {
    const c = lib.characters[k];
    L.push(`- **${k}** (v${c.version}): ${c.reference_images.join(', ')}`);
  }
  L.push('');
  L.push('## Shot list (one line = one shot)');
  L.push('| # | Role | Line | Size / angle | Type | Sec | On screen | Facts |');
  L.push('|---|---|---|---|---|---|---|---|');
  shots.forEach((s, i) => L.push(`| ${i + 1} | ${s.role} | ${s.vo} | ${s.size} / ${s.angle} | ${s.asset}${s.template ? ` (${s.template})` : ''} | ${secs(words(s.tts))} | ${s.onscreen || ''} | ${(s.facts || []).join(' ') || '-'} |`));
  L.push('');
  L.push('## Shot prompts');
  L.push(`Negative prompt (if supported): \`${ST.negative}\``);
  L.push('Stills: generate the image and let the edit add a slow push/pan. Clips: generate the image first, check it, then animate it with the motion line (image-to-video), trim to the line length.');
  L.push('');
  shots.forEach((s, i) => {
    L.push(`### ${sh.id.split('-')[0]}-s${String(i + 1).padStart(2, '0')} | ${s.role} | ${s.size} ${s.angle} | ${s.asset}`);
    L.push(`VO: ${s.vo}`);
    if (s.onscreen) L.push(`On screen: ${s.onscreen}`);
    if (s.chars.length) L.push(`References: ${s.chars.join(', ')}`);
    L.push('Image prompt:');
    L.push('```');
    L.push(s.fullPrompt);
    L.push('```');
    if (s.asset === 'clip') { L.push('Motion prompt:'); L.push('```'); L.push(s.motionFull); L.push('```'); }
    else L.push(`Edit move: ${s.motion}`);
    L.push('');
  });
  L.push('## Edit notes');
  L.push('- Cut on every line; the shot changes when the line changes. A shot may repeat only when the script calls back to it.');
  L.push('- Word-by-word Hindi captions (Mukta / Noto Sans Devanagari, white with dark outline) in the middle 60% of the frame height; keep the top 12% and bottom 20% clear.');
  L.push('- Whoosh on the hook, the twist cut-in and the payoff. Royalty-free music about 12% under the voice; log it in `shorts/' + slug + '/CREDITS.md`.');
  L.push('- The last frame (Bhediya looking back with the lantern) should loop into the first.');
  L.push('');
  L.push('## Publish pack');
  L.push('**YouTube Shorts titles:**');
  sh.publish.yt_titles.forEach((t) => L.push(`- ${t}`));
  L.push('');
  L.push('**YouTube description:**');
  L.push(sh.publish.yt_description);
  L.push('');
  L.push('**Instagram Reel caption:**');
  L.push(sh.publish.ig_caption);
  L.push('');
  L.push('Upload setting: Audience = "No, it\'s not made for kids" (narrator is an animated wolf; content is history for general audiences).');
  L.push('');
  fs.writeFileSync(path.join(root, `shorts/${slug}/${sh.id}.md`), L.join('\n'));
  return { id: sh.id, words: w, shots: shots.length, clips };
}

function renderLibrary() {
  const L = [`# Prompt library (v${lib.library_version}, ${lib.updated})`, '', `<!-- Built from prompts/library.json by tools/build-shorts.mjs. Edit the JSON, not this file. -->`, '', lib.rule, ''];
  L.push('## Style', '', '**Prefix:**', '```', ST.prefix.trim(), '```', '**Vertical suffix:**', '```', ST.suffix_9x16.replace(/^, /, ''), '```', '**Negative:**', '```', ST.negative, '```', '');
  L.push('## Framing words', '', ...Object.entries(lib.framing.sizes).map(([k, v]) => `- ${k}: ${v}`), ...Object.entries(lib.framing.angles).map(([k, v]) => `- ${k}: ${v}`), '', lib.framing.vertical_rule, '');
  L.push('## Characters', '');
  for (const k of Object.keys(lib.characters)) {
    const { c, closeup, sheet, role } = charSheet(k);
    L.push(`### ${k} (v${c.version}, ${c.scope})`, c.name, '', 'Step 1 - close-up (generate several, pick the best):', '```', closeup, '```', 'Step 2 - three-panel sheet (attach the chosen close-up):', '```', sheet, '```', 'Role line for every later prompt:', '```', role, '```', `Save as: ${c.reference_images.join(', ')}`, '');
  }
  L.push('## Bhediya shot bank', '', lib.bhediya_shots._rule, '');
  for (const [k, t] of Object.entries(lib.bhediya_shots)) {
    if (k.startsWith('_')) continue;
    L.push(`### ${k} (v${t.version}) - ${t.size} / ${t.angle} / ${t.asset}`, '```', t.prompt, '```', `Motion: ${t.motion}`, '');
  }
  fs.writeFileSync(path.join(root, 'prompts/LIBRARY.md'), L.join('\n'));
}

const results = data.shorts.map(renderShort);
renderLibrary();
for (const r of results) console.log(`${r.id}: ${r.words} words, ${r.shots} shots (${r.clips} clips)`);
if (warnings.length) { console.log('\nWarnings:'); warnings.forEach((w) => console.log(' - ' + w)); }
else console.log('\nNo warnings.');
