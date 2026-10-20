---
name: template-update
description: Bring improvements from the website-starter template into this site. Use when the person asks "are there any updates?", "update my site's template", or when a guide says the site is on an older template version.
---

# Apply template updates

This site was copied from website-starter as one snapshot, with no shared history, so updates can't be merged in with git. They're applied as changes, from the template's changelog.

1. **Find the version:** `version` in this site's `package.json`.
2. **Read the changelog:** https://raw.githubusercontent.com/danjamk/website-starter/main/CHANGELOG.md. Take every entry newer than this site's version. If there are none, say the site is up to date and stop.
3. **Explain** each entry in one or two plain lines: what it changes for the person, and whether it's recommended. Skip entries marked "Existing sites: not needed."
4. **Apply only what they choose,** on one draft named `template-update-<new-version>` (dots become dashes). Follow each entry's "How to apply". The person's own edits win: adjust around them, never replace a whole file they've changed. If an entry conflicts with something they changed, show both and ask. Template updates may touch build files; that's allowed here because the person approved them.
5. Set `version` in `package.json` to the newest version applied, and run `npm install` so `package-lock.json` matches.
6. Use **preview**: build, save, send, show the link. Then **publish** on a yes.
