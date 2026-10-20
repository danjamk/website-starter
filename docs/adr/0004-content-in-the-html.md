# 0004. Every fact is in the HTML the server sends

**Date:** 2026-10-20 · **Status:** Accepted · **Made in:** website-starter 0.4.0

## Context
Search engines, link previews in messaging apps, and AI tools that read websites often don't run a page's JavaScript. If a page builds its text in the browser, those readers see an empty page, and the business doesn't show up in their answers.

## Decision
Every word, price, address, opening hour and link a visitor needs is in the HTML of the page as it's sent. JavaScript may only add things that aren't needed to understand the page, such as an animation.

## What this means
- Content goes in the `.astro` pages and `src/site.config.ts`, not in scripts or data fetched by the browser.
- Embedded widgets (reviews, booking calendars, maps) are fine with the owner's sign-off, but the key facts they show (hours, address, prices) also appear as plain text on the page.
- Each page has its own title and description in the page's `<head>`, set through `src/layouts/Base.astro`.
