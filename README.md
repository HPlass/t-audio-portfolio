# Theo Plass — Audio Portfolio

A static portfolio site for sound design, post-production, and music work.
No build step, no dependencies — plain HTML/CSS/JS, hostable anywhere.

## Preview locally

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

(Or just open `index.html` in a browser.)

## Adding your media

Until real files are added, each player shows an "Add media file: …" placeholder.

| What | Where to put it | Then |
|---|---|---|
| Film/post clips | `assets/film/clip-01.mp4` etc. | Edit the matching card's title/credits in `index.html` |
| Music tracks | `assets/music/track-01.mp3` etc. | Edit the matching track's title/credits in `index.html` |
| Highlight reel | Currently a Vimeo embed in `index.html`'s About section | Swap the `<iframe>` `src` for a different Vimeo/YouTube video ID |
| Resume | `assets/resume/theo-plass-resume.pdf` | — |
| Cover art (optional) | `assets/img/` | Add an `<img>` inside the track's `.track-art` div |

To add more clips or tracks, copy an existing card/row in `index.html` — there
are HTML comments in each section showing exactly what to change.

**Using streaming platforms instead:** any card's `<video>`/`<audio>` element can
be replaced with an embed `<iframe>` from Vimeo, YouTube, SoundCloud, Spotify, or
Bandcamp. This keeps large files out of the repo (GitHub blocks files over 100 MB;
keep self-hosted clips short and compressed).

## Placeholder text to replace

- Hero one-liner (`.hero-sub` in `index.html`)
- About section bio (clearly marked placeholder paragraphs)
- Project/track titles and credits on every card

## Deploying

The site is static, so any host works:

- **GitHub Pages** — free; requires the repo to be public. Settings → Pages → deploy from `main`.
- **Netlify / Vercel** — free tier; repo can stay private. Link the repo and deploy with no build command.
