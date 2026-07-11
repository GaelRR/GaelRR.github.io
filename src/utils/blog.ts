import { getCollection, render } from 'astro:content';

export type BlogPost = Awaited<ReturnType<typeof getPublishedPosts>>[number];

export async function getPublishedPosts() {
  const posts = await getCollection('blog');
  return posts
    .filter((post) => post.data.draft !== true)
    .sort(
      (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
    );
}

/** @deprecated Use getPublishedPosts */
export async function getBlogPosts() {
  return getPublishedPosts();
}

export async function getBlogPost(slug: string) {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.id === slug);
}

export async function renderBlogPost(post: BlogPost) {
  return render(post);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function postUrl(slug: string): string {
  return `/blog/${slug}/`;
}
