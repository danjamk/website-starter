---
name: sync
description: Bring a website draft up to date with the live version before more changes or before publishing. Use when returning to an older draft, when the live site changed since the draft started, or before publish.
---

# Sync a draft with the live version

1. `git checkout main`, `git pull --ff-only`.
2. `git checkout <draft-name>`, `git pull --ff-only` if the draft exists on GitHub.
3. `git merge --no-edit main`. Merge only. Never rebase, never force-push.
4. **No conflicts:** if the merge brought in anything outside `docs/`, run `npm run build`, save and send (`git push`), and treat the preview as new: wait for it and show the link again before any publish.
5. **Conflicts:** look at each one. If it's only in `docs/`, keep the newer content per STATE.md and finish the merge. If it's in the site's files and the right answer is clear (two separate edits to different parts of a page), resolve it and say in one line what you combined. If it isn't clear, `git merge --abort` and ask the person which version they want, in plain words: "Your draft changes the headline to X, and the live site now says Y. Which should it be?"
