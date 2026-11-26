// usage: node stills.mjs <compId> <outPrefix> <frame,frame,...> [scale]
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path"; import fs from "node:fs";
const [id, prefix, frames, scale = "0.5"] = process.argv.slice(2);
const browserExecutable = fs.readdirSync("/opt/pw-browsers").filter((d) => d.startsWith("chromium_headless_shell-")).map((d) => `/opt/pw-browsers/${d}/chrome-headless-shell-linux64/chrome-headless-shell`).find((p) => fs.existsSync(p));
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts"), publicDir: path.resolve("public") });
const composition = await selectComposition({ serveUrl, id, browserExecutable, chromiumOptions: { gl: process.env.GL || "swangle" } });
fs.mkdirSync(path.dirname(prefix), { recursive: true });
for (const f of frames.split(",").map(Number)) {
  const t = Date.now();
  await renderStill({ serveUrl, composition, frame: f, output: `${prefix}${String(f).padStart(4, "0")}.jpg`, imageFormat: "jpeg", jpegQuality: 88, scale: Number(scale), browserExecutable, chromiumOptions: { gl: process.env.GL || "swangle" } });
  console.log(f, ((Date.now() - t) / 1000).toFixed(1) + "s");
}
