# Skills

Linked into `.claude/skills/` so Claude Code loads them. All are Markdown instructions only (no executable code was installed). Audited 2026-11-27.

## Studio (ours)
| Skill | Use |
|---|---|
| `studio/make-video` | `/make-video <city>`: full pipeline with Gate 1 and Gate 2 |
| `studio/city-research` | Sourced fact sheet with verified/disputed/legend flags |
| `studio/hindi-script` | Hindi narration rules, hook, structure, fact tags; `STYLE.md` = natural Hindi + voice markup |
| `studio/make-short` | `/make-short <city>`: असली सीन Shorts/Reels narrated by the wolf SUTRADHAR; one shot per line, prompts from `prompts/library.json`, built with `tools/build-shorts.mjs` |

Agent: `.claude/agents/hindi-editor.md` rewrites every draft into natural spoken Hindi and directs the voice (pauses, dialogue, slow lines). Tool: `tools/hindi-lint.mjs`.
| `studio/sutradhar-voice` | Dialogue writer: Sutradhar's suspicious/curious voice, one story first then clips |
| `studio/flow-prompts` | Shot plan + one Google Flow (Veo) prompt per clip: scene, Hindi dialogue/VO, camera, angle, light, SFX |
| `studio/youtube-pack` | Titles, description with sources, tags, chapters |

## Vendor (third-party, MIT)
| Skill | Source | Why |
|---|---|---|
| `cinematic-director` | github.com/wuwangzhang1216/DirectorSKILL | Shot lists, keyframe and image-to-video prompts, continuity |
| `character-consistency` | github.com/nigo-studio/ai-film-skills | Keeps the wolf narrator and recurring figures identical across shots |
| `video-prompt-director` | github.com/nigo-studio/ai-film-skills | Writes prompts for Kling/Flow-type clip tools |
| `scriptwriting` | github.com/salomonMuriel/media-production-skills | Hooks, retention, long-to-short clip picking (we add Hindi rules on top) |

## Rejected
- Melvynx/video-agent-skills: its `publish` and `insta-audit` skills pipe a third-party install script into `sh` (`curl ... | sh`) and auto-publish; built for talking-head Shorts.
- Rest of claude-code-video-toolkit: depends on paid cloud GPUs (RunPod) and ElevenLabs.
- salomon `voice-direction`: ElevenLabs-first (paid for commercial use).
- HyperFrames: browser-based renderer, heavier than plain FFmpeg on an 8 GB Mac. Our `tools/assemble.mjs` uses FFmpeg only.
