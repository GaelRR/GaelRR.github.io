import { getCollection, render } from 'astro:content';

export async function getBlogPosts() {
  const posts = await getCollection('blog');
  return posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getBlogPost(slug: string) {
  const posts = await getCollection('blog');
  return posts.find((post) => post.id === slug);
}

export async function renderBlogPost(post: Awaited<ReturnType<typeof getBlogPosts>>[number]) {
  return render(post);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
