import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://potatoapproved.neocities.org',
  output: 'static',
  integrations: [sitemap()],
});
