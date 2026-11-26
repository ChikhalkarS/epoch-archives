// Sets and a generic actor renderer for the full video. Every set takes the frame f, a camera, a list of actors and a
// few look parameters. Actors: { id, kind, x, z, y?, s?, flip?, expr?, pose?, prop?, talk?: [f0, f1], walk?, bow?, ... }.
import React from "react";
import { Stage, Card, Ground, House, Overlay, Cam, rnd, clamp01, lerp, smoother, Blob, Hill, FarHills, Tree3, Cloud3, Disc, Pillar3, Root3, Altar3 } from "./stage";
import * as ch from "./chars.js";
import * as paint from "./paint";
import MOUTH from "./mouth.json";

export const KRISHNA = { skin: "#5487e0", dhoti: "#f6c22b", dhoti2: "#f4b41a", sash: "#f07a2a", crown: "peacock", prop: "flute", mala: true, kundal: true, tilak: true };
export const LIFT = { L: { a: 150, b: 20, l1: 46, l2: 46, finger: true, front: true } };
export const PRANAM = { L: { a: 15, b: -115, l1: 26, l2: 26 }, R: { a: 15, b: -115, l1: 26, l2: 26 } };
export const POINT_UP = { R: { a: 150, b: 15, l1: 30, l2: 28 } };
export const GOPI: Record<string, any> = {
  g1: { skin: "#f6cfa8", top: "#2e9b5f", skirt: "#4fbf7f", odhni: "#ffd34d", drape: "#ffd34d", bun: true, gajra: true, prop: "potHip" },
  g2: { skin: "#eec19a", top: "#e0582a", skirt: "#f39a3d", odhni: "#36b3b0", drape: "#36b3b0", braid: true, veilHead: true, prop: "none" },
  g3: { skin: "#f8d6b4", top: "#7a4fc4", skirt: "#a07ae0", odhni: "#ff8fb6", drape: "#ff8fb6", bun: true, prop: "none" },
  yashoda: { skin: "#f3c9a2", top: "#2f6db5", skirt: "#b8304a", odhni: "#b8304a", drape: "#b8304a", adult: true, bun: true, veilHead: true, odhniBack: false, prop: "none" },
};
export const SAKHA = { skin: "#c98f62", dhoti: "#f4efe2", border: "#e0582a", sash: "#e0582a", top: "#e86e3c", crown: "turban", turban: "#f2a516", prop: "stick", locks: false };
export const SAKHA2 = { ...SAKHA, skin: "#b9805a", top: "#3e8f5a", sash: "#2e7a4a", border: "#2e7a4a", turban: "#e2453c" };

export type Actor = {
  id: string; kind: string; x: number; z: number; y?: number; s?: number; flip?: boolean; expr?: string; tilt?: number;
  pose?: any; prop?: string; talk?: [number, number]; shout?: boolean; opts?: any; opacity?: number; filter?: string;
  walk?: { x1: number; z1: number; f0: number; f1: number }; shiver?: boolean; bob?: boolean; noShadow?: boolean;
};
const hash = (s: string) => { let h = 7; for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 9973; return h / 97.3; };
export const blinkAt = (f: number, seed: number) => { const p = 55 + Math.floor(rnd(seed) * 40); return (f + Math.floor(rnd(seed * 3.3) * p)) % p < 4; };
export const mouthAt = (f: number) => (MOUTH as number[])[Math.max(0, Math.min((MOUTH as number[]).length - 1, f))] ?? 0;

/** approximate a css brightness() filter as a card tint */
const tintOf = (flt: string) => { const m = /brightness\(([\d.]+)\)/.exec(flt); const v = Math.round(255 * Math.min(1, m ? +m[1] : 1)); return `rgb(${v},${v},${v})`; };
type Look = { svg: string; box: [number, number, number, number] };
export function actorSVG(a: Actor, f: number): Look {
  const sd = hash(a.id), blink = blinkAt(f, sd);
  const talking = a.talk && f >= a.talk[0] && f < a.talk[1];
  const expr = talking ? (a.shout ? "shout" : "talk") : a.expr;
  const common = { expr, blink, talk: talking ? 0.25 + 0.9 * mouthAt(f) : undefined, tilt: a.tilt, pose: a.pose, ...(a.prop ? { prop: a.prop } : {}), ...(a.opts || {}) };
  const BOY: [number, number, number, number] = [-130, -420, 130, 2], ADULT: [number, number, number, number] = [-140, -450, 140, 2];
  switch (a.kind) {
    case "krishna": return { svg: ch.boy({ ...KRISHNA, ...common }), box: [-150, -400, 140, 2] };
    case "balKrishna": return { svg: ch.boy({ ...KRISHNA, ...common }), box: [-150, -400, 140, 2] };
    case "divine": return { svg: `<ellipse cx="0" cy="-200" rx="240" ry="300" fill="url(#halo)"/>` + ch.boy({ ...KRISHNA, ...common }), box: [-250, -520, 250, 2] };
    case "g1": case "g2": case "g3": case "yashoda": return { svg: ch.girl({ ...GOPI[a.kind], ...common }), box: a.kind === "yashoda" ? ADULT : [-120, -340, 120, 2] };
    case "g3pot": return { svg: ch.girl({ ...GOPI.g3, potHead: true, prop: "potHead", ...common }), box: [-120, -440, 120, 2] };
    case "sakha": return { svg: ch.boy({ ...SAKHA, ...common }), box: BOY };
    case "sakha2": return { svg: ch.boy({ ...SAKHA2, ...common }), box: BOY };
    case "nanda": return { svg: ch.nanda(common), box: ADULT };
    case "garga": return { svg: ch.garga(common), box: ADULT };
    case "brahmana": return { svg: ch.brahmana(common), box: ADULT };
    case "cow": return { svg: ch.cow({ blink, ...(a.opts || {}) }), box: [-120, -170, 150, 2] };
    case "cowBrown": return { svg: ch.cow({ col: "#a8673a", spot: "#fbf6ee", blink, ...(a.opts || {}) }), box: [-120, -170, 150, 2] };
    case "surabhi": return { svg: ch.cow({ divine: true, bell: false, blink }), box: [-160, -190, 170, 40] };
    case "indra": return { svg: ch.indra({ ...common, expr: talking ? (a.shout ? "shout" : "talk") : a.expr ?? "angry" }), box: [-150, -470, 160, 2] };
    case "indraAir": return { svg: ch.indraOnAiravata({ ...(a.opts || {}), expr: talking ? "shout" : a.expr ?? "angry", blink, talk: common.talk }), box: [-230, -470, 230, 2] };
    case "airavata": return { svg: ch.airavata({ blink }), box: [-230, -270, 200, 2] };
    case "elephant": return { svg: ch.elephantLotus({ blink }), box: [-240, -270, 200, 2] };
  }
  return { svg: "", box: [0, 0, 1, 1] };
}

/** render actors: walking, shivering, bobbing, a soft shadow drawn into the card at the feet */
export function Actors({ list, f }: { list: Actor[]; f: number }) {
  return (
    <>
      {list.map((a) => {
        const look = actorSVG(a, f);
        let x = a.x, z = a.z, y = a.y ?? 0;
        if (a.walk) { const t = smoother((f - a.walk.f0) / (a.walk.f1 - a.walk.f0)); x = lerp(a.x, a.walk.x1, t); z = lerp(a.z, a.walk.z1, t); if (t > 0 && t < 1) y -= Math.abs(Math.sin(f * 0.3 + hash(a.id))) * 5; }
        if (a.shiver) x += Math.sin(f * 2.1 + hash(a.id)) * 1.6;
        if (a.bob) y -= Math.abs(Math.sin(f * 0.12 + hash(a.id))) * 3;
        const big = a.kind.includes("cow") || a.kind === "airavata" || a.kind === "elephant" || a.kind === "surabhi";
        const sc = (a.s ?? 1) * (1 + 0.006 * Math.sin((f + hash(a.id) * 17) * 0.11));
        return (
          <React.Fragment key={a.id}>
            <Card x={x} y={y} z={z} svg={look.svg} box={look.box} s={sc} blob={a.noShadow || (a.y ?? 0) < -10 ? 0 : (big ? 125 : 66) * (a.s ?? 1)} nearFade flip={a.flip} opacity={a.opacity} tint={a.filter ? tintOf(a.filter) : undefined} />
          </React.Fragment>
        );
      })}
    </>
  );
}

// ---------------------------------------------------------------- village (morning / storm / sunrise)
export const VILLAGE_HOUSES: [number, number, number, number, number, string][] = [
  [-520, -200, 360, 250, -8, "#ecd7ae"], [520, -420, 340, 240, 10, "#f2dfba"], [-560, -820, 380, 260, -4, "#e6cfa2"],
  [560, -1100, 330, 250, 6, "#f0dcb4"], [-540, -1480, 360, 250, -6, "#ead3a6"], [-620, -2700, 380, 260, 0, "#e8d0a4"], [640, -2750, 360, 250, 4, "#efd9b0"],
];
export const ALTAR = { x: 0, z: -2050 };
const altarSVG = (f: number) => {
  const fl = (k: number) => 6 * Math.sin(f * 0.5 + k) + 3 * Math.sin(f * 1.3 + k * 2);
  return `<ellipse cx="0" cy="-60" rx="170" ry="120" fill="url(#halo)" opacity="0.7"/>` +
    `<path d="M -110 0 L -110 -46 L 110 -46 L 110 0 Z" fill="#c7643c" stroke="#2b1a2e" stroke-width="5"/>` +
    Array.from({ length: 5 }, (_, i) => `<path d="M ${-110 + i * 44} -46 L ${-110 + i * 44} 0" stroke="#9a4426" stroke-width="3"/>`).join("") +
    `<path d="M -120 -46 L 120 -46 L 108 -62 L -108 -62 Z" fill="#e07a4a" stroke="#2b1a2e" stroke-width="5"/>` +
    `<path d="M -60 -60 Q ${-70 + fl(1)} -120 -40 -170 Q ${-20 + fl(2)} -130 0 ${-200 + fl(3)} Q ${20 + fl(4)} -130 40 -170 Q ${70 + fl(5)} -120 60 -60 Z" fill="#ff9a2e" stroke="#2b1a2e" stroke-width="4"/>` +
    `<path d="M -32 -60 Q -30 -110 0 ${-150 + fl(6)} Q 30 -110 32 -60 Z" fill="#ffd24a"/><path d="M -12 -60 Q -8 -90 0 ${-110 + fl(7)} Q 8 -90 12 -60 Z" fill="#fff4c4"/>`;
};
const fireSVG = (f: number) => altarSVG(f).replace(/<path d="M -110 0[\s\S]*?<path d="M -120 -46[^>]*>/, "").replace(/translate\(0 0\)/, "");
const offeringsSVG = `<path d="M -150 0 Q -150 -18 -130 -20 L 130 -20 Q 150 -18 150 0 Z" fill="#4f9b46" stroke="#2b1a2e" stroke-width="4"/>` +
  [[-110, "#ffcf3a"], [-70, "#ff8a3d"], [-30, "#f5e6c4"], [10, "#e0582a"], [50, "#ffcf3a"], [90, "#c97a3a"]].map(([x, c]) =>
    `<path d="M ${x} -20 Q ${(x as number) + 18} -62 ${(x as number) + 36} -20 Z" fill="${c}" stroke="#2b1a2e" stroke-width="3"/>` +
    Array.from({ length: 5 }, (_, i) => `<circle cx="${(x as number) + 8 + (i % 3) * 10}" cy="${-30 - Math.floor(i / 3) * 10}" r="6" fill="${c}" stroke="#2b1a2e" stroke-width="2"/>`).join("")).join("") +
  `<path d="M 150 0 L 150 -60 Q 175 -80 200 -60 L 200 0 Z" fill="#d9a12a" stroke="#2b1a2e" stroke-width="4"/><path d="M 155 -66 Q 175 -110 195 -66" stroke="#3aa676" stroke-width="10" fill="none"/>`;

export function VillageSet({ f, actors, weather = "morning", trees = true }: { f: number; actors: Actor[]; weather?: "morning" | "storm" | "sunrise"; trees?: boolean }) {
  const storm = weather === "storm";
  const wind = storm ? 3 * Math.sin(f * 0.21) : 0;
  return (
    <>
      {!storm && <Card x={-900} y={-1500} z={-7000} svg={`<circle cx="0" cy="0" r="160" fill="${weather === "sunrise" ? "#ffd27a" : "#fff4c2"}"/><circle cx="0" cy="0" r="320" fill="url(#halo)"/>`} box={[-340, -340, 340, 340]} s={2} noFog />}
      {Array.from({ length: 6 }, (_, i) => <Cloud3 key={`vc${i}`} x={-3000 + i * 1300 + (storm ? f * 0.8 : f * 0.15)} y={-2000 - rnd(i * 4) * 600} z={-6000} w={1800} seed={60 + i} tone={storm ? "storm" : weather === "sunrise" ? "gold" : "day"} />)}
      <FarHills z={-5600} w={14000} h={1100} col={storm ? "#2f3b55" : "#8fb2c9"} seed={8} count={8} />
      <Hill x={1400} z={-4300} rx={1250} rz={800} h={900} seed={9} tone={storm ? "storm" : "green"} trees={12} rocks={4} />
      <Ground x0={-6000} x1={6000} z0={3000} z1={-4000} svg={storm ? paint.groundStorm : paint.groundDay} vw={400} vh={400} />
      {VILLAGE_HOUSES.map(([x, z, w, h, rot, col], i) => (
        <House key={`h${i}`} x={x} z={z} w={w} d={260} h={h} rh={150} rotY={rot} col={col}
          front={paint.wallTex(w, h, col, 1, i % 2 === 0, i + 1)} back={paint.wallTex(w, h, col, 1, false, i + 2)} side={paint.wallTex(260, h, col, 1, false, i + 3)}
          roofFront={paint.thatchTex(w + 24, 228, 1)} />
      ))}
      {trees && [[-950, -500], [950, -800], [-1000, -1300], [1000, -1700], [-1100, -2400], [180, -3200], [1100, -2400]].map(([x, z], i) => <Tree3 key={`t${i}`} x={x} z={z} s={1.4} seed={i + 3} tone={storm ? "storm" : "day"} sway={wind * (0.6 + 0.4 * rnd(i))} />)}
      <Altar3 x={ALTAR.x} z={ALTAR.z} s={1.2} />
      <Card x={ALTAR.x} y={-2} z={ALTAR.z} svg={fireSVG(f)} box={[-180, -230, 180, 2]} s={1.2} />
      <Card x={ALTAR.x + 260} y={-2} z={ALTAR.z + 60} svg={offeringsSVG} box={[-160, -120, 210, 2]} s={1.1} />
      <Card x={ALTAR.x - 300} y={-2} z={ALTAR.z + 40} svg={offeringsSVG} box={[-160, -120, 210, 2]} s={1.0} flip />
      <Actors list={actors} f={f} />
    </>
  );
}

// ---------------------------------------------------------------- Govardhan meadow (morning / golden / dusk / sunrise / divine)
export const HILL = { x: 0, z: -2200 };
const MEADOW_HILL = paint.hillFront(2600, 1150, 3);
export const MEADOW_GRADE: Record<string, string> = { dusk: "saturate(1.08) sepia(0.1)", golden: "saturate(1.06) sepia(0.1)", divine: "brightness(1.05) saturate(1.08)" };
export const POND = { x: -1500, z: -1000 };
const pondSVG = `<ellipse cx="0" cy="0" rx="360" ry="70" fill="#4aa3c8" stroke="#2b1a2e" stroke-width="5"/><ellipse cx="-60" cy="-10" rx="200" ry="22" fill="#8fd0ec" opacity="0.6"/>` +
  [[-200, 6], [-90, 22], [60, -4], [180, 16], [260, -10]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="34" ry="10" fill="#3e8e41" stroke="#2b1a2e" stroke-width="2"/>`).join("") +
  [[-140, 0], [110, 4], [230, -14]].map(([x, y]) => `<path d="M ${x} ${y} q -12 -6 -10 -20 q 6 4 10 12 q 4 -10 10 -12 q 2 14 -10 20 z" fill="#f48fb1" stroke="#2b1a2e" stroke-width="2"/>`).join("");
const annakutSVG = (f: number) => `<ellipse cx="0" cy="-80" rx="330" ry="220" fill="url(#halo)" opacity="0.55"/>` +
  `<path d="M -260 0 Q -230 -120 -120 -170 Q -40 -250 0 -260 Q 40 -250 120 -170 Q 230 -120 260 0 Z" fill="#f0c25a" stroke="#2b1a2e" stroke-width="6"/>` +
  `<path d="M -200 -40 Q -120 -90 0 -96 Q 120 -90 200 -40" stroke="#e0a03a" stroke-width="12" fill="none"/><path d="M -150 -120 Q -60 -160 0 -164 Q 60 -160 150 -120" stroke="#e8b04a" stroke-width="10" fill="none"/>` +
  Array.from({ length: 26 }, (_, i) => { const a = rnd(i * 3.1), b = rnd(i * 5.7); const x = (a - 0.5) * 420 * (1 - b * 0.6), y = -20 - b * 220; return `<circle cx="${x}" cy="${y}" r="${8 + 6 * rnd(i)}" fill="${["#ffcf3a", "#ff8a3d", "#f5e6c4", "#e0582a", "#ffffff", "#7cc46a"][i % 6]}" stroke="#2b1a2e" stroke-width="2"/>`; }).join("") +
  `<circle cx="0" cy="-268" r="16" fill="#e24a3a" stroke="#2b1a2e" stroke-width="3"/>` +
  Array.from({ length: 9 }, (_, i) => `<g transform="translate(${-240 + i * 60} ${6})">${paint.diya(0.5 + 0.05 * Math.sin(f * 0.3 + i))}</g>`).join("");
export const MEADOW_SKY: Record<string, string> = {
  morning: "linear-gradient(180deg, #3f86d6 0%, #8cbcec 42%, #dcecf8 62%, #f4f0dc 75%)",
  golden: "linear-gradient(180deg, #6a4f8c 0%, #c98aa0 35%, #ffc98a 60%, #ffe2b0 75%)",
  dusk: "linear-gradient(180deg, #2a2a5e 0%, #6a4f8c 40%, #e88a6a 66%, #ffc07a 78%)",
  sunrise: "linear-gradient(180deg, #5f8fd6 0%, #b6c8ec 40%, #ffd8a8 64%, #fff0d0 76%)",
  divine: "linear-gradient(180deg, #8a6fd0 0%, #f0b0c8 35%, #ffe0a0 60%, #fff4d8 76%)",
};
export function MeadowSet({ f, actors, time = "morning", divineForm = 0, annakut = 0, pond = true, sunY = -1500 }: { f: number; actors: Actor[]; time?: keyof typeof MEADOW_SKY; divineForm?: number; annakut?: number; pond?: boolean; sunY?: number }) {
  const warm = time === "golden" || time === "dusk" || time === "divine";
  const tint = time === "dusk" ? "brightness(0.82) saturate(1.1) sepia(0.15)" : time === "golden" ? "saturate(1.08) sepia(0.12)" : time === "divine" ? "brightness(1.06) saturate(1.1)" : undefined;
  return (
    <>
      <Card x={time === "dusk" ? 1800 : -900} y={time === "dusk" ? -600 : sunY} z={-7000} svg={`<circle cx="0" cy="0" r="160" fill="${warm ? "#ffcf7a" : "#fff4c2"}"/><circle cx="0" cy="0" r="340" fill="url(#halo)"/>`} box={[-360, -360, 360, 360]} s={2} noFog />
      {Array.from({ length: 6 }, (_, i) => <Cloud3 key={`mc${i}`} x={-3000 + i * 1300 + f * 0.15} y={-2100 - rnd(i * 4) * 600} z={-6400} w={1800} seed={70 + i} tone={warm ? "gold" : "day"} />)}
      <FarHills z={-6200} w={14000} h={1000} col={time === "dusk" ? "#5a4f7a" : warm ? "#b49aa8" : "#8fb2c9"} seed={11} count={8} />
      <Ground x0={-6000} x1={6000} z0={3000} z1={-7000} svg={paint.groundDay} vw={400} vh={400} />
      <Hill x={HILL.x} z={HILL.z - 600} rx={1350} rz={700} h={1150} seed={3} trees={16} rocks={6} />
      {divineForm > 0 && <Card x={HILL.x} y={-40} z={HILL.z + 300} svg={`<ellipse cx="0" cy="-220" rx="300" ry="330" fill="url(#halo)"/>` + ch.boy({ ...KRISHNA, expr: "smile", blink: blinkAt(f, 99) })} box={[-320, -560, 320, 2]} s={4.2 * (0.85 + 0.15 * divineForm)} opacity={divineForm} K={1} extraFilter="brightness(1.15)" noBlur />}
      {pond && <Disc x={POND.x} z={POND.z} rx={380} rz={200} color="#4aa3c8" />}
      {pond && [[-200, 30], [-90, 80], [60, -20], [180, 60], [260, -40]].map(([x, z], i) => <Disc key={`lp${i}`} x={POND.x + x} z={POND.z + z} y={-2} rx={34} rz={22} color="#3e8e41" />)}
      {[[-1500, -2600], [1700, -2500], [-2100, -1600], [2000, -1400], [-900, -3600], [1000, -3700]].map(([x, z], i) => <Tree3 key={`mt${i}`} x={x} z={z} s={1.5} seed={i + 21} />)}
      {annakut > 0 && <Card x={HILL.x} y={-2} z={HILL.z + 900} svg={annakutSVG(f)} box={[-340, -340, 340, 30]} s={1} opacity={annakut} />}
      <Actors list={actors} f={f} />
    </>
  );
}

// ---------------------------------------------------------------- Indra's golden court in the clouds
const pillarSVG = `<path d="M -40 0 L -40 -560 L 40 -560 L 40 0 Z" fill="#f2c45a" stroke="#2b1a2e" stroke-width="5"/><path d="M -24 0 L -24 -560 M 0 0 L 0 -560 M 24 0 L 24 -560" stroke="#d99a2a" stroke-width="4"/>` +
  `<path d="M -60 -560 L 60 -560 L 52 -600 L -52 -600 Z" fill="#ffd97a" stroke="#2b1a2e" stroke-width="5"/><path d="M -60 0 L 60 0 L 52 -30 L -52 -30 Z" fill="#ffd97a" stroke="#2b1a2e" stroke-width="5"/>`;
const throneSVG = `<path d="M -150 0 L -150 -170 Q -150 -330 0 -360 Q 150 -330 150 -170 L 150 0 Z" fill="#e8b13a" stroke="#2b1a2e" stroke-width="6"/>` +
  `<path d="M -110 -10 L -110 -170 Q -110 -290 0 -312 Q 110 -290 110 -170 L 110 -10 Z" fill="#c0263a" stroke="#2b1a2e" stroke-width="4"/>` +
  `<path d="M -170 -110 L 170 -110 L 160 -80 L -160 -80 Z" fill="#ffd97a" stroke="#2b1a2e" stroke-width="5"/><circle cx="0" cy="-300" r="14" fill="#2f7fd6" stroke="#2b1a2e" stroke-width="3"/>`;
export function SkyCourt({ f, actors, storming = 0, memory = false }: { f: number; actors: Actor[]; storming?: number; memory?: boolean }) {
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => <Cloud3 key={`kc${i}`} x={-2800 + i * 800} y={-470 - rnd(i * 2) * 500} z={-3400 - rnd(i) * 800} w={1500} seed={80 + i} tone="gold" />)}
      <Ground x0={-3000} x1={3000} z0={1600} z1={-2600} y={0} svg={`<rect width="400" height="400" fill="#fff1d6"/>` + Array.from({ length: 40 }, (_, i) => `<circle cx="${(i * 97) % 400}" cy="${(i * 61) % 400}" r="${16 + (i % 5) * 6}" fill="#ffe3b0" opacity="0.8"/>`).join("")} vw={400} vh={400} />
      {[[-700, -900], [700, -900], [-700, -300], [700, -300], [-700, 300], [700, 300]].map(([x, z], i) => <Pillar3 key={`p${i}`} x={x} z={z} h={600} />)}
      <Card x={0} y={-2} z={-1200} svg={throneSVG} box={[-175, -365, 175, 2]} s={1.3} />
      {Array.from({ length: 6 }, (_, i) => <Cloud3 key={`kf${i}`} x={-1300 + i * 520} y={60} z={1700 - (i % 2) * 200} w={700} seed={90 + i} tone="gold" />)}
      {/* storm clouds gathering in front (commanded by Indra) */}
      {storming > 0 && Array.from({ length: 7 }, (_, i) => <Cloud3 key={`ks${i}`} x={-1500 + i * 500} y={-330 - (i % 3) * 140} z={lerp(-2600, 200, storming) - i * 160} w={1080} seed={110 + i} tone="storm" op={clamp01(storming * 2)} />)}
      <Actors list={actors} f={f} />
    </>
  );
}

// ---------------------------------------------------------------- the lifted-hill storm world (from the pilot)
export const TIP = ch.boyHandPos({}, -1, LIFT.L);
export const ROOT_LEN = 250, CEIL = TIP.tipY - ROOT_LEN, HILL_CENTER_X = 220;
const HILL_FRONT = paint.hillFront(2600, 1150, 3);
export const INDRA_POS = { x: 620, y: -3050, z: -1900 };
export const POTHI_POS = { x: 120, y: -1480, z: 820 };
export function StormWorld({ f, actors, golden = 0, rootDrop = 1, rain = true, pothi = 0, indra = true, flashes = [] as number[], sunny = 0, clouds = 1 }: {
  f: number; actors: Actor[]; golden?: number; rootDrop?: number; rain?: boolean; pothi?: number; indra?: boolean; flashes?: number[]; sunny?: number; clouds?: number }) {
  const lit = (base: number) => `brightness(${(base + 0.35 * golden + 0.25 * sunny).toFixed(3)})`;
  return (
    <>
      {Array.from({ length: 9 }, (_, i) => (
        <Cloud3 key={`sc${i}`} x={-3600 + i * 900 + rnd(i) * 300} y={-1900 - rnd(i * 2) * 900} z={-5200 - rnd(i * 3) * 1200} w={2400} seed={i + 1} tone={(golden > 0.5 && i % 3 === 0) || sunny > 0.5 ? "gold" : "storm"} op={clouds} />
      ))}
      <FarHills z={-4600} w={12000} h={900} col={sunny > 0.5 ? "#7f9bb8" : "#26304a"} seed={2} count={7} />
      <FarHills z={-2900} w={8000} h={520} col={sunny > 0.5 ? "#6f8e7a" : "#2f3d4c"} seed={5} count={6} />
      <Ground x0={-6000} x1={6000} z0={3200} z1={-4000} svg={sunny > 0.5 ? paint.groundDay : paint.groundStorm} vw={400} vh={400} />
      {rain && <Card x={HILL_CENTER_X} y={-2} z={-1250} svg={`<g opacity="0.7" transform="translate(-2500 -1600)">${paint.rainSVG(f, 5000, 1600, 420, 60, -12, 0.6).replace(/<\/?svg[^>]*>/g, "")}</g>`} box={[-2500, -1600, 2500, 0]} s={1} noBlur K={1} />}
      <Hill x={HILL_CENTER_X} y={CEIL} z={-425} rx={1250} rz={760} h={1150} under={25} seed={3} tone={sunny > 0.5 ? "green" : "storm"} trees={12} rocks={5} />
      {rootDrop > 0 && <Root3 tipX={TIP.tipX} tipY={TIP.tipY - (1 - rootDrop) * (ROOT_LEN - 4)} ceil={CEIL + 20} z={-6} />}
      {[[-240, -90], [300, -60], [-620, -560], [680, -620], [60, -760]].map(([x, z], i) => <Card key={`d${i}`} x={x} y={-2} z={z} svg={paint.diya(1 + 0.08 * Math.sin(f * 0.3 + i))} box={paint.diyaBox} s={1.2} opacity={1 - sunny} />)}
      <Actors list={actors} f={f} />
      {Array.from({ length: 10 }, (_, i) => (
        <Cloud3 key={`mc${i}`} x={-1400 + i * 420 + rnd(i * 5) * 200} y={-1900 - i * 130 - rnd(i * 7) * 400} z={-900 - rnd(i * 9) * 1400} w={1170} seed={20 + i} tone={golden > 0.3 && i % 2 ? "gold" : "storm"} op={clouds} />
      ))}
      {indra && <Cloud3 x={INDRA_POS.x + 40} y={INDRA_POS.y + 110} z={INDRA_POS.z - 330} w={1100} seed={41} tone="dark" op={clouds} />}
      {flashes.filter((fl) => f >= fl && f < fl + 6).map((fl) => <Card key={`b${fl}`} x={INDRA_POS.x + 300 + (fl % 7) * 60} y={INDRA_POS.y + 120} z={INDRA_POS.z + 200} svg={paint.bolt(1500, fl)} box={[-400, -10, 400, 1600]} s={1} noBlur K={1} />)}
      {indra && <Cloud3 x={INDRA_POS.x - 220} y={INDRA_POS.y + 150} z={INDRA_POS.z + 340} w={800} seed={43} tone="storm" op={clouds} />}
      {pothi > 0 && <Cloud3 x={POTHI_POS.x} y={POTHI_POS.y + 150} z={POTHI_POS.z - 260} w={1200} seed={51} tone="gold" op={pothi} />}
      {pothi > 0 && <Card x={POTHI_POS.x} y={POTHI_POS.y} z={POTHI_POS.z} svg={paint.pothi} box={[-340, -180, 340, 180]} s={1.1} opacity={pothi} />}
    </>
  );
}

/** screen overlays shared by scenes */
export const Rain = ({ f, W, H, op = 0.9, hail = false, density = 300 }: { f: number; W: number; H: number; op?: number; hail?: boolean; density?: number }) => (
  <Overlay style={{ opacity: op }}>
    <div dangerouslySetInnerHTML={{ __html: paint.rainSVG(f, W, H, density, 52, -12, 0.55).replace("</svg>", hail ? Array.from({ length: 60 }, (_, i) => `<circle cx="${(rnd(i * 4.4) * W + f * 3) % W}" cy="${(rnd(i * 2.2) * H + f * (30 + 20 * rnd(i))) % H}" r="${3 + 3 * rnd(i * 6.6)}" fill="#f4f8ff" opacity="0.85"/>`).join("") + "</svg>" : "</svg>") }} />
  </Overlay>
);
export { Stage, Overlay };
