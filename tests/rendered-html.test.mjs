import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "") {
  const filePath = pathname ? `../dist/client${pathname}/index.html` : "../dist/client/index.html";
  return readFile(new URL(filePath, import.meta.url), "utf8");
}

test("renders the portfolio homepage and project imagery", async () => {
  const html = await render();
  assert.match(html, /Helen Shamraeva/);
  assert.match(html, /og-portfolio\.png/);
  assert.match(html, /Available for work/);
  assert.match(html, /id="work"/);
  assert.match(html, /T-Bank Statist/);
  assert.match(html, /tbank-statist-hero\.webp/);
  assert.match(html, /EHU Museums/);
  assert.match(html, /Zernote/);
  assert.match(html, /Whispers of the City/);
  assert.match(html, /TableQuest/);
  assert.match(html, /EHU IT Hub - Social/);
  assert.match(html, /EHU IT Hub - Landing/);
  assert.match(html, /EHU IT Hub - Portal/);
  assert.match(html, /Let&#x27;s chat/);
  assert.match(html, /LinkedIn/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/elena-shamraeva-a73464393/);
  assert.match(html, /Telegram/);
  assert.match(html, /WhatsApp/);
  assert.match(html, /href="\/about\/"/);
  assert.match(html, /href="\/resume\/"/);
  assert.doesNotMatch(html, /href="\/blog"/);
  assert.match(html, /role="tablist"/);
  assert.match(html, /role="tab"/);
  assert.match(html, /aria-selected="true"/);
  assert.match(html, /aria-controls="t-bank-statist-panel"/);
});

test("renders the standalone about, resume and blog pages", async () => {
  const [aboutResponse, resumeResponse, blogResponse] = await Promise.all([
    render("/about"),
    render("/resume"),
    render("/blog"),
  ]);

  const [about, resume, blog] = await Promise.all([aboutResponse, resumeResponse, blogResponse]);

  assert.match(about, /I’m a team player/);
  assert.match(about, /wife, homemaker, mother of two four-legged companions, and friend/);
  assert.match(about, /about-opening-lanyard/);
  assert.match(about, /https:\/\/www\.instagram\.com\/ftr0ys_emmm\?stkn=MW16YXg5NmxtNDg2bw==/);
  assert.doesNotMatch(about, /https:\/\/google\.com\//);
  assert.doesNotMatch(about, /Product thinking,<br\/>with a visual point of view/);
  assert.doesNotMatch(about, /Visual designer/);
  assert.doesNotMatch(about, /Fascinated by logic, structure/);
  assert.match(resume, /Experience at a glance/);
  assert.match(resume, /Passionate about user-centered design/);
  assert.match(resume, /Information architecture/);
  assert.match(resume, /Customer development/);
  assert.doesNotMatch(resume, /Workshop hosting/);
  assert.match(resume, /lena\.shamraeva\.05@gmail\.com/);
  assert.match(resume, /href="mailto:lena\.shamraeva\.05@gmail\.com"/);
  assert.match(resume, /Eastbourne, UK/);
  assert.match(resume, /\+44 7956 042838/);
  assert.match(resume, /href="tel:\+447956042838"/);
  assert.match(resume, /English<!--[\s\S]*?--> <em>B2<\/em>/);
  assert.match(resume, /Russian<!--[\s\S]*?--> <em>Native<\/em>/);
  assert.doesNotMatch(resume, /Portuguese/);
  assert.doesNotMatch(resume, /Selected experience/);
  assert.match(resume, /Yandex Practicum/);
  assert.match(resume, /UX Research for Designers/);
  assert.match(resume, /Grade: 160 hours/);
  assert.match(resume, /Moscow Polytechnic University/);
  assert.match(resume, /Bachelor&#x27;s degree, Graphic Design/);
  assert.doesNotMatch(resume, /Research-led,<br\/>detail-focused/);
  assert.match(blog, /<h1>Blog<\/h1>/);
  assert.match(blog, /Design systems/);
  assert.match(blog, /How I turn messy interviews/);
});

test("ships GitHub Pages metadata and fallback files", async () => {
  const cname = await readFile(new URL("../dist/client/CNAME", import.meta.url), "utf8");
  const fallback = await readFile(new URL("../dist/client/404.html", import.meta.url), "utf8");

  assert.equal(cname.trim(), "elena.shamraeva.co.uk");
  assert.match(fallback, /ghp-path/);
});

test("ships the real project visuals and processed portrait", async () => {
  await Promise.all([
    access(new URL("../public/projects/tbank-statist-hero.png", import.meta.url)),
    access(new URL("../public/projects/tbank-statist-cover.png", import.meta.url)),
    access(new URL("../public/projects/ehu-museums-overview.png", import.meta.url)),
    access(new URL("../public/projects/zernote-jobs-tree.png", import.meta.url)),
    access(new URL("../public/elena-portrait-blue-v1.png", import.meta.url)),
  ]);
});

test("all rendered local images, scripts, styles and route links exist in the export", async () => {
  for (const pathname of ["", "/about", "/resume", "/blog"]) {
    const html = await render(pathname);
    const references = [...html.matchAll(/(?:src|href|poster)="(\/[^"?#]*)(?:[^"\s]*)"/g)];
    for (const [, path] of references) {
      if (path.startsWith("//")) continue;
      const file = /\.[a-z0-9]+$/i.test(path) ? path : `${path.replace(/\/$/, "")}/index.html`;
      await assert.doesNotReject(access(new URL(`../dist/client${file}`, import.meta.url)), `${pathname || "/"}: ${path}`);
    }
    assert.match(html, /<main[^>]+id="main-content"/);
  }
});

test("keeps heavyweight visuals deferred and video network loading opt-in", async () => {
  const home = await render();
  const about = await render("/about");
  assert.match(home, /<video[^>]+preload="none"/);
  assert.doesNotMatch(home, /<video[^>]+src=/);
  assert.doesNotMatch(about, /rel="modulepreload"[^>]+href="[^"]*Lanyard/);
  assert.match(about, /Interactive Helen Shamraeva profile card/);
});

test("GitHub Pages restoration preserves local paths and rejects external redirects", async () => {
  const { restoreLocalPath } = await import("../lib/navigation.mjs");
  const origin = "https://elena.shamraeva.co.uk";
  assert.equal(restoreLocalPath("/about?from=home#about", origin), "/about?from=home#about");
  assert.equal(restoreLocalPath("/resume?ghp-path=%2Fabout&x=1", origin), "/resume?x=1");
  for (const path of [null, "", "about", "https://example.com", "//example.com/path", "/\\example.com/path"]) {
    assert.equal(restoreLocalPath(path, origin), null, String(path));
  }
});

test("adapts static RSC MIME checks without accepting HTML fallbacks", async () => {
  const { githubPagesRsc } = await import("../lib/github-pages-rsc-plugin.mjs");
  const plugin = githubPagesRsc();
  const source = 'if (!type.startsWith("text/x-component")) return false; return type.startsWith("text/x-component");';
  const result = plugin.transform(source, "/node_modules/vinext/dist/server/app-browser-entry.js");
  const accepts = new Function("type", result.code);
  assert.equal(accepts("application/octet-stream"), true);
  assert.equal(accepts("text/x-component; charset=utf-8"), true);
  assert.equal(accepts("text/html"), false);
  assert.throws(() => plugin.transform("changed upstream", "/node_modules/vinext/dist/server/app-browser-entry.js"));
});

test("uses the exported homepage RSC filename and retains other route paths", async () => {
  const { githubPagesRsc } = await import("../lib/github-pages-rsc-plugin.mjs");
  const source = 'const beforeHash = href.split("#")[0]; const queryIndex = beforeHash.indexOf("?"); const pathname = queryIndex === -1 ? beforeHash : beforeHash.slice(0, queryIndex); return pathname;';
  const result = githubPagesRsc().transform(source, "/node_modules/vinext/dist/server/app-rsc-cache-busting.js");
  const route = new Function("href", result.code);
  assert.equal(route("/"), "/index");
  assert.equal(route("/about/?from=home"), "/about/");
  await access(new URL("../dist/client/index.rsc", import.meta.url));
});

test("keeps typography in normal case and the contact illustration in document flow", async () => {
  for (const path of ["", "/about", "/resume", "/blog"]) {
    assert.doesNotMatch(await render(path), /[\u2013\u2014]/);
  }
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.doesNotMatch(css, /text-transform:\s*uppercase/);
  const home = await render();
  assert.doesNotMatch(home, /welcome-sticker/);
  assert.match(home.split('<footer class="site-footer"')[1], /class="footer-character"/);
  const about = await render("/about");
  assert.match(about, /class="about-opening-lanyard"[^>]*><\/div>/);
});

test("versions static route payload requests across production deployments", async () => {
  const { githubPagesRsc } = await import("../lib/github-pages-rsc-plugin.mjs");
  const modulePath = new URL("../node_modules/vinext/dist/server/app-rsc-cache-busting.js", import.meta.url);
  const source = await readFile(modulePath, "utf8");
  const result = githubPagesRsc().transform(source, modulePath.pathname);
  assert.match(result.code, /url.searchParams.set\("__release",/);
});

test("sends contact notes directly and retains delivery failures", async () => {
  const html = await render();
  assert.match(html, /Or leave a note here/);
  const { submitContactNote } = await import("../lib/contact-note.mjs");
  let payload;
  await submitContactNote({message: "Portfolio feedback", email: "visitor@example.com"}, async (url, options) => {
    assert.match(url, /^https:\/\/formsubmit.co\/ajax\//);
    payload = JSON.parse(options.body);
    return {ok: true, json: async () => ({success: true})};
  });
  assert.equal(payload.message, "Portfolio feedback");
  assert.equal(payload._replyto, "visitor@example.com");
  await assert.rejects(submitContactNote({message: "   "}));
  await assert.rejects(submitContactNote({message: "Feedback"}, async () => ({ok: false})));
});

test("records the Zernote project as concluded in November 2026", async () => {
  const home = await render();
  const resume = await render("/resume");
  assert.match(home, /Startup project · concluded Nov 2026/);
  assert.doesNotMatch(home, /Active startup|Zernote is becoming/);
  assert.match(resume, /Feb 2026 - Nov 2026/);
  assert.match(resume, /English/);
  assert.doesNotMatch(resume, /Feb 2026 - Present/);
});





test("combines the AI, clay, handoff, research and UK story into one accessible section", async () => {
  const html = await render();
  assert.match(html, /Why work with me\?/);
  for (const id of ["foundation", "workflow", "handoff", "research", "uk"]) {
    assert.match(html, new RegExp(`id="why-me-tab-${id}"`));
    assert.match(html, new RegExp(`id="why-me-panel-${id}"`));
  }
  assert.match(html, /Codex, Claude, Cursor/);
  assert.match(html, /class="clay-media"/);
  assert.match(html, /junior or mid-level role/);
  assert.doesNotMatch(html, /class="ai-practice"|class="clay-section"/);
  assert.ok(html.indexOf('id="why-me-title"') < html.indexOf('id="work"'));
  assert.match(html, /application\/ld\+json/);
});


test("streams the unchanged physics binary instead of parsing base64 JS", async () => {
  const { rapierWasm } = await import("../lib/rapier-wasm-plugin.mjs");
  const { createRequire } = await import("node:module");
  const require = createRequire(import.meta.url);
  const entry = require.resolve("@dimforge/rapier3d-compat").replace(/rapier\.cjs$/, "rapier.mjs");
  const source = await readFile(entry, "utf8");
  const encoded = source.match(/lg\.toByteArray\("(AGFzb[A-Za-z0-9+/=]+)"\)/)[1];
  const transformed = rapierWasm().transform(source, entry).code;
  assert.doesNotMatch(transformed, /module_or_path:[^}]+}\.buffer/);
  assert.doesNotMatch(transformed, /lg\.toByteArray\("AGFzb/);
  const url = transformed.match(/fetch\("([^" ]+\.wasm)"\)/)[1];
  const bytes = await readFile(new URL(`../dist/client${url}`, import.meta.url));
  assert.deepEqual(bytes, Buffer.from(encoded, "base64"));
  assert.equal(WebAssembly.validate(bytes), true);
});

test("static route cache keys do not vary with irrelevant server headers", async () => {
  const { githubPagesRsc } = await import("../lib/github-pages-rsc-plugin.mjs");
  const file = new URL("../node_modules/vinext/dist/server/app-rsc-cache-busting.js", import.meta.url);
  const result = githubPagesRsc().transform(await readFile(file, "utf8"), file.pathname);
  assert.doesNotMatch(result.code, /setRscCacheBustingSearchParam\(url, await compute/);
  assert.match(result.code, /__release/);
});

test("never hides an entire route behind an entrance animation", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.doesNotMatch(css, /animation:\s*route-enter/);
});


test("uses direct HTML navigation without waiting for the RSC router", async () => {
  for (const route of ["", "/about", "/resume"]) {
    const html = await render(route);
    assert.match(html, /href="\/resume\/" data-static-navigation="true"/);
    assert.match(html, /href="\/about\/" data-static-navigation="true"/);
  }
  const source = await readFile(new URL("../app/components/StaticLink.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /next\/link|preventDefault|router\.push/);
  assert.match(source, /link.as = "document"/);
});

test("gates physics imports on desktop and hides the mobile card container", async () => {
  const component = await readFile(new URL("../app/components/AboutVisuals.tsx", import.meta.url), "utf8");
  assert.match(component, /return desktop \? <DesktopProfileCard \/> : null/);
  const warmup = await readFile(new URL("../lib/prewarm-about.ts", import.meta.url), "utf8");
  assert.match(warmup, /!window.matchMedia\("\(min-width: 761px\)"\).matches/);
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /@media \(max-width: 760px\)\s*{\s*\.about-opening-lanyard { display: none !important; }/);
});
