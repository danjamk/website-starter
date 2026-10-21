---
name: check
description: Check the health of the website and report in plain words. Use when the person asks "is everything OK?", "check my site", "what's the status", "is it live", or when something seems wrong.
---

# Check the site

Run each check and report the results as a short list, problems first. Change nothing; offer fixes.

1. **Up to date:** `git checkout main`, `git pull`.
2. **It builds and passes the checks:** `npm ci`, `npm run build`, `npm run check`. Report each problem it lists in plain words ("the About page links to a page that doesn't exist"). Its notes include pages still showing sample text.
3. **Live matches saved:** `curl -sS` the live address and compare the footer's commit to `git rev-parse --short HEAD`. A mismatch within a few minutes of a save is normal. Longer means Cloudflare's last build failed: ask the person to look at Cloudflare → **Workers & Pages** → the project → **Deployments**.
4. **Pages respond:** `curl -sS -o /dev/null -w "%{http_code}"` each page in `dist/` (each `.html` file, as its clean address without `.html`). Each should be `200`; a made-up address should be `404`.
5. **Checks on GitHub:** `gh api repos/{owner}/{repo}/commits/main/check-runs --jq '.check_runs[] | "\(.name): \(.conclusion)"'`. A failed "check" run means the last change to `main` broke a check; look at what step 2 reports.
6. **Unpublished drafts:** `git branch -r --no-merged main`. For each, one line on what it changes (`git log main..origin/<draft> --oneline`).
7. **Search engines:** if `SITE_URL` isn't set, the site is hidden from search engines on purpose. Mention it only if the plan's "Go live" stage has started.
8. **Private:** `gh api repos/{owner}/{repo} --jq .private` should be `true`.

End with one recommended next action.
