export type LanguageMode = 'zh' | 'en';

export type TheoryCategory =
  | 'synthesis'
  | 'paradigm'
  | 'career'
  | 'attention'
  | 'labor'
  | 'community';

export interface BilingualText {
  zh: string;
  en: string;
}

export interface TheoryAuthor {
  name: string;
  handle: string;
  profileUrl: string;
  affiliation: BilingualText;
  location?: string;
  website?: string;
  avatarUrl?: string;
  followers?: number;
}

export interface TheoryMetrics {
  likes: number;
  bookmarks: number;
  views: number;
  retweets: number;
  replies: number;
  quotes: number;
}

export interface QuotedOrigin {
  id: string;
  url: string;
  authorName: string;
  authorHandle: string;
  likes: number;
  views: number;
  caption: BilingualText;
  extractedText: BilingualText;
}

export interface TheoryCorollary {
  title: BilingualText;
  detail: BilingualText;
}

export interface TheoryCoordinates {
  /** -100 (Ivory-Tower Idealism / 象牙塔古典主义) to +100 (Cyber-Pragmatism / 赛博实用主义) */
  pragmatism: number;
  /** -100 (Long-Duration Compound / 长久期复利) to +100 (T+0 Mark-to-Market / 逐日盯市短久期) */
  shortDuration: number;
}

export interface TheoryEntry {
  id: string;
  slug: string;
  catalogCode: string;
  category: TheoryCategory;
  isCommunity?: boolean;
  isNativeBlogFirst?: boolean;
  title: BilingualText;
  subtitle: BilingualText;
  axiomFormula: string;
  axiomSummary: BilingualText;
  /** Verbatim archived paragraphs in zh and literary-academic translation in en */
  fullTextParagraphs: {
    zh: string[];
    en: string[];
  };
  highlightQuote: BilingualText;
  corollaries: TheoryCorollary[];
  lineageAndContext: BilingualText;
  peerReviewNote: BilingualText;
  tags: {
    zh: string[];
    en: string[];
  };
  source: {
    platform: 'X' | 'Big-Blog Original';
    tweetId?: string;
    url: string;
    publishedAt: string;
    publishedDateDisplay: string;
    verifiedMinLikes20: boolean;
  };
  author: TheoryAuthor;
  metrics: TheoryMetrics;
  quotedOrigin?: QuotedOrigin;
  coordinates: TheoryCoordinates;
  citationKey: string;
}
