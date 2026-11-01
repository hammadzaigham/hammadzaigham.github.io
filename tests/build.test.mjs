import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import test from 'node:test';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const pages = ['index.html', 'cv/index.html'];
const htmlByPage = new Map(pages.map(page => [page, readFileSync(path.join(root, page), 'utf8')]));
const homepage = htmlByPage.get('index.html');
const canonical = new URL(homepage.match(/rel="canonical" href="([^"]+)"/)[1]);
const base = canonical.pathname;

for (const [page, html] of htmlByPage) {
  test(page + ': one main heading, unique IDs, and no source-download links', () => {
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length);
    assert.match(html, /id="main-content"/);
    assert.doesNotMatch(html, /href="[^"]*\.tex(?:"|\?)/);
    assert.doesNotMatch(html, /Verified Architecture|Peer-Reviewed Journal/);
  });
  test(page + ': internal links, anchors, scripts, and styles resolve at the configured base', () => {
    const url = new URL(page === 'index.html' ? base : base + 'cv/', canonical.origin);
    for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const href = match[1];
      assert.notEqual(href, '#', 'Empty anchor');
      const target = new URL(href.replaceAll('&amp;', '&'), url);
      if (target.origin !== canonical.origin || !['http:', 'https:'].includes(target.protocol)) continue;
      assert.ok(target.pathname.startsWith(base), href + ' leaves base ' + base);
      const relative = decodeURIComponent(target.pathname.slice(base.length));
      const file = relative.endsWith('/') || !relative ? relative + 'index.html' : relative;
      assert.ok(existsSync(path.join(root, file)), page + ': missing ' + href);
      if (target.hash && file.endsWith('.html')) {
        const targetHTML = readFileSync(path.join(root, file), 'utf8');
        assert.ok(targetHTML.includes('id="' + decodeURIComponent(target.hash.slice(1)) + '"'), 'Missing anchor ' + href);
      }
    }
  });
}
test('the rendered CV includes content and no publicly served TeX copy', () => {
  assert.match(htmlByPage.get('cv/index.html'), /proceedings forthcoming/);
  assert.doesNotMatch(htmlByPage.get('cv/index.html'), /Print \/ Save PDF|window\.print/);
  assert.equal(existsSync(path.join(root, 'cv.tex')), false);
});
