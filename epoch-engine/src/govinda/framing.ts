// Framing guard shared by the timeline and the audit. Projects actor cards exactly like the 3D camera does and, at each
// camera key, pulls the camera straight back until no face is cut by the frame edge or too big; also slows camera moves
// that are too fast (strobing at 30 fps).
import { Cam } from "./stage";
import { actorSVG, Actor, VILLAGE_HOUSES, HILL } from "./sets";
import { lerpCam, smoother } from "./stage";
export const FW = 1920, FH = 1080;
const D = Math.PI / 180;
const rot = (c: Cam, X: number, Y: number, Z: number) => {
  const ya = (c.yaw ?? 0) * D, pi = (c.pitch ?? 0) * D, ro = (c.roll ?? 0) * D;
  [X, Z] = [X * Math.cos(ya) + Z * Math.sin(ya), -X * Math.sin(ya) + Z * Math.cos(ya)];
  [Y, Z] = [Y * Math.cos(pi) - Z * Math.sin(pi), Y * Math.sin(pi) + Z * Math.cos(pi)];
  [X, Y] = [X * Math.cos(ro) - Y * Math.sin(ro), X * Math.sin(ro) + Y * Math.cos(ro)];
  return [X, Y, Z];
};
export function project(c: Cam, x: number, y: number, z: number) {
  const [X, Y, Z] = rot(c, x - c.x, y - c.y, z - c.z), P = FH / 2 / Math.tan(((c.fov ?? 36) / 2) * D);
  return { sx: FW / 2 + (P * X) / -Z, sy: FH / 2 + (P * Y) / -Z, d: -Z };
}
/** world direction of the camera's backward axis (css coords) */
function backDir(c: Cam) {
  // inverse rotation of (0,0,1): find v with rot(c, v) = (0,0,1) by transposing numerically
  const ex = rot(c, 1, 0, 0), ey = rot(c, 0, 1, 0), ez = rot(c, 0, 0, 1);
  return [ex[2], ey[2], ez[2]];
}
export const actorPos = (a: Actor, f: number) => { let x = a.x, z = a.z; if (a.walk) { const t = Math.max(0, Math.min(1, (f - a.walk.f0) / (a.walk.f1 - a.walk.f0))); const s = t * t * t * (t * (t * 6 - 15) + 10); x += (a.walk.x1 - a.x) * s; z += (a.walk.z1 - a.z) * s; } return { x, z, y: a.y ?? 0 }; };
export const isAnimal = (a: Actor) => /cow|airavata|elephant|surabhi/.test(a.kind) && a.kind !== "indraAir";
/** screen box of an actor's head (people) or body (animals); null when behind the camera */
export function headBox(c: Cam, a: Actor, f: number) {
  const { box } = actorSVG(a, 0), s = a.s ?? 1, p = actorPos(a, f);
  const [x0, y0, x1, y1] = box.map((v) => v * s), w = x1 - x0, h = y1 - y0, flip = a.flip ? -1 : 1;
  const hb = isAnimal(a) ? [x0, y0, x1, y0 + h * 0.7] : [x0 + w * 0.15, y0, x1 - w * 0.15, y0 + h * 0.5];
  const pts = [[hb[0], hb[1]], [hb[2], hb[1]], [hb[0], hb[3]], [hb[2], hb[3]]].map(([u, v]) => project(c, p.x + flip * u, p.y + v, p.z));
  const xs = pts.map((q) => q.sx), ys = pts.map((q) => q.sy);
  return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys), dmin: Math.min(...pts.map((q) => q.d)), dmax: Math.max(...pts.map((q) => q.d)), p, y0w: y0 };
}
export const FACE_MAX = 0.72;
/** does the segment camera -> point pass through a village house (walls + roof volume)? */
export function houseBlocks(c: Cam, px: number, py: number, pz: number) {
  for (const [hx, hz, w, h, r0] of VILLAGE_HOUSES) {
    const r = -r0 * D, loc = (x: number, z: number) => { const dx = x - hx, dz = z - hz; return [dx * Math.cos(r) - dz * Math.sin(r), dx * Math.sin(r) + dz * Math.cos(r)]; };
    const [ax, az] = loc(c.x, c.z), [bx, bz] = loc(px, pz), top = -(h + 150), hw = w / 2 + 20, hd = 150;
    for (let t = 0.04; t < 0.97; t += 0.03) {
      const x = ax + (bx - ax) * t, z = az + (bz - az) * t, y = c.y + (py - c.y) * t;
      if (Math.abs(x) < hw && Math.abs(z) < hd && y > top + (Math.abs(z) / hd) * 150) return true;
    }
  }
  return false;
}
/** fraction of the frame covered by the nearest house standing in front of the subjects (a wall filling the shot) */
export function houseCover(c: Cam, subjDepth: number) {
  let worst = 0;
  for (const [hx, hz, w, h, r0] of VILLAGE_HOUSES) {
    const ir = r0 * D, pts: { sx: number; sy: number; d: number }[] = [];
    for (const lx of [-w / 2 - 20, w / 2 + 20]) for (const lz of [-150, 150]) for (const y of [0, -(h + 150)]) pts.push(project(c, hx + lx * Math.cos(ir) - lz * Math.sin(ir), y, hz + lx * Math.sin(ir) + lz * Math.cos(ir)));
    const front = pts.filter((q) => q.d > 10);
    if (!front.length || Math.min(...front.map((q) => q.d)) > subjDepth) continue;
    const anyBehind = front.length < pts.length;
    if (anyBehind) continue;   // straddles the camera plane: off to the side (camAtHouse covers the camera-in-house case)
    const x0 = anyBehind ? 0 : Math.max(0, Math.min(...front.map((q) => q.sx))), x1 = anyBehind ? FW : Math.min(FW, Math.max(...front.map((q) => q.sx)));
    const y0 = Math.max(0, Math.min(...front.map((q) => q.sy))), y1 = Math.min(FH, Math.max(...front.map((q) => q.sy)));
    if (x1 > x0 && y1 > y0) worst = Math.max(worst, ((x1 - x0) * (y1 - y0)) / (FW * FH));
  }
  return worst;
}
/** is the camera boxed in by a house (inside or within 120 units of a wall, below the ridge)? */
export const camAtHouse = (c: Cam) => inHouse(c.x, c.z, 120) && c.y > -560;   // head+shoulders box height / frame height
export function framingFaults(c: Cam, acts: Actor[], f: number, village = false) {
  let n = 0;
  if (village && camAtHouse(c)) n += 5;
  if (village) { const ds = acts.map((a) => Math.hypot(a.x - c.x, a.z - c.z)).filter((d) => d > 300); const sd = ds.length ? Math.min(...ds) : 3000; if (houseCover(c, sd) > 0.2) n += 8; }
  for (const a of acts) {
    if (a.opacity !== undefined && a.opacity < 0.05) continue;
    const b = headBox(c, a, f);
    if (b.dmin < 20) { if (b.dmax > 20) n += 2; continue; }
    if (b.x1 <= 0 || b.x0 >= FW || b.y1 <= 0 || b.y0 >= FH) continue;
    const vis = ((Math.min(FW, b.x1) - Math.max(0, b.x0)) * (Math.min(FH, b.y1) - Math.max(0, b.y0))) / ((b.x1 - b.x0) * (b.y1 - b.y0));
    if (vis < 0.97 && vis > 0.03) n++;
    if (!isAnimal(a) && b.y1 - b.y0 > FACE_MAX * FH) n++;
    if (village && vis > 0.03) { const hy = b.p.y + b.y0w * (a.s ?? 1) * 0.75; if (houseBlocks(c, b.p.x, hy, b.p.z)) n += 2; }
  }
  return n;
}
const inHouse = (x: number, z: number, m: number) => VILLAGE_HOUSES.some(([hx, hz, w, , r0]) => { const r = -r0 * D, dx = x - hx, dz = z - hz, lx = dx * Math.cos(r) - dz * Math.sin(r), lz = dx * Math.sin(r) + dz * Math.cos(r); return Math.abs(lx) < w / 2 + m && Math.abs(lz) < 130 + m; });
type K = { f: number; cam: Cam };
const dist = (a: Cam, b: Cam) => Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);
export const MAX_SPEED = 40;     // world units per frame for an in-segment move
/** retime fast moves (borrow frames from the hold before) and pull each key back until its framing is clean */
export function guardKeys(keys: K[], actors: (f: number) => Actor[], village: boolean): K[] {
  const out = keys.map((k) => ({ f: k.f, cam: { ...k.cam } }));
  for (let i = 1; i < out.length - 1; i++) {
    const a = out[i], b = out[i + 1], need = dist(a.cam, b.cam) / MAX_SPEED, have = b.f - a.f;
    if (need > have) { const prev = out[i - 1], earliest = prev.f + Math.ceil((a.f - prev.f) * 0.45); a.f = Math.max(earliest, Math.round(b.f - need)); }
  }
  for (const k of out) {
    const f = k.f, acts = actors(f), bd = backDir(k.cam);
    let best = 0, bestN = framingFaults(k.cam, acts, f);
    if (bestN === 0) continue;
    for (let b = 40; b <= 2400 && bestN > 0; b += 40) {
      const c = { ...k.cam, x: k.cam.x + bd[0] * b, y: k.cam.y + bd[1] * b, z: k.cam.z + bd[2] * b };
      if (village && inHouse(c.x, c.z, 80) && c.y > -500) continue;
      const n = framingFaults(c, acts, f);
      if (n < bestN) { bestN = n; best = b; }
    }
    k.cam = { ...k.cam, x: k.cam.x + bd[0] * best, y: k.cam.y + bd[1] * best, z: k.cam.z + bd[2] * best };
  }
  return out;
}

/** keep actors out of solid things: push anyone standing in a house footprint out of its front door side, anyone inside
 *  the meadow hill out to its foot, and separate two cards standing at the same depth that overlap */
export const HILL3 = { x: HILL.x, z: HILL.z - 600, rx: 1350, rz: 700 };
export function fixActors(list: Actor[], set: string, f: number): Actor[] {
  const out = list.map((a) => {
    const p = actorPos(a, f);
    let x = p.x, z = p.z, moved = false;
    if (set === "village") for (const [hx, hz, w, , r0] of VILLAGE_HOUSES) {
      const r = -r0 * D, dx = x - hx, dz = z - hz, lx = dx * Math.cos(r) - dz * Math.sin(r), lz = dx * Math.sin(r) + dz * Math.cos(r);
      if (Math.abs(lx) < w / 2 + 70 && Math.abs(lz) < 130 + 70) {
        const nlz = 130 + 90, ir = r0 * D;   // out of the front (+z) wall
        x = hx + lx * Math.cos(ir) - nlz * Math.sin(ir); z = hz + lx * Math.sin(ir) + nlz * Math.cos(ir); moved = true;
      }
    }
    if (set === "meadow" && (a.y ?? 0) > -300) {
      const e = ((x - HILL3.x) / (HILL3.rx + 80)) ** 2 + ((z - HILL3.z) / (HILL3.rz + 80)) ** 2;
      if (e < 1) { z = HILL3.z + (HILL3.rz + 90) * Math.sqrt(Math.max(0, 1 - ((x - HILL3.x) / (HILL3.rx + 80)) ** 2)) + 10; moved = true; }
    }
    return moved ? { ...a, x, z, walk: undefined } : a;
  });
  for (let i = 0; i < out.length; i++) for (let j = i + 1; j < out.length; j++) {
    const A = out[i], B = out[j], pa = actorPos(A, f), pb = actorPos(B, f);
    if ((A.y ?? 0) !== (B.y ?? 0)) continue;
    const wa = (actorSVG(A, 0).box[2] - actorSVG(A, 0).box[0]) * (A.s ?? 1), wb = (actorSVG(B, 0).box[2] - actorSVG(B, 0).box[0]) * (B.s ?? 1);
    if (Math.abs(pa.z - pb.z) < 45 && Math.abs(pa.x - pb.x) < (wa + wb) * 0.4 && !B.walk) out[j] = { ...B, z: B.z + 60 };
  }
  return out;
}
/** a move whose straight path flies through characters gets a crane arc over their heads */
export function arcMoves(keys: K[], actors: (f: number) => Actor[]): K[] {
  const out: K[] = [keys[0]];
  for (let i = 1; i < keys.length; i++) {
    const a = keys[i - 1], b = keys[i];
    if (b.f - a.f >= 6) {
      let bad = false;
      for (let t = 0.1; t < 0.95 && !bad; t += 0.1) {
        const f = Math.round(a.f + (b.f - a.f) * t), c = lerpCam(a.cam, b.cam, smoother(t));
        for (const act of actors(f)) { const hb = headBox(c, act, f); if (hb.dmin < 330 && hb.x1 > -200 && hb.x0 < FW + 200 && hb.y1 > -200 && hb.y0 < FH + 200) { bad = true; break; } }
      }
      if (bad) { const mid = lerpCam(a.cam, b.cam, 0.5); out.push({ f: Math.round((a.f + b.f) / 2), cam: { ...mid, y: Math.min(mid.y, -900), pitch: (mid.pitch ?? 0) + 14 } }); }
    }
    out.push(b);
  }
  return out;
}

// ---------------------------------------------------------------- v3 camera: shots + gentle glides + clean cuts
export const GLIDE_MAX_DIST = 650, GLIDE_SPEED = 22, HOLD_DIST = 260;
/** frames a smootherstep glide needs so its PEAK speed stays under ~28 units/frame (1 deg counts as 40 units) */
const glideNeed = (a: Cam, b: Cam) => (1.875 * (dist(a, b) + 40 * angDiff(a, b))) / 28;
const angDiff = (a: Cam, b: Cam) => Math.abs((a.yaw ?? 0) - (b.yaw ?? 0)) + Math.abs((a.pitch ?? 0) - (b.pitch ?? 0));
const backBy = (c: Cam, bd: number[], b: number): Cam => ({ ...c, x: c.x + bd[0] * b, y: c.y + bd[1] * b, z: c.z + bd[2] * b });
/** pull-back needed so a shot (camera a -> b over f0..f1) has no cut or oversized faces; one value for the whole shot */
function shotPullback(a: Cam, b: Cam, f0: number, f1: number, actors: (f: number) => Actor[], village: boolean) {
  const bd = backDir(a), samples = [0, 0.33, 0.66, 1].map((t) => Math.round(f0 + (f1 - f0) * t));
  const off = (c: Cam, o: number[]) => ({ ...c, x: c.x + bd[0] * o[0] + o[1], y: c.y + bd[1] * o[0] + o[2], z: c.z + bd[2] * o[0] });
  // the shot's subjects: actors at least half visible in the original framing must stay fully in frame
  const visOf = (c: Cam, act: Actor, f: number) => { const hb = headBox(c, act, f); if (hb.dmin < 20) return 0; const w = hb.x1 - hb.x0, h = hb.y1 - hb.y0; return Math.max(0, Math.min(FW, hb.x1) - Math.max(0, hb.x0)) * Math.max(0, Math.min(FH, hb.y1) - Math.max(0, hb.y0)) / Math.max(1, w * h); };
  const subj = samples.map((f) => { const t = (f - f0) / Math.max(1, f1 - f0), c = lerpCam(a, b, smoother(t)); return actors(f).filter((act) => visOf(c, act, f) >= 0.5).map((act) => act.id); });
  const faults = (o: number[]) => samples.reduce((n, f, i) => {
    const t = (f - f0) / Math.max(1, f1 - f0), c = off(lerpCam(a, b, smoother(t)), o), acts = actors(f);
    let m = framingFaults(c, acts, f, village);
    for (const act of acts) if (subj[i].includes(act.id) && visOf(c, act, f) < 0.97) m += 3;
    return n + m;
  }, 0);
  let best = [0, 0, 0], bestN = faults(best);
  const cands: number[][] = [];
  for (let pb = 0; pb <= 2000; pb += 40) for (const lx of [0]) for (const up of [0]) cands.push([pb, lx, up]);
  cands.sort((p, q) => (p[0] + Math.abs(p[1]) * 1.5 + Math.abs(p[2]) * 1.5) - (q[0] + Math.abs(q[1]) * 1.5 + Math.abs(q[2]) * 1.5));
  for (const o of cands) { if (bestN === 0) break; const n = faults(o); if (n < bestN) { bestN = n; best = o; } }
  return { bd, o: best };
}
/** rebuild a segment's camera from its ORIGINAL keys: holds stay (with their creep), small moves become slow glides,
 *  big jumps become clean cuts; each shot gets one constant framing pull-back */
export function shotKeys(keys: K[], actors: (f: number) => Actor[], village: boolean, segFrom: number, segTo: number): { keys: K[]; cuts: number[] } {
  // 1. shots = runs of keys connected by small moves
  type Shot = { ks: K[] };
  const shots: Shot[] = [{ ks: [keys[0]] }], jumps: number[] = [];
  for (let i = 1; i < keys.length; i++) {
    const a = keys[i - 1], b = keys[i], d = dist(a.cam, b.cam), dur = b.f - a.f;
    const room = dur + 0.5 * (i > 1 ? a.f - keys[i - 2].f : 0) + 0.5 * (i < keys.length - 1 ? keys[i + 1].f - b.f : 0);
    const small = d < HOLD_DIST && angDiff(a.cam, b.cam) < 8 && glideNeed(a.cam, b.cam) <= room;
    const glide = d < GLIDE_MAX_DIST && angDiff(a.cam, b.cam) < 14 && glideNeed(a.cam, b.cam) <= room;
    if (small || glide) shots[shots.length - 1].ks.push(b);
    else { shots.push({ ks: [b] }); jumps.push(Math.round((a.f + b.f) / 2)); }   // cut in the middle of the old move
  }
  for (let j = 0; j < jumps.length; j++) {
    const start = j === 0 ? segFrom : jumps[j - 1];
    if (jumps[j] - start < 20 && j + 1 < shots.length) { shots.splice(j, 1); jumps.splice(j, 1); j--; }
  }
  // 2. lay the shots out on the timeline: shot j runs from its cut-in to the next cut
  const out: K[] = [], cuts: number[] = [];
  shots.forEach((sh, j) => {
    const start = j === 0 ? segFrom : jumps[j - 1], end = j < shots.length - 1 ? jumps[j] - 1 : segTo;
    let ks = sh.ks.map((k) => ({ f: Math.min(end, Math.max(start, k.f)), cam: { ...k.cam } }));
    // glides inside a shot: slow enough (borrow time from neighbouring holds)
    for (let i = 1; i < ks.length; i++) { const need = glideNeed(ks[i - 1].cam, ks[i].cam); if (ks[i].f - ks[i - 1].f < need) { const mid = (ks[i - 1].f + ks[i].f) / 2; ks[i - 1].f = Math.max(i > 1 ? ks[i - 2].f + 4 : start, Math.round(mid - need / 2)); ks[i].f = Math.min(i < ks.length - 1 ? ks[i + 1].f - 4 : end, Math.round(mid + need / 2)); } }
    ks = ks.filter((k, i) => i === 0 || k.f > ks[i - 1].f);
    // a shot that is a single key: give it a gentle push-in so it never freezes
    const first = ks[0], last = ks[ks.length - 1];
    const a = { f: start, cam: first.cam }, z = ks.length > 1 ? { f: end, cam: last.cam } : { f: end, cam: { ...first.cam, z: first.cam.z - Math.min(120, (end - start) * 0.9) } };
    const full = [a, ...ks.slice(ks.length > 1 ? 0 : 1), z].filter((k, i, arr) => i === 0 || k.f > arr[i - 1].f);
    // holds inside the shot (keys joined by small moves) share one pull-back, computed on that hold's own frames
    let g0 = 0;
    for (let i = 1; i <= full.length; i++) {
      if (i < full.length && dist(full[i - 1].cam, full[i].cam) < HOLD_DIST && angDiff(full[i - 1].cam, full[i].cam) < 8) continue;
      const grp = full.slice(g0, i), A = grp[0], Z = grp[grp.length - 1];
      const { bd, o } = shotPullback(A.cam, Z.cam, A.f, Math.max(A.f + 1, Z.f), actors, village);
      for (const k of grp) out.push({ f: k.f, cam: { ...k.cam, x: k.cam.x + bd[0] * o[0] + o[1], y: k.cam.y + bd[1] * o[0] + o[2], z: k.cam.z + bd[2] * o[0] } });
      g0 = i;
    }
    if (j > 0) cuts.push(start);
  });
  // a glide that became too fast after the pull-backs turns into a clean cut at its middle
  const fixed: K[] = [out[0]];
  for (let i = 1; i < out.length; i++) {
    const a = fixed[fixed.length - 1], b = out[i];
    if (!cuts.includes(b.f) && b.f - a.f > 2 && glideNeed(a.cam, b.cam) > b.f - a.f) {
      const m = Math.round((a.f + b.f) / 2);
      fixed.push({ f: m - 1, cam: a.cam }, { f: m, cam: b.cam }); cuts.push(m);
      fixed.push({ f: b.f, cam: { ...b.cam } });
    } else fixed.push(b);
  }
  let ks2 = fixed.filter((k, i, arr) => i === 0 || k.f > arr[i - 1].f), cs = cuts.sort((x, y) => x - y);
  // no shot shorter than 12 frames at the start or end of a segment
  while (cs.length && cs[0] - segFrom < 12) { const c = cs.shift()!; ks2 = ks2.filter((k) => k.f >= c); ks2[0] = { ...ks2[0], f: segFrom }; }
  while (cs.length && segTo - cs[cs.length - 1] < 12) { const c = cs.pop()!; ks2 = ks2.filter((k) => k.f < c); ks2.push({ f: segTo, cam: ks2[ks2.length - 1].cam }); }
  return { keys: ks2, cuts: cs };
}
