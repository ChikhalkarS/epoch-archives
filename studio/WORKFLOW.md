# Production workflow (Google Flow based)

Entry point: `/make-video <ep-slug>` (`skills/studio/make-video`). Format rules: `studio/FORMAT.md`. Look: `studio/STYLE_BIBLE.md`.

## Folder per episode: `episodes/<ep-slug>/` (e.g. `ep01-bhopal-jheel`)
| # | File | Made by | Skill |
|---|---|---|---|
| 1 | `research.md` | Claude | `city-research` (facts F#, sources S# with URLs, status, the belief, 3 reveals, myth, "aaj bhi") |
| 2 | `script_hi.md` | Claude | `hindi-script` + vendor `scriptwriting` (timed Hindi script with hook, fact tags) |
| **G1** | **Owner approves the script** | Owner | |
| 3 | `shotlist.md` | Claude | `shotlist` + vendor `cinematic-director` (each shot: duration, visual, camera, overlay, SFX, exact VO line) |
| 4 | `flow_prompts.md` | Claude | `flow-prompts` + vendor `video-prompt-director`, `character-consistency` (one Flow prompt per shot) |
| 5 | `clips/<shot>.mp4` | **Owner in Google Flow** | Download each 8 s clip, name it by shot ID (`clips/s07.mp4`). Shorts-only 9:16 clips: `clips/<shot>_v.mp4` |
| 6 | `renders/` | `python3 tools/assemble_episode.py <ep-slug>` | `assemble` (voice + word timing, clip timing, captions, overlays, music, SFX, export) |
| **G2** | **Owner approves the renders** | Owner | |
| 7 | `youtube.md` | Claude | `youtube-pack` (titles, description with sources, tags, chapters, Shorts copy, thumbnail) |
| | `CREDITS.md` | Claude | music/SFX/font licences |

Template: `episodes/_template/`. Tracker: `tracker/videos.csv` (status: idea → researched → scripted → approved-script → shotlisted → prompts-ready → clips-in → rendered → approved → uploaded).

## Assembly in one line (owner's Mac)
```bash
python3 tools/assemble_episode.py ep01-bhopal-jheel --preview   # fast 540p check, placeholders for missing clips
python3 tools/assemble_episode.py ep01-bhopal-jheel             # 1080p long + Shorts + .srt + chapters
```
Needs only: ffmpeg (with libass, the Homebrew default), Python 3, `pip install edge-tts`. No local AI models. Word timings come from edge-tts itself. Optional: if the owner records their own voice, `--whisper` uses faster-whisper `tiny` (ask before installing).

## Owner's Flow routine (per episode, ~70–90 clips)
1. Once only: make the Sutradhar sheet (prompt in `studio/ref/README.md`) and save it as `studio/ref/sutradhar_sheet.png`.
2. Open `flow_prompts.md`. For each shot: set the aspect ratio, add the ingredient if listed, paste the prompt, generate (pick the best of 2), and download it to `clips/<shot>.mp4`.
3. Shots marked `reuse:` need no generation. Shots marked `optional` can be skipped (the assembler fills them with the previous clip's freeze or a card).
4. Run the preview, then tell Claude "clips in".
