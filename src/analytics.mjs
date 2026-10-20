// Visitor statistics, switched on by build variables in Cloudflare, never by
// pasting a snippet into a page. Nothing loads unless a variable is set, and
// only on builds search engines can see (src/indexing.mjs), so previews and
// local builds are never counted.
//
// CF_WEB_ANALYTICS_TOKEN: Cloudflare Web Analytics, manual setup. Not needed when
//   Cloudflare's automatic setup is on for the site's domain.
// GA_MEASUREMENT_ID: Google Analytics 4 (G-XXXXXXX). Sets cookies; the privacy
//   page and possibly a cookie notice must cover it. See the analytics add-on.

import { indexable } from './indexing.mjs';

const env = process.env;

const clean = (value) => value?.trim() || undefined;

/** @type {string | undefined} */
export const cfWebAnalyticsToken = indexable ? clean(env.CF_WEB_ANALYTICS_TOKEN) : undefined;

/** @type {string | undefined} */
export const gaMeasurementId = indexable ? clean(env.GA_MEASUREMENT_ID) : undefined;
