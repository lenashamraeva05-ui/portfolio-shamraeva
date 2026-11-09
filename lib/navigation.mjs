/** Restore a GitHub Pages path only within the current origin.
 * @param {string | null} savedPath
 * @param {string} origin
 */
export function restoreLocalPath(savedPath, origin) {
  if (!savedPath?.startsWith("/")) return null;
  try {
    const destination = new URL(savedPath, origin);
    if (destination.origin !== origin) return null;
    destination.searchParams.delete("ghp-path");
    return destination.pathname + destination.search + destination.hash;
  } catch { return null; }
}
