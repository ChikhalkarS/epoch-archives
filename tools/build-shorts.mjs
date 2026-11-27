#!/usr/bin/env node
// Build Shorts/Reels production files from the prompt library.
// Usage: node tools/build-shorts.mjs <slug>
// Reads:  config/channel.json, prompts/library.json, shorts/<slug>/shorts.json
// Writes: shorts/<slug>/<short-id>.md and <short-id>-flow.md (Flow-ready prompts) per Short, prompts/LIBRARY.md
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
const STYLE_SHORT = '2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows';
const warnings = [];

const timingOf = (id) => { const f = path.join(root, `shorts/${slug}/${id}.timing.json`); return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : null; };
// estimate until the real voice is measured: ~2.8 words/s at speed 1.1, +0.35 s line pause, +0.25 s per '...'
const estSecs = (n, tts = '') => Math.max(1.2, Math.round((n / 2.8 + 0.35 + 0.25 * ((tts.replace(/\.\.\.\s*$/, '').match(/\.\.\./g) || []).length)) * 10) / 10);
const roleLine = (k, ref = 'Image 1') => `${ref} defines ${k}'s face, ${k === 'SUTRADHAR' ? 'fur, spectacles' : 'hair'} and clothing. Do not use its grey background or panel layout.`;
const lockOf = (keys) => keys.map((k) => lib.characters[k].lock).filter(Boolean).join('; ');
const sheetOf = (k) => lib.characters[k].reference_images.find((x) => x.endsWith('sheet.png'));
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
  if (s.narrator) {
    const t = lib.narrator_shots[s.narrator];
    if (!t) throw new Error(`Unknown narrator shot template: ${s.narrator}`);
    const vars = { ...charTags, ...(s.vars || {}) };
    prompt = fill(t.prompt, vars); motion = fill(t.motion, vars);
    size = size || t.size; angle = angle || t.angle; asset = asset || t.asset;
    s.template = `${s.narrator} v${t.version}`;
  } else {
    prompt = fill(s.prompt, charTags); motion = s.motion;
  }
  for (const k of Object.keys(lib.characters)) {
    if ((s.narrator ? lib.narrator_shots[s.narrator].prompt : s.prompt).includes(`{${k}}`) || prompt.includes(k)) chars.push(k);
  }
  const framing = `${lib.framing.sizes[size]}, ${lib.framing.angles[angle]}`;
  const uniq = [...new Set(chars)];
  const lock = uniq.length ? ` Character lock: ${lockOf(uniq)}.` : '';
  s.fullPrompt = `${ST.prefix}${framing}: ${prompt}.${lock}${ST.suffix_9x16}`;
  s.motionFull = motion + (uniq.length ? ` Keep ${uniq.join(', ')} identical to the reference sheet(s).${lock}` : '');
  Object.assign(s, { size, angle, asset, chars: uniq, scene: prompt, motionRaw: motion, framing, lock });
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
    if (s.narrator && p.narrator && s.narrator === p.narrator) warnings.push(`${sh.id} shot ${i}->${i + 1}: same narrator shot twice in a row`);
  });
  return w;
}

function charSheet(key) {
  const c = lib.characters[key];
  const header = fill(ST.character_header, { ID: key, summary: c.summary, strokes: c.strokes });
  const blocks = c.blocks.map(([k, v]) => `${k}: ${v}`).join('\n');
  const closeup = c.closeup_prompt_owner || `${header}\n${ST.character_framing}\n${blocks}\n${ST.character_technical}\n${c.build}`;
  const sheet = `Character reference sheet of the same character as the reference image, ${STYLE_SHORT}, 16:9 landscape, three panels side by side on one seamless cool grey studio background, identical grey across all panels.\nLeft panel (about 45% of width): bust-up portrait from the chest up, three-quarter view toward camera.\nCenter panel: full body standing straight, front view, arms relaxed, feet visible, filling about 90% of panel height.\nRight panel: full body standing straight, rear view from directly behind, heels visible.\nEven studio light, identical face, ${key === 'SUTRADHAR' ? 'fur' : 'hair'} and clothing in all three panels.\nIDENTITY:\n${blocks}\n${c.build}\n${ST.character_technical}`;
  const role = roleLine(key);
  return { c, closeup, sheet, role };
}

function renderShort(sh) {
  const intro = introLines(sh.episode, data.city);
  const shots = sh.shots.map((s) => expandShot(s, intro));
  const w = check(sh, shots);
  const tm = timingOf(sh.id);
  if (tm && tm.shots.length !== shots.length) warnings.push(`${sh.id}: timing file has ${tm.shots.length} shots, script has ${shots.length}; re-run tools/time-voice.mjs`);
  shots.forEach((s, i) => { s.est = estSecs(words(s.tts), s.tts); s.secs = tm && tm.shots[i] ? tm.shots[i].dur : s.est; });
  const totalSecs = Math.round(shots.reduce((x, s) => x + s.secs, 0));
  const maxS = T.max_seconds ?? 70;
  if (totalSecs > maxS) warnings.push(`${sh.id}: ${tm ? 'measured' : 'estimated'} ${totalSecs} s is over ${maxS} s${tm ? '' : ' (estimate; measure the real voice with tools/time-voice.mjs)'}`);
  sh._total = totalSecs;
  shots.forEach((s, i) => { if (s.secs > 7.5) warnings.push(`${sh.id} shot ${i + 1}: ${s.secs} s is longer than one 8 s Flow clip; split the line`); });
  const secs = (n, i) => shots[i].secs;
  const chars = [...new Set(shots.flatMap((s) => s.chars))];
  const clips = shots.filter((s) => s.asset === 'clip').length;
  const L = [];
  L.push(`# ${cfg.show.name} - एपिसोड ${sh.episode}: ${sh.title}`);
  L.push(`<!-- Built by tools/build-shorts.mjs from shorts/${slug}/shorts.json + prompts/library.json v${lib.library_version}. Edit those, not this file. -->`);
  L.push(`City: ${data.city} | Format: 9:16, 1080x1920 | Words: ${w} | ${tm ? `measured voice: ${tm.total} s` : `estimated ~${sh._total} s incl. pauses at speed 1.1-1.15 (not measured yet)`} | Shots: ${shots.length} (${clips} clips, ${shots.length - clips} stills) | Status: waiting on Gate 1`);
  L.push('');
  L.push(`**Twist:** ${sh.twist}  `);
  L.push(`**Teaser:** ${sh.teaser}  `);
  L.push(`**On-screen hook (first 2 s):** ${sh.hook_onscreen}`);
  L.push('');
  L.push('## Voice (ElevenLabs)');
  L.push(`- ${cfg.voice.model}, ${cfg.voice.voice_name}, ${cfg.voice.post_filter}. Speed about 1.1-1.15.`);
  L.push('- Narrator: the wolf (SUTRADHAR). Audio tags are optional; delete any that sound odd. "..." = short pause.');
  L.push('- Over 65 s? Raise speed slightly or drop one story shot. Never drop the intro, viewer line, comment ask, teaser or follow line.');
  L.push('');
  L.push(`### Paste into ElevenLabs (also in \`shorts/${slug}/${sh.id}-voice.txt\`)`);
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
  L.push(`| # | Role | Line | Size / angle | Type | Sec (${tm ? 'measured' : 'est.'}) | On screen | Facts |`);
  L.push('|---|---|---|---|---|---|---|---|');
  shots.forEach((s, i) => L.push(`| ${i + 1} | ${s.role} | ${s.vo} | ${s.size} / ${s.angle} | ${s.asset}${s.template ? ` (${s.template})` : ''} | ${secs(0, i)} | ${s.onscreen || ''} | ${(s.facts || []).join(' ') || '-'} |`));
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
  L.push('- The last frame (the wolf looking back) should loop into the first.');
  L.push('');
  L.push('## Publish pack');
  L.push('**YouTube Shorts titles:**');
  sh.publish.yt_titles.forEach((t) => L.push(`- ${t}`));
  L.push('');
  L.push('**YouTube description:**');
  L.push(sh.publish.yt_description + (cfg.voice.attribution ? `\n${cfg.voice.attribution}` : ''));
  L.push('');
  L.push('**Instagram Reel caption:**');
  L.push(sh.publish.ig_caption.replace(/\n\n(#[^\n]*)$/, (m, tags) => (cfg.voice.attribution ? `\n${cfg.voice.attribution}` : '') + `\n\n${tags}`));
  L.push('');
  L.push('Upload setting: Audience = "No, it\'s not made for kids" (narrator is an animated wolf; content is history for general audiences).');
  L.push('');
  fs.writeFileSync(path.join(root, `shorts/${slug}/${sh.id}.md`), L.join('\n'));
  fs.writeFileSync(path.join(root, `shorts/${slug}/${sh.id}-voice.txt`), shots.map((s) => s.tts).join('\n') + '\n');
  fs.writeFileSync(path.join(root, `shorts/${slug}/${sh.id}.shots.json`), JSON.stringify({ slug, id: sh.id, episode: sh.episode, built_from_library: lib.library_version, shots: shots.map((s, i) => ({ n: i + 1, sid: `${sh.id.split('-')[0]}-s${String(i + 1).padStart(2, '0')}`, role: s.role, vo: s.vo, tts: s.tts, words: words(s.tts), est: s.est, size: s.size, angle: s.angle, asset: s.asset, onscreen: s.onscreen || '' })) }, null, 1) + '\n');
  renderFlow(sh, shots);
  const uses = shots.flatMap((s, i) => s.chars.map((k) => [k, `${sh.id.split('-')[0]}-s${String(i + 1).padStart(2, '0')} (${s.size} ${s.angle}, ${s.asset})`]));
  return { id: sh.id, words: w, shots: shots.length, clips, uses };
}


function renderFlow(sh, shots) {
  const F = lib.flow;
  const tm = timingOf(sh.id);
  const secs = (n, i) => shots[i].secs;
  const L = [];
  L.push(`# Flow prompts - ${cfg.show.name} एपिसोड ${sh.episode}: ${sh.title}`);
  L.push(`<!-- Built by tools/build-shorts.mjs from shorts/${slug}/shorts.json + prompts/library.json v${lib.library_version}. Edit those, not this file. -->`);
  L.push('');
  L.push(`Tool: ${F.tool}. ${F.settings}`);
  L.push(`Audio: ${F.audio_rule}`);
  L.push(tm ? `Timing: measured from the ElevenLabs voice (${tm.total} s, ${tm.source}).` : 'Timing: ESTIMATED from word count. After the ElevenLabs voice exists run `node tools/time-voice.mjs ' + slug + ' ' + sh.id + '` and rebuild; the seconds below then become exact.');
  L.push('');
  L.push('## Order of work');
  const chars = [...new Set(shots.flatMap((s) => s.chars))];
  L.push(`1. Character references (once, reused every episode): ${chars.map((k) => `${k} -> ${lib.characters[k].reference_images.find((r) => r.endsWith('sheet.png'))}`).join('; ')}. Prompts in \`prompts/LIBRARY.md\`.`);
  L.push('2. Stills (type `image`): generate in Flow, pick one each.');
  L.push('3. Clips: `ingredients` shots attach the listed sheets; `text` shots need nothing (or attach the still as first frame in Frames to Video for more control).');
  L.push('4. Name files by shot id (e.g. `' + sh.id.split('-')[0] + '-s01.mp4`) and drop them in `assets/' + slug + '/shorts/' + sh.id + '/`.');
  L.push('');
  L.push(`| # | Line | Shot | Flow mode | Attach | Use (s${tm ? '' : ', est.'}) |`);
  L.push('|---|---|---|---|---|---|');
  const modeOf = (s) => (s.asset === 'still' ? 'image' : s.chars.length ? 'ingredients' : 'text');
  shots.forEach((s, i) => L.push(`| ${i + 1} | ${s.vo} | ${s.size} ${s.angle} | ${modeOf(s)} | ${s.chars.join(', ') || '-'} | ${secs(0, i)} |`));
  L.push('');
  shots.forEach((s, i) => {
    const id = `${sh.id.split('-')[0]}-s${String(i + 1).padStart(2, '0')}`;
    const mode = modeOf(s);
    L.push(`## ${id} | ${mode} | ${s.size} ${s.angle} | use first ${secs(0, i)} s${tm ? '' : ' (estimate)'}`);
    L.push(`Line: ${s.vo}`);
    if (s.onscreen) L.push(`On screen (added in edit): ${s.onscreen}`);
    L.push(`Flow: ${F.modes[mode]}${s.chars.length ? ` Attach: ${s.chars.map((k) => lib.characters[k].reference_images.find((r) => r.endsWith('sheet.png'))).join(', ')}.` : ''}`);
    L.push('```');
    if (mode === 'image') {
      L.push(s.fullPrompt);
    } else {
      L.push('[Generation Goal]');
      L.push(`A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. ${s.goal || `${s.role} beat.`}`);
      if (s.chars.length) {
        L.push('', '[Reference Material Roles]');
        s.chars.forEach((k, n) => L.push(roleLine(k, `Ingredient ${n + 1} (${sheetOf(k)})`)));
      }
      L.push('', '[Subjects and Relationships]');
      L.push(`${s.framing}: ${s.scene}.`);
      L.push('', '[Event Script]');
      L.push(`Stage 1: Opening state as described above. ${s.motionRaw} The video ends holding this final state.`);
      L.push('', '[Visual and Camera Treatment]');
      L.push(`${s.framing}, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. ${F.style_line} Every sign, page and banner is blank or carries unreadable squiggles.`);
      L.push('', '[Audio]');
      L.push(`Audio: ${s.sfx || 'quiet ambient room tone'}. No music, no speech.`);
      L.push('', '[Maintain Consistency]');
      L.push(`${s.chars.length ? `Keep ${s.chars.join(', ')} identical to the ingredients in face, ${s.chars.includes('SUTRADHAR') ? 'fur, spectacles, ' : ''}clothing and proportions in every frame. Character lock: ${lockOf(s.chars)}. ` : ''}Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.`);
    }
    L.push('```');
    L.push('');
  });
  fs.writeFileSync(path.join(root, `shorts/${slug}/${sh.id}-flow.md`), L.join('\n'));
}

function renderCharacters(usage) {
  for (const k of Object.keys(lib.characters)) {
    const { c, closeup, sheet, role } = charSheet(k);
    const dir = path.join(root, 'prompts/characters', k);
    fs.mkdirSync(dir, { recursive: true });
    const refs = c.reference_images.map((x) => `- \`${x}\` ${fs.existsSync(path.join(root, x)) ? '(saved)' : '(not made yet)'}`);
    const used = (usage[k] || []);
    const L = [`# ${k} - character sheet (v${c.version})`, `<!-- Built from prompts/library.json by tools/build-shorts.mjs. Edit the JSON, not this file. -->`, '',
      `**Name:** ${c.name}  `, `**Scope:** ${c.scope}  `, `**Notes:** ${c.notes || '-'}`, '',
      '## Reference images (attach in Flow every time this character appears)', ...refs, '',
      '## Consistency lock (pasted verbatim into every prompt with this character)', '```', c.lock || '-', '```', '',
      '## Scene tag (how prompts describe the character)', '```', c.scene_tag, '```', '',
      '## Role line (with the attached sheet)', '```', role, '```', '',
      `## Step 1 - close-up${c.closeup_prompt_owner ? " (owner's prompt, verbatim)" : ''}`, 'Generate several, keep the one you would recognise in a crowd. Save as `closeup.png` here.', '```', closeup, '```', '',
      '## Step 2 - three-panel sheet', 'Attach the chosen close-up. Save the cleanest as `sheet.png` here.', '```', sheet, '```', '',
      ...(k === 'SUTRADHAR' && lib.branding?.profile_picture ? ['## Channel profile picture', `Attach \`${lib.branding.profile_picture.attach}\`. Save as \`${lib.branding.profile_picture.save_as}\`.`, '```', lib.branding.profile_picture.prompt, '```', ''] : []),
      `## Used in (${slug})`, ...(used.length ? used.map((u) => `- ${u}`) : ['- not used in this city']), ''];
    fs.writeFileSync(path.join(dir, 'CHARACTER.md'), L.join('\n'));
  }
}

function renderLibrary() {
  const L = [`# Prompt library (v${lib.library_version}, ${lib.updated})`, '', `<!-- Built from prompts/library.json by tools/build-shorts.mjs. Edit the JSON, not this file. -->`, '', lib.rule, ''];
  L.push('## Style', '', `**${ST.name}**`, '', '**Prefix:**', '```', ST.prefix.trim(), '```', '**Vertical suffix:**', '```', ST.suffix_9x16.replace(/^, /, ''), '```', '**Negative:**', '```', ST.negative, '```', '');
  L.push('## Framing words', '', ...Object.entries(lib.framing.sizes).map(([k, v]) => `- ${k}: ${v}`), ...Object.entries(lib.framing.angles).map(([k, v]) => `- ${k}: ${v}`), '', lib.framing.vertical_rule, '');
  L.push('## Characters', '');
  for (const k of Object.keys(lib.characters)) {
    const { c, closeup, sheet, role } = charSheet(k);
    L.push(`### ${k} (v${c.version}, ${c.scope})`, c.name, c.notes || '', '', (c.closeup_prompt_owner ? 'Step 1 - close-up (owner\'s prompt, verbatim). Generate several, pick the best:' : 'Step 1 - close-up (generate several, pick the best):'), '```', closeup, '```', 'Step 2 - three-panel sheet (attach the chosen close-up):', '```', sheet, '```', 'Role line for every later prompt:', '```', role, '```', `Save as: ${c.reference_images.join(', ')}`, '');
  }
  if (lib.branding) {
    L.push('## Branding', '');
    for (const [k, b] of Object.entries(lib.branding)) L.push(`### ${k} (v${b.version}, ${b.source})`, `Attach: ${b.attach}`, '```', b.prompt, '```', `Save as: ${b.save_as}`, '');
  }
  L.push('## Narrator shot bank', '', lib.narrator_shots._rule, '');
  for (const [k, t] of Object.entries(lib.narrator_shots)) {
    if (k.startsWith('_')) continue;
    L.push(`### ${k} (v${t.version}) - ${t.size} / ${t.angle} / ${t.asset}`, '```', t.prompt, '```', `Motion: ${t.motion}`, '');
  }
  fs.writeFileSync(path.join(root, 'prompts/LIBRARY.md'), L.join('\n'));
}

const results = data.shorts.map(renderShort);
const usage = {};
for (const res of results) for (const [k, u] of res.uses) (usage[k] ||= []).push(u);
renderCharacters(usage);
renderLibrary();
for (const r of results) console.log(`${r.id}: ${r.words} words, ${r.shots} shots (${r.clips} clips)`);
if (warnings.length) { console.log('\nWarnings:'); warnings.forEach((w) => console.log(' - ' + w)); }
else console.log('\nNo warnings.');
