// FULL VIDEO: "Krishna Ne Indra Ko Saza Kyun Nahi Di?" — 45 lines, timed to the voiceover (lines.json from Whisper).
// Segments switch sets; inside a segment the camera glides between beats (no cuts). Transitions between segments:
// whip (blur), dissolve, flash (gold) or cut (only for flashbacks / realm jumps).
import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Cam, camPath, clamp01, lerp, smoother, rnd, LIGHTS } from "./stage";
import { Stage, Overlay, VillageSet, MeadowSet, SkyCourt, StormWorld, Rain, Actor, LIFT, PRANAM, POINT_UP, TIP, CEIL, INDRA_POS, POTHI_POS, HILL, POND, ALTAR, MEADOW_GRADE } from "./sets";
import { raysSVG } from "./paint";
import LINES from "./lines.json";
import { fixActors, shotKeys } from "./framing";

export const FPS = 30;
const LN = LINES as { id: string; start: number; end: number }[];
export const TOTAL = Math.ceil(10495);
/** frame at a fraction of line n (1-based) */
export const F = (n: number, frac = 0) => { const l = LN[n - 1]; return Math.round((l.start + (l.end - l.start) * frac) * FPS); };
const E = (n: number) => F(n, 1);

type Seg = {
  id: string; from: number; to: number; set: "storm" | "village" | "meadow" | "court";
  keys: { f: number; cam: Cam }[]; actors: (f: number) => Actor[]; params?: (f: number) => any; trans?: "whip" | "dissolve" | "flash" | "cut";
  focus?: (f: number, cam: Cam) => number; cInf?: number; grade?: (f: number) => string; overlay?: (f: number, W: number, H: number) => React.ReactNode;
};

// ---------------------------------------------------------------- reusable casts
const shelterCast = (f: number, walkIn?: [number, number], walkOut?: [number, number], kExpr = "calm", kPose: any = LIFT): Actor[] => {
  const w = (id: string, x: number, z: number, ox: number, oz: number): Partial<Actor> =>
    walkIn ? { x: x < 0 ? x - 1500 : x + 1500, z, walk: { x1: x, z1: z, f0: walkIn[0], f1: walkIn[1] } } : walkOut ? { x, z, walk: { x1: x < 0 ? x - 1500 : x + 1500, z1: z, f0: walkOut[0], f1: walkOut[1] } } : { x, z };
  return [
    { id: "yashoda", kind: "yashoda", expr: "smile", ...w("yashoda", -540, -260, -300, 900) } as Actor,
    { id: "g1", kind: "g1", expr: "happy", ...w("g1", 540, -220, 400, 950) } as Actor,
    { id: "g2", kind: "g2", expr: "smile", ...w("g2", 760, -460, 700, 1000) } as Actor,
    { id: "g3", kind: "g3", expr: "surprise", ...w("g3", -760, -520, -600, 1050) } as Actor,
    { id: "sakha", kind: "sakha", expr: "happy", ...w("sakha", 200, -600, 200, 1100) } as Actor,
    { id: "nanda", kind: "nanda", expr: "smile", ...w("nanda", -280, -660, -100, 1150) } as Actor,
    { id: "cow1", kind: "cow", ...w("cow1", -980, -200, -900, 1000) } as Actor,
    { id: "cow2", kind: "cowBrown", flip: true, ...w("cow2", 900, -320, 950, 900) } as Actor,
    { id: "calf", kind: "cow", s: 0.62, ...w("calf", -700, -60, -650, 1200) } as Actor,
    { id: "krishna", kind: "krishna", x: 0, z: 0, expr: kExpr, pose: kPose },
  ];
};
const STORM_FLASHES = (a: number, b: number) => Array.from({ length: Math.floor((b - a) / 70) }, (_, i) => a + 20 + i * 70 + Math.floor(rnd(i * 3.3) * 30));

// ---------------------------------------------------------------- segments
export function buildSegments(): Seg[] {
  const S: Seg[] = [];
  // A. cold open (pilot): storm world L01-L04 -> golden dissolve into the morning (handled by B's dissolve)
  const A_FLASH = [118, 292, 318, 352, 694];
  S.push({
    id: "A-storm", from: 0, to: F(5) - 20, set: "storm",
    keys: [
      { f: 0, cam: { x: -30, y: -300, z: 560, fov: 30 } }, { f: 52, cam: { x: -20, y: -320, z: 600, pitch: 3, fov: 31 } },
      { f: 112, cam: { x: 120, y: -420, z: 1700, pitch: 6, fov: 36 } }, { f: 160, cam: { x: 200, y: -470, z: 2350, pitch: 7, fov: 38 } },
      { f: 172, cam: { x: 560, y: -175, z: 760, yaw: 9, fov: 34 } }, { f: 214, cam: { x: -380, y: -175, z: 720, yaw: -7, fov: 34 } },
      { f: 226, cam: { x: -30, y: -250, z: 640, fov: 32 } }, { f: 260, cam: { x: -20, y: -255, z: 600, fov: 32 } },
      { f: 272, cam: { x: INDRA_POS.x - 120, y: INDRA_POS.y - 230, z: INDRA_POS.z + 1500, fov: 32 } }, { f: 330, cam: { x: INDRA_POS.x - 110, y: INDRA_POS.y - 260, z: INDRA_POS.z + 1300, fov: 32 } },
      { f: 338, cam: { x: INDRA_POS.x - 60, y: INDRA_POS.y - 400, z: INDRA_POS.z + 620, fov: 30 } }, { f: 380, cam: { x: INDRA_POS.x - 50, y: INDRA_POS.y - 410, z: INDRA_POS.z + 560, fov: 30 } },
      { f: 392, cam: { x: -25, y: -250, z: 470, fov: 30 } }, { f: 438, cam: { x: -20, y: -255, z: 440, fov: 30 } },
      { f: 452, cam: { x: 150, y: -1150, z: 1900, pitch: 16, fov: 38 } }, { f: 500, cam: { x: 160, y: -1200, z: 1850, pitch: 17, fov: 38 } },
      { f: 512, cam: { x: 0, y: -222, z: 330, fov: 28 } }, { f: 560, cam: { x: 0, y: -222, z: 300, fov: 28 } },
      { f: 572, cam: { x: 90, y: -200, z: 980, fov: 34 } }, { f: 608, cam: { x: 90, y: -205, z: 930, fov: 34 } },
      { f: 618, cam: { x: 20, y: -110, z: 520, pitch: 12, fov: 32 } }, { f: 668, cam: { x: 20, y: -115, z: 490, pitch: 12, fov: 32 } },
      { f: 680, cam: { x: INDRA_POS.x + 90, y: INDRA_POS.y - 300, z: INDRA_POS.z + 950, yaw: 5, fov: 30 } }, { f: 728, cam: { x: INDRA_POS.x + 80, y: INDRA_POS.y - 310, z: INDRA_POS.z + 880, yaw: 5, fov: 30 } },
      { f: 740, cam: { x: -560, y: -180, z: 780, yaw: -10, fov: 34 } }, { f: 783, cam: { x: -120, y: -200, z: 700, yaw: -3, fov: 33 } },
      { f: 800, cam: { x: POTHI_POS.x, y: POTHI_POS.y + 10, z: POTHI_POS.z + 900, fov: 34 } }, { f: 856, cam: { x: POTHI_POS.x, y: POTHI_POS.y + 5, z: POTHI_POS.z + 760, fov: 34 } },
      { f: 940, cam: { x: POTHI_POS.x, y: POTHI_POS.y, z: POTHI_POS.z + 110, fov: 34 } },
    ],
    actors: (f) => {
      const cowIn = smoother((f - 560) / 46);
      const c = shelterCast(f, undefined, undefined, f >= 612 && f < 668 ? "surprise" : "calm");
      const cow2 = c.find((a) => a.id === "cow2")!; cow2.x = lerp(900, 250, cowIn); cow2.z = lerp(-320, 70, cowIn);
      const calf = c.find((a) => a.id === "calf")!; calf.x = lerp(-700, -210, cowIn); calf.z = lerp(-60, 80, cowIn);
      const k = c.find((a) => a.id === "krishna")!; if (f >= 612 && f < 668) k.tilt = -6;
      return c.concat([{ id: "indraA", kind: "indraAir", x: INDRA_POS.x, y: INDRA_POS.y, z: INDRA_POS.z, s: 1.15, expr: f > 330 && f < 380 ? "shout" : "angry", opts: { vajraUp: 1 }, noShadow: true }]);
    },
    params: (f) => ({ golden: clamp01((f - 450) / 60) * (1 - clamp01((f - 612) / 30)), pothi: clamp01((f - 770) / 24), flashes: A_FLASH }),
    focus: (f, cam) => Math.max(300, cam.z - (f >= 790 ? POTHI_POS.z : cam.y < -1500 ? INDRA_POS.z : 0)),
  });

  // B. village morning L05-L11 (with L10's meadow beats as segment C)
  const vA = (id: string, kind: string, x: number, z: number, o: Partial<Actor> = {}): Actor => ({ id, kind, x, z, ...o });
  const villageCast = (f: number): Actor[] => [
    vA("g1", "g1", -160, 120, { expr: "happy", walk: { x1: -260, z1: -560, f0: F(5), f1: F(5) + 170 } }),
    vA("g3p", "g3pot", 120, -80, { expr: "smile", walk: { x1: 260, z1: -760, f0: F(5), f1: F(5) + 170 } }),
    vA("g2", "g2", 300, -600, { prop: "potHip", expr: "smile", walk: { x1: -760, z1: -1650, f0: F(5), f1: F(6, 0.5) } }),
    vA("cow1", "cow", -300, -900), vA("calfv", "cowBrown", 380, -260, { flip: true, s: 0.62 }),
    vA("nanda", "nanda", 90, -1880, { expr: f >= F(11) ? "surprise" : "smile", talk: [F(8, 0.05), E(8)], pose: f >= F(8, 0.35) && f < F(8, 0.62) ? POINT_UP : undefined }),
    vA("sakha", "sakha", 360, -1960, { expr: f >= F(11) ? "surprise" : "happy", bob: f < F(7) }),
    vA("sakha2", "sakha2", -380, -1990, { expr: f >= F(11) ? "surprise" : "happy", bob: f < F(7) }),
    vA("yashoda", "yashoda", -620, -1760, { walk: { x1: 180, z1: -1550, f0: F(10, 0.82), f1: F(11) }, expr: f >= F(11) ? "happy" : "smile" }),
    vA("g1b", "g1", 720, -1900, { expr: f >= F(11) ? "surprise" : "smile" }),
    vA("krishna", "krishna", -120, -1840, { expr: f >= F(9) && f < F(9, 0.4) ? "calm" : "smile", talk: f >= F(7) && f < E(7) ? [F(7, 0.3), E(7)] : [F(9, 0.4), E(10)], tilt: f >= F(7) && f < E(7) ? -8 : 0,
      pose: f >= F(10, 0.85) && f < E(10) ? { L: { a: 95, b: -10, l1: 30, l2: 28 }, R: { a: 95, b: -10, l1: 30, l2: 28 } } : undefined }),
  ];
  S.push({
    id: "B-village", from: F(5) - 20, to: F(10, 0.05), set: "village", trans: "flash",
    keys: [
      { f: F(5) - 20, cam: { x: 0, y: -1250, z: 2600, pitch: -16, fov: 38 } }, { f: F(5, 0.45), cam: { x: 40, y: -900, z: 1700, pitch: -14, fov: 38 } },
      { f: F(5, 0.55), cam: { x: -60, y: -210, z: 900, yaw: -6, fov: 34 } }, { f: F(5, 0.9), cam: { x: -20, y: -210, z: 520, yaw: -4, fov: 34 } },
      { f: F(6), cam: { x: 0, y: -720, z: -300, pitch: -15, fov: 36 } }, { f: F(6, 0.55), cam: { x: 0, y: -680, z: -520, pitch: -14, fov: 36 } },           // down the lane to the altar
      { f: F(6, 0.65), cam: { x: 260, y: -240, z: -1350, yaw: 10, fov: 32 } }, { f: E(6), cam: { x: 180, y: -240, z: -1420, yaw: 6, fov: 32 } }, // busy line of offerings
      { f: F(7), cam: { x: -60, y: -230, z: -1430, fov: 30 } }, { f: E(7), cam: { x: -70, y: -225, z: -1480, fov: 30 } },                  // Krishna tugs Nanda
      { f: F(8), cam: { x: 70, y: -260, z: -1480, yaw: 4, fov: 30 } }, { f: F(8, 0.35), cam: { x: 80, y: -330, z: -1380, pitch: 7, fov: 34 } }, // follow Nanda's finger up
      { f: F(8, 0.62), cam: { x: 60, y: -380, z: -1300, pitch: 9, fov: 36 } }, { f: F(8, 0.72), cam: { x: -300, y: -170, z: -420, fov: 32 } }, // grass, cows
      { f: E(8), cam: { x: -290, y: -168, z: -470, fov: 32 } },
      { f: F(9), cam: { x: -130, y: -225, z: -1540, fov: 30 } }, { f: F(9, 0.45), cam: { x: -120, y: -230, z: -1560, fov: 30 } },        // Krishna thoughtful
      { f: F(9, 0.55), cam: { x: 60, y: -600, z: -900, yaw: 6, pitch: -8, fov: 34 } }, { f: E(9), cam: { x: 120, y: -580, z: -1000, yaw: 8, pitch: -7, fov: 34 } }, // over the roofs toward the distant hill
    ],
    actors: villageCast,
    params: () => ({ weather: "morning" }),
    focus: (f, cam) => (f < F(6) ? Math.max(400, cam.z + 200) : f >= F(11, 0.6) && f < F(12) ? 320 : Math.max(300, cam.z + 1860)), cInf: 8,
  });
  // C. meadow quick beats for L10 (grass, waterfall, cows drinking, brahmana) then back to Krishna in the village (C2)
  const meadowCows = (f: number): Actor[] => [
    { id: "mc1", kind: "cow", x: -520, z: -900 }, { id: "mc2", kind: "cowBrown", x: 420, z: -1150, flip: true }, { id: "mc3", kind: "cow", x: 950, z: -700, flip: true, s: 0.62 },
    { id: "mc4", kind: "cowBrown", x: -1100, z: -1350 }, { id: "brah", kind: "brahmana", x: -200, z: -1500, expr: "calm", prop: "none" },
  ];
  S.push({
    id: "C-meadow", from: F(10, 0.05), to: F(10, 0.82), set: "meadow", trans: "whip",
    keys: [
      { f: F(10, 0.05), cam: { x: -500, y: -160, z: -300, pitch: -6, fov: 32 } }, { f: F(10, 0.25), cam: { x: -420, y: -170, z: -420, pitch: -6, fov: 32 } },   // grass + grazing cow
      { f: F(10, 0.33), cam: { x: 420, y: -600, z: 200, pitch: 6, fov: 34 } }, { f: F(10, 0.52), cam: { x: 440, y: -640, z: 120, pitch: 7, fov: 34 } },       // the stream on the hill
      { f: F(10, 0.58), cam: { x: 520, y: -200, z: -500, yaw: -8, fov: 32 } }, { f: F(10, 0.68), cam: { x: 480, y: -200, z: -560, yaw: -8, fov: 32 } },     // cows
      { f: F(10, 0.72), cam: { x: -200, y: -270, z: -940, fov: 30 } }, { f: F(10, 0.82), cam: { x: -200, y: -272, z: -980, fov: 30 } },                         // brahmana
    ],
    actors: meadowCows, params: () => ({ time: "morning" }), cInf: 8, focus: (f, cam) => cam.z + 700,
  });
  S.push({
    id: "C2-village", from: F(10, 0.82), to: F(12), set: "village", trans: "whip",
    keys: [
      { f: F(10, 0.82), cam: { x: -120, y: -240, z: -1480, fov: 32 } }, { f: E(10), cam: { x: -120, y: -245, z: -1460, fov: 32 } },                       // Krishna, open arms
      { f: F(11), cam: { x: -150, y: -260, z: -1420, yaw: -10, fov: 32 } }, { f: F(11, 0.45), cam: { x: 150, y: -260, z: -1460, yaw: 10, fov: 32 } },   // surprised faces
      { f: F(11, 0.6), cam: { x: 180, y: -290, z: -1250, fov: 30 } }, { f: E(11), cam: { x: 180, y: -292, z: -1280, fov: 30 } },                        // Yashoda smiles
    ],
    actors: villageCast, params: () => ({ weather: "morning" }), cInf: 8, focus: (f, cam) => (f >= F(11, 0.6) ? cam.z + 1550 : cam.z + 1840),
  });

  // D. meadow: procession, annakut, parikrama, hush, divine form, bowing, Indra watching (L12-L16 middle)
  const parikrama = (f: number, i: number, r: number) => { const a = (f - F(12, 0.55)) * 0.006 + (i * Math.PI * 2) / 8; return { x: Math.sin(a) * r, z: HILL.z + 300 + Math.cos(a) * r * 0.5 }; };
  const procCast = (f: number): Actor[] => {
    const walking = f < F(12, 0.55), bow = f >= F(15) && f < F(15, 0.62);
    const people: [string, string][] = [["g1", "g1"], ["g2", "g2"], ["g3", "g3"], ["yashoda", "yashoda"], ["nanda", "nanda"], ["sakha", "sakha"], ["sakha2", "sakha2"], ["brah", "brahmana"]];
    const list: Actor[] = people.map(([id, kind], i) => {
      const base: Actor = { id, kind, x: -700 + i * 200, z: -400 - (i % 3) * 90, expr: f >= F(14) && f < F(15) ? "surprise" : "smile" };
      if (walking) return { ...base, x: -900 + i * 190, z: 400 - (i % 3) * 90, walk: { x1: -700 + i * 200, z1: -400 - (i % 3) * 90, f0: F(12), f1: F(12, 0.55) } };
      if (f < F(13)) { const p = parikrama(f, i, 900); return { ...base, ...p, bob: true }; }
      return { ...base, ...(bow ? { prop: kind.startsWith("g") || kind === "yashoda" ? "pray" : undefined, pose: kind.startsWith("g") || kind === "yashoda" ? undefined : PRANAM, expr: "calm" } : {}) };
    });
    list.push({ id: "krishna", kind: "krishna", x: 80, z: -300, expr: bow ? (f > F(15, 0.62) ? "wink" : "calm") : f >= F(14) ? "smile" : "happy", pose: bow ? PRANAM : undefined,
      tilt: f > F(15, 0.62) && f < E(15) ? 8 : 0 });
    list.push({ id: "pc1", kind: "cow", x: -1200, z: -1100 }, { id: "pc2", kind: "cowBrown", x: 1150, z: -1000, flip: true }, { id: "pc3", kind: "cow", x: 700, z: -1250, flip: true, s: 0.62 });
    return list;
  };
  S.push({
    id: "D-meadow", from: F(12), to: F(16, 0.35), set: "meadow", trans: "whip",
    keys: [
      { f: F(12), cam: { x: -600, y: -260, z: 1300, yaw: -6, fov: 34 } }, { f: F(12, 0.28), cam: { x: -300, y: -300, z: 900, yaw: -3, fov: 34 } },          // procession
      { f: F(12, 0.36), cam: { x: 0, y: -1100, z: -300, pitch: -45, fov: 34 } }, { f: F(12, 0.52), cam: { x: 40, y: -1050, z: -360, pitch: -44, fov: 34 } },                // annakut mound
      { f: F(12, 0.58), cam: { x: 0, y: -2300, z: 1900, pitch: -38, fov: 40 } }, { f: E(12), cam: { x: 300, y: -2300, z: 1700, pitch: -38, yaw: 6, fov: 40 } }, // aerial parikrama
      { f: F(13), cam: { x: 0, y: -330, z: 1300, pitch: 4, fov: 34 } }, { f: E(13), cam: { x: 0, y: -350, z: 1000, pitch: 5, fov: 34 } },                      // hush: push to the hill
      { f: F(14), cam: { x: 0, y: -700, z: 1700, pitch: 10, fov: 42 } }, { f: F(14, 0.6), cam: { x: 0, y: -900, z: 1600, pitch: 12, fov: 42 } },           // divine form rises
      { f: E(14), cam: { x: 0, y: -950, z: 1550, pitch: 12, fov: 42 } },
      { f: F(15), cam: { x: -200, y: -240, z: 500, yaw: -8, fov: 32 } }, { f: F(15, 0.55), cam: { x: 60, y: -230, z: 380, fov: 30 } },                      // crowd bowing -> Krishna
      { f: F(15, 0.62), cam: { x: 80, y: -225, z: 200, fov: 28 } }, { f: E(15), cam: { x: 80, y: -225, z: 170, fov: 28 } },                                // the wink
      { f: F(16), cam: { x: 0, y: -900, z: 400, pitch: 30, fov: 40 } }, { f: F(16, 0.35), cam: { x: 0, y: -2600, z: 300, pitch: 40, fov: 44 } },            // fly up through the clouds
    ],
    actors: procCast,
    params: (f) => ({ time: f >= F(13) && f < E(14) ? "golden" : "morning", divineForm: clamp01((f - F(14)) / 40) * (1 - clamp01((f - F(15, 0.5)) / 30)), annakut: clamp01((f - F(12, 0.3)) / 20) }),
    cInf: 7, focus: (f, cam) => (f >= F(14) && f < E(14) ? cam.z - HILL.z : f >= F(12, 0.36) && f < F(12, 0.55) ? cam.z - (HILL.z + 900) : cam.z + 350),
  });

  // E. Indra's court: watching (L16 end), fury (L17), command (L18)
  S.push({
    id: "E-court", from: F(16, 0.35), to: E(18), set: "court", trans: "flash",
    keys: [
      { f: F(16, 0.35), cam: { x: 0, y: -260, z: 900, fov: 34 } }, { f: E(16), cam: { x: 0, y: -280, z: 600, fov: 32 } },                                 // Indra watching, smile freezing
      { f: F(17), cam: { x: 60, y: -300, z: 380, fov: 30 } }, { f: F(17, 0.12), cam: { x: 60, y: -300, z: 330, fov: 30 } },                                // the slam (kick)
      { f: F(17, 0.5), cam: { x: 40, y: -300, z: 300, fov: 28 } }, { f: E(17), cam: { x: 40, y: -300, z: 280, fov: 28 } },
      { f: F(18), cam: { x: -300, y: -320, z: 700, yaw: -10, fov: 34 } }, { f: F(18, 0.55), cam: { x: -200, y: -340, z: 900, yaw: -6, fov: 36 } },        // points down: clouds roll
      { f: E(18), cam: { x: 0, y: -300, z: 1500, pitch: -10, fov: 38 } },
    ],
    actors: (f) => [{ id: "indra", kind: "indra", x: 0, z: -900, expr: f < E(16, ) - 10 ? "smile" : "angry", talk: [F(17, 0.25), E(18)], shout: true,
      opts: { vajraRot: f >= F(18) ? -60 : 10 }, tilt: f >= F(17) && f < F(17, 0.12) ? 4 : 0 }],
    params: (f) => ({ storming: clamp01((f - F(18, 0.2)) / (E(18) - F(18, 0.2))) }),
    cInf: 6, focus: (f, cam) => cam.z + 900,
  });

  // F. storm over the village (L19-L21)
  const stormVillage = (f: number): Actor[] => [
    { id: "cow1", kind: "cow", x: -230, z: -2640, shiver: true }, { id: "calf", kind: "cowBrown", x: -60, z: -2600, s: 0.62, shiver: true, flip: true },
    { id: "cow2", kind: "cowBrown", x: 200, z: -2680, shiver: true, flip: true },
    { id: "g1", kind: "g1", x: -500, z: -300, expr: "surprise", walk: { x1: -180, z1: -1500, f0: F(20, 0.55), f1: E(20) + 20 } },
    { id: "g2", kind: "g2", x: 420, z: -200, expr: "sad", walk: { x1: 120, z1: -1500, f0: F(20, 0.5), f1: E(20) + 10 } },
    { id: "yashoda", kind: "yashoda", x: -60, z: -350, expr: "surprise", walk: { x1: -320, z1: -1620, f0: F(20, 0.55), f1: E(20) + 30 } },
    { id: "sakha", kind: "sakha", x: 200, z: -420, expr: "surprise", walk: { x1: 260, z1: -1650, f0: F(20, 0.6), f1: E(20) + 30 } },
    { id: "krishna", kind: "krishna", x: 0, z: -1900, expr: f >= F(21) ? "smile" : "calm" },
  ];
  const F_FLASH = STORM_FLASHES(F(19), E(21));
  S.push({
    id: "F-storm-village", from: E(18), to: F(22), set: "village", trans: "dissolve",
    keys: [
      { f: E(18), cam: { x: 0, y: -1400, z: 2400, pitch: -20, fov: 40 } }, { f: F(19), cam: { x: 0, y: -900, z: 1900, pitch: -14, fov: 38 } },          // clouds roll over the village
      { f: F(19, 0.6), cam: { x: 200, y: -700, z: 1500, pitch: -10, fov: 38 } }, { f: E(19), cam: { x: 240, y: -650, z: 1400, pitch: -9, fov: 38 } },
      { f: F(20), cam: { x: -70, y: -210, z: -2130, pitch: -16, fov: 34 } }, { f: F(20, 0.4), cam: { x: -60, y: -208, z: -2160, pitch: -16, fov: 34 } },                       // shivering cows
      { f: F(20, 0.5), cam: { x: 0, y: -560, z: 600, pitch: -12, fov: 34 } }, { f: E(20), cam: { x: 0, y: -600, z: -300, pitch: -14, fov: 34 } },                               // villagers run to Krishna
      { f: F(21), cam: { x: 0, y: -222, z: -1620, fov: 28 } }, { f: E(21), cam: { x: 0, y: -222, z: -1650, pitch: 3, fov: 28 } },                      // calm Krishna in the rain
    ],
    actors: stormVillage, params: () => ({ weather: "storm" }), cInf: 8, focus: (f, cam) => (f >= F(21) ? cam.z + 1900 : f >= F(20) && f < F(20, 0.5) ? cam.z + 2640 : cam.z + 300),
    overlay: (f, W, H) => <Rain f={f} W={W} H={H} op={0.95} hail={f >= F(19, 0.3) && f < E(19)} density={340} />,
  });
  (S[S.length - 1] as any).flashes = F_FLASH;

  // G. the lift (L22), the shelter (L23-L24), clouds empty (L25)
  S.push({
    id: "G-lift", from: F(22), to: F(26), set: "storm", trans: "whip",
    keys: [
      { f: F(22), cam: { x: -40, y: -280, z: 520, fov: 30 } }, { f: F(22, 0.55), cam: { x: -40, y: -300, z: 560, pitch: 4, fov: 30 } },             // hand rises, root comes down
      { f: F(22, 0.75), cam: { x: 150, y: -440, z: 2000, pitch: 7, fov: 37 } }, { f: E(22), cam: { x: 200, y: -460, z: 2300, pitch: 7, fov: 38 } }, // the hill aloft
      { f: F(23), cam: { x: 300, y: -200, z: 1300, yaw: 6, fov: 34 } }, { f: F(23, 0.6), cam: { x: 100, y: -210, z: 900, yaw: 2, fov: 34 } },       // everyone comes in
      { f: E(23), cam: { x: -40, y: -230, z: 640, fov: 32 } },
      { f: F(24), cam: { x: 600, y: -190, z: 700, yaw: 10, fov: 34 } }, { f: F(24, 0.5), cam: { x: -500, y: -190, z: 700, yaw: -10, fov: 34 } },   // days pass under the hill
      { f: E(24), cam: { x: -20, y: -240, z: 560, fov: 31 } },
      { f: F(25), cam: { x: INDRA_POS.x - 80, y: INDRA_POS.y - 280, z: INDRA_POS.z + 1100, fov: 32 } }, { f: E(25), cam: { x: INDRA_POS.x - 70, y: INDRA_POS.y - 300, z: INDRA_POS.z + 950, fov: 32 } },
    ],
    actors: (f) => {
      const lifting = f < F(22, 0.55);
      const k = (f - F(22)) / (F(22, 0.55) - F(22));
      const pose = lifting ? { L: { a: lerp(20, 150, smoother(k)), b: lerp(-10, 20, smoother(k)), l1: lerp(28, 46, smoother(k)), l2: lerp(26, 46, smoother(k)), finger: k > 0.6, front: true } } : LIFT;
      const cast = shelterCast(f, [F(23), F(23, 0.9)], undefined, f >= F(24) && f < E(24) ? "smile" : "calm", pose);
      const sleepy = f >= F(24) && f < E(24);
      cast.forEach((a) => { if (sleepy && a.id !== "krishna" && !a.kind.includes("cow")) a.expr = rnd(a.id.length) > 0.5 ? "calm" : "smile"; });
      return cast.concat([{ id: "indraA", kind: "indraAir", x: INDRA_POS.x, y: INDRA_POS.y, z: INDRA_POS.z, s: 1.15, expr: f >= F(25) ? "surprise" : "angry", opts: { vajraUp: f >= F(25) ? 1 - clamp01((f - F(25, 0.4)) / 40) : 1 }, noShadow: true }]);
    },
    params: (f) => ({ rootDrop: clamp01((f - F(22, 0.25)) / (F(22, 0.55) - F(22, 0.25))), clouds: f >= F(25) ? 1 - 0.8 * clamp01((f - F(25)) / (E(25) - F(25))) : 1, flashes: STORM_FLASHES(F(22), F(23)) }),
    focus: (f, cam) => Math.max(300, cam.z - (cam.y < -1500 ? INDRA_POS.z : 0)),
  });

  // H. sunshine: villagers walk out, the hill is set down, wonder (L26-L28)
  S.push({
    id: "H-sun", from: F(26), to: F(26, 0.62), set: "storm", trans: "dissolve",
    keys: [{ f: F(26), cam: { x: 100, y: -260, z: 1500, pitch: 3, fov: 36 } }, { f: F(26, 0.45), cam: { x: 60, y: -260, z: 1200, fov: 36 } },
      { f: F(26, 0.5), cam: { x: -60, y: -300, z: 520, fov: 30 } }, { f: F(26, 0.62), cam: { x: -60, y: -290, z: 480, fov: 30 } }],
    actors: (f) => {
      const c = shelterCast(f, undefined, [F(26), F(26, 0.45)], "smile");
      const k = c.find((a) => a.id === "krishna")!;
      if (f >= F(26, 0.5)) { const t = smoother((f - F(26, 0.5)) / 18); k.pose = { L: { a: lerp(150, 25, t), b: lerp(20, -20, t), l1: lerp(46, 28, t), l2: lerp(46, 26, t), finger: t < 0.5, front: true } }; }
      return c;
    },
    params: (f) => ({ sunny: 1, rain: false, indra: false, clouds: 0.3, rootDrop: f >= F(26, 0.5) ? 1 - clamp01((f - F(26, 0.5)) / 12) : 1 }),
    focus: (f, cam) => cam.z,
  });
  const wonderCast = (f: number): Actor[] => [
    { id: "krishna", kind: "krishna", x: -150, z: -600, expr: "happy", bob: true }, { id: "calf", kind: "cow", x: 20, z: -620, s: 0.62, flip: true, bob: true },
    { id: "sakha", kind: "sakha", x: 520, z: -200, expr: "talk", talk: [F(27, 0.1), F(27, 0.9)], tilt: -6 }, { id: "sakha2", kind: "sakha2", x: 380, z: -260, expr: "surprise", tilt: 6 },
    { id: "nanda", kind: "nanda", x: 680, z: -360, expr: "smile", talk: [F(29, 0.08), E(29)] }, { id: "g1", kind: "g1", x: 880, z: -420, expr: "surprise" },
    { id: "cowm", kind: "cowBrown", x: 900, z: -1100, flip: true }, { id: "eleph", kind: "elephant", x: POND.x + 150, z: POND.z - 120 },
  ];
  S.push({
    id: "H2-meadow", from: F(26, 0.62), to: F(29, 0.15), set: "meadow", trans: "flash",
    keys: [
      { f: F(26, 0.62), cam: { x: 0, y: -420, z: 2000, pitch: 3, fov: 40 } }, { f: E(26), cam: { x: 0, y: -430, z: 1800, pitch: 3, fov: 40 } },      // hill back in place, birds
      { f: F(27), cam: { x: 640, y: -230, z: 420, yaw: 4, fov: 32 } }, { f: E(27), cam: { x: 620, y: -230, z: 380, yaw: 3, fov: 32 } },             // gwal-bal whisper
      { f: F(28), cam: { x: -110, y: -250, z: 150, fov: 30 } }, { f: F(28, 0.3), cam: { x: -100, y: -250, z: 120, fov: 30 } },                      // Krishna with the calf
      { f: F(28, 0.36), cam: { x: POND.x + 60, y: -220, z: POND.z + 700, fov: 32 } }, { f: F(28, 0.8), cam: { x: POND.x + 80, y: -230, z: POND.z + 620, fov: 32 } }, // elephant + lotus
      { f: E(28), cam: { x: 0, y: -450, z: 1500, pitch: 3, fov: 40 } },                                                                               // match back to the hill
      { f: F(29), cam: { x: 680, y: -310, z: 300, fov: 30 } }, { f: F(29, 0.15), cam: { x: 680, y: -305, z: 250, fov: 30 } },                        // push into Nanda's eyes
    ],
    actors: wonderCast, params: () => ({ time: "sunrise" }), cInf: 7, focus: (f, cam) => (f >= F(28, 0.36) && f < E(28) ? cam.z - POND.z : cam.z + 300),
  });
  // I. flashback: Garga Rishi at the naming ceremony (L29), planned cut in/out
  S.push({
    id: "I-flashback", from: F(29, 0.15), to: E(29), set: "village", trans: "cut",
    keys: [{ f: F(29, 0.15), cam: { x: -545, y: -280, z: 820, fov: 34 } }, { f: E(29), cam: { x: -545, y: -280, z: 720, fov: 33 } }],
    actors: (f) => [{ id: "garga", kind: "garga", x: -330, z: 160, expr: "talk", talk: [F(29, 0.2), E(29)], pose: { R: { a: 60, b: -40, l1: 28, l2: 26 } } },
      { id: "yashodaF", kind: "yashoda", x: -560, z: 140, prop: "baby", expr: "happy" }, { id: "nandaF", kind: "nanda", x: -760, z: 110, expr: "smile" }],
    params: () => ({ weather: "morning", trees: true }), cInf: 6, focus: (f, cam) => cam.z - 140,
    grade: () => "sepia(0.45) saturate(1.1) brightness(1.05) contrast(0.95)",
  });

  // J. dusk: will Indra be forgiven? Indra descends, bows (L30-L33)
  const duskCast = (f: number): Actor[] => {
    const arrive = F(31, 0.4), bowT = clamp01((f - F(33)) / 18);
    const list: Actor[] = [{ id: "krishna", kind: "krishna", x: 0, z: -400, expr: f >= F(32) ? "smile" : "calm", noShadow: false }];
    if (f >= arrive) list.push({ id: "indra", kind: "indra", x: 330, z: -380, y: -lerp(400, 0, smoother((f - arrive) / 40)), expr: "calm", opts: { vajra: false, noWeapon: true, namaste: f >= F(33) },
      tilt: lerp(12, 18, bowT), s: 1, opacity: clamp01((f - arrive) / 20), noShadow: f < arrive + 40, talk: [F(33, 0.35), E(33)] });
    return list;
  };
  S.push({
    id: "J-dusk", from: E(29), to: F(34), set: "meadow", trans: "cut",
    keys: [
      { f: E(29), cam: { x: 0, y: -300, z: 1000, fov: 32 } }, { f: F(30), cam: { x: 0, y: -300, z: 900, fov: 32 } }, { f: E(30), cam: { x: 0, y: -290, z: 700, fov: 32 } }, // Krishna alone at dusk
      { f: F(31), cam: { x: 200, y: -450, z: 1300, pitch: 6, fov: 36 } }, { f: E(31), cam: { x: 220, y: -330, z: 900, pitch: 2, fov: 34 } },       // the light descends
      { f: F(32), cam: { x: 330, y: -280, z: 300, yaw: 4, fov: 30 } }, { f: E(32), cam: { x: 330, y: -270, z: 260, yaw: 4, fov: 30 } },             // Indra on foot, ashamed
      { f: F(33), cam: { x: 120, y: -180, z: 640, pitch: 6, fov: 32 } }, { f: E(33), cam: { x: 130, y: -175, z: 600, pitch: 6, fov: 32 } },         // bows at Krishna's feet
    ],
    actors: duskCast, params: () => ({ time: "dusk", pond: false }), cInf: 7, focus: (f, cam) => cam.z + 400,
    overlay: (f, W, H) => (f >= F(31) && f < F(31, 0.7) ? <Overlay style={{ background: "radial-gradient(ellipse at 62% 30%, rgba(255,240,200,0.55), rgba(255,220,150,0) 45%)", opacity: Math.sin(clamp01((f - F(31)) / (F(31, 0.7) - F(31))) * Math.PI), mixBlendMode: "screen" }}><div /></Overlay> : null),
  });

  // K. the answer, memory, abhishek, Govinda (L34-L42)
  const endCast = (f: number): Actor[] => {
    const list: Actor[] = [
      { id: "krishna", kind: "krishna", x: 0, z: -400, expr: f >= F(39) ? "happy" : "smile", talk: [F(35, 0.12), E(37)], pose: f >= F(35, 0.12) && f < F(35, 0.4) ? { R: { a: 40, b: -60, l1: 28, l2: 26 } } : undefined },
      { id: "indra", kind: "indra", x: 330, z: -380, expr: f >= F(38, 0.8) ? "smile" : "ashamed", opts: { noWeapon: f < F(37), namaste: f >= F(40), vajra: f >= F(37) && f < F(40), vajraRot: lerp(10, 120, clamp01((f - F(37, 0.4)) / 30)) }, tilt: f < F(35) ? 16 : 0 },
    ];
    if (f >= F(39)) list.push({ id: "surabhi", kind: "surabhi", x: -360, z: -480, y: -lerp(700, 0, smoother((f - F(39)) / (F(39, 0.5) - F(39)))), opacity: clamp01((f - F(39)) / 15), noShadow: f < F(39, 0.5), s: 1.1 });
    if (f >= F(40)) list.push({ id: "airavata", kind: "airavata", x: 760, z: -700, opacity: clamp01((f - F(40)) / 15) });
    if (f >= F(41)) for (let i = 0; i < 6; i++) list.push({ id: `gc${i}`, kind: i % 2 ? "cowBrown" : "cow", x: -900 + i * 360, z: -1100 + (i % 2) * 200, flip: i > 2, walk: { x1: -700 + i * 280, z1: -900 + (i % 2) * 120, f0: F(41), f1: E(41) } });
    if (f >= F(42)) for (const [id, kind, x] of [["g1", "g1", -1000], ["g2", "g2", 1100], ["yashoda", "yashoda", -1250], ["nanda", "nanda", 1350]] as const) list.push({ id, kind, x, z: -600, expr: "happy", prop: kind === "yashoda" || kind.startsWith("g") ? "pray" : undefined });
    return list;
  };
  S.push({
    id: "K-answer", from: F(34), to: F(36), set: "meadow", trans: "dissolve",
    keys: [
      { f: F(34), cam: { x: 160, y: -260, z: 700, fov: 32 } }, { f: E(34), cam: { x: 165, y: -262, z: 640, fov: 32 } },                              // two-shot, slow creep
      { f: F(35), cam: { x: 60, y: -250, z: 420, fov: 30 } }, { f: E(35), cam: { x: 60, y: -248, z: 380, fov: 30 } },                                // Krishna lifts Indra
    ],
    actors: endCast, params: () => ({ time: "golden", pond: false }), cInf: 7, focus: (f, cam) => cam.z + 400,
  });
  S.push({
    id: "K2-memory", from: F(36), to: F(36, 0.6), set: "court", trans: "cut",
    keys: [{ f: F(36), cam: { x: 0, y: -280, z: 700, fov: 34 } }, { f: F(36, 0.6), cam: { x: 40, y: -280, z: 560, fov: 33 } }],
    actors: (f) => [{ id: "indraM", kind: "indra", x: 0, z: -900, expr: "happy", opts: { vajraRot: 10 } }],
    params: () => ({}), cInf: 6, focus: (f, cam) => cam.z + 900, grade: () => "sepia(0.4) saturate(1.15) brightness(1.04)",
  });
  S.push({
    id: "K3-answer", from: F(36, 0.6), to: F(38), set: "meadow", trans: "cut",
    keys: [{ f: F(36, 0.6), cam: { x: 330, y: -290, z: 300, fov: 30 } }, { f: E(36), cam: { x: 330, y: -288, z: 270, fov: 30 } },
      { f: F(37), cam: { x: 0, y: -222, z: 230, fov: 28 } }, { f: F(37, 0.5), cam: { x: 0, y: -222, z: 210, fov: 28 } }, { f: F(37, 0.6), cam: { x: 390, y: -170, z: -120, fov: 28 } }, { f: E(37), cam: { x: 390, y: -165, z: -140, fov: 28 } }],
    actors: endCast, params: () => ({ time: "golden", pond: false }), cInf: 7, focus: (f, cam) => cam.z + 400,
  });
  // L38 callback montage: the storm, the hill, the breaking clouds, then Indra smiling (whips)
  S.push({
    id: "K4-montage", from: F(38), to: F(38, 0.62), set: "storm", trans: "whip",
    keys: [{ f: F(38), cam: { x: 200, y: -470, z: 2350, pitch: 7, fov: 38 } }, { f: F(38, 0.2), cam: { x: 180, y: -460, z: 2200, pitch: 7, fov: 38 } },
      { f: F(38, 0.28), cam: { x: -30, y: -300, z: 560, fov: 30 } }, { f: F(38, 0.42), cam: { x: -30, y: -310, z: 540, fov: 30 } },
      { f: F(38, 0.48), cam: { x: INDRA_POS.x - 80, y: INDRA_POS.y - 280, z: INDRA_POS.z + 1100, fov: 32 } }, { f: F(38, 0.62), cam: { x: INDRA_POS.x - 70, y: INDRA_POS.y - 300, z: INDRA_POS.z + 1000, fov: 32 } }],
    actors: (f) => shelterCast(f).concat([{ id: "indraA", kind: "indraAir", x: INDRA_POS.x, y: INDRA_POS.y, z: INDRA_POS.z, s: 1.15, expr: "surprise", opts: { vajraUp: 0 }, noShadow: true }]),
    params: (f) => ({ clouds: 1 - clamp01((f - F(38, 0.48)) / 25), flashes: [F(38, 0.05)] }),
    focus: (f, cam) => Math.max(300, cam.z - (cam.y < -1500 ? INDRA_POS.z : 0)),
  });
  S.push({
    id: "K5-abhishek", from: F(38, 0.62), to: F(43), set: "meadow", trans: "whip",
    keys: [
      { f: F(38, 0.62), cam: { x: 165, y: -262, z: 640, fov: 32 } }, { f: E(38), cam: { x: 165, y: -262, z: 600, fov: 32 } },                        // Indra smiles
      { f: F(39), cam: { x: -330, y: -620, z: 800, pitch: 8, fov: 36 } }, { f: F(39, 0.5), cam: { x: -230, y: -330, z: 760, pitch: 3, fov: 34 } },    // Surabhi descends, milk
      { f: E(39), cam: { x: 0, y: -260, z: 600, fov: 33 } },
      { f: F(40), cam: { x: 520, y: -300, z: 700, yaw: 8, fov: 34 } }, { f: F(40, 0.6), cam: { x: 300, y: -280, z: 650, yaw: 4, fov: 34 } },         // Airavata's water, Indra namaste
      { f: E(40), cam: { x: 80, y: -240, z: 380, fov: 30 } },
      { f: F(41), cam: { x: 0, y: -300, z: 900, fov: 36 } }, { f: E(41), cam: { x: 0, y: -360, z: 1500, pitch: -3, fov: 38 } },                    // cows gather
      { f: F(42), cam: { x: 0, y: -500, z: 1700, pitch: -2, fov: 40 } }, { f: E(42), cam: { x: 0, y: -1100, z: 2100, pitch: -12, fov: 42 } },        // golden tableau, crane up
    ],
    actors: endCast,
    params: (f) => ({ time: f >= F(39) ? "divine" : "golden", pond: false }), cInf: 6, focus: (f, cam) => cam.z + 400,
    overlay: (f, W, H) => {
      const milk = f >= F(39, 0.35) && f < F(40), water = f >= F(40, 0.3) && f < F(41);
      if (!(milk || water)) return null;
      const x0 = milk ? W * 0.24 : W * 0.8, x1 = W * 0.5, y0 = H * 0.1, y1 = H * 0.36, col = milk ? "#fffdf2" : "#c8ecff";
      const d = `M ${x0} ${y0} Q ${(x0 + x1) / 2} ${H * -0.04} ${x1} ${y1}`;
      const drops = Array.from({ length: 36 }, (_, i) => { const u = (f * 0.035 + i / 36) % 1, x = (1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * ((x0 + x1) / 2) + u * u * x1, y = (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * (H * -0.04) + u * u * y1; return `<circle cx="${x + (rnd(i) - 0.5) * 18}" cy="${y + (rnd(i * 2) - 0.5) * 18}" r="${4 + 5 * rnd(i * 3)}" fill="${col}"/>`; }).join("");
      return <Overlay style={{ opacity: 0.92, mixBlendMode: "screen" }}><div dangerouslySetInnerHTML={{ __html: `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><path d="${d}" stroke="${col}" stroke-width="26" stroke-opacity="0.35" fill="none" stroke-linecap="round" filter="blur(6px)"/><path d="${d}" stroke="${col}" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="40 18" stroke-dashoffset="${-f * 6}"/>${drops}</svg>` }} /></Overlay>;
    },
  });

  // L. annakut today (L43), Krishna waves (L44), teaser: Damodar (L45)
  S.push({
    id: "L-annakut", from: F(43), to: F(45), set: "meadow", trans: "dissolve",
    keys: [{ f: F(43), cam: { x: 60, y: -380, z: -400, pitch: -2, fov: 34 } }, { f: E(43), cam: { x: 60, y: -370, z: -560, pitch: -2, fov: 34 } },
      { f: F(44), cam: { x: 330, y: -250, z: -650, fov: 32 } }, { f: E(44), cam: { x: 330, y: -250, z: -690, fov: 32 } }],
    actors: (f) => [{ id: "krishna", kind: "krishna", x: 330, z: -1100, expr: "happy", pose: f >= F(44) ? { R: { a: 150, b: 15 + 25 * Math.sin(f * 0.35), l1: 30, l2: 28 } } : undefined },
      { id: "cowA", kind: "cow", x: 560, z: -1100, flip: true }, { id: "calfA", kind: "cowBrown", x: -320, z: -1000, s: 0.62 }],
    params: () => ({ time: "golden", annakut: 1, pond: false }), cInf: 6, focus: (f, cam) => cam.z - (HILL.z + 900),
  });
  S.push({
    id: "M-teaser", from: F(45), to: TOTAL, set: "village", trans: "dissolve",
    keys: [{ f: F(45), cam: { x: -405, y: -260, z: 820, fov: 34 } }, { f: F(45, 0.6), cam: { x: -405, y: -260, z: 720, fov: 34 } }, { f: TOTAL, cam: { x: -405, y: -260, z: 690, fov: 34 } }],
    actors: (f) => [{ id: "yashodaT", kind: "yashoda", x: -560, z: 120, expr: "smile", tilt: -4 }, { id: "balK", kind: "balKrishna", x: -250, z: 160, expr: f >= F(45, 0.55) ? "surprise" : "happy", opts: { butterFace: true } }],
    params: () => ({ weather: "morning" }), cInf: 6, focus: (f, cam) => cam.z - 140,
  });
  return S;
}

// ---------------------------------------------------------------- composition
const SEGS = buildSegments().map((s) => {
  const actors = (f: number) => fixActors(s.actors(f), s.set, f);
  const r = shotKeys(s.keys, actors, s.set === "village", s.from, s.to - 1);
  return { ...s, actors, keys: r.keys, cuts: r.cuts };
});
export const GUARDED = SEGS;
const SKY_STORM = "linear-gradient(180deg, #141a34 0%, #2b2f56 45%, #4b4b72 75%, #5b5a76 100%)";
const SKY_DAY = "linear-gradient(180deg, #3f86d6 0%, #8cbcec 42%, #dcecf8 62%, #f4f0dc 75%)";
const SKY_SUN = "linear-gradient(180deg, #5f8fd6 0%, #b6c8ec 40%, #ffd8a8 64%, #fff0d0 76%)";
const MEADOW_SKY: Record<string, string> = {
  morning: SKY_DAY, sunrise: SKY_SUN,
  golden: "linear-gradient(180deg, #6a4f8c 0%, #c98aa0 35%, #ffc98a 60%, #ffe2b0 75%)",
  dusk: "linear-gradient(180deg, #2a2a5e 0%, #6a4f8c 40%, #e88a6a 66%, #ffc07a 78%)",
  divine: "linear-gradient(180deg, #8a6fd0 0%, #f0b0c8 35%, #ffe0a0 60%, #fff4d8 76%)",
};
const COURT_SKY = "linear-gradient(180deg, #f2a65a 0%, #ffd9a0 40%, #fff1d6 70%)";

function SegView({ seg, f, W, H }: { seg: Seg; f: number; W: number; H: number }) {
  const cam = camPath(seg.keys, f);
  const p = seg.params ? seg.params(f) : {};
  const actors = seg.actors(f);
  const focus = seg.focus ? seg.focus(f, cam) : cam.z;
  let light = LIGHTS.day;
  let world: React.ReactNode, bg = SKY_DAY, haze = { color: "#d6e8f7", near: 1500, far: 9000, max: 0.6 };
  if (seg.set === "storm") {
    const sunny = p.sunny ?? 0, golden = p.golden ?? 0;
    bg = sunny > 0.5 ? SKY_SUN : golden > 0 ? `linear-gradient(180deg, rgb(${lerp(20, 120, golden)},${lerp(26, 90, golden)},${lerp(52, 70, golden)}) 0%, #2b2f56 45%, #4b4b72 75%, #5b5a76 100%)` : SKY_STORM;
    haze = { color: sunny > 0.5 ? "#e8eef6" : "#3a4060", near: 1800, far: 9000, max: 0.6 };
    light = sunny > 0.5 ? LIGHTS.day : golden > 0.5 ? LIGHTS.golden : LIGHTS.storm;
    world = <StormWorld f={f} actors={actors} golden={golden} rootDrop={p.rootDrop ?? 1} rain={p.rain ?? true} pothi={p.pothi ?? 0} indra={p.indra ?? true} flashes={p.flashes ?? []} sunny={sunny} clouds={p.clouds ?? 1} />;
  } else if (seg.set === "village") {
    bg = p.weather === "storm" ? SKY_STORM : p.weather === "sunrise" ? SKY_SUN : SKY_DAY;
    if (p.weather === "storm") haze = { color: "#3a4060", near: 1500, far: 8000, max: 0.6 };
    light = p.weather === "storm" ? LIGHTS.storm : p.weather === "sunrise" ? LIGHTS.golden : LIGHTS.day;
    world = <VillageSet f={f} actors={actors} weather={p.weather ?? "morning"} trees={p.trees ?? true} />;
  } else if (seg.set === "meadow") {
    bg = MEADOW_SKY[p.time ?? "morning"];
    light = ({ morning: LIGHTS.day, golden: LIGHTS.golden, dusk: LIGHTS.dusk, sunrise: LIGHTS.golden, divine: LIGHTS.divine } as any)[p.time ?? "morning"] ?? LIGHTS.day;
    world = <MeadowSet f={f} actors={actors} time={p.time ?? "morning"} divineForm={p.divineForm ?? 0} annakut={p.annakut ?? 0} pond={p.pond ?? true} />;
  } else {
    bg = COURT_SKY; haze = { color: "#ffe9c8", near: 1500, far: 6000, max: 0.5 }; light = LIGHTS.court;
    world = <SkyCourt f={f} actors={actors} storming={p.storming ?? 0} />;
  }
  const stormy = (seg.set === "storm" && !(p.sunny > 0.5)) || (seg.set === "village" && p.weather === "storm");
  const golden = p.golden ?? 0;
  const outsideShelter = seg.set === "storm" && (cam.z > 330 || cam.y < CEIL - 60);
  const flashes: number[] = (seg as any).flashes ?? p.flashes ?? [];
  const flash = flashes.map((fl) => (f >= fl && f < fl + 6 ? [0.85, 0.55, 0.75, 0.3, 0.15, 0.05][f - fl] : 0)).reduce((a, b) => Math.max(a, b), 0);
  const grade = [seg.grade ? seg.grade(f) : "", stormy ? `saturate(${0.92 + 0.2 * golden})` : "", seg.set === "meadow" ? MEADOW_GRADE[p.time ?? "morning"] ?? "" : ""].join(" ").trim();
  return (
    <AbsoluteFill style={{ filter: grade || undefined }}>
      <Stage cam={cam} haze={haze} bg={bg} width={W} height={H} light={light}>{world}</Stage>
      {seg.set === "storm" && stormy && outsideShelter && (p.rain ?? true) && <Rain f={f} W={W} H={H} op={cam.y < -1500 ? 0.35 : 0.9 * (1 - 0.6 * golden)} density={cam.y < -1500 ? 160 : 300} />}
      {golden > 0 && <Overlay style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,214,140,0.55), rgba(255,170,90,0.15) 45%, rgba(0,0,0,0) 70%)", opacity: golden, mixBlendMode: "screen" }}><div /></Overlay>}
      {golden > 0 && <Overlay style={{ opacity: golden * 0.85, mixBlendMode: "screen", filter: "blur(14px)" }}><div dangerouslySetInnerHTML={{ __html: raysSVG(W, H, W * 0.56, f * 0.02) }} /></Overlay>}
      {seg.overlay ? seg.overlay(f, W, H) : null}
      {flash > 0 && <Overlay style={{ background: "#e9f2ff", opacity: flash }}><div /></Overlay>}
    </AbsoluteFill>
  );
}

const TRANS = 12;
export const GovindaVideo: React.FC = () => {
  const f = useCurrentFrame(), { width: W, height: H } = useVideoConfig();
  const i = SEGS.findIndex((s) => f >= s.from && f < s.to);
  const cur = SEGS[i < 0 ? SEGS.length - 1 : i], next = SEGS[i + 1], prev = SEGS[i - 1];
  // transition windows: dissolve/flash overlap TRANS frames centred on the boundary; whip blurs both sides
  const toNext = next ? next.from - f : 1e9, fromPrev = prev ? f - cur.from : 1e9;
  let layers: { seg: Seg; op: number }[] = [{ seg: cur, op: 1 }], blur = 0, gold = 0;
  if (next && toNext <= TRANS / 2 && (next.trans === "dissolve" || next.trans === "flash")) { const t = 0.5 - toNext / TRANS; layers = [{ seg: cur, op: 1 }, { seg: next, op: t }]; if (next.trans === "flash") gold = Math.sin(t * Math.PI); }
  if (prev && fromPrev < TRANS / 2 && (cur.trans === "dissolve" || cur.trans === "flash")) { const t = 0.5 + fromPrev / TRANS; layers = [{ seg: prev, op: 1 }, { seg: cur, op: t }]; if (cur.trans === "flash") gold = Math.sin(t * Math.PI); }
  // only the whip transition between two segments gets a short pan blur (4 frames each side); nothing else is ever blurred
  if (next && next.trans === "whip" && toNext <= 4) blur = (4 - toNext) / 4;
  if (prev && cur.trans === "whip" && fromPrev < 4) blur = Math.max(blur, (4 - fromPrev) / 4);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AbsoluteFill style={{ filter: blur > 0.05 ? `blur(${(blur * 6).toFixed(1)}px)` : undefined }}>
        {layers.map((l, j) => <AbsoluteFill key={l.seg.id + j} style={{ opacity: l.op }}><SegView seg={l.seg} f={f} W={W} H={H} /></AbsoluteFill>)}
      </AbsoluteFill>
      {gold > 0 && <Overlay style={{ background: "radial-gradient(ellipse at 50% 55%, rgba(255,236,190,1), rgba(255,206,120,0.9) 50%, rgba(255,190,90,0.7))", opacity: gold * 0.85 }}><div /></Overlay>}
      <Overlay style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(20,8,30,0.42) 100%)" }}><div /></Overlay>
      <Audio src={staticFile("mix.wav")} />
    </AbsoluteFill>
  );
};

/** events for the sound design and QA (exported to out/events.json by tools/events.mjs) */
export function events() {
  const ev: any = { whips: [], flashes: [], cuts: [], planned: [], rain: { out: [], under: [] }, cowbells: [], birds: [], rumbles: [], chimes: [], pours: [], slams: [] };
  for (let j = 1; j < SEGS.length; j++) {
    const s = SEGS[j];
    if (s.trans === "whip") { ev.whips.push([s.from - 6, s.from + 6]); ev.planned.push([s.from - 6, s.from + 6]); }
    else if (s.trans === "cut") { ev.cuts.push(s.from); }
    else ev.planned.push([s.from - TRANS / 2, s.from + TRANS / 2]);
  }
  for (const s of SEGS) {
    for (const c of ((s as any).cuts ?? [])) { ev.cuts.push(c); ev.planned.push([c - 1, c + 1]); }
    const fl = (s as any).flashes ?? (s.params ? s.params(s.from).flashes : undefined) ?? [];
    for (const x of fl) if (x >= s.from && x < s.to) { ev.flashes.push(x); ev.planned.push([x - 1, x + 7]); }
    if (s.set === "storm" && s.id !== "H-sun") ev.rain.out.push([s.from, s.to]);
    if (s.id === "F-storm-village") ev.rain.out.push([s.from, s.to]);
    if (s.set === "meadow" || s.id.startsWith("B")) { for (let x = s.from + 15; x < s.to; x += 75) ev.cowbells.push(x); for (let x = s.from + 40; x < s.to; x += 130) ev.birds.push(x); }
  }
  ev.rumbles.push(F(22, 0.2), F(26, 0.5)); ev.slams.push(F(17, 0.05)); ev.chimes.push(F(14), F(15, 0.62), F(39), F(40), F(45));
  ev.pours.push([F(39, 0.35), F(40)], [F(40, 0.3), F(41)]);
  ev.beats = SEGS.flatMap((s) => s.keys.map((k) => ({ f: k.f, subject: s.id })));
  return ev;
}
