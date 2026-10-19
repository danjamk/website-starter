// robots.txt, built with the site. Until the site is indexable (see
// src/indexing.mjs) it asks search engines to stay away entirely.
import type { APIRoute } from 'astro';
import { build } from '../build-info';

export const GET: APIRoute = () => {
  const body = build.indexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${build.siteUrl}/sitemap-index.xml\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
