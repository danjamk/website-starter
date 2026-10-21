// Checks the built site in dist/ for problems a visitor would notice before the
// owner does. Run after `npm run build`:
//
//   npm run check           every change, in CI and before each preview
//   npm run check:strict    also fails on sample text; the launch gate
//
// Plain Node, no dependencies. Exits 1 if any check fails.

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, posix, relative, sep } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const strict = process.argv.includes('--strict');

// Hosts the build itself adds (src/analytics.mjs). Anything else from another
// company must be approved by the owner and listed in src/third-parties.json.
const buildHosts = ['static.cloudflareinsights.com', 'www.googletagmanager.com'];

const failures = [];
const notes = [];
const fail = (check, message) => failures.push(`${check}: ${message}`);

if (!existsSync(dist)) {
  console.error('No dist/ folder. Run `npm run build` first.');
  process.exit(1);
}

// ---- Read the built pages ------------------------------------------------

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const distFiles = walk(dist).map((file) => relative(dist, file).split(sep).join('/'));
const fileSet = new Set(distFiles);

/** dist/about.html -> /about, dist/index.html -> /, dist/blog/index.html -> /blog */
const cleanPath = (file) => {
  const path = '/' + file.replace(/\.html$/, '').replace(/(^|\/)index$/, '');
  return path.length > 1 ? path.replace(/\/$/, '') : '/';
};

const pages = distFiles
  .filter((file) => file.endsWith('.html'))
  .map((file) => {
    const html = readFileSync(join(dist, file), 'utf8');
    return { file, path: cleanPath(file), html, noindex: /<meta name="robots" content="noindex/.test(html) };
  });
const pageByPath = new Map(pages.map((page) => [page.path, page]));

// Sources in _redirects count as working links.
const redirectSources = new Set(
  fileSet.has('_redirects')
    ? readFileSync(join(dist, '_redirects'), 'utf8')
        .split('\n')
        .map((line) => line.trim().split(/\s+/)[0])
        .filter((source) => source && !source.startsWith('#'))
    : [],
);

const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, 'g')) ?? [];

// ---- Links and anchors ---------------------------------------------------

/** The page or file an internal link points at, or undefined if none. */
const resolve = (fromPath, pathPart) => {
  const base = fromPath === '/' ? '/' : fromPath.replace(/[^/]*$/, '');
  const target = pathPart.startsWith('/') ? pathPart : posix.join(base, pathPart);
  const clean = target.length > 1 ? target.replace(/\/$/, '') : '/';
  if (pageByPath.has(clean)) return { page: pageByPath.get(clean) };
  if (fileSet.has(clean.slice(1))) return { file: clean };
  if (redirectSources.has(clean) || redirectSources.has(target)) return { redirect: clean };
  return undefined;
};

let linkCount = 0;
for (const page of pages) {
  const links = [...tags(page.html, 'a'), ...tags(page.html, 'link'), ...tags(page.html, 'img')]
    .map((tag) => attr(tag, 'href') ?? attr(tag, 'src'))
    .filter(Boolean);
  for (const link of links) {
    if (/^(mailto:|tel:|data:|javascript:|https?:|\/\/)/.test(link)) continue;
    linkCount++;
    const [pathPart, hash] = link.split('?')[0].split('#');
    const target = pathPart ? resolve(page.path, pathPart) : { page };
    if (!target) {
      fail('Broken link', `${page.path} links to ${link}, which doesn't exist`);
      continue;
    }
    if (hash && target.page && !new RegExp(`\\s(id|name)="${hash}"`).test(target.page.html)) {
      fail('Broken link', `${page.path} links to ${link}, but that page has no "#${hash}" section`);
    }
  }
}

// ---- Every page stamped --------------------------------------------------

for (const page of pages) {
  if (!page.html.includes('data-build')) fail('Build stamp', `${page.path} has no build line in its footer`);
  if (!page.html.includes('<meta name="generator" content="website-starter')) {
    fail('Build stamp', `${page.path} has no website-starter generator tag`);
  }
}

// ---- No third-party requests without approval ----------------------------

const approvedFile = join(root, 'src', 'third-parties.json');
const approvedHosts = existsSync(approvedFile)
  ? JSON.parse(readFileSync(approvedFile, 'utf8')).approved.map((entry) => entry.host)
  : [];
const allowedHosts = new Set([...buildHosts, ...approvedHosts]);

for (const page of pages) {
  const requests = [
    ...['script', 'iframe', 'img', 'video', 'audio', 'source', 'embed'].flatMap((name) =>
      tags(page.html, name).map((tag) => attr(tag, 'src')),
    ),
    ...tags(page.html, 'link')
      .filter((tag) => /rel="(stylesheet|preload|modulepreload)"/.test(tag))
      .map((tag) => attr(tag, 'href')),
  ].filter((url) => url && /^(https?:)?\/\//.test(url));
  for (const url of requests) {
    const host = new URL(url, 'https://site.invalid').host;
    if (!allowedHosts.has(host)) {
      fail('Third party', `${page.path} loads ${url}. Get the owner's approval and add ${host} to src/third-parties.json, or remove it`);
    }
  }
}

// ---- Colors only in tokens.css -------------------------------------------

const colorPattern =
  /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(|:\s*(?:white|black|red|green|blue|gray|grey|silver|maroon|navy|purple|teal|olive|orange|yellow|pink)\b/g;
const srcFiles = walk(join(root, 'src')).filter((file) => /\.(astro|css)$/.test(file));
for (const file of srcFiles) {
  const name = relative(root, file).split(sep).join('/');
  if (name === 'src/styles/tokens.css') continue;
  const text = readFileSync(file, 'utf8');
  const css = (
    file.endsWith('.css')
      ? [text]
      : [
          ...(text.match(/<style[^>]*>[\s\S]*?<\/style>/g) ?? []),
          ...(text.match(/\sstyle=(?:"[^"]*"|\{`[^`]*`\})/g) ?? []),
        ]
  )
    .join('\n')
    .replace(/\/\*[\s\S]*?\*\//g, '');
  const found = [...new Set(css.match(colorPattern) ?? [])];
  if (found.length) {
    fail('Colors', `${name} sets colors directly (${found.join(', ')}). Use a token from src/styles/tokens.css`);
  }
}

// ---- Sitemap matches the pages -------------------------------------------

if (fileSet.has('sitemap-index.xml')) {
  const listed = new Set(
    distFiles
      .filter((file) => /^sitemap-\d+\.xml$/.test(file))
      .flatMap((file) => [...readFileSync(join(dist, file), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)])
      .map((match) => new URL(match[1]).pathname.replace(/(.)\/$/, '$1')),
  );
  for (const page of pages) {
    if (page.noindex || page.path === '/404') continue;
    if (!listed.has(page.path)) fail('Sitemap', `${page.path} is missing from the sitemap`);
  }
  for (const path of listed) {
    if (!pageByPath.has(path)) fail('Sitemap', `the sitemap lists ${path}, which doesn't exist`);
  }
} else {
  notes.push('No sitemap: search engines are kept out until SITE_URL is set. That is expected before launch.');
}

// ---- Sample text (strict) ------------------------------------------------

const withSampleText = pages.filter((page) => page.html.includes('data-placeholder')).map((page) => page.path);
if (withSampleText.length) {
  const message = `still showing sample text: ${withSampleText.join(', ')}`;
  if (strict) fail('Sample text', message);
  else notes.push(`Pages ${message}.`);
}

// The starter's placeholder email (site.config.ts) on any page, footer included.
const withSampleEmail = pages.filter((page) => /[\w.+-]+@example\.(com|org|net)/.test(page.html)).map((page) => page.path);
if (withSampleEmail.length) {
  const message = `the sample email address (hello@example.com) is still on: ${withSampleEmail.join(', ')}. Set email in src/site.config.ts`;
  if (strict) fail('Sample email', message);
  else notes.push(`The ${message.slice(4)}.`);
}

// ---- Report --------------------------------------------------------------

console.log(`Checked ${pages.length} pages and ${linkCount} internal links${strict ? ' (strict)' : ''}.`);
for (const note of notes) console.log(`  note: ${note}`);
if (failures.length) {
  console.log(`\n${failures.length} problem${failures.length === 1 ? '' : 's'}:`);
  for (const failure of failures) console.log(`  ✗ ${failure}`);
  process.exit(1);
}
console.log('  ✓ No problems found.');
