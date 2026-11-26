// REAL 3D stage (three.js inside Remotion, WebGL with a depth buffer). Same API and units as the old CSS stage so the
// timeline keeps working: world units are px, x right, y DOWN, z toward the viewer, ground at y = 0 (above = negative y).
// Everything here is converted to three.js (y up) at the component boundary: three = (x, -y, z).
// The world (ground, houses, hills, trees, clouds, pillars) is solid lit geometry with ink outlines; characters and
// small props are sharp camera-facing cards. NO lens blur anywhere: the user wants every face sharp.
import React, { useLayoutEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import { continueRender, delayRender } from "remotion";
import { DEFS } from "./chars.js";

export type Cam = { x: number; y: number; z: number; yaw?: number; pitch?: number; roll?: number; fov?: number };
export type Lens = { focus: number; cInf: number; max?: number };              // kept for API compatibility: ignored
export type Haze = { color: string; near: number; far: number; max?: number };
export type Light = { sun: [number, number, number]; sunColor: string; sunI: number; sky: string; ground: string; ambI: number; card?: string };
export const LIGHTS: Record<string, Light> = {
  day: { sun: [-0.55, 1, 0.75], sunColor: "#fff1d6", sunI: 2.1, sky: "#dfeeff", ground: "#c9b48a", ambI: 1.75, card: "#ffffff" },
  storm: { sun: [-0.3, 1, 0.6], sunColor: "#c4cdea", sunI: 1.5, sky: "#8f9ac0", ground: "#8a7a66", ambI: 1.9, card: "#d6dbeb" },
  golden: { sun: [0.6, 0.55, -0.4], sunColor: "#ffc98c", sunI: 2.2, sky: "#c8a8d0", ground: "#b48a6a", ambI: 1.55, card: "#fff0dc" },
  dusk: { sun: [0.8, 0.35, -0.3], sunColor: "#ffaa7a", sunI: 1.7, sky: "#9a86b8", ground: "#6a5060", ambI: 1.4, card: "#f3dccf" },
  divine: { sun: [-0.3, 1, 0.8], sunColor: "#fff4dc", sunI: 2.0, sky: "#fff0e0", ground: "#e8c8a8", ambI: 2.0, card: "#ffffff" },
  court: { sun: [-0.4, 1, 0.8], sunColor: "#fff0d0", sunI: 1.9, sky: "#fff3e0", ground: "#e8cfa0", ambI: 1.9, card: "#ffffff" },
};
export const INK = "#2b1a2e";
const D2R = Math.PI / 180;
const AA = true;
export const clamp01 = (t: number) => Math.max(0, Math.min(1, t));

type Ctx = { cam: Cam; H: number; P: number; card: string };
const StageCtx = React.createContext<Ctx>({ cam: { x: 0, y: 0, z: 1000 }, H: 1080, P: 1662, card: "#ffffff" });

// ---------------------------------------------------------------- SVG -> texture (async, cached, frame-safe)
const texCache = new Map<string, THREE.Texture>();
const pending = new Map<string, Promise<void>>();
const lru: string[] = [];
function loadTex(key: string, doc: string, pw: number, ph: number) {
  let p = pending.get(key);
  if (p) return p;
  p = new Promise<void>((res) => {
    const img = new Image();
    const url = URL.createObjectURL(new window.Blob([dedupAttrs(doc)], { type: "image/svg+xml" }));
    img.onload = () => {
      const c = document.createElement("canvas"); c.width = pw; c.height = ph;
      c.getContext("2d")!.drawImage(img, 0, 0, pw, ph);
      URL.revokeObjectURL(url);
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace; const big = pw * ph > 600000; t.generateMipmaps = !big; t.minFilter = big ? THREE.LinearFilter : THREE.LinearMipmapLinearFilter; t.anisotropy = big ? 1 : 4;
      texCache.set(key, t); lru.push(key); pending.delete(key);
      while (lru.length > 80) { const k = lru.shift()!; texCache.get(k)?.dispose(); texCache.delete(k); }
      res();
    };
    img.onerror = () => { pending.delete(key); console.error("SVG TEXTURE FAILED", doc.slice(0, 200)); res(); };
    img.src = url;
  });
  pending.set(key, p);
  return p;
}
function useSvgTexture(doc: string, pw: number, ph: number) {
  const key = `${pw}x${ph}|${doc}`;
  const [, force] = useState(0);
  const last = React.useRef<THREE.Texture | null>(null);
  const tex = texCache.get(key);
  useLayoutEffect(() => {
    if (texCache.has(key)) return;
    const h = delayRender("svg texture", { timeoutInMilliseconds: 120000 });
    let alive = true;
    loadTex(key, doc, pw, ph).then(() => {
      if (alive) force((n) => n + 1);
      requestAnimationFrame(() => requestAnimationFrame(() => continueRender(h)));
    });
    return () => { alive = false; };
  }, [key]);
  if (tex) last.current = tex;
  return tex ?? last.current;
}
/** the character SVGs were written for the lenient HTML parser; as an image they must be strict XML: drop repeated
 *  attributes (keep the first, as HTML does) */
export const dedupAttrs = (s: string) => s.replace(/<([a-zA-Z][\w:-]*)((?:\s+[\w:-]+\s*=\s*(?:"[^"]*"|'[^']*'))*)\s*(\/?)>/g, (m, tag, attrs, sl) => {
  const seen = new Set<string>(), out: string[] = [];
  attrs.replace(/\s+([\w:-]+)\s*=\s*("[^"]*"|'[^']*')/g, (_: string, k: string, v: string) => { if (!seen.has(k)) { seen.add(k); out.push(` ${k}=${v}`); } return ""; });
  return `<${tag}${out.join("")}${sl ? "/" : ""}>`;
});
const svgDoc = (inner: string, vb: string, pw: number, ph: number, par = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${pw}" height="${ph}" viewBox="${vb}"${par}>${DEFS}${inner}</svg>`;

// ---------------------------------------------------------------- the stage
const CamRig: React.FC<{ cam: Cam }> = ({ cam }) => {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  camera.position.set(cam.x, -cam.y, cam.z);
  camera.rotation.set((cam.pitch ?? 0) * D2R, -(cam.yaw ?? 0) * D2R, (cam.roll ?? 0) * D2R, "YXZ");
  camera.fov = cam.fov ?? 36; camera.near = 8; camera.far = 40000; camera.updateProjectionMatrix();
  return null;
};
const Lights: React.FC<{ l: Light; cam: Cam }> = ({ l, cam }) => {
  const dir = new THREE.Vector3(...l.sun).normalize();
  const target = useMemo(() => new THREE.Object3D(), []);
  // the shadow camera is fixed per stage (centred near the camera's ground point, snapped to a 400-unit grid) so it never swims
  const cx = Math.round(cam.x / 400) * 400, cz = Math.round((cam.z - 1500) / 400) * 400;
  target.position.set(cx, 0, cz);
  return (
    <>
      <hemisphereLight args={[l.sky, l.ground, l.ambI]} />
      <primitive object={target} />
      <directionalLight color={l.sunColor} intensity={l.sunI} position={[cx + dir.x * 6000, dir.y * 6000, cz + dir.z * 6000]} target={target}
        castShadow shadow-mapSize-width={1536} shadow-mapSize-height={1536} shadow-camera-left={-4500} shadow-camera-right={4500}
        shadow-camera-top={4500} shadow-camera-bottom={-4500} shadow-camera-near={100} shadow-camera-far={16000} shadow-bias={-0.0006} shadow-normalBias={6} />
    </>
  );
};
export const Stage: React.FC<{ cam: Cam; lens?: Lens; haze?: Haze; bg?: string; width: number; height: number; light?: Light; children: React.ReactNode }> = ({ cam, haze, bg, width, height, light, children }) => {
  const fov = cam.fov ?? 36, P = height / 2 / Math.tan(((fov / 2) * Math.PI) / 180);
  const l = light ?? LIGHTS.day;
  const ctx: Ctx = { cam, H: height, P, card: l.card ?? "#ffffff" };
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: bg ?? "#000" }}>
      <ThreeCanvas width={width} height={height} flat shadows={{ type: THREE.PCFShadowMap }} dpr={1}
        gl={{ antialias: AA, alpha: true, preserveDrawingBuffer: true, powerPreference: "high-performance" }} camera={{ fov, near: 8, far: 40000 }}>
        <CamRig cam={cam} />
        {haze && <fog attach="fog" args={[haze.color, haze.near, haze.far * 1.6]} />}
        <Lights l={l} cam={cam} />
        <StageCtx.Provider value={ctx}>{children}</StageCtx.Provider>
      </ThreeCanvas>
    </div>
  );
};

// ---------------------------------------------------------------- materials + ink outlines
const toonGrad = (() => { const d = new Uint8Array([90, 90, 90, 255, 170, 170, 170, 255, 255, 255, 255, 255]); const t = new THREE.DataTexture(d, 3, 1); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();
const inkMats = new Map<number, THREE.Material>();
/** inverted-hull outline material: pushes vertices along their normals by t world units, back faces only */
export function inkMat(t: number, color = INK) {
  const k = Math.round(t * 10) + (color === INK ? 0 : 100000);
  if (!inkMats.has(k)) {
    const m = new THREE.MeshBasicMaterial({ color, side: THREE.BackSide });
    m.onBeforeCompile = (sh) => { sh.vertexShader = sh.vertexShader.replace("#include <begin_vertex>", `vec3 transformed = position + normal * ${t.toFixed(2)};`); };
    m.customProgramCacheKey = () => `ink${k}`;
    inkMats.set(k, m);
  }
  return inkMats.get(k)!;
}
/** boxy shapes: a hull geometry whose "normals" are the per-axis sign from the centre, so the outline grows by exactly
 *  t on every axis with no gaps at the corners */
const boxHulls = new WeakMap<THREE.BufferGeometry, THREE.BufferGeometry>();
function boxHull(g: THREE.BufferGeometry) {
  if (!boxHulls.has(g)) {
    const h = g.clone(); h.computeBoundingBox(); const c = new THREE.Vector3(); h.boundingBox!.getCenter(c);
    const p = h.getAttribute("position"), n = new Float32Array(p.count * 3), sg = (v: number) => (Math.abs(v) < 1e-3 ? 0 : Math.sign(v));
    for (let i = 0; i < p.count; i++) { n[i * 3] = sg(p.getX(i) - c.x); n[i * 3 + 1] = sg(p.getY(i) - c.y); n[i * 3 + 2] = sg(p.getZ(i) - c.z); }
    h.setAttribute("normal", new THREE.BufferAttribute(n, 3)); boxHulls.set(g, h);
  }
  return boxHulls.get(g)!;
}
const Inked: React.FC<{ geom: THREE.BufferGeometry; mat: THREE.Material | THREE.Material[]; ink?: number; boxy?: boolean; shadow?: boolean; position?: [number, number, number]; rotation?: [number, number, number]; scale?: [number, number, number] }> =
  ({ geom, mat, ink = 4, boxy, shadow = true, ...t }) => (
    <group {...t}>
      <mesh geometry={geom} material={mat} castShadow={shadow} receiveShadow />
      {ink > 0 && <mesh geometry={boxy ? boxHull(geom) : geom} material={inkMat(ink)} />}
    </group>
  );
const lam = (o: THREE.MeshLambertMaterialParameters) => new THREE.MeshLambertMaterial(o);

// ---------------------------------------------------------------- cards (characters, small props, effects)
const QR = [0.5, 0.75, 1, 1.5, 2, 3];
/** a flat painted card standing upright at (x, y, z); the SVG origin (0,0) sits at that point (characters: the feet).
 *  box = [minX, minY, maxX, maxY] in SVG units; s = scale. Rasterised sharp for its on-screen size (never blurred). */
export const Card: React.FC<{ x: number; y?: number; z: number; svg: string; box: [number, number, number, number]; s?: number; rotY?: number; flip?: boolean;
  opacity?: number; unlit?: boolean; tint?: string; noFog?: boolean; order?: number; nearFade?: boolean; blob?: number; [k: string]: any }> =
  ({ x, y = 0, z, svg, box, s = 1, rotY = 0, flip, opacity: op0 = 1, tint, noFog, order, nearFade, blob }) => {
  const c = React.useContext(StageCtx);
  // characters the camera flies past fade out instead of filling the screen (never a giant half face)
  const dn = Math.hypot(c.cam.x - x, c.cam.y - (y - 200 * s), c.cam.z - z);
  const opacity = nearFade ? op0 * clamp01((dn - 220) / 240) : op0;
  const [x0, y0, x1, y1] = box, w = x1 - x0, h = y1 - y0;
  const d = Math.max(30, Math.hypot(c.cam.x - x, c.cam.y - y, c.cam.z - z));
  const want = Math.min(1.15 * s * c.P / d, 2048 / Math.max(w, h));          // raster px per svg unit
  const R = Math.min(QR.find((q) => q >= want) ?? 3, 2048 / Math.max(w, h));
  const pw = Math.max(8, Math.round(w * R)), ph = Math.max(8, Math.round(h * R));
  const tex = useSvgTexture(svgDoc(svg, `${x0} ${y0} ${w} ${h}`, pw, ph), pw, ph);
  if (!tex || opacity <= 0.001) return null;
  return (
    <>
    {blob ? <Blob x={x} z={z + 4} rx={blob} op={0.24 * opacity} /> : null}
    <group position={[x, -y, z]} rotation={[0, rotY * D2R, 0]} scale={[(flip ? -1 : 1) * s, s, s]}>
      <mesh position={[(x0 + x1) / 2, -(y0 + y1) / 2, 0]} renderOrder={order ?? 0}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={tex} transparent alphaTest={0.03} opacity={opacity} side={THREE.DoubleSide} toneMapped={false} fog={!noFog} color={tint ?? c.card} />
      </mesh>
    </group>
    </>
  );
};
export const TiledCard = Card;

/** soft contact shadow on the ground under a character */
export const Blob: React.FC<{ x: number; z: number; rx: number; rz?: number; y?: number; op?: number }> = ({ x, z, rx, rz, y = 0, op = 0.26 }) => (
  <mesh position={[x, -y + 1.5, z]} rotation={[-Math.PI / 2, 0, 0]} scale={[rx, rz ?? rx * 0.32, 1]} renderOrder={-1}>
    <circleGeometry args={[1, 28]} />
    <meshBasicMaterial color="#1a1020" transparent opacity={op} depthWrite={false} polygonOffset polygonOffsetFactor={-2} polygonOffsetUnits={-4} />
  </mesh>
);

// ---------------------------------------------------------------- ground
/** a solid ground plane (y = level) spanning x0..x1 and z1(far)..z0(near), painted by svg (viewBox 0 0 vw vh, stretched) */
export const Ground: React.FC<{ x0: number; x1: number; z0: number; z1: number; y?: number; svg: string; vw: number; vh: number }> = ({ x0, x1, z0, z1, y = 0, svg, vw, vh }) => {
  const tex = useSvgTexture(svgDoc(svg, `0 0 ${vw} ${vh}`, 2048, 2048, ` preserveAspectRatio="none"`), 2048, 2048);
  if (!tex) return null;
  return (
    <mesh position={[(x0 + x1) / 2, -y, (z0 + z1) / 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[x1 - x0, z0 - z1]} />
      <meshLambertMaterial map={tex} />
    </mesh>
  );
};
/** a flat decal lying on the ground (pond, rug, floor pattern): an ellipse rx x rz */
export const Disc: React.FC<{ x: number; z: number; rx: number; rz: number; color: string; y?: number; ink?: boolean; op?: number }> = ({ x, z, rx, rz, color, y = 0, ink = true, op = 1 }) => (
  <group position={[x, -y, z]} rotation={[-Math.PI / 2, 0, 0]}>
    {ink && <mesh position={[0, 0, 0.6]} scale={[rx + 6, rz + 6, 1]}><circleGeometry args={[1, 48]} /><meshBasicMaterial color={INK} polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-2} /></mesh>}
    <mesh position={[0, 0, 1.2]} scale={[rx, rz, 1]} receiveShadow><circleGeometry args={[1, 48]} /><meshLambertMaterial color={color} transparent={op < 1} opacity={op} polygonOffset polygonOffsetFactor={-2} polygonOffsetUnits={-4} /></mesh>
  </group>
);

// ---------------------------------------------------------------- houses (solid walls + thick thatched roof)
const texMat = (svg: string, w: number, h: number, col?: string) => {
  const R = Math.min(2, 1024 / Math.max(w, h));
  return { doc: svgDoc(svg, `0 0 ${w} ${h}`, Math.round(w * R), Math.round(h * R), ` preserveAspectRatio="none"`), pw: Math.round(w * R), ph: Math.round(h * R), col };
};
export const House: React.FC<{ x: number; z: number; w: number; d: number; h: number; rh: number; rotY?: number; col?: string; roofCol?: string;
  front: string; side: string; back?: string; roofFront: string; roofBack?: string; gable?: string }> = ({ x, z, w, d, h, rh, rotY = 0, col = "#ecd7ae", roofCol = "#c99a4a", front, side, back, roofFront }) => {
  const F = texMat(front, w, h), S = texMat(side, d, h), B = texMat(back ?? front, w, h);
  const slope = Math.hypot(d / 2, rh), ang = Math.atan2(rh, d / 2), L = slope + 34, T = 16;
  const R = texMat(roofFront, w + 24, slope + 14);
  const tF = useSvgTexture(F.doc, F.pw, F.ph), tS = useSvgTexture(S.doc, S.pw, S.ph), tB = useSvgTexture(B.doc, B.pw, B.ph), tR = useSvgTexture(R.doc, R.pw, R.ph);
  const g = useMemo(() => {
    const walls = new THREE.BoxGeometry(w, h, d);
    const tri = new THREE.Shape([new THREE.Vector2(-d / 2, 0), new THREE.Vector2(d / 2, 0), new THREE.Vector2(0, rh)]);
    const gable = new THREE.ExtrudeGeometry(tri, { depth: w, bevelEnabled: false }); gable.rotateY(Math.PI / 2); gable.translate(-w / 2, h, 0); gable.computeVertexNormals();
    const slab = new THREE.BoxGeometry(w + 44, T, L);
    const plinth = new THREE.BoxGeometry(w + 16, 18, d + 16);
    return { walls, gable, slab, plinth };
  }, [w, h, d, rh, L]);
  const m = useMemo(() => {
    const plain = lam({ color: col }), thatch = lam({ color: roofCol }), under = lam({ color: "#8a6a3a" });
    return { plain, thatch, under, plinth: lam({ color: "#b8865a" }) };
  }, [col, roofCol]);
  if (!tF || !tS || !tB || !tR) return null;
  const wallMats = [lam({ map: tS }), lam({ map: tS }), m.plain, m.plain, lam({ map: tF }), lam({ map: tB })];
  const roofMats = [m.thatch, m.thatch, lam({ map: tR }), m.under, m.thatch, m.thatch];
  const ry = h + rh, c = Math.cos(ang), s = Math.sin(ang), off = 10;
  // a slab hinged at the ridge: centre = ridge + rotated (0, T/2, L/2), tilted down toward +z (front) or -z (back)
  const slabPos = (sign: number): [number, number, number] => [0, ry + off * 0.3 + (T / 2) * c - (L / 2 - off) * s, sign * ((L / 2 - off) * c + (T / 2) * s)];
  return (
    <group position={[x, 0, z]} rotation={[0, rotY * D2R, 0]}>
      <Inked boxy geom={g.plinth} mat={m.plinth} ink={3} position={[0, 9, 0]} />
      <Inked boxy geom={g.walls} mat={wallMats} ink={4} position={[0, h / 2, 0]} />
      <Inked boxy geom={g.gable} mat={m.plain} ink={3} />
      <Inked boxy geom={g.slab} mat={roofMats} ink={4} position={slabPos(1)} rotation={[ang, 0, 0]} />
      <Inked boxy geom={g.slab} mat={roofMats} ink={4} position={slabPos(-1)} rotation={[-ang, 0, 0]} />
    </group>
  );
};

// ---------------------------------------------------------------- deterministic noise
export const rnd = (seed: number) => { const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const vnoise = (x: number, y: number, seed: number) => {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, sm = (t: number) => t * t * (3 - 2 * t);
  const r = (a: number, b: number) => rnd(a * 57.3 + b * 131.7 + seed * 7.1);
  const a = r(xi, yi), b = r(xi + 1, yi), c2 = r(xi, yi + 1), d = r(xi + 1, yi + 1);
  return a + (b - a) * sm(xf) + (c2 - a) * sm(yf) + (a - b - c2 + d) * sm(xf) * sm(yf);
};
const fbm = (x: number, y: number, seed: number) => 0.55 * vnoise(x, y, seed) + 0.3 * vnoise(x * 2.1, y * 2.1, seed + 3) + 0.15 * vnoise(x * 4.3, y * 4.3, seed + 7);

// ---------------------------------------------------------------- hills / mountains (solid heightfield on an ellipse)
type HillOpts = { rx: number; rz: number; h: number; seed?: number; under?: number; tone?: "green" | "storm" | "far"; farCol?: string; rings?: number; segs?: number };
function hillGeometry({ rx, rz, h, seed = 3, under = 0, tone = "green", farCol, rings = 26, segs = 72 }: HillOpts) {
  const pos: number[] = [], col: number[] = [], idx: number[] = [];
  const C = (hex: string) => new THREE.Color(hex);
  const pal = tone === "far" ? { g1: C(farCol ?? "#8fb2c9"), g2: C(farCol ?? "#8fb2c9").multiplyScalar(0.9), rock: C(farCol ?? "#8fb2c9").multiplyScalar(1.08), earth: C(farCol ?? "#8fb2c9").multiplyScalar(0.8) }
    : tone === "storm" ? { g1: C("#3f6a48"), g2: C("#335a3e"), rock: C("#6c6f78"), earth: C("#5a4230") } : { g1: C("#5fae4f"), g2: C("#3f8a3e"), rock: C("#a39a8c"), earth: C("#8a5a34") };
  const top = (r: number, a: number) => { const n = fbm(Math.cos(a) * r * 3 + 9, Math.sin(a) * r * 3 + 4, seed); return h * Math.pow(Math.max(0, 1 - r * r), 1.25) * (0.82 + 0.36 * n); };
  const bot = (r: number, a: number) => -under * (1 - r * r) * (0.75 + 0.5 * fbm(Math.cos(a) * r * 4, Math.sin(a) * r * 4, seed + 11));
  const surf = (isTop: boolean) => {
    const base = pos.length / 3;
    for (let i = 0; i <= rings; i++) for (let j = 0; j < segs; j++) {
      const r = i / rings, a = (j / segs) * Math.PI * 2, y = isTop ? top(r, a) : bot(r, a);
      pos.push(Math.cos(a) * r * rx, y, Math.sin(a) * r * rz);
      const n = fbm(Math.cos(a) * r * 5, Math.sin(a) * r * 5, seed + (isTop ? 21 : 31));
      let c: THREE.Color;
      if (!isTop) c = pal.earth.clone().multiplyScalar(1.25 + 0.4 * n);
      else if (r > 0.94) c = pal.earth.clone().multiplyScalar(0.9 + 0.2 * n);
      else if (n > 0.66 && tone !== "far") c = pal.rock.clone().multiplyScalar(0.9 + 0.2 * n);
      else c = pal.g2.clone().lerp(pal.g1, Math.min(1, Math.max(0, n * 1.4 - 0.1)));
      col.push(c.r, c.g, c.b);
    }
    for (let i = 0; i < rings; i++) for (let j = 0; j < segs; j++) {
      const a = base + i * segs + j, b = base + i * segs + ((j + 1) % segs), c2 = a + segs, d = b + segs;
      if (isTop) idx.push(a, b, c2, b, d, c2); else idx.push(a, c2, b, b, c2, d);
    }
  };
  surf(true); surf(false);
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3)); g.setIndex(idx);
  g.computeVertexNormals();
  return { g, top };
}
/** a solid hill. (x, z) = centre, y = level of its base (css y-down: base at y, rising to y - h). under = depth of the
 *  rocky underside (visible when lifted). trees = number of little 3D trees on its slopes. */
export const Hill: React.FC<HillOpts & { x: number; z: number; y?: number; trees?: number; ink?: number; rocks?: number }> = ({ x, z, y = 0, trees = 0, ink = 5, rocks = 0, ...o }) => {
  const { g, top } = useMemo(() => hillGeometry(o), [o.rx, o.rz, o.h, o.seed, o.under, o.tone, o.farCol]);
  const mat = useMemo(() => lam({ vertexColors: true }), []);
  const items = useMemo(() => Array.from({ length: trees }, (_, i) => {
    const r = 0.25 + 0.6 * rnd(i * 3.7 + (o.seed ?? 0)), a = rnd(i * 5.3 + 1) * Math.PI * 2;
    return { x: Math.cos(a) * r * o.rx, z: Math.sin(a) * r * o.rz, y: top(r, a) - 10, s: 0.35 + 0.25 * rnd(i * 9.1) };
  }), [trees, o.rx, o.rz, o.seed]);
  return (
    <group position={[x, -y, z]}>
      <Inked geom={g} mat={mat} ink={ink} />
      {items.map((t, i) => <Tree3 key={i} x={t.x} z={t.z} y={-t.y} s={t.s} seed={i + 40} tone={o.tone === "storm" ? "storm" : "day"} fruit={false} lo />)}
      {rocks > 0 && Array.from({ length: rocks }, (_, i) => { const r = 0.3 + 0.55 * rnd(i * 2.9 + 5), a = rnd(i * 7.7 + 2) * Math.PI * 2; return <Rock key={`r${i}`} x={Math.cos(a) * r * o.rx} z={Math.sin(a) * r * o.rz} y={-top(r, a) + 8} s={40 + 40 * rnd(i)} seed={i} />; })}
    </group>
  );
};
const rockGeom = new THREE.DodecahedronGeometry(1, 0);
const rockMat = lam({ color: "#a39a8c" });
export const Rock: React.FC<{ x: number; z: number; y?: number; s: number; seed?: number }> = ({ x, z, y = 0, s, seed = 1 }) => (
  <Inked geom={rockGeom} mat={rockMat} ink={0.06} position={[x, -y, z]} rotation={[rnd(seed) * 3, rnd(seed + 1) * 3, 0]} scale={[s, s * 0.6, s * 0.9]} />
);
/** a ring of far mountains (solid, fogged): count hills spread across w, centred at x, at distance z */
export const FarHills: React.FC<{ x?: number; z: number; w: number; h: number; col: string; seed?: number; count?: number }> = ({ x = 0, z, w, h, col, seed = 1, count = 7 }) => (
  <>
    {Array.from({ length: count }, (_, i) => {
      const t = count === 1 ? 0.5 : i / (count - 1), hx = x - w / 2 + t * w + (rnd(seed + i) - 0.5) * (w / count) * 0.5;
      const hh = h * (0.6 + 0.5 * rnd(seed * 3 + i)), r = (w / count) * (0.85 + 0.4 * rnd(seed + i * 7));
      return <Hill key={i} x={hx} z={z - rnd(seed + i * 11) * 900} rx={r} rz={r * 0.55} h={hh} seed={seed * 10 + i} tone="far" farCol={col} ink={0} rings={10} segs={36} />;
    })}
  </>
);

// ---------------------------------------------------------------- trees, clouds, pillars, root, altar base
const sphere = new THREE.IcosahedronGeometry(1, 2), sphereLo = new THREE.IcosahedronGeometry(1, 1);
const trunkGeom = new THREE.CylinderGeometry(13, 20, 180, 12);
const treeMats = { day: ["#3f8a3e", "#4f9b46", "#5fae4f"].map((c) => lam({ color: c })), storm: ["#2c4a34", "#345a3c", "#3d6545"].map((c) => lam({ color: c })) };
const trunkMat = lam({ color: "#7a4b2a" }), fruitMat = new THREE.MeshBasicMaterial({ color: "#ffcf3a" });
const fruitGeom = new THREE.IcosahedronGeometry(1, 1);
/** a kadamba-style tree: trunk + a cluster of round canopy blobs (s = 1: ~370 units tall) */
export const Tree3: React.FC<{ x: number; z: number; y?: number; s?: number; seed?: number; tone?: "day" | "storm"; sway?: number; fruit?: boolean; lo?: boolean }> = ({ x, z, y = 0, s = 1, seed = 1, tone = "day", sway = 0, fruit = true, lo = false }) => {
  const blobs = [[-70, 190, 0, 72], [62, 200, -20, 68], [0, 272, 0, 86], [-38, 240, 40, 64], [48, 152, 30, 54], [-58, 142, -30, 48], [10, 210, -55, 60]];
  return (
    <group position={[x, -y, z]} scale={[s, s, s]} rotation={[0, rnd(seed) * 6, sway * D2R]}>
      <Inked geom={trunkGeom} mat={trunkMat} ink={3} position={[0, 90, 0]} />
      {blobs.map(([bx, by, bz, r], i) => { const rr = r * (0.88 + 0.24 * rnd(seed + i)); return <Inked key={i} geom={lo ? sphereLo : sphere} mat={treeMats[tone][i % 3]} ink={lo ? 0 : 0.05} shadow={!lo} position={[bx, by, bz]} scale={[rr, rr * 0.92, rr]} />; })}
      {fruit && tone === "day" && Array.from({ length: 14 }, (_, i) => { const a = rnd(seed + i * 3) * Math.PI * 2, b = rnd(seed + i * 5) * 0.9 - 0.2, bl = blobs[i % blobs.length], r = bl[3] * 1.0; return <mesh key={`f${i}`} geometry={fruitGeom} material={fruitMat} position={[bl[0] + Math.cos(a) * Math.cos(b) * r, bl[1] + Math.sin(b) * r, bl[2] + Math.sin(a) * Math.cos(b) * r]} scale={[6, 6, 6]} />; })}
    </group>
  );
};
const cloudMats: Record<string, THREE.MeshLambertMaterial> = {};
const cloudMat = (tone: string, op: number) => {
  const k = `${tone}${op.toFixed(2)}`;
  if (!cloudMats[k]) { const c = tone === "storm" ? "#5d6380" : tone === "dark" ? "#3a3f58" : tone === "gold" ? "#ffd7a8" : "#ffffff"; cloudMats[k] = lam({ color: c, emissive: new THREE.Color(c).multiplyScalar(tone === "storm" || tone === "dark" ? 0.18 : 0.42), transparent: op < 1, opacity: op, depthWrite: op >= 1 }); }
  return cloudMats[k];
};
/** a puffy 3D cloud ~w units wide (centre x, y, z; css y-down) */
export const Cloud3: React.FC<{ x: number; y: number; z: number; w: number; seed?: number; tone?: "storm" | "dark" | "day" | "gold"; op?: number }> = ({ x, y, z, w, seed = 1, tone = "day", op = 1 }) => {
  if (op <= 0.01) return null;
  const n = 7, m = cloudMat(tone, Math.round(op * 20) / 20);
  return (
    <group position={[x, -y, z]}>
      {Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1) - 0.5, r = w * (0.13 + 0.09 * rnd(seed + i)) * (1 - Math.abs(t) * 0.7);
        return <mesh key={i} geometry={sphereLo} material={m} position={[t * w * 0.82, r * 0.25 + rnd(seed + i * 3) * w * 0.05, (rnd(seed + i * 7) - 0.5) * w * 0.15]} scale={[r * 1.15, r * 0.72, r]} />;
      })}
    </group>
  );
};
const pillarGeoms = new Map<number, THREE.CylinderGeometry>(), capGeom = new THREE.BoxGeometry(124, 40, 124);
const pillarGeom = (h: number) => { if (!pillarGeoms.has(h)) pillarGeoms.set(h, new THREE.CylinderGeometry(38, 42, h, 24)); return pillarGeoms.get(h)!; };
const goldMat = lam({ color: "#f2c45a", emissive: new THREE.Color("#3a2400") }), goldLite = lam({ color: "#ffd97a", emissive: new THREE.Color("#3a2800") });
export const Pillar3: React.FC<{ x: number; z: number; h?: number }> = ({ x, z, h = 600 }) => (
  <group position={[x, 0, z]}>
    <Inked boxy geom={capGeom} mat={goldLite} ink={3} position={[0, 20, 0]} />
    <Inked geom={pillarGeom(h - 80)} mat={goldMat} ink={3} position={[0, h / 2, 0]} />
    <Inked boxy geom={capGeom} mat={goldLite} ink={3} position={[0, h - 20, 0]} />
  </group>
);

const rootMat = lam({ color: "#8a6440", side: THREE.DoubleSide });
/** the earthen peg under the lifted hill, from its underside (y = ceil) down to the fingertip (tipX, tipY) */
export const Root3: React.FC<{ tipX: number; tipY: number; ceil: number; z?: number }> = ({ tipX, tipY, ceil, z = 3 }) => {
  const len = Math.max(4, tipY - ceil);
  const g = useMemo(() => new THREE.ConeGeometry(34, Math.round(len), 16, 1, true), [Math.round(len)]);
  if (tipY - ceil <= 2) return null;
  return <Inked geom={g} mat={rootMat} ink={2} position={[tipX, -(ceil + len / 2), z]} rotation={[Math.PI, 0, 0]} />;
};
const brickMat = lam({ color: "#c7643c" }), brickTop = lam({ color: "#e07a4a" });
const altarB = new THREE.BoxGeometry(220, 46, 160), altarT = new THREE.BoxGeometry(240, 16, 180);
/** a solid brick fire altar (vedi) base */
export const Altar3: React.FC<{ x: number; z: number; s?: number }> = ({ x, z, s = 1 }) => (
  <group position={[x, 0, z]} scale={[s, s, s]}>
    <Inked boxy geom={altarB} mat={brickMat} ink={4} position={[0, 23, 0]} />
    <Inked boxy geom={altarT} mat={brickTop} ink={4} position={[0, 54, 0]} />
  </group>
);

/** screen-space overlay (not in 3D): rain, flashes, light rays, vignette */
export const Overlay: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", ...style }}>{children}</div>
);

// ---------------------------------------------------------------- easing + camera paths
export const smoother = (t: number) => { t = clamp01(t); return t * t * t * (t * (t * 6 - 15) + 10); };
export const easeOut = (t: number) => 1 - Math.pow(1 - clamp01(t), 3);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const lerpCam = (a: Cam, b: Cam, t: number): Cam => ({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), z: lerp(a.z, b.z, t),
  yaw: lerp(a.yaw ?? 0, b.yaw ?? 0, t), pitch: lerp(a.pitch ?? 0, b.pitch ?? 0, t), roll: lerp(a.roll ?? 0, b.roll ?? 0, t), fov: lerp(a.fov ?? 36, b.fov ?? 36, t) });
/** camera path through keys [{f, cam}] with smootherstep between keys; holds creep forward (push-in) by creep px/frame */
export const camPath = (keys: { f: number; cam: Cam; creep?: number }[], f: number): Cam => {
  let i = 0; while (i + 1 < keys.length && f >= keys[i + 1].f) i++;
  const k = keys[i], n = keys[i + 1];
  if (!n) { const c = k.cam; return { ...c, z: c.z - (k.creep ?? 0.6) * (f - k.f) }; }
  return lerpCam(k.cam, n.cam, smoother((f - k.f) / (n.f - k.f)));
};
