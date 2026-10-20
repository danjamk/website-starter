---
name: rollback
description: Undo a published change and put the live website back to how it was. Use when the person says something like "undo that", "put it back", "the site is broken", "go back to how it was yesterday", or after a publish that broke the live site.
---

# Roll back the live site

Undo by adding a change that reverses the old one. Never rewrite history: no `reset`, no force-push.

1. **Find what to undo.** `git checkout main`, `git pull`, then `git log --oneline -15`. Match the person's description ("the new photo", "yesterday's change") to commits. Ignore `docs:` commits; they don't change the site. Say in one line what you'll undo, and the date the site will look like.
2. **Ask:** "Put the site back to how it was before <change>?" This is the one change that may go straight to `main` without a preview, because the site is returning to a version the person already had live. If they'd rather see it first, do steps 3–4 on a draft named `undo-<change>` and use **preview** and **publish** instead.
3. **Reverse it:** `git revert --no-edit <commit>` for each commit, newest first. For a published merge, `git revert --no-edit -m 1 <merge-commit>`. If a revert conflicts, `git revert --abort` and fall back to step 6.
4. **Check and publish:** `npm run build`, then `git push origin main`, and confirm the live footer shows the new commit, as in **publish** step 4.
5. **Tell them** what's back, with the live link. The undone change still exists in the history and on its draft, if they want it again later.
6. **If the site is broken and the steps above fail,** use Cloudflare's own rollback as a stopgap. Ask the person to open Cloudflare → **Workers & Pages** → the project → **Deployments**, find the last version that worked, and choose the option to roll back to it (usually in a menu on that row; the wording may differ). Tell them it's temporary: the next publish, or the next save of their plan, puts the newest version back. Then fix the change with steps 1–4, or say it needs technical help (`docs/RUNBOOK.md`).
