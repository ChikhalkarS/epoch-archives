# फ़ाइल 002 (Akola Short 1) - next steps on the Mac

Status: Gate 1 ✅ · voice ✅ (62.8 s at 1.2x) · timing ✅ · Flow shots ⏳ · assembly ⏳ · Gate 2 ⏳
Files: script `short1-rani.md` · Flow prompts `short1-rani-flow.md` · character/style prompts `prompts/LIBRARY.md`

## 0. Once: open Claude Code with Chrome
```bash
cd ~/epoch-archives && git pull origin main
```
Put the 1.2x voice (sent in chat) at `assets/akola/shorts/short1-rani/voice.mp3`, then:
```bash
claude --chrome
```
(or type `/chrome` inside a running session). Chrome must be open and the Claude extension signed in. Log in to Google Flow (labs.google/flow) in Chrome first.

Paste the prompts below into that Claude Code session, one at a time, in order.

---

## Prompt 1 - quick test (no credits)
```
Chrome test, read-only. Open labs.google/flow in a new tab and tell me: am I logged in, which projects I have,
and where the prompt box, the aspect-ratio setting, the Ingredients / Frames / Image modes and the
upload-attachment button are. Do not generate anything.
```

## Prompt 2 - style key and character sheets (once; reused in every future file)
```
Read studio/PLAYBOOK.md, prompts/LIBRARY.md and shorts/akola/short1-rani-flow.md ("Order of work").
In Chrome, open Google Flow, project "Archive Files - Library" (create it if missing).
Make ONLY the images that are missing on disk, in this order:
  1. Style key -> prompts/style/style-key.png  (LIBRARY.md "Style key")
  2. SUTRADHAR sheet -> prompts/characters/SUTRADHAR/sheet.png (attach the style key)
  3. AKOLA_RANI sheet -> prompts/characters/AKOLA_RANI/sheet.png (attach the style key)
  4. AKOLA_RAJA sheet -> prompts/characters/AKOLA_RAJA/sheet.png (attach the style key)
For each: image mode, paste the prompt from LIBRARY.md exactly, generate, show me the candidates and WAIT for my pick.
Download my pick and move the newest file from ~/Downloads to the path above. Confirm the file exists.
Rules: 2D noir look only (never claymation/3D/photoreal). The king's sword is always sheathed.
Stop and tell me on any error, policy block, credit warning or payment screen. Never buy credits, never publish.
When done: git add the new PNGs under prompts/, commit "Style key and Akola sheets", push to main.
```

## Prompt 3 - the 20 shots
```
Read shorts/akola/short1-rani-flow.md. In Chrome, open Google Flow, project "फ़ाइल 002 - Akola" (create it), aspect 9:16 portrait.
Go through the shots in order (short1-s01 ... short1-s20). Skip any shot whose file already exists in
assets/akola/shorts/short1-rani/ (short1-sNN.mp4 for clips, short1-sNN.png for stills). For each remaining shot:
  a. Use the mode in its heading (ingredients = video with ingredients, image = image with references).
  b. Upload the attachments exactly in the order listed under "Attach, in this order" (style key always first, max 3).
  c. Paste the prompt box text exactly, as one paragraph. Generate ONE take.
  d. Show me the result and WAIT for "keep" or "redo: <note>". On redo change only what I say, regenerate.
  e. On keep: download, move the newest file from ~/Downloads to assets/akola/shorts/short1-rani/short1-sNN.mp4
     (or .png for stills). Shots marked SPEAKS: keep the whole 8 s clip with its sound. Confirm the file exists.
Respect: the Shivling always whole and shown with reverence; the queen's vanishing is soft light, never horror;
the king's sword never raised. No text or letters painted in frame.
Limit: at most 30 generations this run. Stop on any error, policy block, credit warning or payment screen.
Never buy credits, never publish or share from Flow. Clips stay on the Mac (assets/*/shorts/ is not in git).
At the end list: shots done, shots missing, generations used.
```

## Prompt 4 - preview for Gate 2
```
Run: node tools/assemble-short.mjs akola short1-rani --preview
Tell me the length, missing shots and held frames. Do not make the final render until I approve.
```
Final (after approval): `node tools/assemble-short.mjs akola short1-rani` → `renders/akola/shorts/short1-rani.mp4`.

## After the final render
Upload yourself (Claude never uploads) with the title, description and caption in `short1-rani.md`; add the line
"Voice: ElevenLabs (elevenlabs.io)"; audience "No, it's not made for kids". Then tell Claude: it marks the Short
`published` (frozen), updates the playbook's Published table, tracker and schedule, and pushes.
