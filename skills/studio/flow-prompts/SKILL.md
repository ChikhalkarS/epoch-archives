---
name: flow-prompts
description: Write one paste-ready Google Flow (Veo) prompt per shot from an Epoch Archive shotlist, using the fixed claymation style block, Sutradhar ingredient and positive-constraint rules. Use for stage 4 of /make-video or when the owner needs Flow prompts.
---

# Flow prompts → `episodes/<ep>/flow_prompts.md`

Load the vendor skills: `cinematic-director` (Veo adapter, motion budget), `video-prompt-director` (stage script, R1–R14 craft rules), `character-consistency` (Sutradhar sheet). Flow = Veo, English prompts, 8 s clips, no negative field on the consumer UI.

## Per-shot block
```
### s07 · 16:9 · ingredient: none
<STYLE BLOCK from studio/STYLE_BIBLE.md>
<Shot size + angle>. <Subject + setting + era detail, concrete clay materials>. <Opening state> → <one primary action> → <held end state>. Camera: <one behaviour, or "the camera is locked and does not move">. Light: <source + direction>. Audio: <1–2 ambient sources tied to visible action>.
<END BLOCK from studio/STYLE_BIBLE.md>
```
- Sutradhar shots: `ingredient: studio/ref/sutradhar_sheet.png`, the role line, and his character block verbatim. He never speaks or lip-syncs. Keep faces under 1/3 of the frame unless it's a deliberate close-up (budget 4).
- Maps: "a hand-sculpted clay relief map of central India on a wooden table, rivers as blue clay ribbons", with labels added in the edit.
- Evidence cards: generate the *object* (a clay-textured old document, an inscription stone, a coin) on the archive desk. The text comes in the edit.
- Motion budget (cinematic-director): ≤ 4 close character, ≤ 6 medium/wide with figures, ≤ 8 environment/objects.
- Positive phrasing only ("the street is empty"), except the licensed "no music, no speech" in the audio line.
- Reused shots get `reuse:` and no prompt. Vertical Shorts-only shots get `9:16` and their own prompt.
- Start the file with the owner checklist: settings, ingredient upload, naming, and which shots are optional.
