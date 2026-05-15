# Tim's personal site

A static personal site — plain HTML, CSS, and a sprinkle of JavaScript. No build step.

## Structure

```
.
├── index.html          Homepage
├── about.html          About page
├── work.html           Work / career timeline
├── projects.html       Projects grid (with tag filtering)
├── blog/
│   ├── index.html      Blog post list
│   ├── post.html       Renders an individual Markdown post
│   └── posts/
│       ├── index.json  Manifest — add an entry here for every post
│       └── *.md        One Markdown file per post
└── assets/
    ├── styles.css      Design system + page styles
    ├── main.js         Theme toggle, scroll reveal, filters
    └── images/         Drop images here, link from Markdown
```

## Running locally

Because the blog loads `.json` and `.md` via `fetch()`, opening files directly with `file://` won't work in most browsers. Run a tiny local server:

```bash
# from the project root
python3 -m http.server 8000
# then open http://localhost:8000
```

Or use any other static server you like (`npx serve`, `live-server`, etc.).

## Editing content

Every page is HTML. Search for `[PLACEHOLDER` in any file to find spots that need your content.

To add a blog post:

1. Create `blog/posts/your-slug.md` with your post content (no frontmatter needed — title/date/tags live in the index).
2. Add an entry to `blog/posts/index.json`:

```json
{
  "slug": "your-slug",
  "title": "Your post title",
  "date": "2026-05-15",
  "tags": ["essay"],
  "excerpt": "One-line excerpt shown on the list."
}
```

The post is live — visit `/blog/post.html?slug=your-slug`.

## Theme

- Accent: orange (`--accent` in `styles.css`) — tweak the hex to taste.
- Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (code) — all from Google Fonts.
- Dark mode toggles via the moon icon in the nav; preference is remembered in `localStorage`.

## Deploying

Drop the folder onto any static host:

- **GitHub Pages** — push to a repo, enable Pages from the repo settings.
- **Netlify** — drag the folder onto netlify.com/drop, or connect a repo.
- **Vercel / Cloudflare Pages** — same deal, no config needed.

No build command. Output directory is the project root.
