import { useEffect, useId, useRef, useState } from 'react';
import type { LanguageMode } from '../types';

type TweetWidgets = {
  createTweet: (id: string, container: HTMLElement, options: {
    lang: string; theme: 'light' | 'dark'; dnt: boolean; conversation: 'none'; align: 'center';
  }) => Promise<HTMLElement | undefined>;
};

declare global {
  interface Window {
    twttr?: { widgets?: TweetWidgets; ready?: (callback: () => void) => void };
  }
}

let widgetsPromise: Promise<TweetWidgets> | null = null;

/** One official script per page, shared by all lazy embeds and StrictMode mounts. */
function loadWidgets(): Promise<TweetWidgets> {
  if (window.twttr?.widgets?.createTweet) return Promise.resolve(window.twttr.widgets);
  if (widgetsPromise) return widgetsPromise;

  widgetsPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://platform.twitter.com/widgets.js"]');
    const script = existing || document.createElement('script');
    let settled = false;
    const cleanup = () => {
      clearTimeout(timeout);
      script.removeEventListener('load', ready);
      script.removeEventListener('error', failed);
    };
    const finish = () => {
      if (!settled && window.twttr?.widgets?.createTweet) {
        settled = true; cleanup(); resolve(window.twttr.widgets);
      }
    };
    const ready = () => {
      finish();
      if (!settled) window.twttr?.ready?.(finish);
    };
    const failed = () => {
      if (settled) return;
      settled = true; cleanup();
      if (!existing) script.remove();
      reject(new Error('X widgets could not be loaded'));
    };
    const timeout = window.setTimeout(failed, 15_000);
    script.addEventListener('load', ready);
    script.addEventListener('error', failed);
    if (!existing) {
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      document.head.append(script);
    }
    ready();
  });
  void widgetsPromise.catch(() => { widgetsPromise = null; });
  return widgetsPromise;
}

interface Props {
  tweetId: string;
  sourceUrl: string;
  authorName: string;
  lang: LanguageMode;
  theme: 'light' | 'dark';
  compact?: boolean;
}

export function TweetEmbed({ tweetId, sourceUrl, authorName, lang, theme, compact = true }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const dialogTitle = useId();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded || !dialog.current) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => { element.close(); document.body.style.overflow = previousOverflow; };
  }, [expanded]);
  const [status, setStatus] = useState<'waiting' | 'loading' | 'ready' | 'error'>('waiting');

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let active = true;
    let started = false;
    let finished = false;
    let timer: number | undefined;
    // Each effect gets a separate target so late callbacks cannot touch its successor.
    const target = document.createElement('div');
    container.replaceChildren(target);
    setStatus('waiting');

    const fail = () => {
      if (!active || finished) return;
      finished = true;
      clearTimeout(timer);
      target.remove();
      setStatus('error');
    };
    const start = () => {
      if (started || !active) return;
      started = true;
      setStatus('loading');
      timer = window.setTimeout(fail, 25_000);
      void loadWidgets().then(widgets => {
        if (!active || finished) return;
        return widgets.createTweet(tweetId, target, {
          lang: lang === 'zh' ? 'zh-cn' : 'en', theme, dnt: true, conversation: 'none', align: 'center',
        });
      }).then(element => {
        if (!active || finished) { target.remove(); return; }
        if (!element) { fail(); return; }
        finished = true;
        clearTimeout(timer);
        setStatus('ready');
      }).catch(fail);
    };
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { observer?.disconnect(); start(); }
    }, { rootMargin: '240px 0px' }) : null;
    if (observer) observer.observe(container); else start();

    return () => {
      active = false;
      clearTimeout(timer);
      observer?.disconnect();
      target.remove();
    };
  }, [tweetId, lang, theme]);

  return <>
    <section className={`tweet-embed tweet-embed-${status} ${compact ? 'tweet-embed-compact' : 'tweet-embed-full'}`} aria-label={lang === 'en' ? `Original X post by ${authorName}` : `${authorName} 的 X 原帖`}>
      <div className="tweet-preview">
        <div ref={host} className="tweet-embed-host" aria-busy={status === 'loading'} />
        {status !== 'ready' && <p className="tweet-embed-status" role="status">{status === 'error'
          ? (lang === 'en' ? 'The X embed is unavailable. You can still open the original post.' : 'X 原帖暂时无法嵌入，可通过下方链接查看。')
          : (lang === 'en' ? 'Loading the original X post…' : '正在加载 X 原帖…')}</p>}
      </div>
      {compact && <button className="tweet-expand" aria-haspopup="dialog" onClick={() => setExpanded(true)}>{lang === 'en' ? 'Expand post' : '展开原帖'}</button>}
      <a className="tweet-source-link" href={sourceUrl} target="_blank" rel="noopener noreferrer">{lang === 'en' ? 'View original on X' : '在 X 查看原帖'}</a>
    </section>
    {compact && expanded && <dialog ref={dialog} className="tweet-dialog" aria-labelledby={dialogTitle} onCancel={() => setExpanded(false)} onClose={() => setExpanded(false)} onClick={event => { if (event.target === event.currentTarget) setExpanded(false); }}>
      <div className="tweet-dialog-content">
        <header className="tweet-dialog-header"><h2 id={dialogTitle}>{lang === 'en' ? 'Original post' : '完整原帖'}</h2><button className="tweet-expand" autoFocus onClick={() => setExpanded(false)}>{lang === 'en' ? 'Close' : '关闭'}</button></header>
        <TweetEmbed tweetId={tweetId} sourceUrl={sourceUrl} authorName={authorName} lang={lang} theme={theme} compact={false} />
      </div>
    </dialog>}
  </>;
}
