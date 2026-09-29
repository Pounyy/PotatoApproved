import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://TON-SITE.neocities.org',
  output: 'static',
  integrations: [sitemap()],
});
