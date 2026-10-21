---
name: preview
description: Make a change to the website on a draft and give the person a preview link. Use for any request that changes what the site shows or how it looks, such as "change the headline", "add a photo", "update my hours", "make the button green", "add a page", "can you fix the typo on the about page".
---

# Preview a change

Every change to the site (anything outside `docs/`) goes through here. Nothing reaches the live site from this skill.

1. **Start from the live version.** `git checkout main`, `git pull`.
2. **Pick or reuse a draft.** If the person is continuing an unpublished change, switch to its draft and run **sync**. Otherwise create one: `git checkout -b <draft-name>`.
   - Name it after the change: `opening-hours`, `about-photo`, `services-page`. Lowercase letters, numbers and dashes only. Add `-2` if the name is taken.
   - Never use a `claude/...` branch for site changes.
3. **Make the change.** Edit only what the request needs. Follow the hard rules in `CLAUDE.md`, especially: no build or deploy files, no third-party scripts, no new packages, unless the person asked for exactly that.
4. **If it's a design change,** use the semantic tokens in `src/styles/tokens.css`. To change a brand color or font, change the brand token at the top, not individual components. Never write a color value outside `tokens.css`.
5. **Check it builds and passes the checks:** `npm ci` (first time in the session), then `npm run build`, then `npm run check`. Fix what they report: broken links, colors outside `tokens.css`, other companies' scripts or images the owner hasn't approved. If you can't fix it in two tries, stop, undo your edits on the draft, and tell the person in plain words.
6. **Save and send:** commit with a short message saying what changed for a visitor ("Show Saturday opening hours"), then `git push -u origin <draft-name>`.
7. **Wait for the preview,** at `https://<draft-name>-{{PROJECT}}.{{SUBDOMAIN}}.workers.dev` (values in `CLAUDE.md`, "Who you're working for"). Every 15 seconds, for up to 4 minutes, `curl -sS` the page you changed and look for `git rev-parse --short HEAD` in the footer. Use `curl`, never a web fetch tool.
   - If it doesn't appear: check `wrangler.jsonc` has `"previews": {}`. If it's missing, add it on this draft (this is the one build file you may touch without asking, because previews can't work without it), save, and wait again. Otherwise ask the person to open Cloudflare → **Workers & Pages** → the project → **Deployments**, and paste the error from the newest build.
8. **Give the link,** pointing at the page that changed:

   > Here's the preview: <link to the changed page>
   > <One line on what changed.> Want any changes, or shall I publish it to your live site?

9. **More changes** go on the same draft: repeat from step 3. The link stays the same.
10. **If they say publish,** use **publish**. If they say "later", leave the draft and add it to `PLAN.md`'s "Next up" (a `docs/` save, straight to `main`).
