// The public address of a page. Pages build to files like about.html, and
// Cloudflare serves them at /about, so the .html and any /index are dropped.
export function cleanPath(pathname: string): string {
  return pathname.replace(/(\/index)?\.html$/, '').replace(/\/+$/, '') || '/';
}
