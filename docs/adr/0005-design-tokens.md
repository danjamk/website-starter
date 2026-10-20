# 0005. Design in named tokens, brand separate from use

**Date:** 2026-10-20 · **Status:** Accepted · **Made in:** website-starter 0.4.0

## Context
A brand changes over time: a new color, a different font. If colors are typed into each page and component, a brand change means hunting through every file and missing some. And an owner asking to "make the buttons darker" shouldn't recolor every link that happens to share the same blue.

## Decision
All colors, fonts, sizes and spacing are named values ("tokens") in `src/styles/tokens.css`, in two layers:
- **Brand tokens** (`--brand-*`): the brand's actual colors and fonts.
- **Semantic tokens** (`--color-text`, `--color-action-bg`, `--space-4` …): what each value is for, pointing at brand tokens.

Pages and components use semantic tokens only. No color value appears outside `tokens.css`.

## What this means
- A brand change is a few lines in one file, and every page follows.
- A request about one kind of thing ("darker buttons") changes one semantic token, without touching other things that share a color.
- The brand interview fills in the brand layer. Claude checks for color values outside `tokens.css` when it makes design changes.
