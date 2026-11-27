# Epoch Archive Studios

Hindi YouTube channel: hidden stories behind Indian cities (plus brands and habits), told as curious, sourced claymation mini-documentaries. 1 long episode (9-10 min) + 3-4 Shorts per week.

Claude runs production; the owner approves at two gates and generates the clips in Google Flow. Channel settings: `config/channel.json`.

## Folders
| Folder | What goes in it |
|---|---|
| `config/` | `channel.json` (name, language, voice, formats, YPP goal) |
| `studio/` | `FORMAT.md`, `STYLE_BIBLE.md`, `WORKFLOW.md`, `MONETIZATION.md`, `TOPICS.md`, `VOICE.md`, `ref/` (Sutradhar sheet) |
| `analysis/` | Reference-channel analysis (`quiet-wolf.md`) |
| `episodes/<ep>/` | `research.md`, `script_hi.md`, `shotlist.md`, `flow_prompts.md`, `clips/` (owner's Flow downloads), `renders/`, `youtube.md`, `CREDITS.md`. Template: `episodes/_template/` |
| `assets/` | `fonts/` (Mukta, OFL), `music/`, `brand/` |
| `skills/` | Claude Code skills (studio + vetted vendor), linked into `.claude/skills/` |
| `tracker/` | `videos.csv`: status per episode |
| `tools/` | `assemble_episode.py` (ffmpeg assembly: voice, captions, overlays, music, Shorts), `align.py`, `audio/` (own synth), older `*.mjs` still-image pipeline |
| `research/`, `scripts/`, `storyboards/` | Old still-image pipeline (Bhopal v1); kept for reference |
| `legacy/delhi-pilot/` | First Delhi pilot |

## Use
```bash
brew install ffmpeg python && pip3 install edge-tts      # once on the Mac
python3 tools/assemble_episode.py ep01-bhopal-jheel --preview
python3 tools/assemble_episode.py ep01-bhopal-jheel
```
In Claude Code: `/make-video ep01-bhopal-jheel`. See `studio/WORKFLOW.md`.
