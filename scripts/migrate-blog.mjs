import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const BLOG_DIR = path.join(ROOT, 'blog');
const OUT_DIR = path.join(ROOT, 'src/content/blog');

const POSTS = [
  { num: 1, slug: 'creating-a-blog-with-chatgpt', date: '2023-04-10' },
  { num: 2, slug: 'just-a-good-enough-post', date: '2023-11-07' },
  { num: 3, slug: 'a-good-enough-personal-website', date: '2023-11-08' },
  { num: 4, slug: 'writing-good-enough', date: '2023-11-09' },
  { num: 5, slug: 'exploring-generative-ai-a-journey-of-learning-and-guilt', date: '2023-11-10' },
  {
    num: 6,
    slug: 'a-step-by-step-guide-to-creating-your-free-website-with-github-pages',
    date: '2023-11-11',
  },
  { num: 7, slug: 'is-technology-making-our-lifes-better', date: '2023-11-12' },
  { num: 8, slug: 'becoming-a-better-self-my-life-guidebook', date: '2023-11-13' },
  { num: 9, slug: 'be-kind-to-yourself', date: '2023-11-15' },
  {
    num: 10,
    slug: 'activequest-gamifying-your-fitness-journey-through-a-terminal-based-adventure',
    date: '2025-02-03',
  },
  {
    num: 11,
    slug: 'i-am-not-a-designer-developer-or-writer-but-i-made-this-anyway',
    date: '2025-02-03',
  },
  {
    num: 12,
    slug: 'people-innovation-and-technology-rethinking-the-future-of-happiness-and-health',
    date: '2025-03-11',
  },
];

const PLACEHOLDER_DESCRIPTION = 'This is a short description of the blog post.';

function decodeHtml(text) {
  return text
    .replace(/&hearts;/g, '♥')
    .replace(/&mdash;/g, '—')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

function stripTags(html) {
  return decodeHtml(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

function normalizeHref(href) {
  return href.replace(/^<'?(https?:\/\/[^>'"]+)'?>$/, '$1').trim();
}

function inlineToMarkdown(html) {
  let text = html;
  text = text.replace(/<br\s*\/?>/gi, ' ');
  text = text.replace(/<a[^>]*href=["']?([^"'>\s]+)["']?[^>]*>([\s\S]*?)<\/a>/gi, (_, href, label) => {
    const url = normalizeHref(href);
    return `[${stripTags(label)}](${url})`;
  });
  text = text.replace(/<strong>([\s\S]*?)<\/strong>/gi, (_, t) => `**${stripTags(t)}**`);
  text = text.replace(/<b>([\s\S]*?)<\/b>/gi, (_, t) => `**${stripTags(t)}**`);
  text = text.replace(/<em>([\s\S]*?)<\/em>/gi, (_, t) => `*${stripTags(t)}*`);
  text = text.replace(/<i>([\s\S]*?)<\/i>/gi, (_, t) => `*${stripTags(t)}*`);
  text = text.replace(/<[^>]+>/g, '');
  return decodeHtml(text).replace(/\s+/g, ' ').trim();
}

function htmlToMarkdown(html) {
  let md = html.replace(/<!--[\s\S]*?-->/g, '');

  const blocks = [];

  const pushBlock = (block) => {
    const trimmed = block.trim();
    if (trimmed) blocks.push(trimmed);
  };

  md = md.replace(/<img[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi, (_, src, alt) => {
    if (!src) return '';
    pushBlock(`![${decodeHtml(alt || '')}](${src})`);
    return '\n';
  });

  md = md.replace(/<img[^>]*src=["']([^"']+)["'][^>]*>/gi, (_, src) => {
    if (!src) return '';
    pushBlock(`![](${src})`);
    return '\n';
  });

  md = md.replace(/<hr\s*\/?>/gi, () => {
    pushBlock('---');
    return '\n';
  });

  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, t) => {
    pushBlock(`## ${stripTags(t)}`);
    return '\n';
  });

  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, t) => {
    pushBlock(`### ${stripTags(t)}`);
    return '\n';
  });

  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, block) => {
    let i = 0;
    const items = [];
    block.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, item) => {
      i += 1;
      items.push(`${i}. ${inlineToMarkdown(item)}`);
    });
    pushBlock(items.join('\n'));
    return '\n';
  });

  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, block) => {
    const items = [];
    block.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, item) => {
      items.push(`- ${inlineToMarkdown(item)}`);
    });
    pushBlock(items.join('\n'));
    return '\n';
  });

  md = md.replace(/<p[^>]*class=["']post-description["'][^>]*>([\s\S]*?)<\/p>/gi, () => '\n');

  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, t) => {
    const text = inlineToMarkdown(t);
    if (!text) return '\n';
    if (/^Published on:/i.test(text)) return '\n';
    if (/^\d{1,2}\.\d{1,2}\.\d{2,4}$/.test(text)) return '\n';
    if (/^March \d{1,2}, \d{4}$/.test(text)) return '\n';
    if (text === PLACEHOLDER_DESCRIPTION) return '\n';
    pushBlock(text);
    return '\n';
  });

  return blocks.join('\n\n');
}

function extractArticle(html) {
  const articleMatch = html.match(/<article>([\s\S]*?)<\/article>/i);
  if (!articleMatch) throw new Error('No article found');

  const article = articleMatch[1];

  const titleMatch = article.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = titleMatch ? stripTags(titleMatch[1]) : 'Untitled';

  let heroImage = '';
  const imageMatch = article.match(/<div class="post-image">([\s\S]*?)<\/div>/i);
  if (imageMatch) {
    const imgMatch = imageMatch[1].match(/<img[^>]*src=["']([^"']+)["'][^>]*(?:alt=["']([^"']*)["'])?/i);
    if (imgMatch && imgMatch[1]) {
      heroImage = `![${decodeHtml(imgMatch[2] || '')}](${imgMatch[1]})`;
    }
  }

  let description = '';
  const descMatch = article.match(/<p[^>]*class=["']post-description["'][^>]*>([\s\S]*?)<\/p>/i);
  if (descMatch) {
    description = stripTags(descMatch[1]);
    if (description === PLACEHOLDER_DESCRIPTION) description = '';
  }

  let bodySource = article
    .replace(/<div class="post-image">[\s\S]*?<\/div>/i, '')
    .replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '')
    .replace(/<\/?div[^>]*>/gi, '');

  const body = htmlToMarkdown(bodySource);
  const fullBody = [heroImage, body].filter(Boolean).join('\n\n');

  if (!description) {
    description =
      fullBody
        .split('\n')
        .map((line) => line.trim())
        .find((line) => line && !line.startsWith('![') && !line.startsWith('#') && line !== '---')
        ?.slice(0, 160) || title;
  }

  return { title, description, body: fullBody };
}

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const post of POSTS) {
  const htmlPath = path.join(BLOG_DIR, `post${post.num}.html`);
  const html = fs.readFileSync(htmlPath, 'utf8');
  const { title, description, body } = extractArticle(html);

  const frontmatter = `---
title: ${JSON.stringify(title)}
pubDate: ${post.date}
description: ${JSON.stringify(description)}
legacyUrl: /blog/post${post.num}.html
---

`;

  fs.writeFileSync(path.join(OUT_DIR, `${post.slug}.md`), frontmatter + body + '\n');
  console.log(`Wrote ${post.slug}.md`);
}
