---
name: publish
description: Publish a previewed draft to the live website. Use only after the person has seen the draft's preview link and clearly said yes to publishing it, such as "publish it", "yes, put it live", "go ahead", "looks good, make it live".
---

# Publish a draft

1. **Check the yes.** Read "Publishing needs a yes" in `CLAUDE.md`. The person must have said yes to this draft, after seeing its preview link, with no changes since. If not, ask: "Publish this to your live site?" and stop until they answer.
2. **Bring the draft up to date:** run **sync**. If sync changed anything outside `docs/`, the preview is out of date: wait for the new preview, show the link again, and get a fresh yes.
3. **Publish:**
   - `git checkout main`
   - `git pull --ff-only`
   - `git merge --no-edit <draft-name>`
   - `git push origin main`

   If the merge reports a conflict, stop: `git merge --abort`, and run **sync** again first.
4. **Confirm the live site shows it.** The live address is in `CLAUDE.md`. Every 15 seconds, for up to 4 minutes, `curl -sS` the changed page on the live site and look for `git rev-parse --short HEAD` (on `main`) in the footer.
5. **Tell the person:** "It's live: <link to the changed page on the live site>."
6. **If the live site doesn't update in 4 minutes,** say so. Ask them to open Cloudflare → **Workers & Pages** → the project → **Deployments** and paste what the newest build shows. If the live site is showing something broken, offer **rollback**.
7. **Update the plan** if this change completes a step: check its box in `PLAN.md` and update "Next up" (a `docs/` save, straight to `main`).

Leave the draft on GitHub. Claude Code can't delete branches, and it does no harm.
