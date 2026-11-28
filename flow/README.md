# Flow library

How Epoch Archive Studios uses Google Flow so every reel reuses the same look and characters, not fresh prompts.

## The idea
- **The repo is the source of truth, Flow is a copy.** Every ingredient's master image is saved in `flow/library/images/<id>.png`. If Flow loses a project or ingredients don't carry across projects, upload from here.
- **Ingredients are built once and reused for every city.** Only city-specific ones (a ruler, a lake, a palace) are new per episode.
- **The storyboard drives Flow.** `tools/flow-pack.mjs` turns `storyboards/<city>.json` into an ordered list of generations, each with its prompt, its ingredients and its save path. A Chrome session or the owner works through the list.

## Folder
| Path | What |
|---|---|
| `library/ingredients.json` | Every ingredient: id, kind, scope, Flow name, match words, create prompt |
| `library/images/<id>.png` | The picked master image for each ingredient |
| `projects/<city>/<pack>.md/.json` | Generated packs (`short1`, `short2`, `long`, `stills`). Ticked `[x]` when the file exists |
| `CHROME-PROMPTS.md` | The prompts to paste into Claude Code (Chrome connected): A library, B city project, C pack, D assemble |

## Naming in Flow
| Flow thing | Name |
|---|---|
| Library project (all masters) | `EAS Library` |
| City project | `EAS <city>`, e.g. `EAS bhopal` |
| Ingredient | its `flow_name`, prefixed `STY` / `CHR` / `SET` / `OBJ` |

## Ingredient rules
- Flow takes **at most 3 ingredients per generation**. Every shot gets `STY-clay` plus up to 2 matches (characters first, then sets).
- Matching is by words in the scene prompt (`match` in `ingredients.json`). To force a set, add `"ingredients": ["STY-clay", "CHR-begum"]` to a scene in the storyboard.
- Characters are built as three-panel sheets (bust, full front, full rear) with the `character-consistency` skill.
- Historical figures are generic era figures, never real likenesses (`config/style-guide.md`).

## Where outputs go
| Pack | Flow mode | Saved to | Used by |
|---|---|---|---|
| `short<N>` | Video, 9:16 | `assets/<city>/clips/<id>.v.mp4` | that Short (native vertical) |
| `long` | Video, 16:9 | `assets/<city>/clips/<id>.mp4` | long video, and Shorts reframed if no `.v` clip |
| `stills` | Image, 16:9 | `assets/<city>/images/<id>.png` | long video with slow camera move |

`tools/assemble.mjs` picks these up automatically. Missing files render as placeholders.

## New city in 4 steps
1. Add the city's own ingredients (scope `<city>`) to `library/ingredients.json`. Reuse global ones.
2. Chrome prompt A (build the new ones), then B (city project).
3. `node tools/flow-pack.mjs <city> short1`, then Chrome prompt C.
4. Chrome prompt D. Gate 2 as usual.

## Cost
Flow uses your plan's credits. Packs list the number of generations up front, and prompt C caps each run. Never buy credits or upgrade without the owner's approval (`CLAUDE.md`).
