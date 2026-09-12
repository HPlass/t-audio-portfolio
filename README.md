# Theo Plass — Audio Portfolio

A static portfolio site for sound design, post-production, and music work.
No build step, no dependencies — plain HTML/CSS/JS, hostable anywhere.

## Preview locally

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

(Or just open `index.html` in a browser.)

## Sections

- **Selected Work** (`#work`) — a filterable grid (All / Film / TV / Game Audio /
  Podcast). The grid itself shows only a thumbnail per piece — no titles. Each
  thumbnail links to its own page under `work/` holding the actual embed and a
  one-line credit underneath (the video's own on-screen title stands in for a
  caption). The Dipsea card is the exception: it has no embeddable player, so
  it links straight out to the platform.
- **Music** (`#music`) — official Spotify embeds (`open.spotify.com/embed/…`),
  each with an optional one-line credit underneath.
- **About** (`#about`) — bio, Resume / Email links, and the Vimeo highlight reel.

## Adding a piece of work (Selected Work)

1. Pick a `data-category` (`film-tv` / `game-audio` / `podcast`, or a new one —
   add a matching `<button data-filter="…">` in `index.html`'s `.work-filters`).
2. Create `work/your-slug.html` — copy an existing file in `work/` as a template.
   It's a normal page: same header/footer, one `.media-frame` with either
   - a YouTube/Vimeo `<iframe>` embed, or
   - a self-hosted `<video src="../assets/film/….mp4">`

   followed by a short `.work-credit` line (e.g. "Sound Design · Studio Name")
   and a "← Back to Work" link. No visible title — keep it to the credit line.
3. Add the thumbnail card to `.work-grid` in `index.html`:
   ```html
   <a class="work-card" data-category="…" href="work/your-slug.html">
     <div class="media-frame">
       <img src="…" alt="…" loading="lazy">
       <span class="play-badge" aria-hidden="true">▶</span>
     </div>
   </a>
   ```
   For a thumbnail image: YouTube videos have one for free at
   `https://img.youtube.com/vi/<VIDEO_ID>/hqdefault.jpg`; for a self-hosted
   clip, pull a frame with
   `ffmpeg -ss 2 -i in.mp4 -frames:v 1 -vf "scale=800:-2" out.jpg`.

**Self-hosted clips**: GitHub blocks files over 100 MB, so compress first —
`ffmpeg -i in.mov -vf "scale=-2:1080,fps=30" -c:v libx264 -crf 22 -c:a aac -b:a 192k -movflags +faststart out.mp4`
turns a 4K mezzanine file into a ~30–40 MB web clip.

**Vimeo embeds specifically**: the video's embed privacy must be set to
"Anywhere" (or the portfolio's domain added to its allowed-domains list) or
the iframe will fail with "Because of its privacy settings, this video cannot
be played here." — this is a setting on the Vimeo account, not something
fixable from the code.

## Adding a track (Music)

Open the track/album on Spotify → Share → Embed track/album, and paste the
`<iframe>` it gives you into a `.music-embed` div in `index.html`. Add a
`<p class="work-credit">…</p>` line underneath if the embed itself doesn't
already show who did what (Spotify shows title/artist, not production credits).

## Known TODOs

- The About section's LinkedIn icon-button was removed rather than shipped
  with a placeholder link — add it back once a profile URL is available:
  ```html
  <a class="icon-btn" href="LINKEDIN_URL" target="_blank" rel="noopener" aria-label="Theo Plass on LinkedIn" title="LinkedIn">
    <span class="icon-btn-label">in</span>
  </a>
  ```

## Deploying

The site is static, so any host works:

- **GitHub Pages** — free; requires the repo to be public. Settings → Pages → deploy from `main`.
- **Netlify / Vercel** — free tier; repo can stay private. Link the repo and deploy with no build command.
