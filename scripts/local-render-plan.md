# Local Rendering Plan - Delhi Episode 01

## ✅ What Can Be Done Locally

| Task | Tool | Status |
|------|------|--------|
| Script writing & editing | Manual | ✅ Done |
| Voice recording | Your mic/phone | ✅ Local recording |
| Word timings | openai-whisper | ✅ Local, runs on M2 |
| Text-to-speech (Hindi) | local TTS | ✅ Edge-TTS or AI4Bharat |
| 3D animation rendering | Remotion + three.js | ✅ Local (M2 GPU accelerated) |
| Audio mixing | Python DSP | ✅ Local (score.py, dsp.py) |
| Video assembly | FFmpeg | ✅ Local |
| Quality checks | Python scripts | ✅ Local |

## ❌ Requires External Services

| Task | Tool | Why |
|------|------|-----|
| Character sheets | Starpop | AI image generation (credits needed) |
| Background images | Midjourney/GPT Image | For reference plates |
| Voice cloning | ElevenLabs | More expressive voices |
| Music generation | Suno | Full songs, not DIY synthesis |

## 🎯 Local-Only Workflow (Minimal)

### Step 1: Create Local Voiceover
```bash
# Option A: Record with your phone (recommended quality)
# Save as: epoch-engine/test-project/voice/take1.wav

# Option B: Free local TTS (good enough for testing)
# AI4Bharat Indic TTS: https://github.com/AI4Bharat/IndicTTS
# or Microsoft Edge neural voices via edge-tts
```

### Step 2: Get Word Timings (Local)
```bash
# Install whisper
python3 -m pip install openai-whisper

# Run word timings
python3 epoch-engine/test-project/voice/align.py voice/take1.wav
# Output: epochs_engine/test-project/voice/take1_transcript.json
```

### Step 3: Use Placeholder Assets (Local)
Replace the complex 3D engine with simple colored backgrounds while you refine the timing:

```bash
# Create a 10-second gray background video (768x1344 for 9:16)
ffmpeg -f lavfi -i testsrc=size=768x1344:rate=30 -t 10 -c:v libx264 -pix_fmt yuv420p background.mp4

# Or 16:9 version
ffmpeg -f lavfi -i testsrc=size=1920x1080:rate=30 -t 10 -c:v libx264 -pix_fmt yuv420p background.mp4
```

### Step 4: Simple Local Render
Create a minimal test project:

```
epoch-engine/minimal/
├── index.tsx          (simple 16:9 solid color fill)
├── package.json       (Remotion deps)
├── tsconfig.json
└── public/
    └── mix.wav        (your voiceover)
```

### Step 5: Render with Remotion
```bash
cd epoch-engine/minimal
npx remotion render src/index.tsx MyVideo --frames=0-299 --gl=swangle
```

## 🎨 Local Animation Assets

The mythology engine already has placeholder assets:
- Solid 3D worlds with ink outlines
- Chibi character SVGs
- Basic lighting presets

To enable them locally without Starpop:
1. Use the existing `chars.js` character sheet
2. Reuse `MeadowSet`, `VillageSet`, `SkyCourt` from the engine
3. Skip character sheet generation - use the built-in cast

## 🧪 Test Render Instructions

1. **Record 10-second voice**: "Dilli ka sheher Indraprastha se shuru hua. Aaj hum jaante hai Dilli ki kahani."
2. **Save**: `epoch-engine/test-project/voice/take1.wav`
3. **Generate timings**: `python3 voice/align.py voice/take1.wav`
4. **Create simple timeline**: Edit `src/govinda/video.tsx` to just one segment
5. **Render**: `./tools/render3d.sh 0 300 minimal-test`
6. **Join**: `./tools/assemble3d.sh 0 300 minimal-test`
7. **Check**: Open `out/final.mp4`

## 🚀 Recommended Path

**Minimal test (doable today)**:
1. Write 30-second local voice script → record on phone → save as `take1.wav`
2. Run Whisper locally → get timings
3. Use the existing 3D engine with default cast (no new characters)
4. Render ONE segment (15-30 seconds) to verify pipeline
5. Scale up from there

**Full production (needs credits)**:
1. Generate character sheets in Starpop
2. Generate stills/clips for each shot
3. Render full 5-6 minute video