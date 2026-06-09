# virtual chaos

> embracing the divide between analog and digital.

The rebuilt [virtualchaos.xyz](https://virtualchaos.xyz) — a fast, automatable blog built with [Astro](https://astro.build) and deployed on [Netlify](https://netlify.com). Styled with the **Virtual Chaos design system** ([Figma](https://www.figma.com/design/0FwNhkP838xpbw1ZIoXdrW)): chrome-and-lime aesthetic, Inter type, dark-first with a light mode wired up.

## Writing a post

Publishing is intentionally frictionless:

1. Add a Markdown file to `src/content/blog/`, e.g. `my-post.md`
2. Fill in the frontmatter:
   ```yaml
   ---
   title: "my post"
   description: "a one-line summary used on cards and meta tags."
   pubDate: 2026-06-08
   featured: false   # true → shows in the "featuring" row
   tags: ["tag-one", "tag-two"]
   ---
   ```
3. `git push` → Netlify rebuilds and deploys in ~30s.

Because posts are plain Markdown, AI-drafted posts can be committed straight into the pipeline.

## Local development

```sh
npm install      # install dependencies
npm run dev      # start dev server at localhost:4321
npm run build    # production build to ./dist
npm run preview  # preview the production build
```

## Project structure

```
src/
  components/        Nav, Hero, SectionHeading, Card, Newsletter
  content/blog/      Markdown posts (the content collection)
  content.config.ts  Blog collection schema
  layouts/           BaseLayout (head, fonts, nav, footer)
  pages/
    index.astro      Homepage (hero + featuring + incoming)
    blog/[...slug]   Individual post pages
    404.astro
  styles/global.css  Design tokens + base styles
public/              favicon and static assets
netlify.toml         Netlify build config
```

## Design tokens

All colors, spacing, radius, and type live as CSS custom properties in
[`src/styles/global.css`](src/styles/global.css), mirroring the Figma variables.
Switch themes by setting `data-theme="light"` on `<html>`.
