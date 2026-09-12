import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "") {
  const filePath = pathname ? `../dist/client${pathname}/index.html` : "../dist/client/index.html";
  return readFile(new URL(filePath, import.meta.url), "utf8");
}

test("renders the portfolio homepage and project imagery", async () => {
  const html = await render();
  assert.match(html, /Elena Shamraeva/);
  assert.match(html, /Available for work/);
  assert.match(html, /id="work"/);
  assert.match(html, /T-Bank Statist/);
  assert.match(html, /tbank-statist-hero\.png/);
  assert.match(html, /EHU Museums/);
  assert.match(html, /Zernote/);
  assert.match(html, /Whispers of the City/);
  assert.match(html, /TableQuest/);
  assert.match(html, /EHU IT Hub — Social/);
  assert.match(html, /EHU IT Hub — Landing/);
  assert.match(html, /EHU IT Hub — Portal/);
  assert.match(html, /Let&#x27;s chat/);
  assert.match(html, /LinkedIn/);
  assert.match(html, /Telegram/);
  assert.match(html, /WhatsApp/);
  assert.match(html, /href="\/about"/);
  assert.match(html, /href="\/resume"/);
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
  assert.doesNotMatch(about, /Product thinking,<br\/>with a visual point of view/);
  assert.doesNotMatch(about, /Visual designer/);
  assert.doesNotMatch(about, /Fascinated by logic, structure/);
  assert.match(resume, /Experience at a glance/);
  assert.match(resume, /User-centered product designer\. Data-driven, growth-focused\./);
  assert.match(resume, /Information architecture/);
  assert.match(resume, /Customer development/);
  assert.match(resume, /Workshop hosting/);
  assert.match(resume, /n\.knyshov@gmail\.com/);
  assert.doesNotMatch(resume, /Selected experience/);
  assert.doesNotMatch(resume, /Yandex Practicum/);
  assert.doesNotMatch(resume, /BA in Multimedia Design/);
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
