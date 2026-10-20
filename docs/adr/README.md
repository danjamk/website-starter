# Decision records

Each file here records one decision about how this site works: what was decided, why, and what it means. They exist so that when someone suggests a different way ("just use WordPress," "add a chat widget"), Claude and whoever helps you can explain what that would cost, instead of refusing or quietly changing it.

- **0001–0006** came with the starter site. They're the reasons it's built the way it is.
- **0007 and up** are yours, written by the discovery interview and later steps, from your answers.

## Rules

- One decision per file: `NNNN-short-title.md`, numbered in order, four digits.
- **Records are never edited after they're saved.** To change a decision, add a new record that explains the new choice, and change only the old record's status line to `Replaced by NNNN`.
- Format:

  ```markdown
  # NNNN. Title stating the decision

  **Date:** YYYY-MM-DD · **Status:** Accepted · **Made in:** <guide or template version>

  ## Context
  ## Decision
  ## What this means
  ```

- Changes to files in `docs/` go straight to the live version of your site's files, without a preview, because they don't change what visitors see.
