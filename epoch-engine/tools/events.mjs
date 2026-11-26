// Bundles video.tsx for node and writes out/events.json (whips, flashes, cuts, planned windows, sfx cues, beats).
import { build } from "esbuild";
import fs from "node:fs";
await build({ entryPoints: ["src/govinda/video.tsx"], bundle: true, platform: "node", format: "esm", outfile: "out/_video_node.mjs", jsx: "automatic", loader: { ".json": "json" }, external: ["remotion", "react", "react-dom"], logLevel: "error" });
const m = await import(process.cwd() + "/out/_video_node.mjs");
const ev = m.events();
fs.writeFileSync("out/events.json", JSON.stringify(ev));
const plan = { aspect: "16:9", target_s: [349, 351], max_hold_s: 2.0, cuts: ev.cuts, planned: ev.planned, beats: ev.beats };
fs.writeFileSync("out/plan_full.json", JSON.stringify(plan));
console.log("whips", ev.whips.length, "flashes", ev.flashes.length, "cuts", ev.cuts, "beats", ev.beats.length);
