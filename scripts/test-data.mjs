import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const temp = await mkdtemp(join(tmpdir(), 'big-blog-data-'));
try {
  await build({ stdin: { contents: `export * from './src/services/theoryValidation'; export {CANONICAL_THEORIES} from './src/data/theories';`, resolveDir: process.cwd() }, outfile: join(temp, 'module.mjs'), bundle: true, platform: 'node', format: 'esm' });
  const { CANONICAL_THEORIES, isTheoryEntry, safeExternalUrl } = await import(pathToFileURL(join(temp, 'module.mjs')));
  const theory = CANONICAL_THEORIES[0];
  for (const entry of CANONICAL_THEORIES) assert(isTheoryEntry(entry), `Invalid canonical entry: ${entry.slug}`);
  for (const value of [null, [], {}, { ...theory, fullTextParagraphs: { zh: null, en: [] } }, { ...theory, slug: '../unsafe' }, { ...theory, category: 'unknown' }, { ...theory, coordinates: { pragmatism: Infinity, shortDuration: 0 } }, { ...theory, coordinates: { pragmatism: 101, shortDuration: 0 } }, { ...theory, metrics: { ...theory.metrics, likes: -1 } }, { ...theory, corollaries: [{ title: {} }] }]) assert(!isTheoryEntry(value), 'Malformed theory must be rejected');
  for (const unsafe of ['javascript:alert(1)', 'data:text/html,unsafe', 'https://evil.test@x.com', '//example.test', '/relative']) {
    assert.equal(safeExternalUrl(unsafe), undefined);
    assert(!isTheoryEntry({ ...theory, source: { ...theory.source, url: unsafe } }));
    assert(!isTheoryEntry({ ...theory, author: { ...theory.author, profileUrl: unsafe } }));
    assert(!isTheoryEntry({ ...theory, author: { ...theory.author, avatarUrl: unsafe } }));
  }
  assert.equal(safeExternalUrl('https://x.com/author'), 'https://x.com/author');
  console.log(`Data checks passed: ${CANONICAL_THEORIES.length} canonical entries, malformed shape rejection, safe external source/profile/image URLs.`);
} finally { await rm(temp, { recursive: true, force: true }); }
