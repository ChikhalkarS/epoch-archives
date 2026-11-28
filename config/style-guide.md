# Style Guide - Epoch Archive Studios

## 1. Look: 2D noir graphic-novel cartoon

Owner decision 2026-11-27: claymation is retired. Every image and clip uses the **2D noir graphic-novel cartoon** look: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against charcoal and sepia shadows, rim light on edges, accents of maroon, indigo, brass and ochre.

The exact prefix, vertical/horizontal suffix and negative prompt live **only** in `prompts/library.json` -> `style` (readable copy in `prompts/LIBRARY.md`). Never retype them; `tools/build-shorts.mjs` adds them to every shot. Never change the prefix per scene.

Character prompts follow the owner's format: `Ultra-detailed 2D digital cartoon portrait of <ID>, ...` then framing, `EYES:`, `FUR:` or `SKIN AND HAIR:`, `EXPRESSION:`, `CLOTHING:`, `TECHNICAL:`, `BUILD:`. Then a three-panel sheet from the chosen close-up.

### Scene line formula
`[shot size + angle]: [subject + action], [setting + era detail], [time of day + light]`

Example:
> PREFIX + `Wide shot, high angle looking down: workers carrying baskets of earth to build a huge dam between two hills, medieval central Indian landscape with a river, early morning golden light` + SUFFIX

### Recurring characters
- **SUTRADHAR, the wolf narrator** (he does not name himself on air; SUTRADHAR is only his prompt ID): anthropomorphic Indian grey wolf, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel. Clearly a wolf, not a fox or jackal. He appears in the brand intro, cut-ins, viewer lines, comment ask and outro; story scenes show people as people. Prompts: `prompts/library.json` -> `characters.SUTRADHAR` (owner's close-up prompt kept verbatim) and `branding.profile_picture`.
- Historical figures: never claim a real likeness. Use generic figures dressed for the era, drawn in the same 2D noir style. Label names in the edit, not in the image.

### Respect rules
- Religious sites and deities: respectful, no caricature.
- Violence (wars, sieges, Partition): show with symbols (smoke, empty streets, broken pots, maps), never gore.
- Communities: no stereotypes in costume or faces.

## 2. Motion

- Default: still image + slow camera move (Ken Burns) done by `tools/assemble.mjs`.
  - `zoom-in` (default), `zoom-out`, `pan-left`, `pan-right`. Max 12% zoom per scene. No fast moves.
- Generated clips only for 3 to 5 key moments per long video (hook shot, the twist, the climax, the outro).
- Free clip tools, in order: Google Flow (free credits), Kling free daily credits, Dreamina free credits. When credits run out, use the still with motion. Never pay without asking the owner.
- Image tools (free): Google Flow / ImageFX (Imagen), Microsoft Bing Image Creator / Designer, Leonardo free tier, Ideogram free tier. Check each tool's terms allow commercial YouTube use before using it.

## 3. Edit rhythm
- Shorts: one narration line = one shot. Adjacent shots change size by two steps (EWS, WS, MS, MCU, CU, ECU) or change angle. One camera move per clip, with a clear end position.
- Hook: first 5 seconds, question on screen, strongest image.
- New visual every 4 to 8 seconds. A scene with longer narration is split into two images.
- Every 60 to 90 seconds: an open loop ("lekin asli kahani abhi baaki hai...").
- Outro: question for comments + teaser for the next city.

## 4. Audio
- Narration: voice in `config/channel.json`. Calm, storytelling pace.
- Music: royalty-free only (YouTube Audio Library, Pixabay Music). Log the track and licence in `assets/<slug>/CREDITS.md`. Music sits at about 12% volume under voice.

## 5. Text on screen
- Hindi (Devanagari) for on-screen labels, years in numerals (1727).
- Font: Noto Sans Devanagari or Mukta (both free, SIL OFL).
- Thumbnails: 3 to 4 words max, big, high contrast, one subject in the 2D noir style (often the wolf), one face or object.

> Also see `studio/STYLE_BIBLE.md` (Flow style block, Sutradhar, palette, fonts, overlays, sound) and `prompts/library.json` (exact prompt text).
