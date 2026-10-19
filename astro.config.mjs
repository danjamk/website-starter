// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { indexable, siteUrl } from './src/indexing.mjs';

export default defineConfig({
  site: siteUrl,
  output: 'static',
  // about.astro publishes as /about (served from about.html), not /about/.
  trailingSlash: 'never',
  build: { format: 'file' },
  // No sitemap until the site is indexable. See src/indexing.mjs.
  integrations: indexable ? [sitemap({ filter: (page) => !page.endsWith('/404') })] : [],
});
