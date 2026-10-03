import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { siteData, type SiteContent } from './content';

const DRAFT_KEY = 'verzeri-site-draft-v1';

export function isSiteContent(value: unknown): value is SiteContent {
  if (!value || typeof value !== 'object') return false;
  const data = value as Record<string, unknown>;
  return !!data.profile && typeof data.profile === 'object' &&
    !!data.about && typeof data.about === 'object' &&
    typeof (data.profile as Record<string, unknown>).firstName === 'string' &&
    typeof (data.profile as Record<string, unknown>).mobile === 'string' &&
    Array.isArray((data.about as Record<string, unknown>).paragraphs) &&
    Array.isArray((data.about as Record<string, unknown>).missions) &&
    Array.isArray((data.about as Record<string, unknown>).highlights) &&
    ['steps', 'companies', 'gallery', 'faqs', 'marquee'].every(key => Array.isArray(data[key]));
}

export function normalizeContent(data: SiteContent): SiteContent {
  return {
    ...siteData,
    ...data,
    headings: { ...siteData.headings, ...data.headings },
    profile: { ...siteData.profile, ...data.profile },
    about: { ...siteData.about, ...data.about },
  };
}

function savedDraft(): SiteContent | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return isSiteContent(parsed) ? normalizeContent(parsed) : null;
  } catch {
    return null;
  }
}

type Store = {
  content: SiteContent;
  published: SiteContent;
  draft: boolean;
  update: (content: SiteContent) => void;
  clearDraft: () => void;
  refresh: () => Promise<void>;
};

const SiteContext = createContext<Store | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [published, setPublished] = useState<SiteContent>(siteData);
  const [content, setContent] = useState<SiteContent>(() => savedDraft() ?? siteData);
  const [draft, setDraft] = useState(() => !!savedDraft());

  const refresh = async () => {
    try {
      const response = await fetch(`/site-content.json?t=${Date.now()}`, { cache: 'no-store' });
      if (!response.ok) return;
      const parsed: unknown = await response.json();
      if (!isSiteContent(parsed)) return;
      const normalized = normalizeContent(parsed);
      setPublished(normalized);
      if (!savedDraft()) setContent(normalized);
    } catch {
      // The first deployment can use the built-in content before a file is published.
    }
  };

  useEffect(() => { void refresh(); }, []);

  const update = (next: SiteContent) => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(next));
    setContent(next);
    setDraft(true);
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    setContent(published);
    setDraft(false);
  };

  return <SiteContext.Provider value={{ content, published, draft, update, clearDraft, refresh }}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error('SiteProvider manquant');
  return context;
}