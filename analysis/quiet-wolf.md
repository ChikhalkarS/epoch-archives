# Reference analysis: Quiet Wolf (@QuietWolfz)

**Data source:** the owner's notes from 2026-11-27. YouTube (yt-dlp and web fetch) is blocked from this build container.
**Re-check:** on the owner's Mac, run `yt-dlp --flat-playlist -J https://www.youtube.com/@QuietWolfz/videos > qw.json`, then refresh the numbers below.

## Snapshot
| Metric | Value |
|---|---|
| Subscribers / videos | ~240k / 54 |
| Long-form | Numbered series "EP1, EP2…", 7.5–12 min |
| Long views | EP1–2 ≈ 600–700k. Later EPs ≈ 290k |
| Shorts views | 100k–500k typical. Hits 1M+ (supermarket tricks, "10,000 steps was an ad") |
| Genre | Animated short documentaries: how everyday beliefs were *made*, real cases, sources in every description, plus original fables |

## 1. Hook patterns
1. **Belief inversion:** "The thing you believe was invented by marketing." It takes something the viewer holds as natural and reframes it as manufactured. This is the strongest pattern (both 1M+ Shorts).
2. **Accusation in the second person:** "They invented *your* flaws." The viewer is implicated, so it is personal from second one.
3. **Short absolute claim:** "It Was Never Rare." Four words. It contradicts a fact you assume, and gives no context.
4. **Two-beat twist title:** "They invented X. Then sold you Y." The setup and the payoff are both in the title.
5. **Familiar object, hidden machinery:** supermarket layout and step counts. The topic is everyday, so the reveal is about a system.

**Lesson for us:** the hook is about a *belief the viewer already holds*, not about a topic. "Why is Bhopal full of lakes?" is a topic. "Bhopal's lakes were never natural" is a belief inversion.

## 2. Episode structure and pacing (7.5–12 min), inferred
| Time | Beat |
|---|---|
| 0:00–0:15 | The belief, stated as the viewer holds it. Then the contradiction |
| 0:15–1:00 | Stakes: "you see this every day", and a promise of where it came from |
| 1:00–3:00 | Origin case: a real person, company or document |
| 3:00–7:00 | Escalation: 2–3 cases that each widen the scope |
| 7:00–9:00 | "It's still happening": the modern version the viewer can spot |
| last 30–60s | A reflective close, often a line that re-reads the title, with a tease to the next EP |

- Pacing: a new visual every 3–6 s. Animation lets abstract ideas become objects.
- Numbered episodes make it a **series to binge**. EP1 views > later EPs is the normal series decay, so EP1 must be the strongest.

## 3. Title formulas
- `EP<n>: <short contrarian claim>` ("It Was Never Rare")
- `They <did X>. Then <did Y to you>.`
- `You're Not <what you think>…` (an open, unfinished sentence)
- Shorts: `<everyday thing> was <invented / an ad / a trick>`
- Common rules: ≤ 6 words, plain words, no year, no proper names up front, a pronoun ("you", "they").

## 4. How sources are shown
- Every description lists sources (studies, archives, articles). Trust is part of the brand.
- Real cases are named in narration, which turns sources into story, not footnotes.
- **We go further:** the source is named *on screen* as an evidence card at the moment of the claim, and listed in the description with fact IDs.

## 5. Shorts-to-long-form funnel
- Shorts reuse the single most counter-intuitive fact from a long EP (or a standalone fact on the same theme).
- Shorts carry the big views (1M+). Long-form carries watch hours and loyalty.
- Path: Short → channel page → the numbered series → binge EP1→EPn.
- For us: 3–4 Shorts per long EP. Each ends with "poori kahani: EP<n>", and the Short is linked to the long video (related-video link).

## 6. Copy as FORMAT / do NOT copy
| Copy (format) | Do NOT copy |
|---|---|
| Belief-inversion hooks | Their scripts, wording, narration lines |
| Numbered series, EP1 strongest | Their characters, wolf mascot, art style, palette |
| 8–10 min, 3–6 s visual changes | Their exact titles or title phrases ("It Was Never Rare" etc.) |
| Sources in every description | Their topics' research. We research every claim ourselves |
| One-fact Shorts feeding long-form | Their thumbnails or channel branding |
| Reflective closer + next-EP tease | Their fables or story ideas |

Every Epoch Archive episode is original research on Indian cities, brands and habits, with its own fact IDs in `research/<slug>/sources.md`.
