# 0003. Claude is the editor; no content management system

**Date:** 2026-10-20 · **Status:** Accepted · **Made in:** website-starter 0.4.0

## Context
The usual way to let a non-technical owner edit a site is a content management system (CMS) such as WordPress, Webflow or Squarespace: a dashboard with forms. That brings a second place where content lives, a monthly fee or a server, and limits on what can change without a developer. Here, the owner already describes changes to Claude in plain words, and Claude edits the site's files directly.

## Decision
There is no CMS. The owner asks Claude for changes; Claude edits the files, shows a preview, and publishes on a yes. The rules for this are in `CLAUDE.md` and `.claude/skills/`.

## What this means
- All content and design live in one place, the site's files on GitHub, with a full history of every change.
- Anything a developer could change, the owner can ask for, within the hard rules in `CLAUDE.md`.
- The owner needs a Claude plan that includes Claude Code. If they stop using Claude, the site keeps running as it is; changing it then needs someone who can edit the files.
- Adding a CMS later is possible but would be a new decision: it would bring back the costs above, and edits made in it and edits made through Claude could conflict.
