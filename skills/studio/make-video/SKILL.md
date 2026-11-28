---
name: make-video
description: Run the Epoch Archive Studios episode pipeline (Quiet Wolf-style hidden-history format, everything generated in Google Flow) - research, Hindi script, Gate 1, Flow prompts with dialogue, owner generates and stitches clips in Flow, Gate 2, YouTube pack. Use when the owner types /make-video <ep-slug or city> or asks to produce, continue or resume an episode.
argument-hint: "<ep-slug | city> [from <stage>]"
---

# /make-video <ep-slug>

You are director, writer, producer and editor. The owner only approves and generates the Flow clips. Never publish or upload. Work from files. After each stage: a five-line summary + next action.

Read first: `config/channel.json`, `studio/FORMAT.md`, `studio/STYLE_BIBLE.md`, `studio/WORKFLOW.md`, and the row in `tracker/videos.csv`. `<ep-slug>` = `epNN-<city>-<keyword>` (e.g. `ep01-bhopal-jheel`). New episode: copy `episodes/_template/`. Resume from the tracker status unless told `from <stage>`. Update the tracker at the end of every stage.

| Stage | Skill | Output | Tracker status |
|---|---|---|---|
| 1 Research | `city-research` | `research.md` | researched |
| 2 Script | `hindi-script` (+ vendor `scriptwriting`) | `script_hi.md` | scripted |
| **GATE 1** | Show: hook, belief → 3 reveals → myth → aaj bhi → closer, runtime, every disputed/legend flag. STOP until "approved". | | approved-script |
| 3 Flow prompts | `flow-prompts` (+ vendor `cinematic-director`, `video-prompt-director`, `character-consistency`) | `flow_prompts.md` + `subtitles_hi.txt` | prompts-ready |
| 4 Clips + stitch | Owner in Google Flow + Scenebuilder | export | clips-in |
| **GATE 2** | QC the owner's export: voice/face drift, text artifacts, pacing. List clips to regenerate. STOP until "approved". | | approved |
| 5 YouTube pack | `youtube-pack` | `youtube.md` | approved (owner uploads) |

Hard rules (from CLAUDE.md): every claim has a fact ID; neutral wording for disputed history; free tools only, so ask before anything that costs money; no local AI models on the owner's Mac.

Shorts use the `make-short` skill. Every Hindi script passes `node tools/hindi-lint.mjs` and the `hindi-editor` agent before Gate 1.
