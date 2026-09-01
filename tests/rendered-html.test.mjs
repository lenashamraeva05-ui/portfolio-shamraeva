import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the portfolio homepage and project imagery", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
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
  assert.match(html, /href="\/blog"/);
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

  assert.equal(aboutResponse.status, 200);
  assert.equal(resumeResponse.status, 200);
  assert.equal(blogResponse.status, 200);

  const [about, resume, blog] = await Promise.all([
    aboutResponse.text(),
    resumeResponse.text(),
    blogResponse.text(),
  ]);

  assert.match(about, /Product thinking,<br\/>with a visual point of view/);
  assert.match(about, /Visual designer/);
  assert.match(about, /Fascinated by logic, structure/);
  assert.match(resume, /Experience at a glance/);
  assert.match(resume, /Selected experience/);
  assert.match(resume, /Yandex Practicum/);
  assert.match(resume, /BA in Multimedia Design/);
  assert.match(resume, /Research-led,<br\/>detail-focused/);
  assert.match(blog, /<h1>Blog<\/h1>/);
  assert.match(blog, /Design systems/);
  assert.match(blog, /How I turn messy interviews/);
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
