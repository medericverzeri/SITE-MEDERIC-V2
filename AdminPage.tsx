import { useState, type ChangeEvent } from 'react';
import { ArrowLeft, ArrowDown, ArrowUp, Download, ExternalLink, ImagePlus, Plus, Save, Trash2, Upload } from 'lucide-react';
import { useSite, isSiteContent, normalizeContent } from '../data/siteStore';
import { siteData } from '../data/content';
import { downloadProject } from '../exportProject';

type Section = 'profile' | 'headings' | 'about' | 'steps' | 'companies' | 'gallery' | 'faqs' | 'marquee' | 'publication';
const sections: { id: Section; title: string }[] = [
  { id: 'profile', title: 'Identite et contact' },
  { id: 'headings', title: 'Titres des sections' },
  { id: 'about', title: 'A propos et missions' },
  { id: 'steps', title: 'Etapes de depot' },
  { id: 'companies', title: 'Entreprises' },
  { id: 'gallery', title: 'Photos et galerie' },
  { id: 'faqs', title: 'Questions frequentes' },
  { id: 'marquee', title: 'Bandeau defilant' },
  { id: 'publication', title: 'Publier et sauvegarder' },
];

const labels: Record<string, string> = {
  workplaceTitle: 'Titre du lieu', workplaceDescription: 'Description du lieu',
  companiesTitle: 'Titre des entreprises', companiesDescription: 'Description des entreprises',
  galleryTitle: 'Titre de la galerie', galleryDescription: 'Introduction galerie',
  contactTitle: 'Titre du contact', contactDescription: 'Introduction contact',
  firstName: 'Prenom', lastName: 'Nom', role: 'Fonction', subrole: 'Sous-titre',
  employer: 'Structure', parentGroup: 'Groupe', intro: 'Presentation', email: 'Adresse e-mail',
  mobile: 'Premier mobile', mobileRaw: 'Premier mobile (lien international)',
  secondMobile: 'Deuxieme mobile', secondMobileRaw: 'Deuxieme mobile (lien international)',
  desk: 'Standard', deskRaw: 'Standard (lien international)', address: 'Adresse',
  city: 'Ville', postalCode: 'Code postal', site: 'Site de la structure', groupSite: 'Site du groupe',
  hours: 'Horaires complets (fiche contact)', openDays: 'Jours affiches', scheduleNote: 'Heures affichees',
  openingWeekdays: 'Jours reels pour le statut (lundi, mercredi, vendredi)', morningStart: 'Ouverture matin (HH:MM)',
  morningEnd: 'Fermeture matin (HH:MM)', afternoonStart: 'Ouverture apres-midi (HH:MM)', afternoonEnd: 'Fermeture apres-midi (HH:MM)',
  portrait: 'Photo de profil (URL)', portraitFallback: 'Photo de secours (URL)',
  title: 'Titre', subtitle: 'Sous-titre', lead: 'Introduction', number: 'Numero',
  description: 'Description', n: 'Numero', text: 'Texte', badge: 'Libelle',
  id: 'Identifiant', group: 'Categorie', category: 'Activite', name: 'Nom', place: 'Lieu',
  href: 'Lien du site (URL)', logo: 'Logo (URL)', fallbackLogo: 'Logo de secours (URL)',
  src: 'Photo (URL)', fallbackSrc: 'Photo de secours (URL)', alt: 'Description de la photo',
  caption: 'Legende', tag: 'Categorie', wide: 'Photo large', label: 'Libelle', value: 'Valeur', desc: 'Detail',
};

function clone<T>(item: T): T { return JSON.parse(JSON.stringify(item)) as T; }
function toBase64(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  return btoa(binary);
}
function download(name: string, body: string) {
  const url = URL.createObjectURL(new Blob([body], { type: 'application/json;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

const inputClass = 'w-full rounded-lg border border-[#12241d]/15 bg-white px-3 py-2 text-sm text-[#12241d] focus:outline-none focus:border-[#0d9488]';
const buttonClass = 'inline-flex items-center gap-2 rounded-lg bg-[#12241d] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0d9488] transition-colors disabled:opacity-50';

export function AdminPage() {
  const { content, published, draft, update, clearDraft, refresh } = useSite();
  const [section, setSection] = useState<Section>('profile');
  const [repository, setRepository] = useState(() => localStorage.getItem('verzeri-github-repo') ?? '');
  const [branch, setBranch] = useState(() => localStorage.getItem('verzeri-github-branch') ?? 'main');
  const [token, setToken] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  // All content edits are saved as a private browser draft immediately.
  const change = (path: (string | number)[], value: unknown) => {
    const next = clone(content);
    let target: any = next;
    for (let i = 0; i < path.length - 1; i++) target = target[path[i]];
    target[path[path.length - 1]] = value;
    if (path[0] === 'gallery' && path[2] === 'src') next.gallery[Number(path[1])].fallbackSrc = String(value);
    if (path[0] === 'profile' && path[1] === 'portrait') next.profile.portraitFallback = String(value);
    if (path[0] === 'profile' && ['mobile', 'secondMobile', 'desk'].includes(String(path[1]))) {
      const number = String(value).replace(/\D/g, '');
      const raw = number.startsWith('0') && number.length === 10 ? `+33${number.slice(1)}` : `+${number}`;
      const key = path[1] === 'mobile' ? 'mobileRaw' : path[1] === 'desk' ? 'deskRaw' : 'secondMobileRaw';
      (next.profile as unknown as Record<string, string>)[key] = raw;
    }
    update(next);
    setMessage('Brouillon enregistre dans ce navigateur. Publiez pour le rendre visible a tous.');
  };

  const collection = (path: (string | number)[], action: 'add' | 'delete' | 'up' | 'down', index = 0) => {
    const next = clone(content);
    let target: any = next;
    for (const key of path) target = target[key];
    if (!Array.isArray(target)) return;
    if (action === 'add') {
      let defaults: any = siteData;
      for (const key of path) defaults = defaults[key];
      const template = target[0] ?? defaults[0];
      const item = template === undefined ? '' : typeof template === 'string' ? '' : clone(template);
      if (typeof item === 'object' && item !== null) {
        Object.keys(item).forEach(key => {
          if (typeof item[key] === 'string') item[key] = key === 'id' ? `item-${Date.now()}` : '';
        });
      }
      target.push(item);
    } else if (action === 'delete') target.splice(index, 1);
    else {
      const other = index + (action === 'up' ? -1 : 1);
      if (other < 0 || other >= target.length) return;
      [target[index], target[other]] = [target[other], target[index]];
    }
    update(next);
    setMessage('Brouillon enregistre dans ce navigateur. Publiez pour le rendre visible a tous.');
  };

  const field = (path: (string | number)[], key: string, value: unknown) => {
    if (key === 'mobileRaw' || key === 'secondMobileRaw' || key === 'deskRaw') return null;
    const label = labels[key] ?? key;
    if (typeof value === 'boolean') return (
      <label key={key} className="flex items-center gap-2 text-sm font-medium">
        <input type="checkbox" checked={value} onChange={e => change([...path, key], e.target.checked)} /> {label}
      </label>
    );
    if (typeof value !== 'string') return null;
    const multiline = ['intro', 'text', 'description', 'lead', 'caption'].includes(key) || key.endsWith('Description');
    const options = key === 'group' ? ['Siège', 'Services', 'Formation', 'Réemploi', 'Matériaux'] :
      key === 'tag' ? ["Déchèt'Lab", 'Dépose & Tri', 'Économie Circulaire', 'Matériaux'] : null;
    return (
      <label key={key} className="block space-y-1 text-sm font-medium text-[#12241d]">
        <span>{label}</span>
        {key === 'group' || key === 'tag' ? (
          <select className={inputClass} value={value} onChange={e => change([...path, key], e.target.value)}>
            <option value={value}>{value}</option>
            {options?.filter(item => item !== value).map(item => <option key={item} value={item}>{item}</option>)}
          </select>
        ) : multiline ? (
          <textarea className={inputClass} rows={3} value={value} onChange={e => change([...path, key], e.target.value)} />
        ) : (
          <input className={inputClass} type={key === 'email' ? 'email' : 'text'} value={value} onChange={e => change([...path, key], e.target.value)} />
        )}
      </label>
    );
  };

  const objectFields = (obj: Record<string, unknown>, path: (string | number)[]) => (
    <div className="grid gap-4 sm:grid-cols-2">
      {Object.entries(obj).map(([key, value]) => field(path, key, value))}
    </div>
  );

  const list = (items: unknown[], path: (string | number)[], singular: string) => (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="rounded-xl border border-[#12241d]/10 bg-white p-5">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h3 className="font-heading font-bold">{singular} {index + 1}</h3>
            <div className="flex gap-1">
              <button title="Monter" aria-label="Monter" onClick={() => collection(path, 'up', index)} disabled={index === 0} className="p-2 disabled:opacity-30"><ArrowUp size={16}/></button>
              <button title="Descendre" aria-label="Descendre" onClick={() => collection(path, 'down', index)} disabled={index === items.length - 1} className="p-2 disabled:opacity-30"><ArrowDown size={16}/></button>
              <button title="Supprimer" aria-label="Supprimer" onClick={() => { if (confirm(`Supprimer ${singular.toLowerCase()} ${index + 1} ?`)) collection(path, 'delete', index); }} className="p-2 text-red-700"><Trash2 size={16}/></button>
            </div>
          </div>
          {typeof item === 'string' ? <textarea className={inputClass} rows={2} value={item} onChange={e => change([...path, index], e.target.value)} /> :
            objectFields(item as Record<string, unknown>, [...path, index])}
        </div>
      ))}
      <button className={buttonClass} onClick={() => collection(path, 'add')}><Plus size={16} /> Ajouter {singular.toLowerCase()}</button>
    </div>
  );

  const repoParts = repository.trim().replace(/^https:\/\/github\.com\//, '').replace(/\.git$/, '').split('/');
  const validRepo = repoParts.length === 2 && repoParts.every(part => /^[\w.-]+$/.test(part));
  const apiBase = validRepo ? `https://api.github.com/repos/${repoParts[0]}/${repoParts[1]}/contents` : '';
  const headers = () => ({ Accept: 'application/vnd.github+json', Authorization: `Bearer ${token.trim()}`, 'Content-Type': 'application/json', 'X-GitHub-Api-Version': '2022-11-28' });

  const putFile = async (path: string, bytes: Uint8Array, commitMessage: string) => {
    if (!validRepo || !token.trim()) throw new Error('Indiquez le depot GitHub et votre jeton personnel.');
    const url = `${apiBase}/${path}`;
    const current = await fetch(`${url}?ref=${encodeURIComponent(branch)}`, { headers: headers() });
    if (!current.ok && current.status !== 404) throw new Error(`GitHub : lecture refusee (${current.status}). Verifiez le jeton, le depot et la branche.`);
    const existing = current.ok ? await current.json() as { sha: string } : null;
    const result = await fetch(url, { method: 'PUT', headers: headers(), body: JSON.stringify({
      message: commitMessage, branch, content: toBase64(bytes), ...(existing ? { sha: existing.sha } : {}),
    }) });
    if (!result.ok) throw new Error(`Publication refusee (${result.status}). Verifiez les droits "Contents: Read and write" et la branche.`);
  };

  const publish = async () => {
    setBusy(true); setMessage('Envoi de la mise a jour sur GitHub...');
    try {
      await putFile('public/site-content.json', new TextEncoder().encode(JSON.stringify(content, null, 2) + '\n'), 'Mettre a jour le contenu du site');
      setMessage('Publication envoyee. Vercel redeploie automatiquement le site en quelques minutes. Votre brouillon reste visible ici jusque-la.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Erreur de publication.'); }
    finally { setBusy(false); }
  };

  const uploadPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) { setMessage('Choisissez une image JPG, PNG ou WebP de moins de 5 Mo.'); return; }
    setBusy(true);
    try {
      const safe = file.name.toLowerCase().replace(/[^a-z0-9._-]/g, '-');
      const path = `public/uploads/${Date.now()}-${safe}`;
      await putFile(path, new Uint8Array(await file.arrayBuffer()), `Ajouter la photo ${safe}`);
      const url = `https://raw.githubusercontent.com/${repoParts[0]}/${repoParts[1]}/${branch}/${path}`;
      await navigator.clipboard.writeText(url);
      setMessage(`Photo envoyee. Son URL a ete copiee : ${url} Collez-la dans le champ photo voulu, puis publiez le contenu.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Envoi impossible.'); }
    finally { setBusy(false); event.target.value = ''; }
  };

  const importJson = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const parsed: unknown = JSON.parse(await file.text());
      if (!isSiteContent(parsed)) throw new Error('Ce fichier ne contient pas un contenu de site valide.');
      if (confirm('Remplacer le brouillon actuel par ce fichier ?')) { update(normalizeContent(parsed)); setMessage('Sauvegarde importee dans le brouillon.'); }
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Import impossible.'); }
    event.target.value = '';
  };

  return (
    <main className="min-h-screen bg-[#fbf9f4] px-4 py-8 text-[#12241d] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <a href="./" target="_blank" rel="noopener noreferrer" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0d9488]"><ArrowLeft size={16} /> Voir le site dans un nouvel onglet</a>
        <button type="button" className="mb-6 ml-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0d9488] hover:underline" onClick={() => void downloadProject().catch(() => setMessage('Impossible de creer le ZIP. Essayez depuis un autre navigateur.'))}>
          <Download size={16} /> Telecharger les fichiers du projet (ZIP)
        </button>
        <div className="mb-8 border-b border-[#12241d]/10 pb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0d9488]">Administration des contenus</p>
          <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">Votre espace admin</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">Modifiez textes, coordonnees, liens, entreprises et galerie. Chaque modification cree un brouillon local. Publiez-le pour le rendre visible a tous.</p>
          <p className="mt-3 text-sm font-medium text-[#0f766e]" role="status">{message || (draft ? 'Brouillon local en cours.' : 'Aucun brouillon local.')}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-[220px_1fr]">
          <nav aria-label="Rubriques de l'administration" className="flex flex-wrap content-start gap-2 md:flex-col">
            {sections.map(item => <button key={item.id} onClick={() => setSection(item.id)} className={`rounded-lg px-4 py-2 text-left text-sm font-semibold ${section === item.id ? 'bg-[#12241d] text-white' : 'bg-white text-[#12241d] hover:bg-[#e8eee9]'}`}>{item.title}</button>)}
          </nav>

          <div className="min-w-0 space-y-7">
            <h2 className="font-heading text-2xl font-bold">{sections.find(item => item.id === section)?.title}</h2>
            {section === 'profile' && objectFields(content.profile, ['profile'])}
            {section === 'headings' && objectFields(content.headings ?? siteData.headings, ['headings'])}
            {section === 'about' && <>
              {objectFields(Object.fromEntries(Object.entries(content.about).filter(([, value]) => typeof value === 'string')), ['about'])}
              <h3 className="font-heading text-xl font-bold">Paragraphes</h3>{list(content.about.paragraphs, ['about', 'paragraphs'], 'paragraphe')}
              <h3 className="font-heading text-xl font-bold">Missions</h3>{list(content.about.missions, ['about', 'missions'], 'mission')}
              <h3 className="font-heading text-xl font-bold">Points forts</h3>{list(content.about.highlights, ['about', 'highlights'], 'point fort')}
            </>}
            {section === 'steps' && list(content.steps, ['steps'], 'etape')}
            {section === 'companies' && list(content.companies, ['companies'], 'entreprise')}
            {section === 'gallery' && <>
              <p className="text-sm text-slate-600">L'aperçu affiche les trois premieres photos ; la page distincte affiche toutes les photos. Reordonnez-les ici. Pour une nouvelle photo, utilisez "Envoyer une image" dans Publier et sauvegarder, puis collez son URL.</p>
              {list(content.gallery, ['gallery'], 'photo')}
            </>}
            {section === 'faqs' && list(content.faqs, ['faqs'], 'question')}
            {section === 'marquee' && list(content.marquee, ['marquee'], 'mot ou expression')}
            {section === 'publication' && <div className="space-y-8">
              <div className="rounded-xl border border-[#12241d]/10 bg-white p-5">
                <h3 className="font-heading text-lg font-bold">Sauvegardes et brouillon</h3>
                <p className="my-3 text-sm text-slate-600">Le brouillon est enregistre uniquement sur cet appareil. Exportez-le regulierement. Sans publication, les autres visiteurs ne le voient pas.</p>
                <div className="flex flex-wrap gap-2">
                  <button className={buttonClass} onClick={() => download('site-content.json', JSON.stringify(content, null, 2))}><Download size={16}/> Telecharger la sauvegarde</button>
                  <label className={`${buttonClass} cursor-pointer`}><Upload size={16}/> Importer une sauvegarde<input type="file" accept="application/json,.json" onChange={importJson} className="sr-only" /></label>
                  <button className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-700 hover:bg-red-50" onClick={() => { if (confirm('Annuler toutes les modifications locales ?')) { clearDraft(); setMessage('Brouillon supprime. Contenu public restaure.'); } }}>Annuler le brouillon</button>
                </div>
              </div>
              <div className="rounded-xl border border-[#12241d]/10 bg-white p-5">
                <h3 className="font-heading text-lg font-bold">Publication gratuite GitHub + Vercel</h3>
                <p className="my-3 text-sm text-slate-600">Votre depot doit etre connecte a Vercel. Creez un jeton GitHub limite a ce seul depot, avec la permission "Contents: Read and write". Le jeton reste uniquement en memoire pendant cette session : ne le partagez pas.</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-medium">Depot (proprietaire/nom)<input className={inputClass} placeholder="mon-compte/mon-site" value={repository} onChange={e => { setRepository(e.target.value); localStorage.setItem('verzeri-github-repo', e.target.value); }}/></label>
                  <label className="text-sm font-medium">Branche<input className={inputClass} value={branch} onChange={e => { setBranch(e.target.value); localStorage.setItem('verzeri-github-branch', e.target.value); }}/></label>
                  <label className="text-sm font-medium sm:col-span-2">Jeton personnel GitHub (non sauvegarde)<input className={inputClass} type="password" autoComplete="off" value={token} onChange={e => setToken(e.target.value)} placeholder="github_pat_..." /></label>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button className={buttonClass} disabled={busy || !validRepo || !token.trim()} onClick={publish}><Save size={16}/> {busy ? 'En cours...' : 'Publier les changements'}</button>
                  <label className={`${buttonClass} cursor-pointer ${busy || !validRepo || !token.trim() ? 'pointer-events-none opacity-50' : ''}`}><ImagePlus size={16}/> Envoyer une image (5 Mo max)<input type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadPhoto} className="sr-only" disabled={busy}/></label>
                  <button onClick={() => { void refresh(); setMessage('Version publique actualisee. Une fois le redeploiement termine, annulez le brouillon pour la voir ici.'); }} className="rounded-lg border border-[#12241d]/20 px-4 py-2 text-sm font-semibold">Actualiser le site public</button>
                </div>
                <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0d9488] hover:underline">Creer un jeton GitHub restreint <ExternalLink size={14}/></a>
              </div>
              <p className="text-xs text-slate-500">La connexion GitHub controle la publication. Cette page n'est pas protegee par un mot de passe serveur : toute personne peut ouvrir un brouillon local, mais seule une personne disposant des droits GitHub peut publier.</p>
              <p className="text-xs text-slate-500">Contenu actuellement charge : {published.gallery.length} photos, {published.companies.length} entreprises. Les changements de design ou de code demandent une mise a jour du projet.</p>
            </div>}
          </div>
        </div>
      </div>
    </main>
  );
}