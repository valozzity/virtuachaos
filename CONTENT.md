# Content guide — virtual chaos

This is the single source of truth for **how to add or change content** on the site.
It's written so a human *or* an automated agent (Hermes) can edit the site by
committing Markdown files. Every change follows the same loop:

```
edit/create a Markdown file  →  git add -A && git commit  →  git push  →  Netlify deploys (~30s)
```

No CMS, no database. All content lives as `.md` files under `src/content/`.

---

## 1. Blog posts

**Location:** `src/content/blog/<slug>.md`

**Fastest path (recommended for Hermes):**

```sh
npm run draft "post title"                       # basic
npm run draft "post title" --featured            # also show in homepage "featuring" row
npm run draft "post title" --tags=design,render  # with tags
```

This creates `src/content/blog/<slug>.md` with valid frontmatter, dated today.
Then edit the body and push.

**Or write the file by hand:**

```markdown
---
title: "post title"
description: "one-line summary used on cards and meta tags."
pubDate: 2026-06-08
featured: false
tags: ["tag-one", "tag-two"]
---

Body in Markdown. **bold**, ## headings, lists, > blockquotes, `code` all work.
```

| Field | Required | Notes |
|-------|----------|-------|
| `title` | yes | Shown as the card title and page `<h1>`. |
| `description` | yes | Used on cards, the blog index, and `<meta description>`. |
| `pubDate` | yes | `YYYY-MM-DD`. Controls sort order (newest first). |
| `featured` | no | `true` → appears in the homepage **featuring** row. Default `false`. |
| `tags` | no | Array of strings. Rendered as pills. Default `[]`. |

The filename (slug) becomes the URL: `src/content/blog/chrome-and-noise.md` → `/blog/chrome-and-noise/`.

---

## 2. Artists

**Location:** `src/content/artists/<slug>.md` → rendered on `/artists`

```markdown
---
name: "vltra violet"
role: "3d / motion"
link: "https://instagram.com"   # optional
order: 1                         # lower = earlier in the grid
---

Short bio. One or two sentences.
```

---

## 3. Selects (curated link-outs)

**Location:** `src/content/selects/<slug>.md` → rendered on `/selects`

```markdown
---
title: "the chrome bible"
description: "What this link is and why it's worth your time."
link: "https://example.com"
order: 1
---
```

(No body needed — selects are just a title, blurb, and outbound link.)

---

## 4. Static pages

The standalone pages live in `src/pages/` as `.astro` files:
`about.astro`, `artists.astro`, `selects.astro`, `blog/index.astro`, `index.astro`, `404.astro`.
Editing copy on these means editing the `.astro` file directly (more involved than Markdown —
prefer to keep evolving content in the collections above).

---

## 5. Rules for safe automated edits

- **Only touch files under `src/content/`** for routine publishing. Those are pure data.
- **Never edit two posts' frontmatter to share the same slug/filename** — filenames must be unique.
- **Keep frontmatter valid YAML.** Quote strings containing `:` or `#`. Dates are `YYYY-MM-DD`.
- **Run the build before pushing** when possible: `npm run build`. CI (`.github/workflows/build.yml`)
  also runs it on every push and will fail loudly if a file is malformed — a broken commit
  will not silently break the live site, but it *will* block the deploy, so check the Action.
- The deploy is whatever is on the **`main`** branch.
