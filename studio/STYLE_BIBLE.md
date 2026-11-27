# Style bible: Epoch Archive Studios

This is the single source for the look, sound and on-screen text. `config/style-guide.md` points here.
Clips: Google Flow (Veo), made manually by the owner. Edit: `tools/assemble_episode.py` (ffmpeg + libass).

## 1. Look: "museum clay"
Handmade claymation miniatures, as if an archive keeper built each scene on his desk. Warm, tactile, slightly imperfect.

**Flow style block (paste at the start of every prompt, unchanged):**
```
Claymation stop-motion animation, handcrafted plasticine miniatures with visible fingerprints and tool marks, matte clay textures, slightly jittery stop-motion movement at 12 frames per second feel, warm soft studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature diorama feel, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green.
```
**Flow end block (paste at the end, unchanged).** Flow's consumer UI has no negative field, so exclusions are written as positive facts (cinematic-director, Veo adapter):
```
All papers, signs and scrolls carry only abstract clay squiggles, never readable letters. The frame is clean, with plain edges. Audio: soft ambient room tone and the sounds named above only, no music, no speech.
```
**Prompt rules (from the cinematic-director + video-prompt-director skills):**
- One primary subject action + one camera behaviour + at most one environmental motion. Every action ends in a held state.
- Describe bodies and objects, never emotions ("he lifts his spectacles and leans close", not "he is curious").
- Camera specified, not admired: "locked camera", "slow push-in", "slow pan left to right".
- Close character shots: plan to use the first 4–5 s of the 8 s clip. Environments, maps and objects can use the full 8 s.
- State positive facts instead of negations ("the street is empty", not "no people").
- Sutradhar shots: attach `studio/ref/sutradhar_sheet.png` as an ingredient and add the role line: `The reference image defines Sutradhar's face, beard, spectacles, shawl and satchel. Do not use its grey background or panel layout.`
**Aspect:** long-form 16:9 (select Landscape in Flow). Shorts 9:16 (select Portrait). Clip length: Flow's 8 s.
**Audio in Flow:** ask for *ambient sound only, no speech, no music* (our voice and music are added in the edit). If Flow adds speech anyway, the assembler mutes clip audio by default.

## 2. Palette
| Token | Hex | Use |
|---|---|---|
| Terracotta | #B5553C | primary, Sutradhar shawl, lane A badge |
| Ochre | #D89B2B | highlights, keywords in captions |
| Sandstone | #E8D3B0 | evidence-card paper |
| Indigo | #2E3A66 | night, water, Myth-check panel |
| Leaf green | #5F7F3F | nature, lane C badge |
| Ink | #1E1A17 | text, outlines |
| Stamp red | #C0392B | JHOOTH stamp |
| Stamp green | #2E8B57 | SACH stamp |
| Stamp amber | #E08E0B | VIVAADIT (disputed) stamp |

## 3. Characters
### Sutradhar (recurring narrator character)
Used in the hook mini scene, one myth check, and the closer. Max 4–5 shots per EP. He **never lip-syncs**: the voiceover is his inner narration. He gestures, looks, points or reacts.

**Character block (paste whenever he appears, unchanged):**
```
SUTRADHAR: a small elderly clay storyteller about 20 cm tall, round warm-brown face, thick white bushy eyebrows, short neat white beard, round brass-rimmed spectacles, terracotta-red shawl over a cream kurta, a faded indigo cloth satchel across his chest, carries a rolled parchment scroll tied with red thread, kind curious expression, slightly hunched.
```
- **Reference sheet:** make it once in Flow / Whisk (front, 3/4, back on a plain sandstone background). Save it as `studio/ref/sutradhar_sheet.png` and attach it as an ingredient/reference image on every Sutradhar shot.
- His world: a cluttered clay archive room with wooden shelves of scrolls, brass oil lamp, a big clay map of India on the wall. Re-used for hook and closer (`studio/ref/archive_room.png`).

### Historical figures
Generic clay figures dressed for the era. Never claim a real likeness, and don't put names in the image (names go in captions). No deity caricatures. Show violence only through symbols.

## 4. Typography (all free, SIL OFL)
- Font: **Mukta** (`assets/fonts/`, Devanagari + Latin). ExtraBold for titles and stamps, Bold for captions, Regular for card sources.
- Captions: bottom centre, Bold 64 px (1080p), white with a 4 px ink outline. The current keyword is highlighted in ochre. Max 2 lines, ~5 words per line.
- Numbers: digits on screen (1794), spoken as words.

## 5. Overlay templates (rendered by the assembler with ASS; codes go in the shotlist `Overlay` column)
| Code | Looks like | Example |
|---|---|---|
| `card:F3` | Sandstone paper card, top-left: what it is (`label`). Bottom: `स्रोत: <short source> · F3` | Fact card over a clay "document" clip |
| `map:<label>` | Indigo pin + label at the top, e.g. `भोजपुर · भोपाल से ~30 km` | Over a clay map clip |
| `myth:<SACH|JHOOTH|VIVAADIT>` | Indigo panel `सच या झूठ?`, the myth text, then the stamp lands at 60% of the shot | Myth check |
| `title:<text>` | Big centre title, ExtraBold, ochre | Chapter cards: `राज़ #1` |
| `year:<yyyy>` | Small top-right year chip | `1794` |
| `split` | Then-vs-now: shot A left / shot B right with a wipe line (`clips/<shot>a.mp4`, `<shot>b.mp4`) | |
| `none` | Captions only | |

## 6. Intro / outro
- **No intro.** The hook starts at frame 1. A 1.5 s logo sting ("EPOCH ARCHIVE" stamped on a clay seal) comes **after** the hook question at ~0:15. Shot `logo` in every shotlist.
- **Closer:** Sutradhar rolls up his scroll. Moral line → next-EP question → catchphrase **"इतिहास याद रखिए… सवाल पूछते रहिए।"** End screen 20 s: Sutradhar's desk with two empty frames (for YouTube end-screen elements).
- Thumbnail: one clay object close-up, 2–3 Hindi words (Mukta ExtraBold, ochre on ink), EP badge top-left.

## 7. Sound
- Voice: `config/channel.json` (edge-tts, hi-IN-MadhurNeural). Pace 130–140 words/min.
- Music: royalty-free only (YouTube Audio Library / Pixabay), or our own synth (`tools/audio/`). It ducks under the voice automatically. Log in `episodes/<ep>/CREDITS.md`.
- Reveal SFX (generated by the assembler, copyright-free): `sfx:riser` (1.5 s before), `sfx:hit` (on the reveal word), `sfx:stamp` (myth stamp), `sfx:paper` (card in), `sfx:whoosh` (map zoom).
- 0.5 s silence before every reveal line (`[beat]` in the script).

## 8. Respect rules
Religious sites: respectful, no caricature. Disputed history: on-screen VIVAADIT stamp + neutral VO. Tragedies (1984 gas leak, Partition): no reenactment of suffering. Use symbols, and one respectful line.
