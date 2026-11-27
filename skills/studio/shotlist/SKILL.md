---
name: shotlist
description: Turn an approved Epoch Archive Hindi script into a machine-readable shot list for Google Flow clips (duration, visual, camera, overlay code, SFX, exact VO line) plus Shorts cuts. Use for stage 3 of /make-video.
---

# Shotlist → `episodes/<ep>/shotlist.md`

Load vendor `cinematic-director` (Mode D: read its SKILL.md and the motion budget and duration sections of `references/ai-video-tool-adapters.md`). Apply its hard rules: story function per shot, one camera move, one primary action, an end state for every action.

## Table (the assembler parses it; keep the columns and order)
`| Shot | Chapter | Dur | Visual | Camera | Overlay | SFX | VO |`
- **Shot:** `s01`, `s02`… The clip file is `clips/<shot>.mp4`. A split uses `clips/<shot>a.mp4` + `<shot>b.mp4`. `logo` = the sting (`assets/brand/logo.mp4` if present, else a generated card).
- **Chapter:** fill it only on the first shot of a chapter (it becomes a YouTube chapter).
- **Dur:** planned seconds (2–8). The assembler stretches to fit the VO: it slows a clip to at most 0.75×, then holds the last frame.
- **Visual:** one line of what is seen. Prefix `reuse:s05` to reuse a clip (with a different crop/zoom), or `optional` to allow skipping.
- **Camera:** one behaviour (`locked`, `slow push-in`, `slow pan L→R`, `slow tilt up`, `top-down slow zoom`).
- **Overlay:** codes from `studio/STYLE_BIBLE.md` §5 (`card:F3|<label>|<source>`, `map:<label>`, `myth:<SACH|JHOOTH|VIVAADIT>|<claim>`, `title:<text>`, `year:<yyyy>`, `split`, `none`). Separate multiple codes with ` + `.
- **SFX:** `riser`, `hit`, `stamp`, `paper`, `whoosh`, or `-`.
- **VO:** the exact narration for this shot (fact tags removed). Joined in order, the VO cells must equal the script word for word. Insert `[beat]` for a 0.5 s pause.

## Pacing
New visual every 3–6 s (Quiet Wolf rhythm), so 1 shot ≈ 8–14 Hindi words. Pattern break every ~60 s (map, card, myth, split, title). Sutradhar max 5 shots. Budget ≈ 90–110 shots for 9.5 min. Mark ~20% as `reuse:` to save Flow credits.

## Shorts
`| Short | Shots | Hook text | End line |`. 3–4 Shorts of 30–45 s from contiguous ranges (e.g. `s30-s38`). Hook text ≤ 6 words with a number or object (Quiet Wolf data: number/object titles win). End line: "पूरी कहानी: EP<n>". Score windows by hook strength, self-containedness and surprise (vendor `scriptwriting` hooks.md).
