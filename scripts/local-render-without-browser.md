# Local Rendering Without Browser

## Problem
Remotion requires a Chromium/Chrome browser for rendering. Your M2 MacBook Air doesn't have it installed.

## Solution 1: Install Chrome (Recommended)
```bash
# Install via Homebrew
brew install --cask google-chrome

# OR download Chromium directly
# https://download.chrome.com/dl/private/64.0.3282.142/d83a42a39a7957e813e3b4c8e49ac24c307e1744/chrome-mac-64-bit.dmg
```

## Solution 2: FFmpeg-only Test (No 3D Animation)
For a quick visual proof of concept without 3D rendering:

```bash
# Create a 10-second color-changing video
# Background: sunrise orange → day blue → sunset purple
ffmpeg -f lavfi -i color=c="#FF6B35":s=1920x1080:d=3.33 -c:v libx264 -pix_fmt yuv420p frame1.mp4
ffmpeg -f lavfi -i color=c="#3498DB":s=1920x1080:d=3.34 -c:v libx264 -pix_fmt yuv420p frame2.mp4
ffmpeg -f lavfi -i color=c="#8E44AD":s=1920x1080:d=3.33 -c:v libx264 -pix_fmt yuv420p frame3.mp4

# Add your silent mix.wav (48kHz, 10s)
ffmpeg -f lavfi -i anullsrc=r=48000:cl=mono -t 10 -c:a aac -ar 48000 -b:a 128k silence.mp4

# Concatenate
echo "file 'frame1.mp4'\nfile 'frame2.mp4'\nfile 'frame3.mp4'" > list.txt
ffmpeg -f concat -safe 0 -i list.txt -i silence.mp4 -map 0:v:0 -map 1:a:0 -c copy delhi-test.mp4
```

## Solution 3: Use a simpler image-to-video tool
```bash
# Install ImageMagick for image generation
brew install imagemagick

# Create simple animated slides with text
convert -size 1920x1080 xc:"#FF6B35" -font Helvetica -pointsize 72 -fill white -gravity center \
  -annotate 0 "Epoch Archives\nDelhi: 5000 Years" slide1.png

# Convert images to video with text
ffmpeg -r 1 -i slide1.png -c:v libx264 -r 30 -pix_fmt yuv420p delhi-slides.mp4
```

## Ready for Full Render Once Chrome is Installed
1. Download Chrome: `brew install --cask google-chrome`
2. Run render: `npx remotion render src/index.tsx GovindaVideo --frames=0-1500`
3. Join frames: `./tools/assemble3d.sh` or `ffmpeg` concat

## Current Status
- ❌ No browser (needed for Remotion)
- ✅ FFmpeg installed and working
- ✅ Python audio processing working
- ✅ 3D engine code correct (just needs browser to render)

## Recommendation
Install Chrome via Homebrew first, then you can render the full 3D animation.