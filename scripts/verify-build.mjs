import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import { build } from 'esbuild';
import { loadCatalog, qualifiedSource, normalizeTweetUrl } from './build-catalog.mjs';

const read = path => readFile(path, 'utf8');
const compiled = await build({ entryPoints: ['src/data/theories.ts'], bundle: true, write: false, platform: 'node', format: 'esm' });
const { CANONICAL_THEORIES: theories } = await import(`data:text/javascript;base64,${Buffer.from(compiled.outputFiles[0].text).toString('base64')}`);
const archive = JSON.parse(await read('data/source-evidence.json'));
const catalog = JSON.parse(await read('dist/api/tweets.json'));
assert.deepEqual(catalog, await loadCatalog(), 'Built catalog differs from repository inputs');
assert.deepEqual(Object.keys(catalog), ['posts']);
assert.equal(new Set(catalog.posts.map(post => post.id)).size, catalog.posts.length);
for (const post of catalog.posts) {
  assert.deepEqual(Object.keys(post), ['id', 'url', 'searchText']);
  assert.equal(normalizeTweetUrl(post.url).id, post.id);
  assert.equal(typeof post.searchText, 'string');
  assert(post.searchText.trim());
}
assert.deepEqual((await readdir('dist/api')).sort(), ['tweets.json'], 'Runtime API directory must contain only the lean tweet catalog');
for (const privatePath of ['dist/data', 'dist/source-evidence.json', 'dist/discovery-seeds.json']) {
  await assert.rejects(access(privatePath), { code: 'ENOENT' });
}
assert(theories.length > 0);
assert.equal(new Set(theories.map(theory => theory.slug)).size, theories.length);
assert.equal(new Set(archive.posts.map(post => post.id)).size, archive.posts.length);
assert.equal(archive.total_verified_posts, archive.posts.filter(post => post.metrics.likes >= 20 && post.current_threshold_met !== false).length);
assert.equal(archive.total_theory_posts, archive.posts.filter(qualifiedSource).length);
assert.equal(archive.target_met, archive.total_theory_posts >= archive.target_count);
const index = await read('dist/index.html');
for (const [, asset] of index.matchAll(/(?:src|href)="\.\/(assets\/[^\"]+)"/g)) await access(`dist/${asset}`);
for (const theory of theories) {
  assert(theory.fullTextParagraphs.zh.length && theory.fullTextParagraphs.en.length);
  const source = archive.posts.find(post => post.id === theory.source.tweetId);
  assert(source, `Missing original: ${theory.slug}`);
  assert(source.metrics.likes >= 20);
  assert.equal(theory.fullTextParagraphs.zh.join('\n\n'), source.text.trim(), `Original text differs: ${theory.slug}`);
  const html = await read(`dist/theory/${theory.slug}/index.html`);
  assert(html.includes('<link rel="canonical"'));
  assert(html.includes('<article>'));
  assert(!html.includes('src="./assets/'));
  assert(html.includes(`#/theory/${theory.slug}`));
}
for (const name of ['rss.xml', 'sitemap.xml', '404.html', 'robots.txt']) assert((await read(`dist/${name}`)).length);
console.log(`Verified ${catalog.posts.length} lean tweet entries, ${theories.length} bilingual pages, repository-only source evidence, assets and SEO routes.`);
