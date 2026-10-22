---
name: continue
description: Pick up the website plan where the person left off, or say what's left to do. Use when they say "let's keep going", "what's next", "where were we", "what's left", "continue", or start a session without a specific request.
---

# Continue the plan

1. Do the "Project state" steps in `CLAUDE.md`: switch to `main`, `git pull`, read `docs/project/PLAN.md` and `docs/project/profile.md`.
2. **Unfinished first,** in this order:
   - An interview with `**Status:** in progress`: offer to resume it ("You're 6 of 10 questions into discovery. Pick up there?"). A question marked `waiting` comes first: ask whether they have the answer now ("Has the board picked the colors?").
   - An unpublished draft: offer to show its preview link again, or to finish it.
3. **Otherwise, depending on the `**Way of working:**` line:**
   - **Guided (or no line):** say the "Next up" line, with its time estimate, and ask if now's a good time.
   - **Direct:** ask what they'd like to change. If they ask what's left, go to step 6.
4. **On yes,** start it:
   - An interview or step with a guide: find it in the Guides table in `CLAUDE.md`, read the guide from its link, and follow it. If the link doesn't open, say the step isn't available yet and offer the next one that is.
   - A site change: use **preview**.
5. **On "not now",** offer something smaller from the plan, or stop. Don't push.
6. **"What's left?"** Answer from the site itself, not only the plan:
   - `npm ci`, `npm run build`, `npm run check:strict`. List in plain words the pages still showing sample text and whether the sample email is still on the site.
   - Unpublished drafts (`git branch -r --no-merged main`).
   - Whether the site has launched: the live `robots.txt` says `Disallow: /` until it's on its own address with search engines let in (the custom domain add-on).
   - Unchecked plan lines, leaving out interviews marked skipped or not needed.

   Recommend one next thing, with a time estimate.
