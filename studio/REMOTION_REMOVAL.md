# Remotion removal list (Gate a — awaiting owner OK)

## Delete
| Path | What it is |
|---|---|
| `epoch-engine/package.json`, `package-lock.json` | Remotion deps: remotion, @remotion/cli, bundler, renderer, three, react, @react-three/fiber, typescript |
| `epoch-engine/src/` (Root.tsx, index.ts, govinda/*) | Remotion compositions (Govinda 3D video, thumbnail) |
| `epoch-engine/stills.mjs`, `tools/render3d.sh`, `tools/events.mjs`, `tools/assemble3d.sh`, `tools/audit.ts`, `tools/emptyshots.ts`, `tools/motion.ts` | Remotion render/bundle scripts and TS helpers |
| `epoch-engine/make_script.py`, `epoch-engine/.gitignore` | Govinda-only script builder tied to that engine |
| `skills/vendor/remotion-best-practices/` (117 files) + `.claude/skills/remotion-best-practices` symlink | Vendored Remotion skill |
| `legacy/delhi-pilot/local-render-plan.md`, `local-render-without-browser.md` | Remotion render docs |

## Edit (remove Remotion mentions)
- `README.md` line 20 (epoch-engine row)
- `skills/README.md` line 19 (remotion-best-practices row)

## Keep (salvage, moved to `tools/`; no Remotion dependency)
- `epoch-engine/voice/align.py` -> `tools/align.py` (Whisper word timing -> script alignment, needed for captions)
- `epoch-engine/audio/dsp.py`, `instruments.py` -> `tools/audio/` (own-synthesis music/SFX, copyright-free)
- `epoch-engine/audio/score.py` -> delete (Govinda-specific cue sheet) unless you want it as a template
