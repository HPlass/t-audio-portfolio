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
  Podcast) mixing YouTube embeds, self-hosted `<video>` clips, and a link-out
  card for platforms that can't be embedded (e.g. subscription audio).
  Each card carries a `data-category` attribute the filter buttons match against;
  add a new category by adding both a card and a matching `<button data-filter="…">`.
- **Music** (`#music`) — a track list with inline `<audio>` players.
- **About** (`#about`) — bio, resume download, and the Vimeo highlight reel.

## Adding your media

Music tracks still show an "Add audio file: …" placeholder until real files are added.

| What | Where to put it | Then |
|---|---|---|
| Selected Work cards | Depends on source — see below | Copy an existing `.work-card` in `index.html`, set `data-category` |
| Music tracks | `assets/music/track-01.mp3` etc. | Edit the matching track's title/credits in `index.html` |
| Highlight reel | Currently a Vimeo embed in `index.html`'s About section | Swap the `<iframe>` `src` for a different Vimeo/YouTube video ID |
| Resume | `assets/resume/theo-plass-resume.pdf` (added) | — |
| Cover art (optional) | `assets/img/` | Add an `<img>` inside the track's `.track-art` div |

**Selected Work cards can be any of three kinds** — pick whichever fits the source:

1. **YouTube/Vimeo embed** — an `<iframe>` inside `.media-frame`, no local file needed.
2. **Self-hosted clip** — a `<video src="assets/film/….mp4">` inside `.media-frame`.
   GitHub blocks files over 100 MB, so compress first — e.g.
   `ffmpeg -i in.mov -vf "scale=-2:1080,fps=30" -c:v libx264 -crf 22 -c:a aac -b:a 192k -movflags +faststart out.mp4`
   turns a 4K mezzanine file into a ~30–40 MB web clip.
3. **Link-out card** — for content that can't be embedded (paywalled, DRM'd, no
   embed support). Use `.media-frame.media-frame-link` wrapping an `<a>` — see
   the Dipsea card for the pattern.

## Placeholder text to replace

- Hero one-liner (`.hero-sub` in `index.html`)
- Project/track titles and credits on every card

## Deploying

The site is static, so any host works:

- **GitHub Pages** — free; requires the repo to be public. Settings → Pages → deploy from `main`.
- **Netlify / Vercel** — free tier; repo can stay private. Link the repo and deploy with no build command.
