// YouTube thumbnail 1280x720, rendered from the video's own world: Krishna holding Govardhan in the storm,
// furious Indra on Airavata in the clouds, big question text.
import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { Stage, StormWorld, Rain, LIFT, Overlay } from "./sets";
import { indraOnAiravata, DEFS } from "./chars.js";
import { raysSVG, cloud, cloudBox } from "./paint";
import { Card } from "./stage";

export const Thumbnail: React.FC = () => {
  const { width: W, height: H } = useVideoConfig();
  const f = 140;
  const actors = [
    { id: "krishna", kind: "krishna", x: 0, z: 0, expr: "smile", pose: LIFT },
    { id: "yashoda", kind: "yashoda", x: -330, z: -240, expr: "surprise" }, { id: "sakha", kind: "sakha", x: 240, z: -300, expr: "surprise" },
    { id: "calf", kind: "cow", x: -200, z: 60, s: 0.62 },
  ];
  return (
    <AbsoluteFill style={{ background: "#141a34" }}>
      <AbsoluteFill style={{ filter: "saturate(1.15) brightness(1.02) contrast(1.06)" }}>
        <Stage cam={{ x: 250, y: -320, z: 950, pitch: 5, fov: 46 }} lens={{ focus: 950, cInf: 3, max: 5 }} haze={{ color: "#3a4060", near: 1800, far: 9000, max: 0.5 }}
          bg="linear-gradient(180deg, #141a34 0%, #2b2f56 45%, #4b4b72 75%, #5b5a76 100%)" width={W} height={H}>
          <StormWorld f={f} actors={actors as any} golden={0.45} flashes={[f]} indra={false} />
        </Stage>
        <Rain f={f} W={W} H={H} op={0.55} density={180} />
        <Overlay style={{ opacity: 0.55, mixBlendMode: "screen", filter: "blur(10px)" }}><div dangerouslySetInnerHTML={{ __html: raysSVG(W, H, W * 0.3, 0.4) }} /></Overlay>
        <Overlay style={{ background: "radial-gradient(ellipse at 30% 55%, rgba(0,0,0,0) 45%, rgba(10,6,24,0.55) 100%)" }}><div /></Overlay>
        <Overlay style={{ background: "linear-gradient(180deg, rgba(14,16,40,0.95) 0%, rgba(14,16,40,0.6) 14%, rgba(14,16,40,0) 30%)" }}><div /></Overlay>
      </AbsoluteFill>
      {/* poster layer: Indra on Airavata glaring from a storm cloud (top right) */}
      <svg style={{ position: "absolute", right: 40, top: 6 }} width={460} height={420} viewBox="-300 -520 600 560" dangerouslySetInnerHTML={{ __html: DEFS +
        `<g opacity="0.9">${cloud(620, 44, "storm")}</g>` + `<g transform="translate(0 -40)">${indraOnAiravata({ expr: "shout", talk: 0.8, vajraUp: 1 })}</g>` + `<g transform="translate(-60 30)">${cloud(540, 46, "storm")}</g>` }} />
      <div style={{ position: "absolute", right: 30, top: 420, textAlign: "right", fontFamily: "Inter, 'Inter Display', sans-serif", fontWeight: 900, lineHeight: 0.92,
        letterSpacing: -2, transform: "rotate(-3deg)" }}>
        <div style={{ fontSize: 112, color: "#ffffff", WebkitTextStroke: "14px #1a0f24", paintOrder: "stroke fill", textShadow: "0 8px 0 rgba(0,0,0,0.35)" }}>INDRA KO</div>
        <div style={{ fontSize: 150, color: "#ffd23a", WebkitTextStroke: "16px #1a0f24", paintOrder: "stroke fill", textShadow: "0 8px 0 rgba(0,0,0,0.35)" }}>SAZA?</div>
      </div>
    </AbsoluteFill>
  );
};
