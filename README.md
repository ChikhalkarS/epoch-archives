# Epoch Archive Studios

Hindi YouTube channel on Indian city histories: founding, rulers, wars, trade, culture, food, geography and strange facts. Claymation look. One long video (8-12 min) + 2-3 Shorts per city.

Claude runs production; the owner approves at two gates. Channel settings: `config/channel.json`.

## Folders
| Folder | What goes in it |
|---|---|
| `config/` | `channel.json` (name, language, voice, formats) and `style-guide.md` (claymation prompt prefix, motion, audio, text rules) |
| `research/<city>/` | `sources.md` (source list + fact sheet with status) and `notes.md` (hooks, arc, flags). Template in `research/_template/` |
| `scripts/` | `<city>.md` Hindi narration script, one per video |
| `storyboards/` | `<city>.json` (scenes, narration, prompts, Shorts) and `<city>.md` shot list |
| `assets/<city>/` | `images/`, `clips/`, `voice/`, `PROMPTS.md`, `CREDITS.md`. Shared music in `assets/music/` |
| `renders/<city>/` | Final long video, Shorts, Hindi `.srt`, chapters |
| `publish/` | `<city>.md` titles, description, tags, chapters, thumbnail concepts |
| `skills/` | Claude Code skills (studio + vetted vendor), linked into `.claude/skills/`. See `skills/README.md` |
| `tracker/` | `videos.csv`: status per video: idea, researched, scripted, voiced, visuals, rendered, approved, uploaded |
| `tools/` | `voice.mjs` (Hindi TTS per scene), `assemble.mjs` (FFmpeg assembly + Shorts), `setup-mac.sh` |

## Use
```bash
bash tools/setup-mac.sh          # once
```
Then in Claude Code: `/make-video bhopal`. Manual steps if needed:
```bash
node tools/voice.mjs bhopal
node tools/assemble.mjs bhopal --preview   # fast 540p check
node tools/assemble.mjs bhopal             # final 1080p + Shorts
```
Scene visuals: `assets/<city>/images/s01.png` (still + slow camera move) or `assets/<city>/clips/s01.mp4` (generated clip). Missing visuals render as a placeholder so timing can be reviewed early.
