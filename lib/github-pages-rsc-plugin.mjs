/**
 * GitHub Pages serves .rsc as application/octet-stream and cannot use _headers.
 * Adapt only Vinext's exported browser transport, never arbitrary fetches.
 * @returns {import("vite").Plugin}
 */
export function githubPagesRsc() {
  return {
    name: "github-pages-static-rsc",
    apply: "build",
    enforce: "pre",
    transform(code, id) {
      const path = id.replaceAll("\\", "/").split("?")[0];
      if (path.endsWith("/vinext/dist/server/app-browser-entry.js")) {
        const check = '.startsWith("text/x-component")';
        if (code.split(check).length - 1 !== 2) throw new Error("Review GitHub Pages RSC MIME adapter after upgrading Vinext");
        return { code: code.replaceAll(check, '.split(";").some(type => ["text/x-component", "application/octet-stream"].includes(type.trim()))'), map: null };
      }
      if (path.endsWith("/vinext/dist/server/app-rsc-cache-busting.js")) {
        const target = 'const pathname = queryIndex === -1 ? beforeHash : beforeHash.slice(0, queryIndex);';
        if (!code.includes(target)) throw new Error("Review GitHub Pages root RSC path after upgrading Vinext");
        return { code: code.replace(target, target.replace("const pathname", "let pathname") + '\nif (pathname === "/") pathname = "/index";'), map: null };
      }
    }
  };
}
