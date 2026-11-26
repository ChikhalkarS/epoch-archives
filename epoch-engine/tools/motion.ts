// camera motion check over the whole timeline: speed per frame (ignoring cuts / segment joins), y bobbing, shot lengths
import { GUARDED } from "../src/govinda/video";
import { camPath } from "../src/govinda/stage";
let fast = 0, maxv = 0, maxAt = 0, bob = 0; const shortShots: string[] = [], fastAt: number[] = [];
for (const s of GUARDED as any[]) {
  const cuts = new Set<number>(s.cuts ?? []); let lastCut = s.from, prevDy = 0, lastFlip = -999;
  for (let f = s.from + 1; f < s.to; f++) {
    if (cuts.has(f)) { if (f - lastCut < 24) shortShots.push(`${s.id}@${lastCut}-${f}`); lastCut = f; prevDy = 0; continue; }
    const a = camPath(s.keys, f - 1), b = camPath(s.keys, f);
    const v = Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z) + 30 * (Math.abs((b.yaw ?? 0) - (a.yaw ?? 0)) + Math.abs((b.pitch ?? 0) - (a.pitch ?? 0)));
    if (v > maxv) { maxv = v; maxAt = f; }
    if (v > 30) { fast++; fastAt.push(f); }
    const dy = b.y - a.y;
    if (Math.abs(dy) > 2 && prevDy && Math.sign(dy) !== Math.sign(prevDy)) { if (f - lastFlip < 40) bob++; lastFlip = f; }
    if (Math.abs(dy) > 2) prevDy = dy;
  }
  if (s.to - lastCut < 24) shortShots.push(`${s.id}@${lastCut}-${s.to}`);
}
const r: string[] = []; let a = fastAt[0], b = fastAt[0]; for (const f of fastAt.slice(1)) { if (f - b <= 2) b = f; else { r.push(`${a}-${b}`); a = b = f; } } if (a !== undefined) r.push(`${a}-${b}`);
console.log(`max speed ${maxv.toFixed(1)} at ${maxAt}; frames > 30 u/f: ${fast} [${r.slice(0, 20).join(" ")}]; y-bobs: ${bob}; shots < 0.8 s: ${shortShots.length} ${shortShots.slice(0, 12).join(" ")}`);
console.log("cuts:", (GUARDED as any[]).reduce((n, s) => n + (s.cuts?.length ?? 0), 0));
