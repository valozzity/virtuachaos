---
title: "incoming transmission"
description: "A look at how posts get published here — write Markdown, push to git, Netlify builds. Built so AI-drafted posts can drop straight into the pipeline."
pubDate: 2026-06-01
featured: false
tags: ["workflow", "automation"]
---

Publishing here is intentionally boring, which is the feature.

1. Write a Markdown file.
2. `git push`.
3. Netlify rebuilds and deploys in ~30 seconds.

No CMS, no database, no login. Because posts are plain text files, generating them is trivial — an automated drafting step can write the Markdown, commit it, and the site picks it up on the next build.

> The fastest publishing flow is the one with the fewest moving parts.
