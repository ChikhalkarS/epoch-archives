# Epoch Archive Studios

Hindi YouTube channel: hidden stories behind Indian cities (plus brands and habits), told as curious, sourced 2D noir-cartoon mini-documentaries. 1 long episode (9-10 min) + 3-4 Shorts per week.

Claude runs production; the owner approves at two gates and generates the clips in Google Flow. Channel settings: `config/channel.json`.

## Folders
| Folder | What goes in it |
|---|---|
| `config/` | `channel.json` (name, language, voice, formats, YPP goal) |
| `studio/` | `FORMAT.md`, `STYLE_BIBLE.md`, `WORKFLOW.md`, `MONETIZATION.md`, `TOPICS.md`, `VOICE.md`, `ref/` (Sutradhar sheet) |
| `analysis/` | Reference-channel analysis (`quiet-wolf.md`) |
| `episodes/<ep>/` | `research.md`, `script_hi.md`, `flow_prompts.md` (one Google Flow prompt per clip, with Hindi dialogue), `youtube.md`. Template: `episodes/_template/` |
| `assets/` | `music/`, old voice tests |
| `skills/` | Claude Code skills (studio + vetted vendor), linked into `.claude/skills/` |
| `tracker/` | `videos.csv`: status per episode |
| `tools/` | Older still-image pipeline (`*.mjs`), `align.py`, `audio/`; not used in the Flow pipeline |
| `research/`, `scripts/`, `storyboards/` | Old still-image pipeline (Bhopal v1); kept for reference |
| `legacy/delhi-pilot/` | First Delhi pilot |

## Use
In Claude Code: `/make-video ep01-bhopal-jheel`. Claude writes the research, script and Google Flow prompts; the owner generates and stitches the clips in Flow. See `studio/WORKFLOW.md`.
