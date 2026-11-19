import { BilingualText, LanguageMode } from './types';

export function pickText(text: BilingualText, lang: LanguageMode): string {
  if (lang === 'en') return text.en;
  return text.zh;
}

export const UI_STRINGS = {
  githubRepoUrl: 'https://github.com/Big-Theory/Big-Blog',
};
