#!/usr/bin/env node
// Measure how long each narration line really is in the ElevenLabs voice file, so every shot
// matches the audio exactly.
// Usage: node tools/time-voice.mjs <slug> <short-id> [voice-file]
//   voice-file default: assets/<slug>/shorts/<short-id>/voice.(mp3|wav|m4a)
// Needs: shorts/<slug>/<short-id>.shots.json (run tools/build-shorts.mjs first). FFmpeg on PATH.
// Writes: shorts/<slug>/<short-id>.timing.json and prints a check table.
// How: finds the pauses (silencedetect) and picks, for every line break, the pause closest to where
// that break should fall by word count. Generate the voice as ONE take with one line per line, as in
// <short-id>-voice.txt, so ElevenLabs leaves a pause at every line break.
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { r, duration, exists } from './lib.mjs';

const [slug, id, voiceArg] = process.argv.slice(2);
if (!slug || !id) { console.error('Usage: node tools/time-voice.mjs <slug> <short-id> [voice-file]'); process.exit(1); }
const shotsFile = r('shorts', slug, `${id}.shots.json`);
if (!exists(shotsFile)) { console.error(`Missing ${shotsFile}. Run: node tools/build-shorts.mjs ${slug}`); process.exit(1); }
const { shots } = JSON.parse(fs.readFileSync(shotsFile, 'utf8'));
const voice = voiceArg || ['mp3', 'wav', 'm4a'].map((e) => r('assets', slug, 'shorts', id, `voice.${e}`)).find(exists);
if (!voice || !exists(voice)) { console.error(`No voice file. Put the ElevenLabs download at assets/${slug}/shorts/${id}/voice.mp3`); process.exit(1); }

const total = duration(voice);
const NOISE = process.env.SILENCE_DB || '-35dB';
const MIN = process.env.SILENCE_MIN || '0.15';
const sd = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', voice, '-af', `silencedetect=noise=${NOISE}:d=${MIN}`, '-f', 'null', '-'], { encoding: 'utf8' });
const log = sd.stderr || '';
const sil = [];
let cur = null;
for (const line of log.split('\n')) {
  const a = line.match(/silence_start: ([\d.]+)/); if (a) cur = { s: parseFloat(a[1]) };
  const b = line.match(/silence_end: ([\d.]+)/); if (b && cur) { cur.e = parseFloat(b[1]); sil.push(cur); cur = null; }
}
if (cur) sil.push({ s: cur.s, e: total });

const lead = sil.length && sil[0].s <= 0.05 ? sil[0].e : 0;
const tailStart = sil.length && sil[sil.length - 1].e >= total - 0.05 ? sil[sil.length - 1].s : total;
const inner = sil.filter((x) => x.s > lead + 0.05 && x.e < tailStart - 0.05);

// Segmentation: choose n-1 of the detected pauses as line breaks. Each line is scored on
// (1) speaking time vs its word count at the voice's own average pace (log ratio, so a fast or
// slow line costs little), (2) a bonus for cutting on a longer pause, (3) the number of pauses
// inside the line vs the "..." marks it contains.
const nLines = shots.length;
const wordsOf = shots.map((s) => Math.max(1, s.words));
const ell = shots.map((s) => (s.tts.replace(/\.\.\.\s*$/, '').match(/\.\.\./g) || []).length);
const m = inner.length;
const P = [{ s: lead, e: lead }, ...inner, { s: tailStart, e: tailStart }]; // virtual start/end pauses
const pauseSum = new Array(P.length).fill(0);
for (let k = 1; k < P.length; k++) pauseSum[k] = pauseSum[k - 1] + (P[k].e - P[k].s);
const speechTotal = (tailStart - lead) - inner.reduce((a, x) => a + (x.e - x.s), 0);
const rate = wordsOf.reduce((a, b) => a + b, 0) / Math.max(speechTotal, 0.1);
const segCost = (i, a, b) => { // line i spans from pause a (end) to pause b (start)
  const span = P[b].s - P[a].e;
  const internal = b - a - 1;
  const pausesIn = internal > 0 ? pauseSum[b - 1] - pauseSum[a] : 0;
  const speech = Math.max(span - pausesIn, 0.05);
  const r = Math.log(speech / (wordsOf[i] / rate));
  return 3 * r * r + 0.5 * Math.abs(internal - ell[i]);
};
const breakBonus = (k) => 1.5 * Math.min(P[k].e - P[k].s, 0.8);
let cuts = [], method = 'pauses (segmentation)';
if (m >= nLines - 1 && nLines > 1) {
  const INF = 1e9, last = P.length - 1;
  // best[i][k]: line i ends at pause k (k is the break after line i)
  const best = Array.from({ length: nLines }, () => new Array(P.length).fill(INF));
  const from = Array.from({ length: nLines }, () => new Array(P.length).fill(-1));
  for (let k = 1; k <= last; k++) best[0][k] = segCost(0, 0, k) - (k < last ? breakBonus(k) : 0);
  for (let i = 1; i < nLines; i++) {
    for (let k = i + 1; k <= last; k++) {
      if (i < nLines - 1 && k === last) continue;
      if (i === nLines - 1 && k !== last) continue;
      for (let a = i; a < k; a++) {
        if (best[i - 1][a] >= INF) continue;
        const c = best[i - 1][a] + segCost(i, a, k) - (k < last ? breakBonus(k) : 0);
        if (c < best[i][k]) { best[i][k] = c; from[i][k] = a; }
      }
    }
  }
  const pick = []; let k = last;
  for (let i = nLines - 1; i > 0; i--) { k = from[i][k]; pick.unshift(k); }
  cuts = pick.map((k, i) => {
    const sc = segCost(i, i === 0 ? 0 : pick[i - 1], k);
    return { t: Math.max(P[k].s, P[k].e - 0.08), pause: +(P[k].e - P[k].s).toFixed(2), score: +sc.toFixed(2) };
  });
} else {
  method = 'word-count estimate (not enough pauses found)';
  let acc = 0; const W = wordsOf.reduce((a, b) => a + b, 0);
  for (let i = 0; i < nLines - 1; i++) { acc += wordsOf[i]; cuts.push({ t: lead + (tailStart - lead) * (acc / W), pause: 0, score: null }); }
}

const bounds = [0, ...cuts.map((c) => c.t), total];
const out = shots.map((s, i) => {
  const start = +bounds[i].toFixed(3), end = +bounds[i + 1].toFixed(3);
  const dur = +(end - start).toFixed(2);
  const flags = [];
  if (dur > 8) flags.push('longer than one 8 s clip: split the line, or the edit holds the last frame');
  if (dur < 0.8) flags.push('very short: fine for a quick cut, or merge with the next line');
  if (i < cuts.length && (cuts[i].score === null || cuts[i].score > 1.2 || cuts[i].pause < 0.2)) flags.push('cut point uncertain: check by ear');
  return { n: s.n, sid: s.sid, vo: s.vo, start, end, dur, est: s.est, flags };
});
const res = { slug, id, source: voice.replace(r('') + '/', ''), total: +total.toFixed(2), method, measured: new Date().toISOString().slice(0, 10), shots: out };
fs.writeFileSync(r('shorts', slug, `${id}.timing.json`), JSON.stringify(res, null, 1) + '\n');

console.log(`${id}: voice ${res.total} s, ${shots.length} lines, ${inner.length} pauses found, pace ${rate.toFixed(2)} words/s, method: ${method}`);
const maxS = JSON.parse(fs.readFileSync(r('config/channel.json'), 'utf8')).shorts_template?.max_seconds ?? 70;
if (res.total > maxS) console.log(`  ! ${res.total} s is over the ${maxS} s limit: raise ElevenLabs speed a little or drop a story line.`);
console.log(' #  | start  | dur  | est  | line');
for (const s of out) console.log(`${String(s.n).padStart(3)} | ${s.start.toFixed(2).padStart(6)} | ${s.dur.toFixed(2).padStart(4)} | ${String(s.est).padStart(4)} | ${s.vo.slice(0, 40)}${s.flags.length ? '   <- ' + s.flags.join('; ') : ''}`);
console.log(`\nWrote shorts/${slug}/${id}.timing.json. Now run: node tools/build-shorts.mjs ${slug}  (Flow pack gets exact seconds)`);
