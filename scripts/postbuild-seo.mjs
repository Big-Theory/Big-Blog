import { build } from 'esbuild';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const result = await build({entryPoints: ['src/data/theories.ts'], bundle: true, write: false, platform: 'node', format: 'esm'});
const { CANONICAL_THEORIES: theories } = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
const site = new URL(process.env.SITE_URL || 'https://big-theory.github.io/Big-Blog/');
if (!['http:', 'https:'].includes(site.protocol)) throw new Error('SITE_URL must be an HTTP(S) URL');
site.pathname = site.pathname.replace(/\/?$/, '/');
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const base = await readFile('dist/index.html', 'utf8');
const urls = [site.href];
for (const t of theories) {
  if (!/^[a-z0-9-]+$/.test(t.slug)) throw new Error('Invalid slug');
  const canonical = new URL(`theory/${t.slug}/`, site).href;
  urls.push(canonical);
  const title = `${t.title.zh} · ${t.title.en}`;
  const article = `<article><h1>${esc(title)}</h1><p>${esc(t.author.name)} · ${esc(t.source.publishedDateDisplay)}</p><a href="${esc(t.source.url)}">Original source / 原始出处</a><h2>原文存档</h2>${t.fullTextParagraphs.zh.map(p => `<p>${esc(p)}</p>`).join('')}<h2>Editorial English translation</h2>${t.fullTextParagraphs.en.map(p => `<p>${esc(p)}</p>`).join('')}</article>`;
  let html = base.replace(/\.\/assets\//g, '../../assets/').replace(/\.\/favicon.svg/g, '../../favicon.svg').replace(/\.\/rss.xml/g, '../../rss.xml');
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta (?:property|name)="(?:og:[^"]+|twitter:[^"]+|description)"[^>]*>\s*/g, '')
    .replace('</head>', `<link rel="canonical" href="${esc(canonical)}"><meta name="description" content="${esc(t.axiomSummary.zh)}"><meta property="og:title" content="${esc(title)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:type" content="article"><meta property="og:description" content="${esc(t.axiomSummary.zh)}"><meta property="og:image" content="${esc(new URL('og-cover.svg', site).href)}"><meta name="twitter:card" content="summary"></head>`)
    .replace('<div id="root"></div>', `<div id="root">${article}</div><script>history.replaceState(null,'',${JSON.stringify(`${site.pathname}#/theory/${t.slug}`)});</script>`);
  await mkdir(`dist/theory/${t.slug}`, { recursive: true });
  await writeFile(`dist/theory/${t.slug}/index.html`, html);
}
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u => `<url><loc>${esc(u)}</loc></url>`).join('')}</urlset>`);
await writeFile('dist/rss.xml', `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>大理论合订本 · Big Theory Blog</title><link>${esc(site.href)}</link><description>Bilingual theory archive</description>${theories.map(t => `<item><title>${esc(t.title.zh)}</title><link>${esc(new URL(`theory/${t.slug}/`,site).href)}</link><guid>${esc(t.source.url)}</guid><description>${esc(t.axiomSummary.zh)}</description><pubDate>${new Date(t.source.publishedAt).toUTCString()}</pubDate></item>`).join('')}</channel></rss>`);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml',site).href}\n`);
await writeFile('dist/.nojekyll', '');
await writeFile('dist/404.html', base.replace(/\.\/(assets\/|favicon.svg|rss.xml|og-cover.svg)/g, `${site.pathname}$1`));
console.log(`Generated ${theories.length} full-text pages, RSS and sitemap.`);
