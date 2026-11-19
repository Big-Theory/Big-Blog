import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

export function normalizeTweetUrl(value) {
  assert.equal(typeof value, 'string', 'Tweet URL must be a string');
  const url = new URL(value);
  assert(url.protocol === 'https:' && !url.username && !url.password && !url.port,
    'Tweet URLs must use HTTPS without credentials or a port');
  assert(['x.com', 'www.x.com', 'twitter.com', 'www.twitter.com'].includes(url.hostname),
    'Tweet URL must point to X or Twitter');
  const match = url.pathname.match(/^\/([A-Za-z0-9_]+)\/status\/(\d+)\/?$/);
  assert(match && !url.search && !url.hash, 'Use a canonical /handle/status/id URL without query or fragment');
  return { id: match[2], url: `https://x.com/${match[1]}/status/${match[2]}`, handle: match[1] };
}

export function qualifiedSource(post) {
  return ['theory', 'discussion'].includes(post.kind)
    && post.metrics?.likes >= 20
    && post.current_threshold_met !== false
    && post.verification?.relevance !== 'keyword_candidate';
}

export function createCatalog(evidence, submissions = []) {
  assert(Array.isArray(evidence.posts), 'Source evidence must contain a posts array');
  assert(Array.isArray(submissions), 'data/submissions.json must be an array of X URLs');
  const posts = new Map();
  for (const source of evidence.posts.filter(qualifiedSource)) {
    const tweet = normalizeTweetUrl(source.url);
    assert.equal(tweet.id, String(source.id), 'Source ID must match its URL');
    const fields = [source.title?.zh, source.title?.en, source.summary?.zh, source.summary?.en,
      source.author?.name, source.author?.handle];
    assert(fields.every(value => typeof value === 'string' && value.trim()),
      `Missing bilingual title/summary or author metadata for ${tweet.id}`);
    assert(!posts.has(tweet.id), `Duplicate source ID: ${tweet.id}`);
    posts.set(tweet.id, { id: tweet.id, url: tweet.url, searchText: fields.join(' ').replace(/\s+/g, ' ').trim() });
  }
  for (const value of submissions) {
    const tweet = normalizeTweetUrl(value);
    if (!posts.has(tweet.id)) {
      posts.set(tweet.id, { id: tweet.id, url: tweet.url, searchText: `@${tweet.handle} ${tweet.id}` });
    }
  }
  return { posts: [...posts.values()].sort((a, b) => BigInt(a.id) > BigInt(b.id) ? -1 : 1) };
}

export async function loadCatalog() {
  const evidence = JSON.parse(await readFile('data/source-evidence.json', 'utf8'));
  let submissions = [];
  try { submissions = JSON.parse(await readFile('data/submissions.json', 'utf8')); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  return createCatalog(evidence, submissions);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const catalog = await loadCatalog();
  const content = `${JSON.stringify(catalog, null, 2)}\n`;
  if (process.argv.includes('--check')) {
    assert.equal(await readFile('public/api/tweets.json', 'utf8'), content,
      'Public tweet catalog is stale. Run npm run catalog.');
    console.log(`Verified lean catalog: ${catalog.posts.length} unique tweet links.`);
  } else {
    await mkdir('public/api', { recursive: true });
    await writeFile('public/api/tweets.json', content);
    console.log(`Generated lean catalog: ${catalog.posts.length} unique tweet links.`);
  }
}
