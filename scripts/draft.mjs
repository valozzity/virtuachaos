#!/usr/bin/env node
/**
 * draft.mjs — create a new blog post stub.
 *
 * Usage:
 *   npm run draft "post title"
 *   npm run draft "post title" --featured --tags=design,render
 *
 * Writes src/content/blog/<slug>.md with valid frontmatter, dated today.
 * Designed so an automated agent (e.g. Hermes) can generate a post in one call,
 * then fill in the body and `git push`.
 */
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(__dirname, '..', 'src', 'content', 'blog');

const args = process.argv.slice(2);
const flags = args.filter((a) => a.startsWith('--'));
const positional = args.filter((a) => !a.startsWith('--'));

const title = positional.join(' ').trim();
if (!title) {
  console.error('✕ Provide a title:  npm run draft "my post title"');
  process.exit(1);
}

const featured = flags.includes('--featured');
const tagsFlag = flags.find((f) => f.startsWith('--tags='));
const tags = tagsFlag
  ? tagsFlag
      .replace('--tags=', '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
  : [];

const slug = title
  .toLowerCase()
  .replace(/[^\w\s-]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '');

const today = new Date().toISOString().slice(0, 10);
const filePath = join(BLOG_DIR, `${slug}.md`);

if (!existsSync(BLOG_DIR)) mkdirSync(BLOG_DIR, { recursive: true });
if (existsSync(filePath)) {
  console.error(`✕ Post already exists: src/content/blog/${slug}.md`);
  process.exit(1);
}

const frontmatter = [
  '---',
  `title: ${JSON.stringify(title)}`,
  `description: ${JSON.stringify('one-line summary used on cards and meta tags.')}`,
  `pubDate: ${today}`,
  `featured: ${featured}`,
  `tags: [${tags.map((t) => JSON.stringify(t)).join(', ')}]`,
  '---',
  '',
  'Write the post here. Markdown supported: **bold**, ## headings, lists, > quotes, `code`.',
  '',
].join('\n');

writeFileSync(filePath, frontmatter);
console.log(`✓ Created src/content/blog/${slug}.md`);
console.log(`  next: edit the body, then  git add -A && git commit -m "post: ${title}" && git push`);
