import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts, postUrl } from '../utils/blog';
import { site } from '../config/site';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: site.blogName,
    description: site.description,
    site: context.site,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
    },
    customData: `<language>en</language>`,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: postUrl(post.id),
      categories: post.data.tags,
    })),
  });
}
