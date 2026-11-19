import { useEffect, useMemo, useState } from 'react';
import { GitPullRequest, Github, Moon, Search, Sun } from 'lucide-react';
import { CANONICAL_THEORIES } from './data/theories';
import { UI_STRINGS } from './i18n';
import { TheoryReader } from './components/TheoryReader';
import { TweetEmbed } from './components/TweetEmbed';
import type { LanguageMode } from './types';

interface TweetSource { id: string; url: string; searchText: string }

function readPreference(key: string, fallback: string) {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
}

export default function App() {
  const [lang, setLang] = useState<LanguageMode>(() => readPreference('bigblog_language', 'zh') === 'en' ? 'en' : 'zh');
  const [dark, setDark] = useState(() => readPreference('bigblog_theme', 'light') === 'dark');
  const [route, setRoute] = useState(location.hash);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('newest');
  const [tweets, setTweets] = useState<TweetSource[]>([]);
  const [feedStatus, setFeedStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const isEn = lang === 'en';
  const t = (zh: string, en: string) => isEn ? en : zh;

  useEffect(() => {
    const onHash = () => { setRoute(location.hash); window.scrollTo({ top: 0 }); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  useEffect(() => {
    document.documentElement.lang = isEn ? 'en' : 'zh-CN';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    try { localStorage.setItem('bigblog_language', lang); localStorage.setItem('bigblog_theme', dark ? 'dark' : 'light'); } catch { /* Preferences are optional. */ }
  }, [lang, dark, isEn]);
  useEffect(() => {
    const abort = new AbortController();
    fetch(new URL('api/tweets.json', document.baseURI), { signal: abort.signal })
      .then(response => { if (!response.ok) throw new Error('Feed unavailable'); return response.json(); })
      .then(data => {
        if (!Array.isArray(data.posts)) throw new Error('Invalid feed');
        const records = new Map<string, TweetSource>();
        for (const post of data.posts) {
          if (!post || typeof post.id !== 'string' || !/^\d+$/.test(post.id) || typeof post.url !== 'string') continue;
          const match = post.url.match(/^https:\/\/x\.com\/[A-Za-z0-9_]+\/status\/(\d+)$/);
          if (!match || match[1] !== post.id) continue;
          records.set(post.id, { id: post.id, url: post.url, searchText: typeof post.searchText === 'string' ? post.searchText : '' });
        }
        setTweets([...records.values()]); setFeedStatus('ready');
      }).catch(error => { if (error.name !== 'AbortError') setFeedStatus('error'); });
    return () => abort.abort();
  }, []);

  const filtered = useMemo(() => tweets.filter(tweet => `${tweet.searchText} ${tweet.url} ${tweet.id}`.toLowerCase().includes(query.trim().toLowerCase())).sort((a, b) => {
    const comparison = BigInt(a.id) < BigInt(b.id) ? -1 : BigInt(a.id) > BigInt(b.id) ? 1 : 0;
    return sort === 'oldest' ? comparison : -comparison;
  }), [tweets, query, sort]);
  const slug = route.startsWith('#/theory/') ? route.slice('#/theory/'.length) : '';
  const selected = CANONICAL_THEORIES.find(entry => entry.slug === slug);
  const view = route.replace(/^#\//, '') || 'home';
  const isHome = view === 'home' || view === 'corpus';
  const navigate = (next: string) => { location.hash = `/${next}`; };

  return <div className="site">
    <a className="skip-link" href="#main" onClick={event => { event.preventDefault(); document.getElementById('main')?.focus(); }}>{t('跳至正文', 'Skip to content')}</a>
    <header className="masthead">
      <a className="brand" href="#/home"><span className="brand-seal">大</span><span className="brand-mark">{t('大理论合订本', 'Big Theory Blog')}</span></a>
      <div className="header-tools">
        <div className="lang-tabs" role="group" aria-label={t('语言', 'Language')}>{(['zh', 'en'] as const).map(value => <button key={value} className={`lang-tab ${lang === value ? 'active' : ''}`} aria-pressed={lang === value} onClick={() => setLang(value)}>{value === 'zh' ? '中文' : 'EN'}</button>)}</div>
        <button className="icon-toggle" aria-label={t('切换深色模式', 'Toggle dark mode')} onClick={() => setDark(!dark)}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
        <a className="btn btn-primary header-contribute" href="#/submit"><GitPullRequest size={16} />{t('PR 投稿', 'Contribute')}</a>
      </div>
    </header>

    <main className="main-shell" id="main" tabIndex={-1}>
      {isHome && <>
        <section className="archive-intro"><p className="archive-lead">{t('收集简中科研社区的「大理论」原帖，支持搜索、排序与 PR 投稿。', 'Explore original “big theory” posts from the Chinese-speaking research community. Search, sort, or contribute a tweet through a PR.')}</p></section>
        <section className="archive-corpus" aria-label={t('推文合集', 'Tweet collection')}>
          <div className="corpus-controls"><label className="search-box"><Search size={18} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder={t('搜索推文或作者', 'Search tweets or authors')} aria-label={t('搜索推文或作者', 'Search tweets or authors')} /></label><label className="sort-control"><span>{t('排序', 'Sort')}</span><select className="sort-select" value={sort} onChange={event => setSort(event.target.value)}><option value="newest">{t('最新在前', 'Newest first')}</option><option value="oldest">{t('最早在前', 'Oldest first')}</option></select></label></div>
          <p className="result-count" aria-live="polite">{feedStatus === 'loading' ? t('正在加载合集…', 'Loading the collection…') : t(`${filtered.length} 条推文`, `${filtered.length} posts`)}</p>
          {feedStatus === 'error' && <p className="archive-notice" role="alert">{t('暂时无法读取合集，请稍后刷新页面。', 'The collection is unavailable. Please refresh the page shortly.')}</p>}
          <div className="theory-grid">{filtered.map(tweet => <article className="theory-card" key={tweet.id}><TweetEmbed tweetId={tweet.id} sourceUrl={tweet.url} authorName={`@${new URL(tweet.url).pathname.split('/')[1]}`} lang={lang} theme={dark ? 'dark' : 'light'} /></article>)}</div>
          {feedStatus === 'ready' && !filtered.length && <div className="empty-state"><Search size={30} /><h2>{t('没有找到匹配的推文', 'No matching posts')}</h2><p>{t('换一个关键词试试。', 'Try another keyword.')}</p><button className="btn btn-ghost" onClick={() => setQuery('')}>{t('清除搜索', 'Clear search')}</button></div>}
        </section>
      </>}
      {selected && <TheoryReader key={selected.slug} theory={selected} allTheories={CANONICAL_THEORIES} lang={lang} onChangeLang={setLang} onNavigateSlug={value => navigate(`theory/${value}`)} onBackHome={() => navigate('home')} />}
      {slug && !selected && <section className="section-block"><h1>{t('未找到这篇条目', 'Entry not found')}</h1><a href="#/home">{t('返回合订本', 'Back to the collection')}</a></section>}
      {view === 'submit' && <section className="section-block contribution-page"><p className="section-kicker">CONTRIBUTE VIA PULL REQUEST</p><h1 className="section-title">{t('投稿，只需要一条推文', 'Contribute a tweet')}</h1><p className="section-desc">{t('把原始推文链接加入仓库的投稿列表，提交 PR 即可。无需填写标题、摘要、标签或作者资料。', 'Add the original tweet URL to the repository’s submission list and open a PR. No title, summary, tags, or author profile required.')}</p><div className="contribution-actions"><a className="btn btn-primary" href={`${UI_STRINGS.githubRepoUrl}/compare`} target="_blank" rel="noopener noreferrer"><GitPullRequest size={17} />{t('提交 PR', 'Open a PR')}</a><a className="btn btn-ghost" href={`${UI_STRINGS.githubRepoUrl}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer">{t('投稿指南', 'Contribution guide')}</a><a className="btn btn-ghost" href={`${UI_STRINGS.githubRepoUrl}/blob/main/.agents/skills/submit-theory/SKILL.md`} target="_blank" rel="noopener noreferrer">{t('投稿 Skill', 'Contribution skill')}</a></div><p className="editorial-note">{t('让编码助手执行：', 'Ask your coding assistant:')} <code>{'$submit-theory <tweet URL>'}</code></p></section>}
      {!isHome && !slug && view !== 'submit' && <section className="section-block"><h1>{t('页面未找到', 'Page not found')}</h1><a href="#/home">{t('返回合订本', 'Back to the collection')}</a></section>}
    </main>
    <footer className="footer"><div className="footer-top"><a href="https://github.com/Big-Theory" target="_blank" rel="noopener noreferrer" className="organization-credit"><Github size={17} />Big Theory Organization</a><a href={`${UI_STRINGS.githubRepoUrl}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer">{t('参与编纂', 'Contribute')}</a></div><p>{t('本站原创编辑内容采用 ', 'Original editorial content is licensed under ')}<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>{t('。原始推文及所含媒体的权利归各原作者。', '. Original posts and their media remain the property of their respective authors.')}</p></footer>
  </div>;
}
