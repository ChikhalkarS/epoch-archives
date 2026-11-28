# Production workflow (Google Flow only)

Google Flow (Veo) makes everything: picture, the Hindi voice (dialogue + voice-over), ambience and SFX. The owner stitches the clips in Flow's **Scenebuilder** and exports. Claude writes everything up to the prompts. No Remotion, no ffmpeg.

Entry point: `/make-video <ep-slug>` (`skills/studio/make-video`). Format: `studio/FORMAT.md`. Look and voice: `studio/STYLE_BIBLE.md`.

## Per episode: `episodes/<ep-slug>/`
| # | File | Made by | Skill |
|---|---|---|---|
| 1 | `research.md` | Claude | `city-research` (facts F#, sources S#, the belief, 3 reveals, myth, "aaj bhi") |
| 2 | `script_hi.md` | Claude | `hindi-script` + vendor `scriptwriting` |
| **G1** | **Owner approves the script** | Owner | |
| 3 | `flow_prompts.md` | Claude | `flow-prompts` + vendor `cinematic-director`, `video-prompt-director`, `character-consistency` (shot plan table + one complete Flow prompt per 8 s clip) |
| 4 | Clips in Flow | **Owner** | Generate each prompt in order, add it to Scenebuilder, pick the best take |
| **G2** | **Owner shares the Scenebuilder export (or a few clips)** | Owner | Claude QCs: voice drift, face drift, text artifacts, pacing |
| 5 | `youtube.md` | Claude | `youtube-pack` (titles, description with sources, tags, chapters, Shorts copy, subtitle file) |

## Owner's Flow routine
1. **Once:** build the Sutradhar sheet and the archive-room plate (prompts in `studio/ref/README.md`). Save them in Flow as ingredients.
2. Settings per clip: model **Veo 3.1 Lite** (10 credits per clip at 4, 6 or 8 s, so always pick **8 s**), aspect **16:9** (Shorts: 9:16), **1 output** (each output costs credits). Veo 3.1 Fast/Quality are retired on Dec 5, 2026. Credit table: `studio/FLOW_CREDITS.md`.
3. Mode per clip, as named in the prompt header:
   - **Text to Video:** paste the prompt.
   - **Ingredients to Video:** attach the named ingredient(s) (Sutradhar sheet / archive room), then paste.
   - **Frames to Video:** use the named first frame (e.g. the last frame of the previous clip) for seamless continuation.
4. Add each kept clip to **Scenebuilder** in shot order. Trim dead tails.
5. Export the full episode from Scenebuilder.
6. **Music:** add one track in YouTube Studio → Editor → Audio (YouTube Audio Library, free, monetisation-safe). That keeps one consistent score across clips; the prompts ask Flow for "no music".
7. **Captions:** upload `episodes/<ep>/subtitles_hi.txt` in YouTube Studio → Subtitles → Upload file → **Without timing** (auto-sync). That gives free Hindi captions, with no editing software.

## Known Flow limits (and our workarounds)
| Limit | Workaround |
|---|---|
| Voice can drift between clips | One fixed voice description pasted verbatim in every prompt. Regenerate outliers. Keep each line ≤ 16 Hindi words so it fits 8 s |
| Readable text (Devanagari) renders badly | No on-screen text in prompts. Sources are **spoken** ("इम्पीरियल गज़ेटियर, उन्नीस सौ आठ के मुताबिक़") and listed in the description. Evidence objects are drawn with blank or scribble text |
| Faces drift | Sutradhar only through the Ingredients sheet. Faces stay under 1/3 of the frame except deliberate close-ups |
| Clip music clashes | Every prompt says "no music". The score is added once in YouTube Studio |
