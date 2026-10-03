import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { type Shot } from '../data/content';
import { useSite } from '../data/siteStore';

interface GallerySectionProps {
  fullPage?: boolean;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ fullPage = false }) => {
  const { gallery, headings } = useSite().content;
  const [selectedTag, setSelectedTag] = useState<string>('Toutes');
  const [activeShotIndex, setActiveShotIndex] = useState<number | null>(null);
  const [fallbackErrors, setFallbackErrors] = useState<Record<string, boolean>>({});

  const tags = ['Toutes', 'Déchèt\'Lab', 'Dépose & Tri', 'Matériaux', 'Économie Circulaire'];

  const filteredShots = fullPage
    ? selectedTag === 'Toutes' ? gallery : gallery.filter((s) => s.tag === selectedTag)
    : gallery.slice(0, 3);

  const openLightbox = (index: number) => {
    setActiveShotIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActiveShotIndex(null);
    document.body.style.overflow = 'unset';
  };

  const nextShot = () => {
    if (activeShotIndex === null) return;
    setActiveShotIndex((prev) => (prev! + 1) % filteredShots.length);
  };

  const prevShot = () => {
    if (activeShotIndex === null) return;
    setActiveShotIndex((prev) => (prev! - 1 + filteredShots.length) % filteredShots.length);
  };

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeShotIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextShot();
      if (e.key === 'ArrowLeft') prevShot();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeShotIndex, filteredShots.length]);

  const handleImageError = (id: string) => {
    setFallbackErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="galerie" className="py-16 md:py-24 bg-[#fbf9f4] border-t border-[#12241d]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {fullPage && (
          <a href="./#galerie" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d9488] hover:underline mb-10">
            <ArrowLeft className="w-4 h-4" /> Retour au site
          </a>
        )}
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#12241d] text-[#14b8a6] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {fullPage ? 'Toutes les photographies' : '04 — Galerie'}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12241d] tracking-tight">
            {fullPage ? 'La galerie complète' : headings?.galleryTitle}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#4b5563]">
            {fullPage
              ? 'Retrouvez ici toutes les photographies du Déchèt\'Lab, de la dépose préservante et du réemploi des matériaux.'
              : headings?.galleryDescription}
          </p>
        </div>

        {/* Filter Pills */}
        {fullPage && <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {tags.map((tag) => {
            const isSelected = selectedTag === tag;
            const count = tag === 'Toutes' ? gallery.length : gallery.filter(s => s.tag === tag).length;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#12241d] text-white shadow-sm'
                    : 'bg-white text-[#4b5563] hover:text-[#12241d] hover:bg-[#f3ede1] border border-[#12241d]/10'
                }`}
              >
                <span>{tag}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>}

        {/* Masonry / Grid for Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredShots.map((shot: Shot, index: number) => {
            const hasError = fallbackErrors[shot.id];
            const imgSrc = hasError ? shot.fallbackSrc : shot.src;

            return (
              <button
                key={shot.id}
                type="button"
                aria-label={fullPage ? `Agrandir : ${shot.alt}` : `Voir la galerie complète : ${shot.alt}`}
                onClick={() => fullPage ? openLightbox(index) : window.location.assign('?page=galerie')}
                className={`group relative w-full text-left rounded-2xl overflow-hidden bg-slate-900 shadow-md cursor-pointer border border-[#12241d]/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  fullPage && shot.wide ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Image Frame */}
                <div className={`w-full overflow-hidden ${fullPage && shot.wide ? 'h-64 sm:h-80' : 'h-64 sm:h-72'}`}>
                  <img
                    src={imgSrc}
                    alt={shot.alt}
                    onError={() => handleImageError(shot.id)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Gradient Overlay & Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-4 sm:p-5">
                  <div className="flex justify-end">
                    <span className="p-2 rounded-lg bg-black/40 backdrop-blur-md text-white border border-white/20 group-hover:bg-[#0d9488] transition-colors">
                      {fullPage ? <Maximize2 className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </span>
                  </div>

                  <div>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0d9488] text-white mb-1.5">
                      {shot.tag}
                    </span>
                    <h3 className="font-heading font-bold text-white text-base sm:text-lg leading-snug drop-shadow-sm">
                      {shot.caption}
                    </h3>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {!fullPage && (
          <div className="mt-10 flex justify-center">
            <a
              href="?page=galerie"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-[#12241d] hover:bg-[#0d9488] text-white font-bold text-sm transition-colors shadow-sm"
            >
              Voir toutes les photos <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}

      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeShotIndex !== null && filteredShots[activeShotIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          <button
            onClick={prevShot}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Next button */}
          <button
            onClick={nextShot}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Image Container */}
          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img
              src={
                fallbackErrors[filteredShots[activeShotIndex].id]
                  ? filteredShots[activeShotIndex].fallbackSrc
                  : filteredShots[activeShotIndex].src
              }
              alt={filteredShots[activeShotIndex].alt}
              className="max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
            />
            
            {/* Lightbox Caption */}
            <div className="mt-4 text-center max-w-xl px-4">
              <span className="text-xs uppercase font-bold tracking-wider text-[#2dd4bf] block mb-1">
                {filteredShots[activeShotIndex].tag} · {activeShotIndex + 1} / {filteredShots.length}
              </span>
              <p className="text-white text-base sm:text-lg font-semibold font-heading">
                {filteredShots[activeShotIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
