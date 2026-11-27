# Style Guide - Epoch Archive Studios

## 1. Look: claymation miniatures

Canonical copy of the prefix, suffix and negative: `prompts/library.json` (if the two ever differ, the library wins). Every image and clip prompt starts with the **prefix** below, then the scene, then the **suffix**. Never change the prefix per scene. That is how the look stays the same.

**PREFIX (copy exactly):**
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green,
```

**SUFFIX (copy exactly):**
```
, cinematic 16:9 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```

For Shorts add `vertical 9:16 composition` in place of `cinematic 16:9 composition`.

**Negative prompt (where the tool supports one):**
```
photorealistic, real photograph, 3D CGI render, glossy plastic, anime, cartoon line art, text, letters, watermark, logo, extra fingers, distorted faces, gore, blood
```

### Scene line formula
`[subject + action], [setting + era detail], [time of day + light], [camera angle]`

Example (Bhopal, 11th century):
> PREFIX + `clay workers carrying baskets of earth to build a huge dam between two hills, medieval central Indian landscape with a river, early morning golden light, wide high angle` + SUFFIX

### Recurring characters
- **Bhediya (भेड़िया)**, lead narrator and host of असली सीन: an upright clay grey wolf storyteller (amber eyes, scar over the left brow, indigo shawl, terracotta kurta, brass lantern, scroll). He appears in the brand intro, narrator cut-ins, viewer lines and the outro; story scenes show people as people. Full identity, close-up and sheet prompts: `prompts/library.json` (canonical) and `prompts/LIBRARY.md`. Replaces the earlier Sutradhar.
- Historical figures: never claim a real likeness. Use generic clay figures dressed for the era. Label names in the edit, not in the image.

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
- Thumbnails: 3 to 4 words max, big, high contrast, one clay subject, one face or object.
