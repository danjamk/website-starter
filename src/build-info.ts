// Facts about this build, fixed when `npm run build` runs. The footer shows the
// version, commit and build time, which is how to tell which build a page came from.

import { execSync } from 'node:child_process';
import pkg from '../package.json';
import { indexable, siteUrl } from './indexing.mjs';

function shortCommit(): string {
  // Workers Builds sets this; local builds ask git.
  const sha = process.env.WORKERS_CI_COMMIT_SHA;
  if (sha) return sha.slice(0, 7);
  try {
    return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
  } catch {
    return 'local';
  }
}

export const build = {
  version: pkg.version,
  commit: shortCommit(),
  time: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  siteUrl,
  indexable,
};
