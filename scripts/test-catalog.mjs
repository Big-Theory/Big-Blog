import assert from 'node:assert/strict';
import { createCatalog, normalizeTweetUrl } from './build-catalog.mjs';

const source = {
  id: '100', url: 'https://x.com/researcher/status/100', kind: 'theory', metrics: { likes: 20 },
  title: { zh: '理论', en: 'Theory' }, summary: { zh: '摘要', en: 'Summary' },
  author: { name: 'Researcher', handle: 'researcher', avatar_url: 'private-avatar' },
  text: 'RAW_TEXT_MUST_NOT_SHIP', tags: ['PRIVATE_TAG'],
};
const excluded = [
  { ...source, id: '101', kind: 'context' },
  { ...source, id: '102', verification: { relevance: 'keyword_candidate' } },
  { ...source, id: '103', current_threshold_met: false },
  { ...source, id: '104', metrics: { likes: 19 } },
];
const catalog = createCatalog({ posts: [source, ...excluded] }, [source.url, 'https://twitter.com/peer/status/200']);
assert.deepEqual(catalog.posts.map(p => p.id), ['200', '100']);
assert.deepEqual(Object.keys(catalog.posts[1]), ['id', 'url', 'searchText']);
assert.equal(catalog.posts[0].url, 'https://x.com/peer/status/200');
assert.equal(catalog.posts[1].searchText, '理论 Theory 摘要 Summary Researcher researcher');
assert(!JSON.stringify(catalog).includes('RAW_TEXT_MUST_NOT_SHIP'));
assert(!JSON.stringify(catalog).includes('PRIVATE_TAG'));
for (const bad of ['javascript:alert(1)', 'https://evil.test/u/status/123', 'https://a@x.com/u/status/123',
  'https://x.com/u/status/123?token=abc', 'https://x.com/u/status/123#fragment', 'https://x.com/u/status/not-an-id']) {
  assert.throws(() => normalizeTweetUrl(bad));
}
assert.throws(() => createCatalog({ posts: [source, source] }));
assert.throws(() => createCatalog({ posts: [source] }, {}));
console.log('Catalog checks passed: qualification, exact lean fields, URL validation, stable ordering and ID deduplication.');
