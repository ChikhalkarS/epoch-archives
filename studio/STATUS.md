# Status and plan (read this first in every new session)

**Last updated:** 2026-11-28 · **Next review:** start of the next session
Rules: decisions live in `studio/DECISIONS.md`; brand and roadmap in `studio/VISION.md`. Update this file at the end of every working session: what was done (dated), and move the plan forward.

## Where we are (as of 2026-11-27)
| Area | Status |
|---|---|
| Tools and plans | Google Flow on **Google AI Pro** (Veo 3.1 Lite, ~10 credits/clip). **ElevenLabs free tier** (test only: no commercial use). Everything else free |
| Brand | Channel Epoch Archive, spoken **आर्काइव फ़ाइल्स**, format **असली सीन**, numbering **फ़ाइल 001…**, casual तुम-form Hindi with a suspicious/curious opening. Host **Sutradhar, an Indian grey wolf with attitude** (2D noir style) |
| Characters made in Flow | Sutradhar wolf close-up ✅ (approved). Sultan lion close-up ✅ (approved). Archive room ✅. Sheets: confirm both are saved as ingredients |
| **फ़ाइल 001** (Bhopal lost lake Short) | Script v5 (story-first, 11 clips) ✅. Flow prompts ✅ (pass `validate.py`). **One sample of clips generated in Flow** ✅. **ElevenLabs voice audio generated (free tier)** ✅. **Editing not done yet** ⏳ (`tools/finish_short.mjs` is ready and tested) |
| Bhopal long video | Research ✅, script ✅ (casual tone), 87 Flow prompts ✅. **Waiting for Gate 1 approval.** Not generated |
| YouTube | Channel live: **Wolfy Files**, https://www.youtube.com/@BhediyaFiles (0 videos). Description set (English). Profile picture, banner and watermark prompts given. **Name to align** |
| Published | Nothing yet |

## Done log
- **2026-11-28:**
  - All branches merged into `main` (Mumbai Shorts pipeline + brand/studio docs + this session's tools); direction fixed (decision 30).
  - Repo cleanup (old Remotion engine, Delhi pilot removed).
  - Hindi quality kit: `skills/studio/hindi-script/STYLE.md`, `tools/hindi-lint.mjs`, `hindi-editor` agent; voice markup for the edge-tts fallback.
  - Chrome-driven Flow runs: `flow/CHROME-PROMPTS.md`.
  - Akola: research (39 facts), long script (parked), Short 1 queen legend rebuilt with `/make-short akola` (ep 4, 167 words, 20 shots); characters AKOLA_RANI, AKOLA_RAJA added (library v9).
- **2026-11-27:**
  - Remotion removed.
  - Quiet Wolf analysed (`analysis/quiet-wolf.md`).
  - Format, vision and brand set.
  - YPP rules checked (new rule from Feb 1, 2027: 1,000 subs + 8,000 hrs or 20M Shorts views).
  - Flow-only workflow and credit costs.
  - Style changed claymation → 2D noir; host fox → wolf.
  - Bhopal research + long script + 87 prompts.
  - फ़ाइल 001 Short written (v5) + prompts + validator.
  - `sutradhar-voice` dialogue skill.
  - ElevenLabs test input.
  - `finish_short.mjs` editor.
  - Owner generated sample clips + ElevenLabs audio.
  - YouTube channel created (Wolfy Files, @BhediyaFiles); DP, banner, watermark prompts and an English description written.
  - Owner feedback: the Bhopal story lacks value. New topic filter (document + today's relevance + surprise); 12 archive-backed city files shortlisted (`studio/TOPICS_ARCHIVE.md`).

## Plan (dates are targets; move them forward if missed and note why)
| By | Milestone | Owner / Claude |
|---|---|---|
| **2026-11-29** | Akola Short 1 (ep 4): owner Gate 1 on `shorts/akola/short1-rani.md`, then ElevenLabs voice from `short1-rani-voice.txt`, `time-voice`, Flow (sheets for AKOLA_RANI, AKOLA_RAJA first) | Owner |
| **2026-11-29** | Edit फ़ाइल 001: run `node tools/finish_short.mjs <folder>` on the Mac → `final-short.mp4`. Claude reviews it | Owner runs, Claude reviews |
| **2026-11-29** | Voice decision: ElevenLabs (needs a paid plan to publish, ~$5/month, owner approval) vs Flow's voice | Owner |
| 2026-11-30 | If ElevenLabs: regenerate the 11 clips in the silent version (mouth closed); final render | Claude prompts, owner generates |
| **2026-12-01** | **Publish फ़ाइल 001** (owner uploads; title, description and sources in `youtube.md`) | Owner |
| 2026-12-01 → 07 | फ़ाइल 002–004 (next cities from `studio/TOPICS.md`: Mumbai, Jaipur, Daulatabad suggested) | Claude writes, owner generates |
| From 2026-12-08 | Steady cadence: 4 Shorts/week (Mon, Tue, Thu, Sat) | Both |
| 2026-12 (after Gate 1) | Bhopal long video, about 8–9 min | Both |
| 2027-01-31 | Old-rule YPP window closes (stretch goal only) | |
| 2027-02-01 → 2027-11 | New-rule YPP goal: 1,000 subs + 8,000 long-form hours in 365 days | |
| 2027-03 | Start the ⚔️ wars playlist (`studio/VISION.md`) | |

## Open decisions (from `studio/DECISIONS.md`)
0. **Align the brand name** (Wolfy Files vs Bhediya Files), then **pick the launch file** from `studio/TOPICS_ARCHIVE.md`.
1. Gate 1: Bhopal long-video script.
2. Voice for publishing: ElevenLabs (paid) or Flow's voice.
3. Season 1 order: Indian cities only, or alternate India and world.
4. Captions for Shorts: burned in (via `finish_short.mjs` + `lines.txt`) or YouTube SRT.
