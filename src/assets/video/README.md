# Hero Section Video

## How to Add Your Video

To replace the hero section background video with your own:

### Option 1: MP4 Format (Recommended)

1. Delete the placeholder file `hero-video.mp4`
2. Upload your video file to this directory (`/assets/video/`)
3. Name it exactly: `hero-video.mp4`

### Option 2: WebM Format (Better compression)

1. Upload your video file to this directory
2. Name it exactly: `hero-video.webm`
3. The component will use WebM if available, falling back to MP4

### Option 3: Both Formats (Best browser compatibility)

Upload both:

- `hero-video.mp4`
- `hero-video.webm`

The video component will automatically select the best format for each browser.

## Video Specifications

For best results, your video should:

- **Dimensions**: 1280x840px or larger (maintains 1.52:1 aspect ratio)
- **Format**: MP4 (H.264 codec) or WebM (VP9 codec)
- **File Size**: Keep under 5MB for faster loading
- **Duration**: 10-30 seconds (it will loop automatically)
- **Optimization**: Compress and optimize for web delivery

## Video Behavior

The hero video is configured to:

- ✅ Autoplay on page load
- ✅ Loop continuously
- ✅ Muted (required for autoplay in most browsers)
- ✅ Play inline on mobile devices
- ✅ Cover the entire hero section area
- ✅ Rounded corners on the right side

## Troubleshooting

If your video doesn't play:

1. Make sure the file name matches exactly (case-sensitive)
2. Verify the file format is MP4 or WebM
3. Check that the video is optimized for web (not too large)
4. Ensure your browser supports HTML5 video
5. Try converting to a web-optimized MP4 using tools like HandBrake or FFmpeg

## FFmpeg Command for Optimization

To optimize your video for web using FFmpeg:

```bash
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -strict -2 -movflags +faststart hero-video.mp4
```

This will create a web-optimized MP4 file.