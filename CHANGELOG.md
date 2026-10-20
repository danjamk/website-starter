# Changelog

Changes to the website-starter template, newest first. Each site records the template version it's at in `package.json` (`version`). Claude's `template-update` skill reads this file to bring a site up to date, so each entry says whether existing sites need it and how to apply it.

## 0.6.0 (2026-10-20)

- **Shared card and image styles.** `.cards`/`.card` move from the home page into `src/styles/global.css` so any page can use them, and `.figure` is added for a photo with a caption.
  Existing sites: recommended before the page interview.
  How to apply: add the two blocks to `global.css`. If the home page still has its own `.cards`/`.card` styles, remove them there, unless the person changed them, in which case leave both.
- **`docs/project/uploads/`**, the folder people upload page photos and documents into.
  Existing sites: recommended.
  How to apply: add the folder with the template's `README.md` (a `docs/` save, straight to `main`).
- **`CLAUDE.md`:** the page interview in the guide index; uploads, images, documents and shared building blocks in "Where things are".
  Existing sites: recommended.
  How to apply: add the guide row and the table rows.

## 0.5.1 (2026-10-20)

- **`CLAUDE.md`:** the site map interview in the guide index, and `docs/project/sitemap.md` in "Where things are", with a note to keep it in step with the pages.
  Existing sites: recommended.
  How to apply: add the guide row and the table row.

## 0.5.0 (2026-10-20)

- **Logo in the header.** `logo` in `src/site.config.ts` (`null` by default) shows an image from `public/` in the header, with or without the name next to it.
  Existing sites: recommended before the brand interview.
  How to apply: add the `logo` field to `site.config.ts`, and the logo branch, `.site-header__logo` rule and inline-flex `.site-header__name` from the template's `Header.astro`. If the site's header was customized, keep those changes and add only the logo branch.
- **`docs/project/brand-files/`**, the folder people upload brand files into on GitHub's website.
  Existing sites: recommended.
  How to apply: add the folder with the template's `README.md` (a `docs/` save, straight to `main`).
- **`CLAUDE.md`:** write the site's words in the voice in `docs/project/brand.md`; brand rows in "Where things are"; the brand interview in the guide index.
  Existing sites: recommended.
  How to apply: add the voice bullet, the table rows and the guide row.

## 0.4.0 (2026-10-20)

- **Base decision records** in `docs/adr/`: 0001 record decisions, 0002 static pages with no server or database, 0003 Claude is the editor, 0004 every fact in the HTML, 0005 design tokens, 0006 preview then publish on a yes. Plus `docs/adr/README.md`.
  Existing sites: recommended.
  How to apply: add the six records and the README. If the site already has records numbered 0001–0006 (written by an interview), renumber the base records to follow the site's highest number and say so in each record's first line.
- **`CLAUDE.md` hard rule:** when a request goes against a decision record, explain the trade-off and let the person decide.
  Existing sites: recommended.
  How to apply: add the "Decisions are in `docs/adr/`" bullet to the hard rules.

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
