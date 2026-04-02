# Image Sequence Frames

Place your image sequence here as:

```
frame-001.jpg
frame-002.jpg
...
frame-120.jpg
```

## Requirements

- **Count**: 120 frames (configurable in `/lib/constants.ts` → `SEQUENCE_FRAME_COUNT`)
- **Resolution**: 1920×1080 recommended (16:9)
- **Format**: JPEG, quality 70–75% for optimal file size
- **Total size target**: < 15MB for the first 40 frames, < 40MB total

## Recommended Sources

For a real Vrindavan property site, use:
1. **Drone footage** of Vrindavan/Mathura exported as frame sequence
2. **Cinematic walkthrough** of the property
3. **Timelapse** of the Yamuna river / temple complex

## Frame Export (from video editing software)

**After Effects / Premiere:**
Export → Media Encoder → Format: JPEG Sequence → Quality: 70

**FFmpeg (from video file):**
```bash
ffmpeg -i input.mp4 -vf fps=24,scale=1920:-1 -q:v 3 public/sequence/frame-%03d.jpg
```

## Fallback

Until real frames are added, the canvas shows a beautiful gradient fallback
defined in `ScrollyCanvas.tsx`. The overlay sections will still animate correctly.
