// Gate-1 scene audit (no pixels): every 2nd frame, every actor. Flags: face cut by the frame edge, face too big,
// card too close to the camera, actor inside a house / the hill, head pushed into the lifted hill, two cards at the
// same depth overlapping, camera inside or right against a house. Prints compact frame ranges.
import { GUARDED } from "../src/govinda/video";
import { camPath, Cam } from "../src/govinda/stage";
import { actorSVG, VILLAGE_HOUSES, HILL, CEIL, Actor } from "../src/govinda/sets";
import { houseBlocks, camAtHouse, houseCover } from "../src/govinda/framing";
const W = 1920, H = 1080, D = Math.PI / 180;
function project(c: Cam, x: number, y: number, z: number) {
  let X = x - c.x, Y = y - c.y, Z = z - c.z;
  const ya = (c.yaw ?? 0) * D, pi = (c.pitch ?? 0) * D, ro = (c.roll ?? 0) * D;
  [X, Z] = [X * Math.cos(ya) + Z * Math.sin(ya), -X * Math.sin(ya) + Z * Math.cos(ya)];          // rotateY
  [Y, Z] = [Y * Math.cos(pi) - Z * Math.sin(pi), Y * Math.sin(pi) + Z * Math.cos(pi)];           // rotateX
  [X, Y] = [X * Math.cos(ro) - Y * Math.sin(ro), X * Math.sin(ro) + Y * Math.cos(ro)];           // rotateZ
  const P = H / 2 / Math.tan(((c.fov ?? 36) / 2) * D);
  return { sx: W / 2 + (P * X) / -Z, sy: H / 2 + (P * Y) / -Z, d: -Z };
}
const pos = (a: Actor, f: number) => { let x = a.x, z = a.z; if (a.walk) { const t = Math.max(0, Math.min(1, (f - a.walk.f0) / (a.walk.f1 - a.walk.f0))); const s = t * t * t * (t * (t * 6 - 15) + 10); x += (a.walk.x1 - a.x) * s; z += (a.walk.z1 - a.z) * s; } return { x, z, y: a.y ?? 0 }; };
const inHouse = (x: number, z: number, m: number) => VILLAGE_HOUSES.some(([hx, hz, w, , rot]) => { const r = -rot * D, dx = x - hx, dz = z - hz, lx = dx * Math.cos(r) - dz * Math.sin(r), lz = dx * Math.sin(r) + dz * Math.cos(r); return Math.abs(lx) < w / 2 + m && Math.abs(lz) < 130 + m; });
const hits = new Map<string, number[]>();
const add = (k: string, f: number) => { if (!hits.has(k)) hits.set(k, []); hits.get(k)!.push(f); };
for (const seg of GUARDED as any[]) {
  for (let f = seg.from; f < seg.to; f += 2) {
    const c = camPath(seg.keys, f), c2 = camPath(seg.keys, f + 1), acts = seg.actors(f), boxes: any[] = [];
    const moving = Math.hypot(c2.x - c.x, c2.y - c.y, c2.z - c.z) > 12 || Math.abs((c2.yaw ?? 0) - (c.yaw ?? 0)) > 0.4;
    if (seg.set === "village" && camAtHouse(c)) add(`${seg.id}|camera against a house`, f);
    if (seg.set === "village") { const ds = acts.map((a: any) => Math.hypot(a.x - c.x, a.z - c.z)).filter((d: number) => d > 300); if (houseCover(c, ds.length ? Math.min(...ds) : 3000) > 0.2) add(`${seg.id}|a house wall fills the frame`, f); }
    for (const a of acts) {
      if (a.opacity !== undefined && a.opacity < 0.05) continue;
      const { box } = actorSVG(a, 0), s = a.s ?? 1, p = pos(a, f);
      const [x0, y0, x1, y1] = box.map((v) => v * s), w = x1 - x0, h = y1 - y0, flip = a.flip ? -1 : 1;
      const animal = /cow|airavata|elephant|surabhi/.test(a.kind) && a.kind !== "indraAir";
      const hb = animal ? [x0, y0, x1, y0 + h * 0.7] : [x0 + w * 0.15, y0, x1 - w * 0.15, y0 + h * 0.5];   // head (people) / body (animals)
      const pts = [[hb[0], hb[1]], [hb[2], hb[1]], [hb[0], hb[3]], [hb[2], hb[3]]].map(([u, v]) => project(c, p.x + flip * u, p.y + v, p.z));
      if (Math.hypot(c.x - p.x, c.y - (p.y - 200 * s), c.z - p.z) < 460) continue;   // faded out by nearFade
      if (pts.some((q) => q.d < 20)) { if (pts.some((q) => q.d > 20)) add(`${seg.id}|${a.id} card crosses the camera`, f); continue; }
      const xs = pts.map((q) => q.sx), ys = pts.map((q) => q.sy), bx0 = Math.min(...xs), bx1 = Math.max(...xs), by0 = Math.min(...ys), by1 = Math.max(...ys);
      const onScreen = bx1 > 0 && bx0 < W && by1 > 0 && by0 < H;
      if (!onScreen) continue;
      const vis = (Math.min(W, bx1) - Math.max(0, bx0)) * (Math.min(H, by1) - Math.max(0, by0)) / ((bx1 - bx0) * (by1 - by0));
      if (!moving && vis < 0.97 && vis > 0.03) add(`${seg.id}|${a.id} ${animal ? "body" : "face"} cut by frame edge`, f);
      if (!animal && by1 - by0 > 0.72 * H) add(`${seg.id}|${a.id} face too close`, f);
      if (pts[0].d < 160) add(`${seg.id}|${a.id} card very close to camera`, f);
      if (seg.set === "village" && inHouse(p.x, p.z, 40)) add(`${seg.id}|${a.id} inside a house`, f);
      if (false && seg.set === "village" && vis > 0.03 && houseBlocks(c, p.x, p.y + y0 * 0.75, p.z)) add(`${seg.id}|${a.id} hidden behind a house`, f);
      if (seg.set === "meadow" && (((p.x - HILL.x) / 1380) ** 2 + ((p.z - HILL.z + 600) / 750) ** 2) < 1 && (a.y ?? 0) > -300) add(`${seg.id}|${a.id} inside the hill`, f);
      if (seg.set === "storm" && Math.abs(p.z + 425) < 800 && Math.abs(p.x - 220) < 1300 && p.y + y0 < CEIL + 50 && a.kind !== "krishna" && (a.y ?? 0) > -1000) add(`${seg.id}|${a.id} head touches the lifted hill`, f);
      boxes.push({ id: a.id, x0: bx0, x1: bx1, y0: Math.min(...[[x0, y0], [x1, y1]].map(([u, v]) => project(c, p.x + flip * u, p.y + v, p.z).sy)), y1: by1, d: pts[0].d, z: p.z });
    }
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
      const A = boxes[i], B = boxes[j], ox = Math.min(A.x1, B.x1) - Math.max(A.x0, B.x0), oy = Math.min(A.y1, B.y1) - Math.max(A.y0, B.y0);
      if (ox > 0 && oy > 0 && Math.abs(A.z - B.z) < 40 && ox * oy > 0.2 * Math.min((A.x1 - A.x0) * (A.y1 - A.y0), (B.x1 - B.x0) * (B.y1 - B.y0))) add(`${seg.id}|${A.id}+${B.id} overlap at same depth`, f);
    }
  }
}
const ranges = (fs: number[]) => { const r: string[] = []; let a = fs[0], b = fs[0]; for (const f of fs.slice(1)) { if (f - b <= 4) b = f; else { r.push(a === b ? `${a}` : `${a}-${b}`); a = b = f; } } r.push(a === b ? `${a}` : `${a}-${b}`); return r; };
let n = 0;
for (const [k, fs] of hits) { n += fs.length; console.log(`${k}: ${ranges(fs).join(", ")}`); }
console.log(`TOTAL flagged samples: ${n}, issues: ${hits.size}`);
