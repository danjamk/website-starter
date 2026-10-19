// Decides whether this build is shown to search engines.
//
// A build is indexable only when SITE_URL is set AND it is the production branch.
// Everything else (local builds, branch previews, the workers.dev address before
// a domain is added) is marked noindex and gets no sitemap, so unfinished copies
// never compete with the real site in search results.
//
// SITE_URL is the site's real address, for example https://example.com. Set it as
// a build variable in Cloudflare when the site has its own domain.
// Workers Builds sets WORKERS_CI_BRANCH on every build. PRODUCTION_BRANCH defaults
// to main; set it only if the production branch is named something else.
//
// Plain JavaScript so astro.config.mjs can import it before TypeScript is set up.

const env = process.env;

/** @type {string | undefined} */
export const siteUrl = env.SITE_URL?.trim().replace(/\/+$/, '') || undefined;

const productionBranch = env.PRODUCTION_BRANCH?.trim() || 'main';
const branch = env.WORKERS_CI_BRANCH?.trim() || undefined;

// Outside Workers Builds there is no branch. A local build with SITE_URL set is
// treated as production, so the indexed output can be inspected before launch.
const isProductionBranch = branch === undefined || branch === productionBranch;

export const indexable = Boolean(siteUrl) && isProductionBranch;
