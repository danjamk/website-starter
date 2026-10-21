# Runbook

For whoever helps the site's owner: a developer, a technical friend, a contractor. The owner works through Claude Code; this explains how the site is built and run, so you can help without undoing the setup.

## How it works

- **Astro static site.** `npm run build` writes plain HTML, CSS and assets to `dist/`. No server code, no database, no client-side framework.
- **Cloudflare Workers, static assets only.** `wrangler.jsonc` serves `dist/` with `not_found_handling: "404-page"`. There's no Worker script.
- **Workers Builds** is connected to this GitHub repository:
  - Push to `main`: build and deploy to production (`npx wrangler deploy`).
  - Push to any other branch: build a preview (`npx wrangler preview`) at `https://<branch>-<worker>.<subdomain>.workers.dev`. Requires the `previews` block in `wrangler.jsonc`.
- **Claude Code is the editor.** `CLAUDE.md` and `.claude/skills/` hold the rules: every site change goes on a branch with a preview and reaches `main` only after the owner's explicit yes. `docs/` changes (plan, interview answers, decision records) go straight to `main`.

## Decisions

Read `docs/adr/` before changing how the site works. Each record says why something is the way it is. If you need to change a decision, add a new record that replaces it; don't edit the old one.

The common requests that run against these decisions: a CMS or page builder, WordPress, client-side rendering, chat widgets and third-party trackers. They're possible, but each one costs the owner something (a monthly bill, a second place to edit, slower pages, a cookie notice). Talk it through with the owner first.

## Settings outside the repository

| Where | Setting | Why |
|---|---|---|
| Cloudflare → Worker → Settings → Build → build variables (the label may differ; these are variables for the build, not for the running Worker) | `SITE_URL` | The site's real address. Until it's set, every build is `noindex` with no sitemap. |
| Same place | `PRODUCTION_BRANCH` | Optional. Defaults to `main`. Only builds from it can be indexed. |
| Same place | `CF_WEB_ANALYTICS_TOKEN`, `GA_MEASUREMENT_ID` | Optional visitor statistics (`src/analytics.mjs`). Included only on indexable builds. Cloudflare Web Analytics' automatic setup, if it's on, works without the token and isn't visible in the repository: check Cloudflare → Web Analytics. |
| Cloudflare → the domain → Rules → Redirect Rules | `www` to the root address (or the reverse) | Set up by the custom domain add-on. The Worker's custom domain covers only one hostname. |
| Cloudflare → Worker → Settings → Build | Build `npm run build`, deploy `npx wrangler deploy`, preview `npx wrangler preview`, preview builds on | Set by the Deploy button. |
| GitHub → repository settings | Private | The plan and interview answers are in `docs/`. |
| GitHub → Applications | Cloudflare Workers and Pages app; Claude app | Cloudflare builds from the repository; Claude Code sessions read and push it. |
| claude.ai/code → environment → Network access | Custom: `*.workers.dev` plus the default list | So Claude can check preview and live links. |

Pushes that only change `docs/` still rebuild production. This is deliberate (no extra setup step for the owner); the content doesn't change. To stop it, exclude `docs/*` under Build watch paths.

## Common problems

| Symptom | Cause | Fix |
|---|---|---|
| Preview builds fail with "missing a `previews` block" | Copy made before template 0.1.1 | Add `"previews": {}` to `wrangler.jsonc` |
| Footer shows `main` instead of a commit | First build after the Deploy button, before template 0.1.1 | Harmless; the next push shows a hash |
| Claude can't reach preview links | Cloud environment network setting | Add `*.workers.dev` (see table above) |
| Claude Code can't see the repository | Private repository without the Claude GitHub app | Install it on this repository |
| Live site shows an old version | Last production build failed | Cloudflare → Deployments → the newest build's log |

## Checks

`npm run check` (after `npm run build`) checks the built site: internal links and `#anchors` resolve, every page has the build stamp, nothing loads from another company's servers unless it's listed in `src/third-parties.json` or added by the analytics build variables, no colors are set outside `src/styles/tokens.css`, and the sitemap matches the pages. `npm run check:strict` also fails on sample text (`data-placeholder`) and on the starter's `example.com` email address; Claude runs it before publishing to a launched site.

`.github/workflows/check.yml` runs the build and `npm run check` on GitHub for every push and pull request. It reports; it doesn't stop Cloudflare from publishing. On a private repository it uses GitHub Actions minutes, about a minute per push, well within the free allowance for a site this size. Pushing a change to a workflow file needs a GitHub token with the `workflow` scope, which Claude Code's connection may not have; if template-update can't push one, make that change by hand.

## Doing things by hand

You can work on this repository like any other. Keep to the owner's flow so Claude's rules stay true:

- `npm run dev` for a live-reloading local site; `npm run serve` to serve `dist/` the way Cloudflare does; `npm run build && npm run check` before pushing.
- Work on a branch; the owner sees your preview link before anything reaches `main`.
- Never force-push or rewrite `main`. Undo with `git revert`.
- **Emergency rollback:** Cloudflare → Workers & Pages → the Worker → Deployments → roll back to an earlier deployment. It's temporary; the next push to `main` deploys `main` again, so revert the bad commit too.
- If you change a build or deploy setting, add a decision record and update this runbook.

## Template updates

The site was copied from [website-starter](https://github.com/danjamk/website-starter) as a single snapshot with no shared git history, so `git merge` from the template doesn't work. `version` in `package.json` is the template version this site is at. Updates are listed in the template's `CHANGELOG.md`; Claude's `template-update` skill applies them as ordinary changes, with a preview.
