---
name: publish
description: Publish a previewed draft to the live website. Use only after the person has seen the draft's preview link and clearly said yes to publishing it, such as "publish it", "yes, put it live", "go ahead", "looks good, make it live".
---

# Publish a draft

1. **Check the yes.** Read "Publishing needs a yes" in `CLAUDE.md`. The person must have said yes to this draft, after seeing its preview link, with no changes since. If not, ask: "Publish this to your live site?" and stop until they answer.
2. **Bring the draft up to date:** run **sync**. If sync changed anything outside `docs/`, the preview is out of date: wait for the new preview, show the link again, and get a fresh yes.
3. **Run the checks:** `npm run build`, then `npm run check`, or `npm run check:strict` if the site has launched (the live `robots.txt` doesn't say `Disallow: /`). Strict also fails on sample text, which must never reach a launched site. If either fails, fix it on the draft and show the preview again.
4. **Publish:**
   - `git checkout main`
   - `git pull --ff-only`
   - `git merge --no-edit <draft-name>`
   - `git push origin main`

   If the merge reports a conflict, stop: `git merge --abort`, and run **sync** again first.
5. **Confirm the live site shows it.** The live address is in `CLAUDE.md`. Every 15 seconds, for up to 4 minutes, `curl -sS` the changed page on the live site and look for `git rev-parse --short HEAD` (on `main`) in the footer.
6. **Tell the person:** "It's live: <link to the changed page on the live site>."
7. **If the live site doesn't update in 4 minutes,** say so. Ask them to open Cloudflare → **Workers & Pages** → the project → **Deployments** and paste what the newest build shows. If the live site is showing something broken, offer **rollback**.
8. **Keep the records in step,** in one `docs/` save straight to `main`:
   - **`PLAN.md`:** check the box of any step this change completes, and update "Next up". A page added outside the page interview gets a checked line in stage 5; if stage 5 still says "Added after the site map interview", mark that line "— not needed: pages made by request".
   - **`docs/project/sitemap.md`** when a page was added, renamed or removed: add, change or mark the row (`published`, or `removed` with where its visitors go now). If the file doesn't exist, create it in the format of Template A in https://raw.githubusercontent.com/danjamk/agentic-guides/main/website/interview-sitemap.md, listing every page.
   - **Look and voice:** a change to colors, fonts, logo or how the site sounds updates `docs/project/brand.md` if it exists. If it doesn't, add a bullet to **Design and brand** in `profile.md` ("Main color bright teal #14B8A6, chosen 2026-10-21; buttons use dark text so they're readable").

Leave the draft on GitHub. Claude Code can't delete branches, and it does no harm.
