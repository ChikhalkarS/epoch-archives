# Epoch Archive format

**One line:** a curious, hidden-facts driven Hindi animated documentary series. It asks a question about an Indian city (or brand or habit) that you never thought to ask, then overturns what you assumed three times.

The format idea comes from Quiet Wolf (see `analysis/quiet-wolf.md`). All scripts, characters, art and research are our own.

## 1. Topics and test split
| Lane | Example | Share (first 12 EPs) |
|---|---|---|
| **A. Hidden city stories** (core) | "Bhopal mein itni jheelein kyun hain?" | 8 of 12 (≈ 67%) |
| **B. Indian brands** | "Amul ki ladki kisne banayi, aur kyun?" | 2 of 12 |
| **C. Indian habits / beliefs** | "Kya chai hamesha se Bharat ki aadat thi?" | 2 of 12 |

- **Test rule:** after 12 EPs, compare average view duration (AVD) and Shorts → long click rate per lane. A lane with ≥ 20% better AVD gets a bigger share.
- **Series naming:** `EP<n>` numbering runs across all lanes (one series). The lane shows in the thumbnail badge.

## 2. Long episode structure (8–10 min)
| Time | Beat | What happens | Devices |
|---|---|---|---|
| 0:00–0:15 | **Hook question** | A 5–10 s mini scene where the Sutradhar acts out the common belief, then one question that breaks it. No intro, no logo | Then-vs-now split or Sutradhar close-up, sting |
| 0:15–1:15 | **Mystery setup** | Why the obvious answer is wrong or incomplete. A promise: "teen raaz" (three secrets) | Animated map reveal, the open question shown as a card |
| 1:15–3:15 | **Reveal 1** | The first assumption overturned | Evidence card + reveal sound |
| 3:15–5:15 | **Reveal 2** | Goes deeper or wider (a person, a decision, a document) | Evidence card, map |
| 5:15–7:15 | **Reveal 3** | The biggest flip. It re-reads the hook | Myth check: **Sach ya Jhooth?** |
| 7:15–8:45 | **"Aaj bhi dikhta hai"** | What you can still see today: a street, a wall, a coin, a habit | Then-vs-now split, map pin |
| 8:45–9:30 | **Closer** | Answer the hook in one line → moral line → next-EP question → catchphrase "Itihaas yaad rakhiye… sawaal poochte rahiye." | Sutradhar, next-EP card, end screen |

**Retention rules:** a new visual every 3–6 s. An open loop at each reveal ("par asli raaz abhi baaki hai…"). A pattern break every ~60 s (map, card, myth check, split).

## 3. Devices (beyond narration)
| Device | Spec | How it's made |
|---|---|---|
| **Animated map reveal** | Clay-style map of India zooms to the city, then a route or boundary draws on | Flow clip: clay relief map, top-down push-in, clay pin pops up |
| **Evidence object** | Clay document, coin, inscription or map on the archive desk; narrator names **source + year** aloud | Flow clip of the clay object; the source is spoken in the VO and listed in the description |
| **Sutradhar** | Recurring claymation narrator character: hook, one myth check, closer | Flow clips using a fixed character description + reference sheet |
| **Then-vs-now** | Clay "then" clip, then clay "now" clip, same framing | Two consecutive Flow clips, same framing |
| **Sach ya Jhooth?** | Sutradhar states the popular myth, pause, then stamps it: सच / झूठ / विवादित (spoken) | Sutradhar presses a clay stamp (green/red/amber), verdict spoken |
| **Reveal sound design** | Low riser (1–2 s) → hit → 0.5 s silence before the key line | `SFX:` line in the Flow prompt |

## 4. Shorts
- 30–45 s, **one fact each**, 9:16. Cut from the long EP (3–4 per EP).
- Structure: 0–3 s belief-inversion line → 3–35 s fact plus one evidence card → last 5 s "poori kahani EP<n> mein".
- Re-voice the line if the long-form line doesn't stand alone. Captions are always burned in.
- The Short's related-video link points to the long EP.

## 5. Cadence
- **Weekly:** 1 long EP + 3–4 Shorts.
- Suggested slots: long on Saturday. Shorts on Mon, Wed, Thu (+ Fri).
- Batch: research and script 2 EPs ahead. Flow clips 1 EP ahead.

## 6. Sources (non-negotiable)
- Description format: `Author/Org, "Title", Publisher, Year [F-ID]`, 3–8 sources, with hedges written out ("historians differ on…").
- Narration pace: 130–140 Hindi words/min, with a 0.5 s pause before each reveal line.
- No claim in a script without a fact ID → `research/<slug>/sources.md` (URL, publisher, date).
- Every description has a **Sources** section listing every fact ID used.
- Disputed history: neutral wording ("kehte hain", "itihaskaron mein matbhed hai"), and the myth check uses VIVAADIT, not SACH/JHOOTH.
- Legends are labelled as legends on screen.

## 7. Titles and thumbnails
- Title: a Hindi question or contrarian claim + English keyword, ≤ 60 chars. E.g. `Bhopal ki jheelein asli nahi hain? | EP1 Hidden History of Bhopal`.
- Thumbnail: one clay object, a 2–3 word Hindi text, the EP badge, the lane colour.
