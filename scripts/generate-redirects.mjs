import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

const redirects = [
  ...[
    ['blog/post1.html', '/blog/creating-a-blog-with-chatgpt/'],
    ['blog/post2.html', '/blog/just-a-good-enough-post/'],
    ['blog/post3.html', '/blog/a-good-enough-personal-website/'],
    ['blog/post4.html', '/blog/writing-good-enough/'],
    ['blog/post5.html', '/blog/exploring-generative-ai-a-journey-of-learning-and-guilt/'],
    ['blog/post6.html', '/blog/a-step-by-step-guide-to-creating-your-free-website-with-github-pages/'],
    ['blog/post7.html', '/blog/is-technology-making-our-lifes-better/'],
    ['blog/post8.html', '/blog/becoming-a-better-self-my-life-guidebook/'],
    ['blog/post9.html', '/blog/be-kind-to-yourself/'],
    [
      'blog/post10.html',
      '/blog/activequest-gamifying-your-fitness-journey-through-a-terminal-based-adventure/',
    ],
    [
      'blog/post11.html',
      '/blog/i-am-not-a-designer-developer-or-writer-but-i-made-this-anyway/',
    ],
    [
      'blog/post12.html',
      '/blog/people-innovation-and-technology-rethinking-the-future-of-happiness-and-health/',
    ],
    ['projects/project1.html', '/projects/riasnorge/'],
    ['projects/project2.html', '/projects/gaelrivera-com/'],
    ['projects/project3.html', '/projects/activespot-finder/'],
    ['projects/project4.html', '/projects/lifeguide-journey/'],
    ['projects/project5.html', '/projects/activequest/'],
    ['blog.html', '/blog/'],
    ['about.html', '/about/'],
    ['projects.html', '/projects/'],
  ],
];

function redirectHtml(target) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Redirecting…</title>
    <meta http-equiv="refresh" content="0;url=${target}" />
    <link rel="canonical" href="https://gaelrivera.com${target}" />
    <meta name="robots" content="noindex" />
  </head>
  <body>
    <p><a href="${target}">Continue to ${target}</a></p>
  </body>
</html>
`;
}

for (const [filePath, target] of redirects) {
  const fullPath = path.join(PUBLIC, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, redirectHtml(target));
  console.log(`Wrote redirect ${filePath} -> ${target}`);
}
