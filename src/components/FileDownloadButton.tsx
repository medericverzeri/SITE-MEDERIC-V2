import { useEffect, useRef, useState } from 'react';
import { Download, AlertTriangle, LoaderCircle } from 'lucide-react';
import { downloadProject, type ProjectArchive } from '../exportProject';

type State = {
  busy: boolean;
  link?: ProjectArchive;
  error?: string;
};

export function FileDownloadButton({ className = '', label = 'Telecharger les fichiers du site (ZIP)' }: { className?: string; label?: string }) {
  const [state, setState] = useState<State>({ busy: false });
  const archiveRef = useRef<ProjectArchive | null>(null);

  useEffect(() => () => {
    if (archiveRef.current) URL.revokeObjectURL(archiveRef.current.url);
  }, []);

  const generate = async () => {
    setState({ busy: true });
    try {
      const archive = await downloadProject();
      if (archiveRef.current) URL.revokeObjectURL(archiveRef.current.url);
      archiveRef.current = archive;

      // Try the usual automatic download first.
      const anchor = document.createElement('a');
      anchor.href = archive.url;
      anchor.download = archive.name;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      setState({ busy: false, link: archive });
    } catch (error) {
      setState({
        busy: false,
        error: error instanceof Error ? error.message : 'Le ZIP n\'a pas pu etre cree. Rechargez la page et reessayez.',
      });
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => void generate()}
        disabled={state.busy}
        className={className || 'inline-flex items-center gap-2 rounded-lg border border-[#2dd4bf]/40 px-3 py-2 text-xs font-semibold text-[#2dd4bf] hover:bg-white/10 disabled:opacity-60'}
      >
        {state.busy ? <LoaderCircle size={15} className="animate-spin" /> : <Download size={15} />}
        {state.busy ? 'Preparation du ZIP...' : label}
      </button>

      {state.error && (
        <p role="alert" className="flex items-start gap-2 text-xs text-red-400">
          <AlertTriangle size={14} className="mt-0.5 shrink-0" /> {state.error}
        </p>
      )}

      {state.link && state.link.missing.length === 0 && (
        <p className="text-xs opacity-80">
          Si le telechargement ne demarre pas tout seul,{' '}
          <a href={state.link.url} download={state.link.name} className="underline hover:text-white">
            cliquez ici sur le lien du ZIP
          </a>
          {' '}(ou clic droit puis « Enregistrer la cible sous »).
        </p>
      )}

      {state.link && state.link.missing.length > 0 && (
        <p role="alert" className="text-xs text-amber-300">
          ZIP cree mais incomplet. Fichiers manquants : {state.link.missing.join(', ')}. Rechargez la page puis reessayez.
        </p>
      )}
    </div>
  );
}
