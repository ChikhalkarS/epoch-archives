const INK = "#2b1a2e", GOLD = "#f2b632", GOLD_D = "#c98a12", W = 3;
const P = (d, fill, x = "") => `<path d="${d}" fill="${fill}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round" stroke-linecap="round" ${x}/>`;
const PN = (d, fill, x = "") => `<path d="${d}" fill="${fill}" stroke="none" ${x}/>`;
const E = (cx, cy, rx, ry, fill, x = "") => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${INK}" stroke-width="${W}" ${x}/>`;
const EN = (cx, cy, rx, ry, fill, x = "") => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="none" ${x}/>`;
const C = (cx, cy, r, fill, x = "") => E(cx, cy, r, r, fill, x);
const L = (d, col = INK, w = W, x = "") => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${x}/>`;
const SH = (d) => `<path d="${d}" fill="url(#shade)" stroke="none"/>`;            // soft light overlay
const SHE = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#shade)"/>`;
const G = (inner, tx = 0, ty = 0, s = 1, rot = 0) => `<g transform="translate(${tx} ${ty}) rotate(${rot}) scale(${s})">${inner}</g>`;

/** a limb: ink tube with a coloured core, round ends */
const limb = (pts, col, w = 15) => {
  const d = "M " + pts.map((p) => p.join(" ")).join(" L ");
  return L(d, INK, w + 2 * W) + L(d, col, w);
};
const hand = (x, y, skin, r = 9) => C(x, y, r, skin) + SHE(x, y, r, r);
const bangle = (x, y, r = 8) => E(x, y, r, 3, "none", `stroke="${GOLD}" stroke-width="4"`);

// ------------------------------------------------------------------ faces
/** face centred at (cx, cy). o.lashes for girls, o.eye colour, o.expr, o.blush */
function face(cx, cy, o = {}) {
  const ex = 21, ey = cy + 4, eye = o.eye || "#241833", ex_ = o.expr || "smile";
  let s = "";
  let openEye = (x, big = 1) => {
    let t = E(x, ey, 9.5 * big, 12.5 * big, eye) +
      C(x - 3, ey - 5, 3.8 * big, "#fff", `stroke="none"`) + C(x + 3.2, ey + 4, 1.8 * big, "#fff", `stroke="none"`);
    t += L(`M ${x - 11} ${ey - 9} Q ${x} ${ey - 17} ${x + 11} ${ey - 9}`, INK, 3.6);      // upper lid
    if (o.lashes) { const sx = x > cx ? 1 : -1; t += L(`M ${x + sx * 9} ${ey - 10} l ${sx * 6} -5 M ${x + sx * 11} ${ey - 5} l ${sx * 6} -2`, INK, 2.6); }
    return t;
  };
  const closedHappy = (x) => L(`M ${x - 10} ${ey + 2} Q ${x} ${ey - 10} ${x + 10} ${ey + 2}`, INK, 3.6);
  const closedCalm = (x) => L(`M ${x - 10} ${ey - 1} Q ${x} ${ey + 7} ${x + 10} ${ey - 1}`, INK, 3.6) +
    (o.lashes ? L(`M ${x + (x > cx ? 9 : -9)} ${ey} l ${x > cx ? 5 : -5} 3`, INK, 2.4) : "");
  let halfLid = (x) => EN(x, ey + 3, 9.5, 8, eye) + L(`M ${x - 11} ${ey - 2} Q ${x} ${ey - 6} ${x + 11} ${ey - 2}`, INK, 3.6) + C(x - 3, ey + 1, 2.4, "#fff", `stroke="none"`);
  if (o.blink) { openEye = (x) => closedCalm(x); halfLid = (x) => closedCalm(x); }
  const brow = (x, lift = 0, tilt = 0) => L(`M ${x - 9} ${cy - 22 - lift + tilt * (x > cx ? -1 : 1)} Q ${x} ${cy - 27 - lift} ${x + 9} ${cy - 22 - lift - tilt * (x > cx ? -1 : 1)}`, o.browCol || INK, 3);
  const angryBrow = (x) => { const s2 = x > cx ? -1 : 1; return L(`M ${x - 10 * s2} ${cy - 30} L ${x + 10 * s2} ${cy - 20}`, INK, 4.5); };
  const nose = L(`M ${cx + 1} ${cy + 13} q 3 2 0 4`, INK, 2.2);
  const blush = (k = 1) => EN(cx - 32, cy + 17, 10, 5.5, "#ff8aa1", `opacity="${0.5 * k}"`) + EN(cx + 32, cy + 17, 10, 5.5, "#ff8aa1", `opacity="${0.5 * k}"`);
  const my = cy + 27;
  switch (ex_) {
    case "smile":
      s += openEye(cx - ex) + openEye(cx + ex) + brow(cx - ex) + brow(cx + ex) + nose + blush();
      s += L(`M ${cx - 8} ${my - 2} Q ${cx} ${my + 6} ${cx + 8} ${my - 2}`, INK, 3); break;
    case "happy":
      s += closedHappy(cx - ex) + closedHappy(cx + ex) + brow(cx - ex, 2) + brow(cx + ex, 2) + nose + blush(1.3);
      s += P(`M ${cx - 10} ${my - 3} Q ${cx} ${my + 12} ${cx + 10} ${my - 3} Z`, "#7a2235") + EN(cx, my + 4, 4.5, 2.6, "#e86e78"); break;
    case "wink":
      s += openEye(cx - ex) + closedHappy(cx + ex) + brow(cx - ex, 1, 2) + brow(cx + ex, 3) + nose + blush(1.2);
      s += P(`M ${cx - 9} ${my - 4} Q ${cx + 2} ${my + 9} ${cx + 12} ${my - 6} Q ${cx + 2} ${my - 1} ${cx - 9} ${my - 4} Z`, "#7a2235"); break;
    case "calm":
      s += closedCalm(cx - ex) + closedCalm(cx + ex) + brow(cx - ex, 1) + brow(cx + ex, 1) + nose + blush(0.8);
      s += L(`M ${cx - 6} ${my - 1} Q ${cx} ${my + 4} ${cx + 6} ${my - 1}`, INK, 3); break;
    case "surprise":
      s += openEye(cx - ex, 1.12) + openEye(cx + ex, 1.12) + brow(cx - ex, 7) + brow(cx + ex, 7) + nose + blush(0.7);
      s += E(cx, my + 2, 6, 8, "#7a2235"); break;
    case "shy":
      s += halfLid(cx - ex) + halfLid(cx + ex) + brow(cx - ex, -1, -2) + brow(cx + ex, -1, -2) + nose + blush(1.8);
      s += L(`M ${cx - 6} ${my - 1} Q ${cx} ${my + 4} ${cx + 6} ${my - 1}`, INK, 3);
      s += L(`M ${cx - 40} ${cy + 12} l 4 6 M ${cx - 33} ${cy + 11} l 4 6 M ${cx + 28} ${cy + 11} l 4 6 M ${cx + 35} ${cy + 12} l 4 6`, "#e2607a", 2); break;
    case "sad":
      s += openEye(cx - ex) + openEye(cx + ex) + brow(cx - ex, 3, -5) + brow(cx + ex, 3, -5) + nose + blush(0.6);
      s += L(`M ${cx - 7} ${my + 3} Q ${cx} ${my - 4} ${cx + 7} ${my + 3}`, INK, 3);
      s += P(`M ${cx + ex + 6} ${ey + 13} q -5 9 0 12 q 5 -3 0 -12 Z`, "#9fd4ff", `stroke-width="2"`); break;
    case "pout":   // maan: Radha's playful sulk
      s += halfLid(cx - ex) + halfLid(cx + ex) + angryBrow(cx - ex).replace('stroke-width="4.5"', 'stroke-width="3"') + angryBrow(cx + ex).replace('stroke-width="4.5"', 'stroke-width="3"') + nose + blush(1.6);
      s += E(cx + 2, my, 4.5, 3.5, "#c2405a"); break;
    case "angry":
      s += openEye(cx - ex, 0.9) + openEye(cx + ex, 0.9) + angryBrow(cx - ex) + angryBrow(cx + ex) + nose;
      s += P(`M ${cx - 11} ${my + 4} Q ${cx} ${my - 6} ${cx + 11} ${my + 4} Z`, "#fff"); break;
    case "evil":
      s += halfLid(cx - ex) + halfLid(cx + ex) + angryBrow(cx - ex) + angryBrow(cx + ex) + nose;
      s += L(`M ${cx - 10} ${my} Q ${cx + 2} ${my + 6} ${cx + 12} ${my - 5}`, INK, 3.2); break;
    case "talk": {      // speaking: o.talk 0..1 opens the mouth
      const t = Math.max(0, Math.min(1, o.talk ?? 0.6));
      s += openEye(cx - ex) + openEye(cx + ex) + brow(cx - ex, 1) + brow(cx + ex, 1) + nose + blush();
      s += t < 0.15 ? L(`M ${cx - 7} ${my - 1} Q ${cx} ${my + 4} ${cx + 7} ${my - 1}`, INK, 3) : P(`M ${cx - 7 - 2 * t} ${my - 2} Q ${cx} ${my - 2 + 13 * t} ${cx + 7 + 2 * t} ${my - 2} Z`, "#7a2235", `stroke-width="2.6"`);
      break; }
    case "shout": {
      const t = Math.max(0.3, Math.min(1, o.talk ?? 0.8));
      s += openEye(cx - ex, 0.9) + openEye(cx + ex, 0.9) + angryBrow(cx - ex) + angryBrow(cx + ex) + nose;
      s += P(`M ${cx - 11} ${my - 4} Q ${cx} ${my - 4 + 18 * t} ${cx + 11} ${my - 4} Z`, "#7a2235") + PN(`M ${cx - 8} ${my - 2} L ${cx + 8} ${my - 2} L ${cx + 7} ${my + 1} L ${cx - 7} ${my + 1} Z`, "#fff");
      break; }
    case "ashamed":
      s += halfLid(cx - ex) + halfLid(cx + ex) + brow(cx - ex, 3, -5) + brow(cx + ex, 3, -5) + nose;
      s += L(`M ${cx - 6} ${my + 2} Q ${cx} ${my - 2} ${cx + 6} ${my + 2}`, INK, 3); break;
    case "sneer":
      s += openEye(cx - ex, 0.85) + halfLid(cx + ex) + angryBrow(cx - ex) + brow(cx + ex, 2) + nose;
      s += L(`M ${cx - 9} ${my + 2} Q ${cx} ${my - 3} ${cx + 10} ${my + 3}`, INK, 3.2); break;
  }
  return s;
}

// ------------------------------------------------------------------ props
const flute = (x1, y1, x2, y2) => {
  const d = `M ${x1} ${y1} L ${x2} ${y2}`, dx = x2 - x1, dy = y2 - y1, n = Math.hypot(dx, dy);
  let s = L(d, INK, 13) + L(d, "#b0703a", 7);
  for (const t of [0.12, 0.88]) s += L(`M ${x1 + dx * t - dy / n * 6} ${y1 + dy * t + dx / n * 6} L ${x1 + dx * t + dy / n * 6} ${y1 + dy * t - dx / n * 6}`, GOLD, 4);
  for (const t of [0.35, 0.47, 0.59, 0.71]) s += C(x1 + dx * t, y1 + dy * t, 1.6, INK, `stroke="none"`);
  return s + L(`M ${x1 + dx * 0.9} ${y1 + dy * 0.9} q 4 16 -6 26`, "#d8344f", 3) + C(x1 + dx * 0.9 - 6, y1 + dy * 0.9 + 28, 4, "#d8344f");
};
const peacockFeather = (x, y, rot) => G(
  L("M 0 0 Q 2 -30 0 -62", "#6b4a1c", 3) +
  P("M 0 -40 Q -20 -70 0 -104 Q 20 -70 0 -40 Z", "#3aa676") + PN("M 0 -46 Q -14 -70 0 -98 Q 14 -70 0 -46 Z", "#57c08c") +
  E(0, -78, 10, 14, "#e2b33c", `stroke-width="2"`) + EN(0, -77, 7, 10, "#14a3a0") + EN(0, -76, 3.6, 5.2, "#1c2f7a"), x, y, 1, rot);
const matki = (x, y, s = 1) => G(
  P("M -26 -8 Q -34 22 -16 34 L 16 34 Q 34 22 26 -8 Q 0 -16 -26 -8 Z", "#c8643b") + SH("M -26 -8 Q -34 22 -16 34 L 16 34 Q 34 22 26 -8 Q 0 -16 -26 -8 Z") +
  E(0, -10, 18, 6, "#a24c2a") + L("M -27 8 Q 0 16 27 8", "#f6e7c8", 3) + L("M -24 16 Q 0 24 24 16", "#f6e7c8", 2) +
  EN(0, -12, 13, 3.5, "#fdf6e3"), x, y, s);
const lotus = (x, y) => G(
  P("M 0 6 Q -16 0 -14 -14 Q -4 -8 0 6 Z", "#f48fb1") + P("M 0 6 Q 16 0 14 -14 Q 4 -8 0 6 Z", "#f48fb1") +
  P("M 0 6 Q -9 -12 0 -24 Q 9 -12 0 6 Z", "#f8bbd0") + L("M 0 8 L 0 30", "#3e8e41", 3), x, y);
const plough = (x, y) => G(   // hal: Balarama's plough on the shoulder
  L("M -50 70 L 40 -70 Q 58 -96 80 -78 L 82 -62", INK, 14) + L("M -50 70 L 40 -70 Q 58 -96 80 -78 L 82 -62", "#a0662f", 8) +
  P("M 74 -64 L 91 -64 L 83 -38 Z", "#b9c0c8") + L("M 34 -60 l 12 6", GOLD, 4) + L("M -40 56 l 12 6", GOLD, 4), x, y);
const lathi = (x, y) => L(`M ${x} ${y} L ${x + 18} ${y - 150}`, INK, 12) + L(`M ${x} ${y} L ${x + 18} ${y - 150}`, "#9a6a3a", 6);
const sword = (x, y, rot, curved = false) => G(
  (curved ? P("M -3 0 Q 30 -60 6 -128 Q 44 -64 9 0 Z", "#dfe6ee") + PN("M 2 -10 Q 26 -60 8 -112", "none", `stroke="#ffffff" stroke-width="2"`)
          : P("M -5 0 L -5 -118 L 0 -132 L 5 -118 L 5 0 Z", "#dfe6ee")) +
  P("M -16 0 L 16 0 L 14 7 L -14 7 Z", GOLD) + P("M -4 7 L 4 7 L 4 26 L -4 26 Z", "#5a2d16") + C(0, 30, 5, GOLD), x, y, 1, rot);

// ------------------------------------------------------------------ BOY template (Krishna, Balarama, gwal-bal)
function boyHead(o, hy) {
  let s = "";
  const hair = o.hair || "#1d1424";
  // back hair + side locks to the shoulders
  s += E(0, hy - 2, 66, 60, hair);
  if (o.locks !== false) s += P(`M -58 ${hy + 4} Q -74 ${hy + 52} -54 ${hy + 84} Q -44 ${hy + 64} -40 ${hy + 34} Z`, hair) + P(`M 58 ${hy + 4} Q 74 ${hy + 52} 54 ${hy + 84} Q 44 ${hy + 64} 40 ${hy + 34} Z`, hair);
  s += E(-58, hy + 6, 9, 12, o.skin) + E(58, hy + 6, 9, 12, o.skin);                                  // ears
  s += E(0, hy, 60, 56, o.skin) + SHE(0, hy, 60, 56);
  s += face(0, hy + 2, { expr: o.expr, eye: "#1f1630" });
  // bangs
  s += P(`M -59 ${hy - 2} Q -56 ${hy - 54} 0 ${hy - 57} Q 56 ${hy - 54} 59 ${hy - 2} L 50 ${hy - 20} L 40 ${hy - 10} L 30 ${hy - 26} L 16 ${hy - 14} L 4 ${hy - 30} L -10 ${hy - 15} L -24 ${hy - 28} L -36 ${hy - 12} L -48 ${hy - 24} Z`, hair);
  // earrings (makara kundal for Krishna, simple studs otherwise)
  if (o.kundal) for (const sx of [-1, 1]) s += E(sx * 60, hy + 26, 6, 8, GOLD, `stroke-width="2"`) + C(sx * 60, hy + 26, 2.5, "#d8344f", `stroke="none"`);
  if (o.tilak) s += L(`M -6 ${hy - 40} Q 0 ${hy - 24} 6 ${hy - 40}`, "#fff4d6", 3.4) + L(`M 0 ${hy - 37} L 0 ${hy - 29}`, "#d8344f", 2.4);
  // headgear
  if (o.crown === "peacock") {
    s += peacockFeather(30, hy - 58, 18);
    s += P(`M -44 ${hy - 40} Q 0 ${hy - 52} 44 ${hy - 40} L 40 ${hy - 62} L 26 ${hy - 56} L 14 ${hy - 82} L 0 ${hy - 62} L -14 ${hy - 82} L -26 ${hy - 56} L -40 ${hy - 62} Z`, GOLD) +
      SH(`M -44 ${hy - 40} Q 0 ${hy - 52} 44 ${hy - 40} L 40 ${hy - 62} L 26 ${hy - 56} L 14 ${hy - 82} L 0 ${hy - 62} L -14 ${hy - 82} L -26 ${hy - 56} L -40 ${hy - 62} Z`) +
      C(0, hy - 52, 5, "#d8344f", `stroke-width="2"`) + C(-22, hy - 48, 3, "#3aa676", `stroke-width="1.5"`) + C(22, hy - 48, 3, "#3aa676", `stroke-width="1.5"`) +
      L(`M -40 ${hy - 44} Q 0 ${hy - 55} 40 ${hy - 44}`, "#fff3c4", 1.6);
  } else if (o.crown === "gold") {
    s += P(`M -42 ${hy - 42} Q 0 ${hy - 52} 42 ${hy - 42} L 36 ${hy - 64} L 0 ${hy - 92} L -36 ${hy - 64} Z`, GOLD) +
      SH(`M -42 ${hy - 42} Q 0 ${hy - 52} 42 ${hy - 42} L 36 ${hy - 64} L 0 ${hy - 92} L -36 ${hy - 64} Z`) + C(0, hy - 60, 6, "#2f7fd6", `stroke-width="2"`);
  } else if (o.crown === "turban") {
    const tc = o.turban || "#f28b2c";
    s += P(`M -60 ${hy - 14} Q -66 ${hy - 70} 0 ${hy - 76} Q 66 ${hy - 70} 60 ${hy - 14} Q 0 ${hy - 36} -60 ${hy - 14} Z`, tc) + SH(`M -60 ${hy - 14} Q -66 ${hy - 70} 0 ${hy - 76} Q 66 ${hy - 70} 60 ${hy - 14} Q 0 ${hy - 36} -60 ${hy - 14} Z`) +
      L(`M -54 ${hy - 30} Q 0 ${hy - 62} 52 ${hy - 44} M -46 ${hy - 50} Q 4 ${hy - 72} 50 ${hy - 28}`, "#c4621a", 2.5) + P(`M 50 ${hy - 40} Q 78 ${hy - 40} 72 ${hy - 8} Q 64 ${hy - 26} 52 ${hy - 26} Z`, tc);
  }
  return s;
}

function boy(o) {
  const adult = !!o.adult, hy = adult ? -262 : -222, tt = hy + 50, tb = tt + (adult ? 82 : 62), skin = o.skin;
  let s = "";
  if (o.prop === "plough") s += G(plough(0, 0), 40, tt + 24, 0.88);
  if (o.prop === "stick") s += lathi(44, -6);
  // legs + feet
  for (const sx of [-1, 1]) s += limb([[sx * 13, -40], [sx * 14, -8]], skin, 15) + E(sx * 17, -5, 14, 6.5, skin) + bangle(sx * 14, -14, 9);
  // lower garment (dhoti) with a centre pleat panel and a gold border
  const dh = `M -36 ${tb - 6} Q -46 -60 -44 -30 Q 0 -22 44 -30 Q 46 -60 36 ${tb - 6} Z`;
  s += P(dh, o.dhoti) + SH(dh) + L(`M -42 -36 Q 0 -27 42 -36`, o.border || GOLD, 4);
  s += P(`M -9 ${tb} L -12 -26 L 0 -18 L 12 -26 L 9 ${tb} Z`, o.dhoti2 || o.dhoti) + L(`M -4 ${tb + 8} L -5 -24 M 4 ${tb + 8} L 5 -24`, "rgba(0,0,0,0.18)", 2);
  // torso (bare for Krishna/Balarama, a kurta/vest for others)
  const tor = `M -32 ${tt + 6} Q -36 ${tt - 2} -24 ${tt - 4} L 24 ${tt - 4} Q 36 ${tt - 2} 32 ${tt + 6} L 30 ${tb} Q 0 ${tb + 6} -30 ${tb} Z`;
  s += P(tor, o.top || skin) + SH(tor);
  if (o.angavastra) s += P(`M -30 ${tt + 2} Q -6 ${tt + 30} 30 ${tb - 4} L 30 ${tb + 8} Q -12 ${tt + 40} -34 ${tt + 18} Z`, o.angavastra);
  // waist sash with hanging knot
  s += P(`M -33 ${tb - 8} Q 0 ${tb + 2} 33 ${tb - 8} L 34 ${tb + 4} Q 0 ${tb + 14} -34 ${tb + 4} Z`, o.sash) +
    P(`M -26 ${tb + 4} Q -34 ${tb + 30} -24 ${tb + 44} L -14 ${tb + 40} Q -20 ${tb + 26} -14 ${tb + 8} Z`, o.sash);
  if (o.prop === "flute") s += flute(-30, tb + 30, 26, tb - 30);
  // necklaces + vaijayanti mala
  s += L(`M -22 ${tt - 2} Q 0 ${tt + 16} 22 ${tt - 2}`, GOLD, 4) + C(0, tt + 10, 4, "#d8344f", `stroke-width="1.5"`);
  if (o.mala) {
    const cols = ["#fffdf5", "#e8424f", "#fffdf5", "#3aa676"];
    for (let i = 0; i <= 26; i++) {
      const t = i / 26, x = (1 - t) * (1 - t) * -26 + 2 * (1 - t) * t * 0 + t * t * 26, y = (1 - t) * (1 - t) * (tt - 2) + 2 * (1 - t) * t * (tb + 64) + t * t * (tt - 2);
      s += C(x, y, 4.4, cols[i % 4], `stroke-width="1.5"`);
    }
  }
  // arms: left hangs, right rests on the prop (or hangs)
  s += limb([[-30, tt + 8], [-42, tt + 34], [-40, tt + 58]], skin, 13) + hand(-40, tt + 60, skin) + bangle(-40, tt + 50, 8) + L(`M -38 ${tt + 14} l -6 4`, GOLD, 4);
  const rh = o.prop === "plough" ? [46, tt + 26] : o.prop === "stick" ? [50, tt + 40] : [40, tt + 58];
  s += limb([[30, tt + 8], [42, tt + 32], rh], skin, 13) + hand(rh[0], rh[1] + 2, skin) + bangle(rh[0] - 1, rh[1] - 8, 8) + L(`M 38 ${tt + 14} l 6 4`, GOLD, 4);
  s += boyHead(o, hy);
  return s;
}

// ------------------------------------------------------------------ GIRL template (Radha, gopis, Yashoda)
function girlHead(o, hy, front = true) {
  let s = "";
  const hair = "#1d1424";
  if (o.bun) s += C(0, hy - 58, 26, hair) + (o.gajra ? Array.from({ length: 9 }, (_, i) => C(-22 + i * 5.5, hy - 46 + Math.sin(i) * 2, 3.2, "#fffdf5", `stroke-width="1"`)).join("") : "");
  s += E(0, hy, 66, 60, hair);
  s += E(0, hy, 60, 56, o.skin) + SHE(0, hy, 60, 56);
  s += face(0, hy + 2, { expr: o.expr, lashes: true, eye: "#2a1a36" });
  // centre-parted hair framing the face
  s += P(`M -62 ${hy + 24} Q -66 ${hy - 54} 0 ${hy - 59} Q 66 ${hy - 54} 62 ${hy + 24} Q 56 ${hy - 14} 32 ${hy - 30} Q 12 ${hy - 40} 0 ${hy - 50} Q -12 ${hy - 40} -32 ${hy - 30} Q -56 ${hy - 14} -62 ${hy + 24} Z`, hair);
  // jhumka earrings
  for (const sx of [-1, 1]) s += P(`M ${sx * 58 - 7} ${hy + 34} Q ${sx * 58} ${hy + 22} ${sx * 58 + 7} ${hy + 34} Z`, GOLD, `stroke-width="2"`) + C(sx * 58, hy + 37, 2.2, GOLD, `stroke-width="1.2"`);
  // veil over the head (odhni / saree pallu)
  if (o.veilHead) {
    const v = `M -70 ${hy + 30} Q -76 ${hy - 70} 0 ${hy - 72} Q 76 ${hy - 70} 70 ${hy + 30} L 60 ${hy + 24} Q 64 ${hy - 56} 0 ${hy - 60} Q -64 ${hy - 56} -60 ${hy + 24} Z`;
    s += P(v, o.odhni) + L(`M -64 ${hy + 26} Q -70 ${hy - 62} 0 ${hy - 66} Q 70 ${hy - 62} 64 ${hy + 26}`, o.border || GOLD, 2.4, `stroke-dasharray="2 5"`);
  }
  if (o.radha) {    // maang tikka, bindi, nath
    s += L(`M 0 ${hy - 57} L 0 ${hy - 44}`, GOLD, 2.4) + C(0, hy - 38, 6.5, GOLD, `stroke-width="1.4"`) + C(0, hy - 38, 2.6, "#d8344f", `stroke="none"`);
    s += C(10, hy + 23, 3.6, "none", `stroke="${GOLD}" stroke-width="2"`) + C(12, hy + 26, 1.6, "#fffdf5", `stroke="none"`) +
      L(`M 13 ${hy + 21} Q 36 ${hy + 26} 50 ${hy + 2}`, GOLD, 1.3, `stroke-dasharray="0.1 3.2"`);
  }
  s += C(0, hy - 24, o.radha ? 2.6 : 3, "#d8344f", `stroke="none"`);   // bindi
  if (o.potHead) s += matki(0, hy - 82, 0.95);
  return s;
}

function girl(o) {
  const adult = !!o.adult, hy = adult ? -262 : -222, tt = hy + 50, tb = tt + (adult ? 70 : 52), skin = o.skin;
  let s = "";
  // flowing veil behind the body
  if (o.odhniBack !== false) {
    const back = `M -58 ${hy + 10} Q -96 ${hy + 120} -80 -40 Q 0 -30 80 -40 Q 96 ${hy + 120} 58 ${hy + 10} Z`;
    s += P(back, o.odhni, `opacity="0.96"`) + L(`M -80 -42 Q 0 -32 80 -42`, o.border || GOLD, 3, `stroke-dasharray="1 6"`);
  }
  if (o.braid) {   // long braid down the back, visible on one side
    for (let i = 0; i < 7; i++) s += E(48 + i * 1.5, hy + 50 + i * 16, 9, 10, "#1d1424", `stroke-width="2"`);
    s += P(`M 52 ${hy + 160} l -8 22 l 16 0 Z`, "#d8344f", `stroke-width="2"`);
  }
  for (const sx of [-1, 1]) s += E(sx * 15, -5, 13, 6, skin) + bangle(sx * 14, -13, 9);
  // skirt: bell lehenga (girls) or straighter saree (adult)
  const sk = adult
    ? `M -32 ${tb - 4} Q -40 -60 -48 -14 Q 0 -6 48 -14 Q 40 -60 32 ${tb - 4} Z`
    : `M -32 ${tb - 4} Q -60 -60 -70 -16 Q 0 -4 70 -16 Q 60 -60 32 ${tb - 4} Z`;
  s += P(sk, o.skirt) + SH(sk);
  if (adult) s += L(`M -8 ${tb + 6} L -10 -10 M 0 ${tb + 6} L 0 -8 M 8 ${tb + 6} L 10 -10`, "rgba(0,0,0,0.2)", 2.2);
  else s += L(`M -18 ${tb + 4} Q -34 -50 -40 -12 M 0 ${tb + 6} L 0 -6 M 18 ${tb + 4} Q 34 -50 40 -12`, "rgba(0,0,0,0.16)", 2.2);
  s += L(adult ? `M -46 -24 Q 0 -14 46 -24` : `M -66 -28 Q 0 -14 66 -28`, o.border || GOLD, 6);
  if (!adult) for (let i = 0; i < 9; i++) { const x = -48 + i * 12, y = -58 + (i % 2) * 18 + Math.abs(x) * -0.05; s += C(x, y, 2.6, o.border || GOLD, `stroke="none"`); }
  // choli + short sleeves
  const ch = `M -28 ${tt + 4} Q -32 ${tt - 3} -20 ${tt - 4} L 20 ${tt - 4} Q 32 ${tt - 3} 28 ${tt + 4} L 30 ${tb} Q 0 ${tb + 6} -30 ${tb} Z`;
  s += P(ch, o.top) + SH(ch) + L(`M -28 ${tb - 4} Q 0 ${tb + 2} 28 ${tb - 4}`, o.border || GOLD, 3);
  s += L(`M -18 ${tt - 1} Q 0 ${tt + 14} 18 ${tt - 1}`, GOLD, 3.4) + (o.radha ? L(`M -14 ${tt + 4} Q 0 ${tt + 22} 14 ${tt + 4}`, GOLD, 2.4) + C(0, tt + 14, 3.6, "#3aa676", `stroke-width="1.4"`) : "");
  // front drape: dupatta across the chest (girls) or saree pallu over the shoulder (adult)
  if (o.drape) s += P(`M -30 ${tt + 2} Q 0 ${tt + 20} 32 ${tb + 10} L 30 ${tb + 26} Q -6 ${tt + 34} -32 ${tt + 18} Z`, o.drape) + L(`M 31 ${tb + 18} Q -6 ${tt + 27} -31 ${tt + 10}`, o.border || GOLD, 2, `stroke-dasharray="1 5"`);
  // arms + props
  const sleeve = (sx) => E(sx * 30, tt + 6, 10, 8, o.top);
  if (o.prop === "lotus") {
    s += limb([[-28, tt + 8], [-30, tt + 34], [-8, tt + 44]], skin, 12) + limb([[28, tt + 8], [30, tt + 34], [8, tt + 44]], skin, 12);
    s += lotus(0, tt + 30) + bangle(-22, tt + 40, 6) + bangle(22, tt + 40, 6) + hand(-7, tt + 45, skin, 8) + hand(7, tt + 45, skin, 8);
  } else if (o.prop === "potHip") {
    s += limb([[-28, tt + 8], [-38, tt + 34], [-36, tt + 56]], skin, 12) + hand(-36, tt + 58, skin, 8) + bangle(-37, tt + 49, 7);
    s += matki(46, tb + 4, 0.9) + limb([[28, tt + 8], [44, tt + 26], [52, tt + 42]], skin, 12) + hand(52, tt + 44, skin, 8) + bangle(50, tt + 36, 7);
  } else if (o.prop === "potHead") {
    s += limb([[-28, tt + 8], [-38, tt + 34], [-36, tt + 56]], skin, 12) + hand(-36, tt + 58, skin, 8) + bangle(-37, tt + 49, 7);
  } else if (o.prop === "butter") {
    s += limb([[-28, tt + 8], [-36, tt + 30], [-12, tt + 42]], skin, 12) + limb([[28, tt + 8], [36, tt + 30], [12, tt + 42]], skin, 12);
    s += matki(0, tt + 36, 0.75) + EN(0, tt + 22, 12, 7, "#fff7d1") + bangle(-25, tt + 37, 6) + bangle(25, tt + 37, 6) + hand(-11, tt + 44, skin, 8) + hand(11, tt + 44, skin, 8);
  } else {
    s += limb([[-28, tt + 8], [-38, tt + 34], [-36, tt + 56]], skin, 12) + hand(-36, tt + 58, skin, 8) + limb([[28, tt + 8], [38, tt + 34], [36, tt + 56]], skin, 12) + hand(36, tt + 58, skin, 8);
  }
  s += sleeve(-1) + sleeve(1);
  s += girlHead(o, hy);
  if (o.prop === "potHead") s += limb([[30, tt + 6], [70, hy + 30], [80, hy - 36], [30, hy - 76]], skin, 12) + bangle(64, hy - 50, 7) + hand(28, hy - 77, skin, 8) + E(30, tt + 6, 10, 8, o.top);
  return s;
}

// ------------------------------------------------------------------ KING template (Kansa, Ravana)
function kingHead(o, x, y, sc, expr) {
  let s = "";
  const skin = o.skin, hair = "#1d1424";
  s += E(0, 4, 64, 58, hair);                                                                 // hair mass behind
  s += E(-58, 8, 9, 12, skin) + E(58, 8, 9, 12, skin);
  s += E(0, 0, 60, 56, skin) + SHE(0, 0, 60, 56);
  s += face(0, 2, { expr, eye: "#1a1222" });
  // moustache (curled) and beard
  s += P(`M 0 18 Q -14 12 -30 22 Q -40 26 -40 16 Q -34 30 -16 28 Q -6 26 0 22 Q 6 26 16 28 Q 34 30 40 16 Q 40 26 30 22 Q 14 12 0 18 Z`, hair, `stroke-width="2"`);
  if (o.beard) s += P(`M -42 22 Q -40 60 0 66 Q 40 60 42 22 Q 30 40 0 44 Q -30 40 -42 22 Z`, hair, `stroke-width="2"`);
  for (const sx of [-1, 1]) s += C(sx * 60, 26, 7, "none", `stroke="${GOLD}" stroke-width="3.5"`);
  s += L(`M -8 -30 L 8 -30`, "#f2f2f2", 3) + C(0, -24, 2.6, "#d8344f", `stroke="none"`);           // tilak
  // crown
  if (o.crown === "ravana") {
    const cr = `M -46 -36 Q 0 -48 46 -36 L 40 -64 L 22 -72 L 0 -118 L -22 -72 L -40 -64 Z`;
    s += P(cr, GOLD) + SH(cr) + L(`M -40 -44 Q 0 -54 40 -44`, GOLD_D, 3) + C(0, -70, 6, "#d8344f", `stroke-width="2"`) + C(-24, -56, 3.4, "#2fa86b", `stroke-width="1.5"`) + C(24, -56, 3.4, "#2fa86b", `stroke-width="1.5"`) + C(0, -100, 3, "#fff3c4", `stroke="none"`);
  } else {
    const cr = `M -48 -34 Q 0 -46 48 -34 L 44 -60 L 30 -54 L 22 -84 L 10 -60 L 0 -96 L -10 -60 L -22 -84 L -30 -54 L -44 -60 Z`;
    s += P(cr, "#d9a21f") + SH(cr) + C(0, -48, 6, "#7a1530", `stroke-width="2"`) + C(-24, -44, 3.4, "#7a1530", `stroke-width="1.5"`) + C(24, -44, 3.4, "#7a1530", `stroke-width="1.5"`);
  }
  return G(s, x, y, sc);
}

function king(o) {
  const hy = -278, tt = hy + 52, tb = tt + 92, skin = o.skin;
  let s = "";
  if (o.cape) s += P(`M -40 ${tt} Q -86 ${tt + 120} -74 -26 Q 0 -16 74 -26 Q 86 ${tt + 120} 40 ${tt} Z`, o.cape) + SH(`M -40 ${tt} Q -86 ${tt + 120} -74 -26 Q 0 -16 74 -26 Q 86 ${tt + 120} 40 ${tt} Z`);
  // Ravana: 18 extra arms fanned behind (20 in total with the two in front), drawn back to front
  if (o.arms) {
    // 9 arms per side, evenly fanned from 35 deg below horizontal to 75 deg above, outermost (highest) drawn first
    for (const side of [-1, 1]) for (let i = 8; i >= 0; i--) {
      const phi = (-64 + i * 9) * Math.PI / 180, len = 124;
      const sx = side * 30, sy = tt + 22, px = sx + side * len * Math.cos(phi), py = sy - len * Math.sin(phi);
      s += limb([[sx, sy], [px, py]], skin, 12) + bangle(sx + (px - sx) * 0.8, sy + (py - sy) * 0.8, 7) + hand(px, py, skin, 8);
    }
  }
  // Ravana: nine more heads in a row behind the main head (10 heads: Dashanan)
  if (o.heads) {
    const exprs = ["sneer", "angry", "evil", "angry", "sneer", "evil", "angry", "evil", "sneer"];
    const xs = [-295, -245, -195, -145, -95, 95, 145, 195, 245], sc = [0.62, 0.68, 0.74, 0.8, 0.86, 0.86, 0.8, 0.74, 0.68];
    const order = [0, 8, 1, 7, 2, 6, 3, 5, 4];
    // keep the row centred: shift the 5-left / 4-right row by half a slot
    for (const k of order) s += kingHead(o, xs[k], hy + 6 + (1 - sc[k]) * 30, sc[k], exprs[k]);
  }
  for (const sx of [-1, 1]) s += limb([[sx * 15, -46], [sx * 17, -10]], skin, 17) + E(sx * 20, -5, 16, 7, skin) + bangle(sx * 17, -16, 10);
  const dh = `M -42 ${tb - 8} Q -56 -70 -52 -32 Q 0 -22 52 -32 Q 56 -70 42 ${tb - 8} Z`;
  s += P(dh, o.dhoti) + SH(dh) + L(`M -50 -38 Q 0 -28 50 -38`, GOLD, 5) + P(`M -10 ${tb} L -13 -28 L 0 -20 L 13 -28 L 10 ${tb} Z`, o.dhoti2 || o.dhoti);
  const tor = `M -40 ${tt + 8} Q -46 ${tt - 2} -30 ${tt - 4} L 30 ${tt - 4} Q 46 ${tt - 2} 40 ${tt + 8} L 38 ${tb} Q 0 ${tb + 8} -38 ${tb} Z`;
  s += P(tor, skin) + SH(tor);
  // armour / chest piece
  const ar = `M -38 ${tt + 6} Q 0 ${tt + 20} 38 ${tt + 6} L 36 ${tt + 66} Q 0 ${tt + 78} -36 ${tt + 66} Z`;
  s += P(ar, o.armor) + SH(ar) + C(0, tt + 40, 9, "#d8344f", `stroke-width="2"`) + L(`M -30 ${tt + 58} Q 0 ${tt + 70} 30 ${tt + 58}`, GOLD_D, 3);
  s += P(`M -40 ${tb - 10} Q 0 ${tb} 40 ${tb - 10} L 40 ${tb + 4} Q 0 ${tb + 14} -40 ${tb + 4} Z`, GOLD);
  s += L(`M -26 ${tt - 2} Q 0 ${tt + 14} 26 ${tt - 2}`, "#fffdf5", 4, `stroke-dasharray="0.1 6"`);
  // front arms: one on the hip, one holding the sword
  s += limb([[-38, tt + 10], [-62, tt + 46], [-40, tt + 74]], skin, 15) + hand(-40, tt + 76, skin, 10) + bangle(-54, tt + 36, 9);
  s += sword(68, tt + 88, 160, o.curved);
  s += limb([[38, tt + 10], [58, tt + 44], [62, tt + 70]], skin, 15) + hand(62, tt + 72, skin, 10) + bangle(56, tt + 36, 9);
  s += kingHead(o, 0, hy, 1, o.expr);
  return s;
}

