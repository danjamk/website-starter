# website-starter

A starter website you maintain by talking to Claude. Plain pages built ahead of time with Astro, hosted free on Cloudflare, and every change shown on its own preview link before it goes live.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/danjamk/website-starter)

**Setting up a website?** Start with the website recipe in [agentic-guides](https://github.com/danjamk/agentic-guides). It walks you through the accounts, this button, and making the site your own. You do not need to read further down this page.

> The Deploy button path is being tested. Until that is done, treat it as unverified (2026-10-19).

## What the button does

1. Copies this repository into your own GitHub account.
2. Creates a Cloudflare Worker that serves the site, and connects it to your copy.
3. Builds and publishes the site at a `workers.dev` address.

After that, every change merged into `main` publishes automatically, and every other branch gets its own preview address.

## Where things are

| To change… | Edit |
|---|---|
| Business name, tagline, email, menus | `src/site.config.ts` |
| Colors, fonts, sizes, spacing | `src/styles/tokens.css` |
| Base page styles | `src/styles/global.css` |
| A page | `src/pages/<name>.astro` (`about.astro` publishes as `/about`) |
| Header or footer on every page | `src/components/Header.astro`, `src/components/Footer.astro` |
| The frame around every page (`<head>`, meta tags) | `src/layouts/Base.astro` |
| Favicon and other files served as-is | `public/` |

## Search engines

Every build is hidden from search engines (`noindex`, no sitemap) until both are true:

- `SITE_URL` is set to the site's real address, as a build variable in Cloudflare.
- The build is from the production branch (`main`, or `PRODUCTION_BRANCH` if set).

So branch previews and the `workers.dev` address never compete with the real site. The rule is in `src/indexing.mjs`.

## Commands

Requires Node 22.12 or later (see `.nvmrc`).

```bash
npm install
npm run dev       # live-reloading local site at http://localhost:4321
npm run build     # build the site into dist/
npm run serve     # serve dist/ the way Cloudflare will
```

The footer of every page shows the version, commit and build time, which is how to tell which build you are looking at.

## License

MIT. See [LICENSE](LICENSE).
