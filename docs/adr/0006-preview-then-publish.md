# 0006. Preview every change; publish only on the owner's yes

**Date:** 2026-10-20 · **Status:** Accepted · **Made in:** website-starter 0.4.0

## Context
The owner can't review code, so they need to see a change as visitors will before it goes live. Cloudflare's Workers Builds already builds every branch pushed to GitHub into its own preview link, and publishes the `main` branch as the live site.

## Decision
- Every change to the site is made on a draft (a branch) and shown to the owner on its preview link.
- It reaches `main`, and so the live site, only after the owner says yes to that change, after seeing the link. `CLAUDE.md` lists what does and doesn't count as a yes.
- Claude publishes by merging the draft into `main` and pushing, without a GitHub pull request, so the owner never has to use GitHub's screens.
- Changes only to `docs/` (the plan, interview answers, decision records) go straight to `main`, because they don't change what visitors see.
- Undoing a change adds a change that reverses it. History is never rewritten.

## What this means
- Nothing reaches the live site by accident, and every published change has a preview the owner saw.
- There's no review step on GitHub. A site with several people making changes may want one; that's the "Extra publishing safety" add-on.
- Each save of `docs/` also rebuilds the live site with identical pages. That's accepted to avoid an extra setup step; `docs/RUNBOOK.md` says how to turn it off.
