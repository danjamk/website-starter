# Changelog

Changes to the website-starter template, newest first. Each site records the template version it's at in `package.json` (`version`). Claude's `template-update` skill reads this file to bring a site up to date, so each entry says whether existing sites need it and how to apply it.

## 0.3.0 (2026-10-20)

- **Claude layer.** `CLAUDE.md` now covers how to talk to the person, how changes reach the live site, what counts as a yes to publishing, hard rules, when to ask for technical help, and a guide index. Skills added in `.claude/skills/`: preview, publish, sync, rollback, check, continue, template-update.
  Existing sites: recommended.
  How to apply: add the `.claude/skills/` folder. Merge the new `CLAUDE.md` sections into the site's `CLAUDE.md`, keeping its "Who you're working for" section and anything the person added.
- **Docs for the owner and for a helper:** `docs/EDITING-GUIDE.md` and `docs/RUNBOOK.md`.
  Existing sites: recommended.
  How to apply: add both files.
- **This changelog.**
  Existing sites: optional.
  How to apply: nothing to do; the `template-update` skill reads it from the template.

## 0.2.0 (2026-10-20)

- **Project state files.** Empty `docs/project/PLAN.md`, `profile.md` and `interviews/README.md`, and a first `CLAUDE.md`.
  Existing sites: not needed. Every site made with the website installer was created at 0.2.0 or later.

## 0.1.1 (2026-10-20)

- **Branch previews.** `wrangler.jsonc` gains `"previews": {}`. Without it, every preview build fails.
  Existing sites: recommended.
  How to apply: add `"previews": {}` at the top level of `wrangler.jsonc`.
- **Footer commit.** `src/build-info.ts` only shows `WORKERS_CI_COMMIT_SHA` when it's a real hash.
  Existing sites: optional.
  How to apply: copy the check from the template's `shortCommit()`.
- **`npm run preview` is now `npm run serve`,** to avoid confusion with Cloudflare's preview command.
  Existing sites: optional.

## 0.1.0 (2026-10-19)

- First version: Astro static site, five pages, two-layer design tokens, search engines blocked until `SITE_URL` is set.
