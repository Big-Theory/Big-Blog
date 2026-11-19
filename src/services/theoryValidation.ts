import { TheoryEntry } from '../types';

const object = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const string = (v: unknown): v is string => typeof v === 'string';
const strings = (v: unknown): v is string[] => Array.isArray(v) && v.every(string);
const bilingual = (v: unknown): boolean => object(v) && string(v.zh) && string(v.en);
const finite = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
const count = (v: unknown): boolean => finite(v) && v >= 0;
const slug = (v: unknown): v is string => string(v) && /^[a-z0-9][a-z0-9-]*$/.test(v);

export function safeExternalUrl(value: unknown): string | undefined {
  if (!string(value)) return undefined;
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.href : undefined;
  } catch { return undefined; }
}

export function isTheoryEntry(v: unknown): v is TheoryEntry {
  if (!object(v) || !slug(v.slug) || !['synthesis', 'paradigm', 'career', 'attention', 'labor', 'community'].includes(String(v.category))) return false;
  if (!['id', 'catalogCode', 'axiomFormula', 'citationKey'].every(k => string(v[k]))) return false;
  if (!['title', 'subtitle', 'axiomSummary', 'highlightQuote', 'lineageAndContext', 'peerReviewNote'].every(k => bilingual(v[k]))) return false;
  if (!object(v.fullTextParagraphs) || !strings(v.fullTextParagraphs.zh) || !strings(v.fullTextParagraphs.en)) return false;
  if (!object(v.tags) || !strings(v.tags.zh) || !strings(v.tags.en)) return false;
  if (!Array.isArray(v.corollaries) || !v.corollaries.every(c => object(c) && bilingual(c.title) && bilingual(c.detail))) return false;
  const a = v.author, m = v.metrics, source = v.source, c = v.coordinates;
  if (!object(a) || !string(a.name) || !string(a.handle) || !bilingual(a.affiliation) || !safeExternalUrl(a.profileUrl)) return false;
  if (a.avatarUrl !== undefined && !safeExternalUrl(a.avatarUrl)) return false;
  if (a.website !== undefined && !safeExternalUrl(a.website)) return false;
  if (!object(m) || !['likes', 'bookmarks', 'views', 'retweets', 'replies', 'quotes'].every(k => count(m[k]))) return false;
  if (!object(source) || !['X', 'Big-Blog Original'].includes(String(source.platform)) || !safeExternalUrl(source.url) || !string(source.publishedAt) || !string(source.publishedDateDisplay) || typeof source.verifiedMinLikes20 !== 'boolean') return false;
  if (!object(c) || !finite(c.pragmatism) || !finite(c.shortDuration) || Math.abs(c.pragmatism) > 100 || Math.abs(c.shortDuration) > 100) return false;
  if (v.quotedOrigin !== undefined) {
    const q = v.quotedOrigin;
    if (!object(q) || !['id', 'authorName', 'authorHandle'].every(k => string(q[k])) || !safeExternalUrl(q.url) || !count(q.likes) || !count(q.views) || !bilingual(q.caption) || !bilingual(q.extractedText)) return false;
  }
  return true;
}
