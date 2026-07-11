import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gaelrivera.com',
  integrations: [sitemap()],
});
