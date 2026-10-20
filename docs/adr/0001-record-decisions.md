# 0001. Record decisions as decision records

**Date:** 2026-10-20 · **Status:** Accepted · **Made in:** website-starter 0.4.0

## Context
This site is changed by talking to Claude, often months apart, sometimes with help from someone who wasn't there when it was set up. Without a written reason, a choice looks arbitrary, and the next person to touch it either undoes it or is afraid to change anything.

## Decision
Every decision about how the site works gets a short record in `docs/adr/`: what was decided, why, and what it means. Records are never edited; a new record replaces an old one.

## What this means
- Before changing how the site works, Claude reads these records and explains the trade-off to the owner instead of refusing or quietly changing course.
- A helper can learn why the site is built this way in a few minutes.
- Changing a decision is allowed. It takes a new record, so the history of why stays readable.
