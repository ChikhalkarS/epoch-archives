# Owner decisions log
Newest at the bottom. The file named in each row has the detail. Claude reads this before any new stage.

| # | Date | Decision | Detail in |
|---|---|---|---|
| 1 | 2026-11-27 | Remove Remotion completely. No local render engine | `studio/REMOTION_REMOVAL.md` |
| 2 | 2026-11-27 | Reference channel: Quiet Wolf. Copy the format, not their scripts, characters or titles | `analysis/quiet-wolf.md` |
| 3 | 2026-11-27 | Google Flow makes everything: picture + Hindi voice + SFX. Owner stitches in Flow Scenebuilder. No ffmpeg assembly | `studio/WORKFLOW.md` |
| 4 | 2026-11-27 | Flow model: **Veo 3.1 Lite**, 8 s, x1 (10 credits/clip). Owner has Google AI Pro | `studio/FLOW_CREDITS.md` |
| 5 | 2026-11-27 | YPP goal: the new rule from Feb 1, 2027 (1,000 subs + 8,000 watch hours or 20M Shorts views). Pre-Feb entry is a stretch | `studio/MONETIZATION.md` |
| 6 | 2026-11-27 | Cadence: 4 Shorts/week + 1 long every 2 weeks. **Current focus: perfect one Short first** | `studio/FORMAT.md`, `studio/CALENDAR.md` |
| 7 | 2026-11-27 | Art style: Quiet Wolf style family, a **2D noir graphic-novel cartoon** (not claymation) | `studio/STYLE_BIBLE.md` §1 |
| 8 | 2026-11-27 | **Main character for every video: Sutradhar, an Indian Bengal fox** (kurta, red Nehru waistcoat, spectacles, satchel). Supporting animals change per video | `studio/STYLE_BIBLE.md` §3, `episodes/<ep>/cast.md` |
| 9 | 2026-11-27 | No single-finger gestures (AI renders a middle finger). Open paws or point with a prop | `studio/STYLE_BIBLE.md` §7b |
| 10 | 2026-11-27 | Voice: Flow's own voice (edge-tts Madhur rejected). **Heavy, soft, calm, brisk (~3 words/s)** | `config/channel.json` → voice |
| 11 | 2026-11-27 | Lines fill 6–7 s of each 8 s clip (14–18 words). Shorts 45–55 s and conclusive: no gap in the cause → effect chain | `skills/studio/hindi-script/SKILL.md` |
| 12 | 2026-11-27 | Scope: **world history in Hindi** (cities → wars → leaders/strategy → data → empires), not only India | `studio/VISION.md` |
| 13 | 2026-11-27 | Brand: channel **Epoch Archive**, spoken as **आर्काइव फ़ाइल्स**. Format **असली सीन**. Continuous numbering **फ़ाइल 001…**. Playlists instead of separate series | `studio/VISION.md` |
| 14 | 2026-11-27 | Tone: **Gen Z, casual तुम-form Hindi**, light Hinglish. Fixed lines: welcome, "पर असली सीन तो अब शुरू होता है!", end "अगली फ़ाइल किसकी खुलेगी, देखना है? तो फ़ॉलो करना मत भूलना!" (reusable clip) | `studio/VISION.md` |
| 15 | 2026-11-27 | फ़ाइल 001 = Bhopal Short "भोपाल की गुम झील का असली सीन" (Hoshang Shah story → विवादित) | `episodes/ep01-bhopal-jheel/shorts/sh01-30-saal/` |
| 16 | 2026-11-27 | Play safe for फ़ाइल 001: one shot per clip as written. Multi-shot timestamped prompts (2–3 cuts per 8 s clip) to be tried later | this log |
| 17 | 2026-11-27 | Main character changed from fox to **Sutradhar, an Indian grey wolf with attitude** (smug know-it-all smirk, peers over low brass spectacles; maroon bandhgala, cream kurta, indigo angavastram, satchel; no Western attire). Kept visually distinct from Quiet Wolf's mascot | `studio/STYLE_BIBLE.md` §3, `studio/ref/README.md` |
| 18 | 2026-11-27 | Keep Flow's native voice for now despite clip-to-clip drift. Fallback later: separate fixed TTS voice + join step (Gemini TTS first to test) | this log |
| 19 | 2026-11-27 | Sultan close-up approved. Wolf: attitude approved; add WOLF BUILD line so he reads as a wolf, not a fox | `studio/ref/README.md` |
| 20 | 2026-11-27 | **Prompt checklist (enforced by `tools/flowpack/validate.py`, run before handing prompts to the owner):** current STYLE (2D noir), CONSTRAINTS (no text, no music, no cuts, never 3D), VOICE (heavy, soft, calm, brisk) in every speaking clip; SUTRADHAR wolf block + role line whenever he appears; Sultan role line on Sultan clips; 9:16 framing line on Shorts; lines ≤ 20 words; no fox, clay, single-finger gestures, grin or wink for Sutradhar, Western attire, "एपिसोड", polite आप-form, or old catchphrase. Shorts must have the welcome, असली सीन, verdict and end lines | `tools/flowpack/validate.py` |
| 21 | 2026-11-27 | Old EP1-pack Shorts removed. Every Short is a standalone file in `episodes/<ep>/shorts/` | this log |
| 22 | 2026-11-27 | Fix duplicate glasses: glasses are described only once (the SUTRADHAR block says "exactly one pair"), never in ACTION lines; the CONSTRAINTS block says accessories are never duplicated. The validator checks this | `studio/STYLE_BIBLE.md` |
| 23 | 2026-11-27 | Scripts must feel human: write the whole story as one continuous narration first, then cut it into clips. Every cause leads to its effect; hedges used once where they matter | `skills/studio/sutradhar-voice/SKILL.md` |
| 24 | 2026-11-27 | **Always open with a suspicious or curious tone**, and keep that tone in the dialogue throughout (a suspicious/curious beat every 2–3 lines). New dialogue-writer skill `sutradhar-voice` | `skills/studio/sutradhar-voice/SKILL.md` |
| 25 | 2026-11-27 | Testing an ElevenLabs voice for फ़ाइल 001 (free plan = test only; a paid plan is needed to publish, so ask first). When a separate voice is used, the finishing step is `tools/finish_short.mjs` on the owner's Mac (ffmpeg + Node): clips (muted) + voice split at its pauses + music (owner's royalty-free file or a self-synthesised pad) + burned captions from `lines.txt` → `final-short.mp4` | `tools/finish_short.mjs` |

## Open (waiting for the owner)
- Gate 1 approval of the Bhopal long-video script (`episodes/ep01-bhopal-jheel/script_hi.md`).
- Season 1 order: Indian cities only, or alternate India and world.
- Captions for Shorts: YouTube SRT upload, or burned-in captions.
