import html from '../index.html?raw';
import manifest from '../package.json?raw';
import tsconfig from '../tsconfig.json?raw';
import viteConfig from '../vite.config.ts?raw';
import guide from '../GUIDE-PUBLICATION.md?raw';

// Every source file is imported explicitly. import.meta.glob skipped the module that calls it,
// which produced a ZIP without src/exportProject.ts and broke the Vercel build.
import indexCss from './index.css?raw';
import mainTsx from './main.tsx?raw';
import appTsx from './App.tsx?raw';
import selfSource from './exportProject.ts?raw';
import viteEnv from './vite-env.d.ts?raw';
import cnSource from './utils/cn.ts?raw';
import openingStatus from './hooks/useOpeningStatus.ts?raw';
import contentSource from './data/content.ts?raw';
import siteStore from './data/siteStore.tsx?raw';

import adminPage from './components/AdminPage.tsx?raw';
import aboutSection from './components/AboutSection.tsx?raw';
import companiesSection from './components/CompaniesSection.tsx?raw';
import contactSection from './components/ContactSection.tsx?raw';
import dechetLabSection from './components/DechetLabSection.tsx?raw';
import fileDownloadButton from './components/FileDownloadButton.tsx?raw';
import footerSource from './components/Footer.tsx?raw';
import gallerySection from './components/GallerySection.tsx?raw';
import heroSource from './components/Hero.tsx?raw';
import navbarSource from './components/Navbar.tsx?raw';

const sources: Record<string, string> = {
  'src/index.css': indexCss,
  'src/main.tsx': mainTsx,
  'src/App.tsx': appTsx,
  'src/exportProject.ts': selfSource,
  'src/vite-env.d.ts': viteEnv,
  'src/utils/cn.ts': cnSource,
  'src/hooks/useOpeningStatus.ts': openingStatus,
  'src/data/content.ts': contentSource,
  'src/data/siteStore.tsx': siteStore,
  'src/components/AdminPage.tsx': adminPage,
  'src/components/AboutSection.tsx': aboutSection,
  'src/components/CompaniesSection.tsx': companiesSection,
  'src/components/ContactSection.tsx': contactSection,
  'src/components/DechetLabSection.tsx': dechetLabSection,
  'src/components/FileDownloadButton.tsx': fileDownloadButton,
  'src/components/Footer.tsx': footerSource,
  'src/components/GallerySection.tsx': gallerySection,
  'src/components/Hero.tsx': heroSource,
  'src/components/Navbar.tsx': navbarSource,
};

export type ProjectArchive = {
  url: string;
  name: string;
  missing: string[];
};

export async function downloadProject(): Promise<ProjectArchive> {
  const missing = Object.entries(sources)
    .filter(([, source]) => typeof source !== 'string' || source.length === 0)
    .map(([path]) => path);

  const { default: JSZip } = await import('jszip');
  const zip = new JSZip();
  const root = zip.folder('site-verzeri-mederic');
  if (!root) throw new Error('Impossible de creer le dossier ZIP.');

  root.file('index.html', html);
  root.file('package.json', manifest);
  root.file('tsconfig.json', tsconfig);
  root.file('vite.config.ts', viteConfig);
  root.file('GUIDE-PUBLICATION.md', guide);

  for (const [path, source] of Object.entries(sources)) {
    root.file(path, source);
  }

  if (missing.length > 0) {
    root.file('FICHIERS-MANQUANTS.txt', `Ces fichiers sont absents :\n\n${missing.join('\n')}`);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  return { url: URL.createObjectURL(blob), name: 'site-verzeri-mederic.zip', missing };
}
