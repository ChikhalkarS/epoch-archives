// flag frames where no character is on screen for more than 1.5 s (empty sky / roofs)
import { GUARDED } from "../src/govinda/video";
import { camPath } from "../src/govinda/stage";
import { headBox, FW, FH } from "../src/govinda/framing";
const out: string[] = [];
for (const s of GUARDED as any[]) { let run = 0, st = 0;
  for (let f = s.from; f < s.to; f += 3) { const c = camPath(s.keys, f);
    const any = s.actors(f).some((a: any) => { const b = headBox(c, a, f); return b.dmin > 20 && b.x1 > 0 && b.x0 < FW && b.y1 > 0 && b.y0 < FH && (b.y1 - b.y0) > 0.04 * FH; });
    if (!any) { if (!run) st = f; run += 3; } else { if (run > 45) out.push(`${s.id} ${st}-${f}`); run = 0; } }
  if (run > 45) out.push(`${s.id} ${st}-${s.to}`); }
console.log("empty (no character) > 1.5 s:", out.length, out.join(" | "));
