import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Quote,
  Share2,
} from 'lucide-react';
import { formatBibTeX, formatGBT7714 } from '../data/theories';
import { safeExternalUrl } from '../services/theoryValidation';
import { UI_STRINGS } from '../i18n';
import { LanguageMode, TheoryEntry } from '../types';

interface Props {
  theory: TheoryEntry;
  allTheories: TheoryEntry[];
  lang: LanguageMode;
  onChangeLang: (l: LanguageMode) => void;
  onNavigateSlug: (slug: string) => void;
  onBackHome: () => void;
}

export const TheoryReader: React.FC<Props> = ({
  theory,
  allTheories,
  lang,
  onChangeLang,
  onNavigateSlug,
  onBackHome,
}) => {
  const [copiedType, setCopiedType] = useState<'bibtex' | 'gbt' | 'link' | null>(null);
  const [actionError, setActionError] = useState('');
  const [failedAvatarUrl, setFailedAvatarUrl] = useState<string | null>(null);
  const avatarUrl = safeExternalUrl(theory.author.avatarUrl);
  const authorInitials = theory.author.name.trim().split(/\s+/).slice(0, 2).map(part => Array.from(part)[0] || '').join('').toUpperCase() || Array.from(theory.author.handle)[0]?.toUpperCase() || '?';

  const idx = allTheories.findIndex((t) => t.slug === theory.slug);
  const prevTheory = idx > 0 ? allTheories[idx - 1] : null;
  const nextTheory = idx >= 0 && idx < allTheories.length - 1 ? allTheories[idx + 1] : null;

  const isEn = lang === 'en';

  const copyText = async (text: string, kind: 'bibtex' | 'gbt' | 'link') => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      setActionError('');
      setCopiedType(kind);
      setTimeout(() => setCopiedType(null), 2000);
    } catch { setActionError(isEn ? 'Copy failed. Select and copy the text manually.' : '复制失败，请手动选择并复制文本。'); }
  };

  const shareOnX = () => {
    const shareText = isEn
      ? `${theory.title.en} — source by @${theory.author.handle}\n\nSource archive and editorial reading notes in Big Theory Blog:`
      : `《${theory.title.zh}》 · 原帖作者 @${theory.author.handle}\n\n出处存档与编辑解读，收录于《大理论合订本 · Big Theory Blog》：`;
    const url = `${window.location.origin}${window.location.pathname}#/theory/${theory.slug}`;
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };


  return (
    <div className="reader-wrap">
      {actionError && <p role="alert" className="provenance-banner">{actionError}</p>}
      <div className="reader-topbar">
        <button type="button" className="btn btn-ghost btn-sm" onClick={onBackHome}>
          <ArrowLeft size={15} />
          {isEn ? 'Back to Canonical Corpus' : '返回大理论总库'}
        </button>

        <div className="lang-tabs" role="group" aria-label={isEn ? 'Reader language' : '阅读语言'}>
          <button
            type="button"
            className={`lang-tab ${lang === 'zh' ? 'active' : ''}`}
            aria-pressed={lang === 'zh'}
            onClick={() => onChangeLang('zh')}
          >
            中文
          </button>
          <button
            type="button"
            className={`lang-tab ${lang === 'en' ? 'active' : ''}`}
            aria-pressed={lang === 'en'}
            onClick={() => onChangeLang('en')}
          >
            English
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
          <button type="button" className="chip-btn" onClick={shareOnX}>
            <Share2 size={14} />
            {isEn ? 'Post to X' : '转发到 X'}
          </button>
        </div>
      </div>

      <article className={`monograph-sheet statement-doc ${isEn ? 'en-typo' : 'zh-typo'}`}>
        <header className="doc-head">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span className="catalog-code">{theory.catalogCode} · CANONICAL MONOGRAPH</span>
          </div>

          <h1>
            {isEn ? theory.title.en : theory.title.zh}
          </h1>
          <p className="subtitle" style={{ textAlign: 'left', marginTop: '0.55rem' }}>
            {isEn ? theory.subtitle.en : theory.subtitle.zh}
          </p>

          {/* Provenance & Source Card */}
          <div className="provenance-banner" style={{ fontFamily: 'var(--sans)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                {avatarUrl && avatarUrl !== failedAvatarUrl ? (
                  <img
                    src={avatarUrl}
                    loading="lazy"
                    decoding="async"
                    width={40}
                    height={40}
                    onError={() => setFailedAvatarUrl(avatarUrl)}
                    alt={theory.author.name}
                    className="author-avatar"
                    style={{ width: '2.5rem', height: '2.5rem' }}
                  />
                ) : (
                  <span className="author-avatar" role="img" aria-label={theory.author.name} style={{ width: '2.5rem', height: '2.5rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {authorInitials}
                  </span>
                )}
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.96rem', color: 'var(--ink)' }}>
                    {theory.author.name}{' '}
                    <a
                      href={safeExternalUrl(theory.author.profileUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontFamily: 'var(--mono)', fontSize: '0.84rem' }}
                    >
                      @{theory.author.handle}
                    </a>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
                    {isEn ? theory.author.affiliation.en : theory.author.affiliation.zh} ·{' '}
                    {theory.source.publishedDateDisplay}
                  </div>
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', alignItems: 'flex-end' }}>
              <a
                href={safeExternalUrl(theory.source.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                {isEn ? 'Original source' : '查看原始出处'}
                <ExternalLink size={14} />
              </a>
              <button
                type="button"
                className="chip-btn"
                onClick={() =>
                  copyText(
                    `${window.location.origin}${window.location.pathname}#/theory/${theory.slug}`,
                    'link'
                  )
                }
              >
                {copiedType === 'link' ? <Check size={13} /> : <Copy size={13} />}
                {copiedType === 'link'
                  ? isEn
                    ? 'Permalink Copied'
                    : '永久链接已复制'
                  : isEn
                  ? 'Copy Blog Permalink'
                  : '复制本站存档链接'}
              </button>
            </div>
          </div>

          <div className="axiom-strip" style={{ fontSize: '0.86rem', padding: '0.75rem 1rem' }}>
            <strong style={{ color: 'var(--accent)', marginRight: '0.6rem' }}>
              {isEn ? 'FORMAL AXIOM:' : '核心公理:'}
            </strong>
            {theory.axiomFormula}
          </div>
        </header>

        {/* Section I: Verbatim Archived Primary Full Text */}
        <h2>{isEn ? 'I   Archived Text · Editorial English Translation' : '一、原文存档与英文编辑译本'}</h2>
        <p className="section-desc">{isEn ? 'English passages are editorial translations, not the author’s original words. Axioms and corollaries below are editorial interpretations.' : '英文为编辑译本，并非作者原话；下方公理与推论为编辑解读。'}</p>

        <div>
          {(isEn ? theory.fullTextParagraphs.en : theory.fullTextParagraphs.zh).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Quoted Catalyst Origin if present (e.g. 大粉理论) */}
        {theory.quotedOrigin && (
          <div className="quoted-origin-card" style={{ fontFamily: 'var(--sans)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--warn)' }}>
                <Quote size={14} style={{ verticalAlign: '-2px', marginRight: 5 }} />
                {isEn ? theory.quotedOrigin.caption.en : theory.quotedOrigin.caption.zh}
              </span>
              <a
                href={safeExternalUrl(theory.quotedOrigin.url)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)' }}
              >
                x.com/{theory.quotedOrigin.authorHandle} ↗
              </a>
            </div>
            <pre
              style={{
                margin: 0,
                whiteSpace: 'pre-wrap',
                fontFamily: 'var(--serif)',
                fontSize: '1.02rem',
                lineHeight: 1.75,
                color: 'var(--ink)',
              }}
            >
              {isEn ? theory.quotedOrigin.extractedText.en : theory.quotedOrigin.extractedText.zh}
            </pre>
          </div>
        )}

        {/* Section II: Formal Axiomatic Deconstruction & Corollaries */}
        <h2>{isEn ? 'II   Editorial Analysis & Corollaries' : '二、编辑解读与推论'}</h2>
        <p style={{ color: 'var(--ink-soft)' }}>
          {isEn ? theory.axiomSummary.en : theory.axiomSummary.zh}
        </p>

        {theory.corollaries.length > 0 && (
          <ol className="points">
            {theory.corollaries.map((c, i) => (
              <li key={i}>
                <strong>{isEn ? c.title.en : c.title.zh}</strong>
                {isEn ? c.detail.en : c.detail.zh}
              </li>
            ))}
          </ol>
        )}

        {/* Section III: Intellectual Lineage & Editorial Peer Review */}
        <h2>{isEn ? 'III   Intellectual Lineage & Editorial Review' : '三、学派渊源考据与审稿委员会按语'}</h2>
        <p>{isEn ? theory.lineageAndContext.en : theory.lineageAndContext.zh}</p>
        <p className="closing">{isEn ? theory.peerReviewNote.en : theory.peerReviewNote.zh}</p>

        {/* Section IV: Academic Citation Box */}
        <div style={{ marginTop: '2.25rem', paddingTop: '1.5rem', borderTop: '1px solid var(--line)', fontFamily: 'var(--sans)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <strong style={{ fontSize: '0.9rem' }}>
              {isEn ? 'Cite This Theory (BibTeX / GB/T 7714)' : '学术引用格式 (欢迎写入论文致谢或 Rebuttal)'}
            </strong>
            <div style={{ display: 'flex', gap: '0.45rem' }}>
              <button
                type="button"
                className="chip-btn"
                onClick={() => copyText(formatBibTeX(theory), 'bibtex')}
              >
                {copiedType === 'bibtex' ? <Check size={13} /> : <Copy size={13} />}
                {copiedType === 'bibtex' ? 'Copied BibTeX!' : 'Copy BibTeX'}
              </button>
              <button
                type="button"
                className="chip-btn"
                onClick={() => copyText(formatGBT7714(theory), 'gbt')}
              >
                {copiedType === 'gbt' ? <Check size={13} /> : <Copy size={13} />}
                {copiedType === 'gbt' ? '已复制国标引用' : '复制 GB/T 7714'}
              </button>
            </div>
          </div>
          <pre className="citation-pre">{formatBibTeX(theory)}</pre>
        </div>
      </article>

      <div className="monograph-sheet" style={{ marginTop: '1.5rem', padding: '1.65rem 2rem' }}>
        <h2>{isEn ? 'Contribute a correction or interpretation' : '补充原文、更正与解读'}</h2>
        <p>{isEn ? 'Propose changes through a pull request. Sources and editorial changes are reviewed together in the repository.' : '通过 Pull Request 投稿；原始出处、正文与编辑修改在仓库中一并审阅。'}</p>
        <a href={`${UI_STRINGS.githubRepoUrl}/pulls`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
          <ExternalLink size={14} />
          {isEn ? 'View pull requests and discussion' : '查看 Pull Requests 与讨论'}
        </a>
      </div>

      {/* Prev / Next Monograph Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
        {prevTheory ? (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => onNavigateSlug(prevTheory.slug)}
          >
            <ArrowLeft size={15} />
            {isEn ? prevTheory.title.en : prevTheory.title.zh}
          </button>
        ) : (
          <span />
        )}
        {nextTheory && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => onNavigateSlug(nextTheory.slug)}
          >
            {isEn ? nextTheory.title.en : nextTheory.title.zh}
            <ArrowRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
};
