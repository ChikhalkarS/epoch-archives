import React from "react";
import { Composition } from "remotion";
import { GovindaVideo, TOTAL } from "./govinda/video";
import { Thumbnail } from "./govinda/thumbnail";
export const Root: React.FC = () => (
  <>
    <Composition id="Thumbnail" component={Thumbnail} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="Govinda" component={GovindaVideo} durationInFrames={TOTAL} fps={30} width={1920} height={1080} />
  </>
);
