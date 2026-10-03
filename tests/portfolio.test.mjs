import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = new URL('../dist/', import.meta.url);
const html = (path) => readFile(new URL(path, root), 'utf8');

test('homepage describes completed thesis work and links to the reader', async () => {
  const page = await html('index.html');
  assert.match(page, /recently submitted my master/);
  assert.match(page, /Mar 2026 — Sep 2026/);
  assert.match(page, /Oct 2026 \(expected\)/);
  assert.match(page, /IT &amp; Automation Working Student/);
  assert.match(page, /href="\/thesis"/);
  assert.doesNotMatch(page, /Conducting Master|thesis collaboration|Feb 2026 — Present/);
});

test('thesis reader has an embedded PDF and visible fallback links', async () => {
  const page = await html('thesis/index.html');
  assert.match(page, /<object[^>]*data="\/files\/hakan-duran-masters-thesis.pdf#view=FitH"/);
  assert.match(page, /type="application\/pdf"/);
  assert.match(page, /aria-label="Master&#39;s thesis PDF viewer"|aria-label="Master's thesis PDF viewer"/);
  assert.match(page, /Open the PDF directly/);
  assert.match(page, /download="Hakan-Duran-Masters-Thesis.pdf"/);
  assert.match(page, /September 15, 2026/);
});

test('published PDFs are copied unchanged from public assets into the build', async () => {
  for (const name of ['cv.pdf', 'hakan-duran-masters-thesis.pdf']) {
    const source = await readFile(new URL(`../public/files/${name}`, import.meta.url));
    const built = await readFile(new URL(`files/${name}`, root));
    assert.equal(built.subarray(0, 5).toString(), '%PDF-');
    assert.deepEqual(built, source);
  }
});

test('blog preserves the old announcement and points to the completed work', async () => {
  const previous = await html('blog/starting-masters-thesis/index.html');
  const current = await html('blog/completed-agentic-llm-thesis/index.html');
  assert.match(previous, /Update — October 2026/);
  assert.match(previous, /href="\/thesis"/);
  assert.match(current, /href="\/thesis"/);
  assert.match(await html('rss.xml'), /completed-agentic-llm-thesis/);
  assert.match(await html('sitemap-0.xml'), /\/thesis/);
});

test('local page links and assets resolve, including the CV on every page', async () => {
  const entries = await readdir(root, { recursive: true });
  for (const entry of entries.filter((name) => name.endsWith('.html'))) {
    const page = await html(entry);
    assert.match(page, /href="\/files\/cv.pdf\?v=2026-09"[^>]*download="Hakan-Duran-CV.pdf"/);
    for (const match of page.matchAll(/(?:href|src|data)="(\/(?!\/)[^"]*)"/g)) {
      const pathname = decodeURIComponent(new URL(match[1], 'https://hakanduran.me').pathname);
      if (pathname === '/v1' || pathname.startsWith('/v1/')) continue;
      let target = resolve(root.pathname, `.${pathname}`);
      const info = await stat(target).catch(() => null);
      if (info?.isDirectory()) target = resolve(target, 'index.html');
      assert.ok(await stat(target).catch(() => null), `${entry}: missing ${pathname}`);
    }
  }
});
