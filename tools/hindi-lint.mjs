#!/usr/bin/env node
// Lint a Hindi narration script for the mistakes that make it sound broken (rules: skills/studio/hindi-script/STYLE.md).
// Usage: node tools/hindi-lint.mjs scripts/<slug>.md
// ERROR = must fix before Gate 1. WARN = read aloud and decide. Exit code 1 if any ERROR.
import fs from 'node:fs';
import { channel } from './lib.mjs';

const file = process.argv[2];
if (!file) { console.error('Usage: node tools/hindi-lint.mjs scripts/<slug>.md'); process.exit(1); }
const cast = Object.keys(channel().voice.cast || {});
const md = fs.readFileSync(file, 'utf8');

// ---- collect narration lines per section ----
const SKIP_SECTIONS = /^(Short candidates|Flags)/;
const SKIP_LINES = /^(-|\||Runtime|Fact IDs|On-screen|\*\*End card|>)/;
const sections = [];
for (const block of md.split(/^## /m).slice(1)) {
  const [title, ...body] = block.split('\n');
  if (SKIP_SECTIONS.test(title)) continue;
  const lines = body.map((l) => l.replace(/\*\*[^*]*\*\*/g, '').trim()).filter((l) => l && !SKIP_LINES.test(l));
  sections.push({ title: title.trim(), text: lines.join(' ') });
}

const issues = [];
const add = (level, sec, msg, snip) => issues.push({ level, sec, msg, snip: snip ? snip.slice(0, 90) : '' });
const clean = (s) => s.replace(/\s*\[F\d+\]/g, '').replace(/\[रुकें(?:\s+[\d.]+)?\]/g, ' ').replace(/\{[^}]+\}/g, ' ').replace(/[“”"]/g, '').replace(/\s+/g, ' ').trim();
const words = (s) => clean(s).split(' ').filter(Boolean);
const END = '(?=[\\s।?!,”"]|$)';

const FEM = ['कपास', 'क़िस्मत', 'किस्मत', 'फ़ौज', 'सेना', 'जंग', 'लड़ाई', 'संधि', 'लाइन', 'दीवार', 'झील', 'नदी', 'ज़मीन', 'सल्तनत', 'रियासत', 'कहानी', 'लोक-कथा'];
const MASC_VERB = new Set(['उगता', 'आता', 'जाता', 'होता', 'रहता', 'था', 'गया', 'हुआ', 'बना', 'लगा', 'चला', 'मिला', 'बदला', 'आया']);
const POSTP = new Set(['का', 'की', 'के', 'को', 'से', 'में', 'पर', 'ने', 'तक']);
const OVERUSE = { 'यानी': 3, 'सोचिए': 2, 'आज भी': 4, 'बहुत': 6, 'काफ़ी': 3, 'दरअसल': 2, 'बस फिर क्या था': 1, 'हुआ यूँ कि': 1 };

const allText = [];
for (const { title, text } of sections) {
  allText.push(clean(text));
  // markup
  for (const m of text.matchAll(/\{([^}]+)\}/g)) if (!cast.includes(m[1].trim())) add('ERROR', title, `unknown voice role {${m[1]}} (add it to config/channel.json voice.cast)`, m[0]);
  for (const m of text.matchAll(/\[रुकें(?:\s+([\d.]+))?\]/g)) if (m[1] && !(+m[1] > 0 && +m[1] <= 3)) add('ERROR', title, 'pause must be 0-3 s', m[0]);
  if ((text.match(/“/g) || []).length !== (text.match(/”/g) || []).length) add('ERROR', title, 'unbalanced “ ” quotes');
  for (const m of text.matchAll(/\[(?!F\d+\]|रुकें)[^\]]*\]/g)) add('ERROR', title, 'unknown [..] tag (only [F#] and [रुकें] are allowed)', m[0]);
  const t = clean(text);
  // comma before a postposition / inside a phrase
  for (const m of t.matchAll(new RegExp(`[^,]{0,25},\\s*(ने|को|से|में|पर|का|की|के|तक)${END}`, 'g'))) add('ERROR', title, `comma before postposition "${m[1]}"`, m[0]);
  if (/[A-Za-z]/.test(t)) add('ERROR', title, 'Latin-script text in narration', t.match(/.{0,20}[A-Za-z]+.{0,20}/)[0]);
  if (/(^|\s)(यह|वह)(?=[\s,।?!])/.test(t)) add('WARN', title, 'use spoken ये / वो instead of यह / वह');

  const sents = t.split(/(?<=[।?!])\s+/).filter(Boolean);
  let frag = 0, run = 1;
  sents.forEach((s, i) => {
    const w = s.split(' ').filter(Boolean);
    if (w.length <= 3) frag++;
    if (w.length > 24) add('WARN', title, `long sentence (${w.length} words) - split or simplify`, s);
    const commas = (s.match(/,/g) || []).length;
    if (commas >= 3 && commas > w.length / 6) add('WARN', title, `${commas} commas in one sentence - too many pauses`, s);
    if (i > 0 && w[0] === sents[i - 1].split(' ')[0]) { if (++run === 3) add('WARN', title, `3 sentences in a row start with "${w[0]}"`, s); } else run = 1;
    // gender heuristic: feminine subject followed by a masculine verb form
    for (let j = 0; j < w.length; j++) {
      const base = w[j].replace(/[,।?!]/g, '');
      if (!FEM.includes(base)) continue;
      for (let k = j + 1; k <= Math.min(j + 4, w.length - 1); k++) {
        const x = w[k].replace(/[,।?!]/g, '');
        if (POSTP.has(x)) break;
        if (MASC_VERB.has(x)) { add('WARN', title, `gender? "${base}" is feminine but verb "${x}" is masculine`, s); break; }
      }
    }
  });
  if (frag > 2) add('WARN', title, `${frag} fragments of 3 words or fewer - the beat will sound choppy (max 2)`);
}

// script-wide: nukta consistency and overuse
const all = allText.join(' ');
const tokens = new Set(all.split(/[\s,।?!]+/).filter(Boolean));
const strip = (w) => w.replace(/([कखगजफ])़/g, '$1');
const seen = new Map();
for (const w of tokens) { const k = strip(w); if (!seen.has(k)) seen.set(k, new Set()); seen.get(k).add(w); }
for (const [, forms] of seen) if (forms.size > 1) add('ERROR', '(script)', `same word with and without nukta: ${[...forms].join(' / ')}`);
for (const [p, max] of Object.entries(OVERUSE)) {
  const n = all.split(p).length - 1;
  if (n > max) add('WARN', '(script)', `"${p}" used ${n} times (max ${max})`);
}

// ---- report ----
const errs = issues.filter((i) => i.level === 'ERROR').length, warns = issues.length - errs;
for (const i of issues) console.log(`${i.level.padEnd(5)} [${i.sec}] ${i.msg}${i.snip ? `\n        … ${i.snip}` : ''}`);
const narr = words(sections.map((s) => s.text).join(' ')).length;
console.log(`\n${file}: ${errs} errors, ${warns} warnings, ${narr} narration words`);
process.exit(errs ? 1 : 0);
