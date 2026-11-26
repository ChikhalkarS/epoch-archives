// SVG painters for the sets. Every painter returns an SVG string drawn around a local origin; the caller passes the
// matching bounds box to <Card>. Plum ink outlines like the characters, soft painted gradients, no text.
import { rnd } from "./stage";

export const INK = "#2b1a2e";
const ink = (w = 4, op = 1) => `stroke="${INK}" stroke-width="${w}" stroke-opacity="${op}" stroke-linejoin="round" stroke-linecap="round"`;

// ---------------------------------------------------------------- clouds
/** a puffy cloud cluster centred at (0,0), width ~w. tone: "storm" | "day" | "gold" */
export function cloud(w: number, seed: number, tone: "storm" | "day" | "gold" = "storm"): string {
  const [base, top, under, line] = tone === "storm" ? ["#3b3e5e", "#56597d", "#2a2c48", 0.45] : tone === "gold" ? ["#ffd9a0", "#fff1d2", "#f0a86a", 0.25] : ["#f4f8ff", "#ffffff", "#c9d8f0", 0.3];
  const n = 7 + Math.floor(rnd(seed) * 4);
  const puffs = Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1), x = (t - 0.5) * w * 0.8, r = w * (0.12 + 0.08 * rnd(seed + i * 3.1)) * (1 - 0.5 * Math.abs(t - 0.5));
    return { x, y: -r * (0.5 + 0.5 * rnd(seed + i * 7.7)), r };
  });
  const flat = `M ${-w * 0.46} 0 L ${w * 0.46} 0`;
  let s = `<g>`;
  s += puffs.map((p) => `<circle cx="${p.x}" cy="${p.y}" r="${p.r}" fill="${base}" ${ink(5, line as number)}/>`).join("");
  s += `<rect x="${-w * 0.47}" y="-2" width="${w * 0.94}" height="${w * 0.07}" rx="${w * 0.035}" fill="${under}" ${ink(5, line as number)}/>`;
  s += puffs.map((p) => `<circle cx="${p.x}" cy="${p.y}" r="${p.r - 3}" fill="${base}"/>`).join("");
  s += puffs.map((p) => `<circle cx="${p.x - p.r * 0.25}" cy="${p.y - p.r * 0.3}" r="${p.r * 0.55}" fill="${top}" opacity="0.55"/>`).join("");
  s += `<rect x="${-w * 0.46}" y="0" width="${w * 0.92}" height="${w * 0.05}" fill="${under}"/>` + `<path d="${flat}" stroke="${under}" stroke-width="4"/>`;
  return s + `</g>`;
}
export const cloudBox = (w: number): [number, number, number, number] => [-w * 0.6, -w * 0.45, w * 0.6, w * 0.12];

// ---------------------------------------------------------------- far hills / horizon
export function farHills(w: number, h: number, col: string, seed: number, edge = "#00000000"): string {
  let d = `M ${-w / 2} 0`;
  for (let i = 0; i <= 24; i++) { const x = -w / 2 + (i / 24) * w, y = -h * (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(i * 0.9 + seed) * rnd(seed + i))); d += ` Q ${x - w / 48} ${y - h * 0.1} ${x} ${y}`; }
  d += ` L ${w / 2} ${h * 0.4} L ${-w / 2} ${h * 0.4} Z`;
  return `<path d="${d}" fill="${col}" stroke="${edge}" stroke-width="4"/>`;
}

// ---------------------------------------------------------------- ground textures (viewBox 0 0 400 400, stretched)
export const groundStorm = `<rect width="400" height="400" fill="#3f5a3c"/>` +
  Array.from({ length: 70 }, (_, i) => `<ellipse cx="${(i * 97) % 400}" cy="${(i * 53) % 400}" rx="${5 + (i % 6)}" ry="${2 + (i % 3)}" fill="#35503a"/>`).join("") +
  Array.from({ length: 14 }, (_, i) => `<ellipse cx="${(i * 131) % 400}" cy="${(i * 71 + 20) % 400}" rx="${14 + (i % 4) * 6}" ry="${5 + (i % 3) * 2}" fill="#5f7896" opacity="0.8"/><ellipse cx="${(i * 131) % 400 - 4}" cy="${(i * 71 + 20) % 400 - 1}" rx="${6 + (i % 4) * 2}" ry="1.5" fill="#a9bcd6" opacity="0.7"/>`).join("") +
  `<path d="M 160 0 C 200 120 150 240 210 400 L 260 400 C 200 240 250 120 220 0 Z" fill="#5a4a38" opacity="0.85"/>`;
export const groundDay = `<rect width="400" height="400" fill="#8fc456"/>` +
  Array.from({ length: 90 }, (_, i) => `<ellipse cx="${(i * 97) % 400}" cy="${(i * 53) % 400}" rx="${5 + (i % 6)}" ry="${2 + (i % 3)}" fill="#7db24a"/>`).join("") +
  Array.from({ length: 30 }, (_, i) => `<ellipse cx="${(i * 61) % 400}" cy="${(i * 113) % 400}" rx="3" ry="2" fill="${["#ffe066", "#ff8fb6", "#ffffff"][i % 3]}"/>`).join("") +
  `<path d="M 150 0 C 190 120 140 260 175 400 L 255 400 C 225 260 270 120 230 0 Z" fill="#dcb77c"/>` +
  Array.from({ length: 30 }, (_, i) => `<ellipse cx="${180 + ((i * 37) % 50)}" cy="${(i * 29) % 400}" rx="4" ry="1.6" fill="#c49c63"/>`).join("");
/** the underside of the lifted Govardhan: dark earth, cracks, embedded stones, hanging roots (viewBox 0 0 400 400) */
export const hillUnderside = `<defs><radialGradient id="hu" cx="0.5" cy="0.5" r="0.7"><stop offset="0" stop-color="#4f3b2b"/><stop offset="1" stop-color="#36281d"/></radialGradient></defs><rect width="400" height="400" fill="url(#hu)"/>` +
  Array.from({ length: 26 }, (_, i) => `<path d="M ${(i * 89) % 400} ${(i * 67) % 400} l ${10 + (i % 5) * 6} ${4 + (i % 3) * 5} l ${6 + (i % 4) * 4} ${-6 + (i % 2) * 10}" stroke="#251a12" stroke-width="2" fill="none"/>`).join("") +
  Array.from({ length: 22 }, (_, i) => `<ellipse cx="${(i * 113 + 30) % 400}" cy="${(i * 71 + 15) % 400}" rx="${5 + (i % 4) * 3}" ry="${4 + (i % 3) * 2}" fill="${["#6d5844", "#5b4836", "#7c6650"][i % 3]}" stroke="#2b1a2e" stroke-width="1" stroke-opacity="0.6"/>`).join("") +
  Array.from({ length: 14 }, (_, i) => `<path d="M ${(i * 53) % 400} ${(i * 37) % 400} q 6 10 1 22 q -4 8 2 16" fill="none" stroke="#2a1d13" stroke-width="2"/>`).join("");

// ---------------------------------------------------------------- Govardhan: front face of the lifted hill
/** front face, local origin at the centre of the lower rim (y = 0 is the rim, the mountain rises to -h). w wide.
 *  Layered ridges (far ridge lighter/cooler), angular lit rock faces, trees with trunks, bushes, a stream, and the
 *  dark earthen lip with hanging roots and stones along the rim. */
export function hillFront(w: number, h: number, seed = 3): string {
  const X = (t: number) => (t - 0.5) * w;
  const crest = (t: number) => -h * (0.32 + 0.68 * Math.pow(Math.sin(Math.PI * Math.min(1, Math.max(0, t * 1.04 - 0.02))), 0.75)) - 22 * Math.sin(t * 23 + seed) - 14 * Math.sin(t * 41);
  const ridge = (k: number, lift: number) => { let d = `M ${-w / 2} 0`; for (let i = 0; i <= 40; i++) { const t = i / 40; d += ` L ${X(t)} ${crest(t) * k + lift * Math.sin(t * 9 + k * 7)}`; } return d + ` L ${w / 2} 0 Z`; };
  let s = `<defs><linearGradient id="hfa${seed}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fa86a"/><stop offset="1" stop-color="#3d6a3f"/></linearGradient>
    <linearGradient id="hfb${seed}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a9a4c"/><stop offset="0.7" stop-color="#3f7a39"/><stop offset="1" stop-color="#2d5530"/></linearGradient>
    <linearGradient id="hfc${seed}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4c8a42"/><stop offset="1" stop-color="#2a4c2c"/></linearGradient></defs>`;
  s += `<path d="${ridge(1, 0)}" fill="url(#hfa${seed})" ${ink(6)}/>`;               // back ridge (full silhouette)
  s += `<path d="${ridge(0.72, 30)}" fill="url(#hfb${seed})" ${ink(4, 0.8)}/>`;     // middle ridge
  s += `<path d="${ridge(0.42, 24)}" fill="url(#hfc${seed})" ${ink(4, 0.8)}/>`;     // front ridge
  // angular rock outcrops: lit top face + shaded side
  for (let i = 0; i < 14; i++) {
    const t = 0.08 + 0.84 * rnd(seed + i * 3.7), x = X(t), y = crest(t) * (0.35 + 0.5 * rnd(seed + i * 5.3)), r = 34 + 40 * rnd(seed + i * 8.1);
    s += `<path d="M ${x - r} ${y + r * 0.5} L ${x - r * 0.6} ${y - r * 0.4} L ${x + r * 0.2} ${y - r * 0.7} L ${x + r} ${y - r * 0.1} L ${x + r * 0.8} ${y + r * 0.5} Z" fill="#7d7468" ${ink(3)}/>`;
    s += `<path d="M ${x - r * 0.6} ${y - r * 0.4} L ${x + r * 0.2} ${y - r * 0.7} L ${x + r} ${y - r * 0.1} L ${x + r * 0.1} ${y} Z" fill="#b6ab98"/>`;
  }
  // a stream down the slope (Govardhan's springs)
  const sx = X(0.63);
  s += `<path d="M ${sx} ${crest(0.63) * 0.7} Q ${sx - 30} ${crest(0.63) * 0.45} ${sx + 10} ${crest(0.63) * 0.25} Q ${sx + 40} ${crest(0.63) * 0.1} ${sx + 20} -10" stroke="#8fd0f0" stroke-width="16" fill="none" ${""} stroke-linecap="round"/><path d="M ${sx} ${crest(0.63) * 0.7} Q ${sx - 30} ${crest(0.63) * 0.45} ${sx + 10} ${crest(0.63) * 0.25} Q ${sx + 40} ${crest(0.63) * 0.1} ${sx + 20} -10" stroke="#e6f6ff" stroke-width="5" fill="none" stroke-dasharray="16 22"/>`;
  // trees: trunk + clustered canopy with a highlight, denser near the crest
  for (let i = 0; i < 46; i++) {
    const t = 0.04 + 0.92 * rnd(seed + i * 9.3), x = X(t), y = crest(t) * (0.25 + 0.72 * Math.sqrt(rnd(seed + i * 4.7))) + 20, r = 22 + 20 * rnd(seed + i * 6.1);
    const g = ["#2f7a3a", "#3f8a3e", "#4a9a44", "#2a6a36"][i % 4];
    s += `<path d="M ${x - 4} ${y + r * 1.1} L ${x - 3} ${y} L ${x + 3} ${y} L ${x + 4} ${y + r * 1.1} Z" fill="#6b4226" ${ink(2.5)}/>`;
    s += `<circle cx="${x - r * 0.5}" cy="${y}" r="${r * 0.7}" fill="${g}" ${ink(3)}/><circle cx="${x + r * 0.5}" cy="${y}" r="${r * 0.7}" fill="${g}" ${ink(3)}/><circle cx="${x}" cy="${y - r * 0.45}" r="${r * 0.8}" fill="${g}" ${ink(3)}/>`;
    s += `<circle cx="${x - r * 0.2}" cy="${y - r * 0.65}" r="${r * 0.35}" fill="#8fd17a" opacity="0.45"/>`;
  }
  for (let i = 0; i < 30; i++) { const t = rnd(seed + i * 2.9), x = X(t), y = -30 - 140 * rnd(seed + i * 3.1); s += `<ellipse cx="${x}" cy="${y}" rx="${18 + 12 * rnd(i)}" ry="11" fill="#376b36" ${ink(2, 0.7)}/>`; }
  // earthen lip along the rim: soil band, hanging roots and stones
  let lip = `M ${-w / 2} -26`;
  for (let i = 0; i <= 40; i++) lip += ` L ${X(i / 40)} ${-30 + 8 * Math.sin(i * 1.7)}`;
  lip += ` L ${w / 2} 0`;
  for (let i = 40; i >= 0; i--) lip += ` L ${X(i / 40)} ${16 + 22 * rnd(seed + i * 1.7)}`;
  s += `<path d="${lip} Z" fill="#5a4330" ${ink(5)}/>`;
  for (let i = 0; i < 22; i++) { const x = X(rnd(seed + i * 6.7)); s += `<path d="M ${x} 18 q ${-6 + 12 * rnd(i)} 24 ${-2 + 4 * rnd(i * 2)} ${36 + 30 * rnd(i * 3)}" stroke="#3b2a1c" stroke-width="3" fill="none"/>`; }
  for (let i = 0; i < 12; i++) { const x = X(rnd(seed + i * 4.1)); s += `<ellipse cx="${x}" cy="${26 + 10 * rnd(i)}" rx="${10 + 8 * rnd(i * 5)}" ry="8" fill="#7a6650" ${ink(2)}/>`; }
  return s;
}
/** the rocky root that hangs from the underside down to Krishna's fingertip: a tapering stalactite of earth and rock
 *  in the underside's colours. origin = the tip, rises to -len, widest (wTop) where it meets the underside */
export function hillRoot(len: number, wTop = 150): string {
  const L = -len;
  const d = `M 0 0 Q -9 ${L * 0.18} ${-wTop * 0.16} ${L * 0.42} Q ${-wTop * 0.3} ${L * 0.62} ${-wTop * 0.36} ${L * 0.78} Q ${-wTop * 0.5} ${L * 0.9} ${-wTop * 0.62} ${L} L ${wTop * 0.4} ${L} Q ${wTop * 0.24} ${L * 0.86} ${wTop * 0.18} ${L * 0.7} Q ${wTop * 0.12} ${L * 0.45} ${wTop * 0.05} ${L * 0.25} Q 6 ${L * 0.08} 0 0 Z`;
  let s = `<path d="${d}" fill="#4f3b2b" ${ink(4)}/>`;
  s += `<path d="M -3 ${L * 0.12} Q ${-wTop * 0.12} ${L * 0.45} ${-wTop * 0.4} ${L * 0.95}" stroke="#6f5842" stroke-width="6" fill="none"/>`;
  for (const [x, y, r] of [[-0.12, 0.5, 8], [0.06, 0.66, 7], [-0.3, 0.86, 10], [0.18, 0.88, 8]]) s += `<ellipse cx="${x * wTop}" cy="${y * L}" rx="${r}" ry="${r * 0.7}" fill="#6d5844" ${ink(1.5)}/>`;
  s += `<path d="M ${wTop * 0.1} ${L * 0.92} q 3 14 -2 24 M ${-wTop * 0.45} ${L * 0.97} q -4 12 1 20" stroke="#2a1d13" stroke-width="2.5" fill="none"/>`;
  return s;
}

// ---------------------------------------------------------------- props
/** clay diya lamp with flame and a warm glow (origin = base) */
export const diya = (glow = 1) => `<ellipse cx="0" cy="-30" rx="${70 * glow}" ry="${60 * glow}" fill="url(#halo)" opacity="0.8"/>` +
  `<path d="M -16 -6 Q 0 6 16 -6 L 12 -12 Q 0 -6 -12 -12 Z" fill="#b5562d" ${ink(2.5)}/><path d="M 0 -12 Q -6 -22 0 -32 Q 6 -22 0 -12 Z" fill="#ffd25a" ${ink(1.5)}/><path d="M 0 -15 Q -2 -20 0 -26 Q 2 -20 0 -15 Z" fill="#fff6d0"/>`;
export const diyaBox: [number, number, number, number] = [-80, -100, 80, 20];

/** round kadamba tree (origin = trunk base) */
export function tree(scale = 1, seed = 1, tone: "day" | "storm" = "day"): string {
  const greens = tone === "day" ? ["#3f8a3e", "#4f9b46", "#5fae4f"] : ["#2c4a34", "#345a3c", "#3d6545"], hi = tone === "day" ? "#8fd17a" : "#58806a";
  let s = `<path d="M -12 0 Q -8 -90 -10 -170 L 10 -170 Q 8 -90 12 0 Z" fill="#7a4b2a" ${ink(4)}/>`;
  const blobs = [[-70, -190, 70], [60, -200, 66], [0, -270, 84], [-40, -240, 62], [50, -150, 52], [-60, -140, 46]];
  blobs.forEach(([x, y, r], i) => { s += `<circle cx="${x * scale}" cy="${y}" r="${r * (0.9 + 0.2 * rnd(seed + i))}" fill="${greens[i % 3]}" ${ink(4)}/>`; });
  blobs.forEach(([x, y, r], i) => { s += `<circle cx="${x * scale - r * 0.3}" cy="${y - r * 0.3}" r="${r * 0.42}" fill="${hi}" opacity="0.45"/>`; });
  if (tone === "day") for (let i = 0; i < 10; i++) s += `<circle cx="${(rnd(seed + i * 3) - 0.5) * 180}" cy="${-150 - rnd(seed + i * 5) * 160}" r="5" fill="#ffcf3a" ${ink(1.5)}/>`;   // kadamba flowers
  return s;
}
export const treeBox: [number, number, number, number] = [-170, -370, 170, 10];

/** palm-leaf manuscript (pothi) glowing, origin = centre */
export const pothi = `<ellipse cx="0" cy="0" rx="330" ry="170" fill="url(#halo)" opacity="0.9"/>` +
  Array.from({ length: 4 }, (_, i) => `<rect x="-230" y="${-36 + i * 6}" width="460" height="56" rx="12" fill="${["#e9c98a", "#e2bf7c", "#f0d49a", "#dcb46c"][i]}" ${ink(3)} transform="rotate(${-4 + i * 1.5})"/>`).join("") +
  Array.from({ length: 5 }, (_, i) => `<path d="M ${-190 + i * 20} ${-6 + i * 6} L ${190 - i * 30} ${-6 + i * 6}" stroke="#8a6a3a" stroke-width="3" stroke-dasharray="${18 + i * 3} 10" opacity="0.55"/>`).join("") +
  `<circle cx="-170" cy="6" r="6" fill="#5a3a1a"/><circle cx="170" cy="6" r="6" fill="#5a3a1a"/><path d="M -170 6 Q -200 60 -150 90" stroke="#c0392b" stroke-width="4" fill="none"/>`;

// ---------------------------------------------------------------- house textures (face SVGs, viewBox = W x H)
export const wallTex = (w: number, h: number, col: string, shade: number, door: boolean, seed = 1) => {
  const mul = (c: string, k: number) => { const n = parseInt(c.slice(1), 16); const ch = (v: number) => Math.round(Math.min(255, v * k)).toString(16).padStart(2, "0"); return `#${ch((n >> 16) & 255)}${ch((n >> 8) & 255)}${ch(n & 255)}`; };
  const c = mul(col, shade), dark = mul(col, shade * 0.86);
  let s = `<rect width="${w}" height="${h}" fill="${c}"/>`;
  for (let i = 0; i < 16; i++) s += `<ellipse cx="${rnd(seed + i) * w}" cy="${rnd(seed + i * 2.2) * h * 0.8}" rx="${14 + rnd(seed + i * 3.3) * 24}" ry="${6 + rnd(seed + i * 4.4) * 10}" fill="${dark}" opacity="0.5"/>`;
  s += `<rect x="0" y="${h - 34}" width="${w}" height="34" fill="${mul("#b07a4a", shade)}"/><path d="M 0 ${h - 34} L ${w} ${h - 34}" stroke="${INK}" stroke-width="4"/>`;
  // simple wall art: a band of white dots (mandana) under the eaves
  for (let i = 0; i < Math.floor(w / 26); i++) s += `<circle cx="${13 + i * 26}" cy="22" r="5" fill="${mul("#fff6e6", shade)}"/>`;
  if (door) s += `<path d="M ${w / 2 - 40} ${h} L ${w / 2 - 40} ${h - 130} Q ${w / 2} ${h - 176} ${w / 2 + 40} ${h - 130} L ${w / 2 + 40} ${h} Z" fill="${mul("#7a4a28", shade)}" ${ink(5)}/>` +
    `<path d="M ${w / 2} ${h} L ${w / 2} ${h - 150}" stroke="${INK}" stroke-width="3"/><path d="M ${w / 2 - 52} ${h - 150} Q ${w / 2} ${h - 196} ${w / 2 + 52} ${h - 150}" stroke="${mul("#e24a3a", shade)}" stroke-width="7" fill="none"/>`;
  else s += `<rect x="${w / 2 - 34}" y="${h * 0.32}" width="68" height="56" fill="${mul("#3a2a22", shade)}" ${ink(4)}/><path d="M ${w / 2 - 34} ${h * 0.32 + 28} L ${w / 2 + 34} ${h * 0.32 + 28} M ${w / 2} ${h * 0.32} L ${w / 2} ${h * 0.32 + 56}" stroke="${mul("#a0703a", shade)}" stroke-width="5"/>`;
  return s + `<rect width="${w}" height="${h}" fill="none" stroke="${INK}" stroke-width="7"/>`;
};
export const thatchTex = (w: number, h: number, shade = 1) => {
  const k = (c: string) => { const n = parseInt(c.slice(1), 16); const ch = (v: number) => Math.round(Math.min(255, v * shade)).toString(16).padStart(2, "0"); return `#${ch((n >> 16) & 255)}${ch((n >> 8) & 255)}${ch(n & 255)}`; };
  let s = `<rect width="${w}" height="${h}" fill="${k("#d2a45a")}"/>`;
  for (let i = 0; i < 18; i++) s += `<path d="M 0 ${(i * h) / 18} Q ${w / 2} ${(i * h) / 18 + 7} ${w} ${(i * h) / 18}" stroke="${k("#a8783a")}" stroke-width="3" fill="none"/>`;
  for (let i = 0; i < 60; i++) s += `<path d="M ${rnd(i) * w} ${rnd(i * 2.7) * h} l 2 14" stroke="${k("#e8c27a")}" stroke-width="2"/>`;
  s += `<path d="M 0 ${h - 4} ${Array.from({ length: Math.floor(w / 14) }, (_, i) => `L ${i * 14 + 7} ${h + 6} L ${i * 14 + 14} ${h - 4}`).join(" ")}" fill="${k("#b8863e")}"/>`;
  return s + `<rect width="${w}" height="${h}" fill="none" stroke="${INK}" stroke-width="7"/>`;
};
export const gableTex = (w: number, h: number, col: string, shade: number) => {
  const n = parseInt(col.slice(1), 16), ch = (v: number) => Math.round(Math.min(255, v * shade)).toString(16).padStart(2, "0");
  return `<path d="M 0 ${h} L ${w / 2} 0 L ${w} ${h} Z" fill="#${ch((n >> 16) & 255)}${ch((n >> 8) & 255)}${ch(n & 255)}" stroke="${INK}" stroke-width="6"/>`;
};

// ---------------------------------------------------------------- screen overlays
/** rain streaks for frame f (screen space, deterministic). density ~ streaks per frame, len px, slant px */
export function rainSVG(f: number, W: number, H: number, density = 260, len = 46, slant = -10, op = 0.55): string {
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">`;
  for (let i = 0; i < density; i++) {
    const speed = 38 + 30 * rnd(i * 1.3), x0 = rnd(i * 2.1) * (W + 200) - 100, y0 = ((rnd(i * 3.7) * (H + len) + f * speed) % (H + len)) - len;
    const l = len * (0.6 + 0.8 * rnd(i * 5.9)), a = op * (0.4 + 0.6 * rnd(i * 7.3));
    s += `<line x1="${x0}" y1="${y0}" x2="${x0 + slant}" y2="${y0 + l}" stroke="#cfe0ff" stroke-opacity="${a.toFixed(2)}" stroke-width="${(1.4 + 1.6 * rnd(i * 9.1)).toFixed(1)}" stroke-linecap="round"/>`;
  }
  return s + `</svg>`;
}
/** jagged lightning bolt (origin = top), length len */
export function bolt(len: number, seed: number): string {
  let x = 0, y = 0, d = "M 0 0";
  const pts: [number, number][] = [[0, 0]];
  while (y < len) { x += (rnd(seed + y) - 0.5) * 90; y += 40 + 50 * rnd(seed + y * 1.3); pts.push([x, y]); d += ` L ${x} ${y}`; }
  return `<path d="${d}" stroke="#bfe0ff" stroke-width="22" stroke-opacity="0.35" fill="none" stroke-linejoin="round"/><path d="${d}" stroke="#ffffff" stroke-width="7" fill="none" stroke-linejoin="round"/>`;
}

/** soft god-rays fanning from (cx, -40) over a W x H frame; phase slowly turns them */
export function raysSVG(W: number, H: number, cx: number, phase: number): string {
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2c4" stop-opacity="0.9"/><stop offset="0.7" stop-color="#ffd27a" stop-opacity="0.25"/><stop offset="1" stop-color="#ffc060" stop-opacity="0"/></linearGradient></defs>`;
  for (let i = 0; i < 9; i++) {
    const a = (-55 + i * 13 + 4 * Math.sin(phase + i)) * Math.PI / 180, w = (0.05 + 0.04 * rnd(i * 3.3)), L = H * 1.5;
    const x1 = cx + Math.sin(a - w) * L, y1 = -40 + Math.cos(a - w) * L, x2 = cx + Math.sin(a + w) * L, y2 = -40 + Math.cos(a + w) * L;
    s += `<path d="M ${cx} -40 L ${x1} ${y1} L ${x2} ${y2} Z" fill="url(#rg)" opacity="${(0.35 + 0.4 * rnd(i * 7.1)).toFixed(2)}"/>`;
  }
  return s + `</svg>`;
}
