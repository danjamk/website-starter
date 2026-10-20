# 0002. Static pages, no server or database

**Date:** 2026-10-20 · **Status:** Accepted · **Made in:** website-starter 0.4.0

## Context
Most small-business sites show the same pages to every visitor: what the business does, who it's for, how to get in touch. A server and database are what make WordPress-style sites need updates, security patches, backups and a monthly hosting bill. An owner who isn't technical can't look after those, and a neglected one is how sites get hacked.

## Decision
The site is built ahead of time into plain HTML pages (Astro, `output: 'static'`) and served as files by Cloudflare. There is no server code and no database.

## What this means
- Hosting is free at small-business traffic, there is nothing to patch, and pages load fast everywhere.
- Features that need to store or look up data per visitor (logins, a shop, bookings, member areas) aren't built into the site. They come from an outside service embedded with the owner's sign-off, such as a booking or payment provider, or the add-on for contact forms.
- If the site later needs real server-side features, that's a new decision record and probably technical help (`docs/RUNBOOK.md`), not a quiet change.
