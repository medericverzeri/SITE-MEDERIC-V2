import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Download, 
  Check, 
  Copy, 
  ShieldCheck, 
  Building2, 
  Leaf, 
  ExternalLink 
} from 'lucide-react';
import { generateVCard } from '../data/content';
import { useSite } from '../data/siteStore';
import { useOpeningStatus } from '../hooks/useOpeningStatus';

export const Hero: React.FC = () => {
  const { profile, marquee } = useSite().content;
  const status = useOpeningStatus();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleDownloadVCard = () => {
    const vcardData = generateVCard(profile);
    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${profile.firstName}_${profile.lastName}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="accueil" className="relative pt-6 pb-12 md:pt-10 md:pb-16 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-dots opacity-40 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-teal-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: 1366px balanced proportions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text & Profile Info (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#12241d] text-white shadow-sm">
                <Leaf className="w-3.5 h-3.5 text-[#14b8a6]" />
                Économie circulaire & Insertion
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#14b8a6]/15 text-[#0f766e] border border-[#14b8a6]/30">
                <Building2 className="w-3.5 h-3.5" />
                Beauvaisis · Oise
              </span>
              <div 
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                  status.isOpen 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                    : 'bg-amber-50 text-amber-800 border-amber-300'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
                <span>{status.nextStatus}</span>
              </div>
            </div>

            {/* Title & Name */}
            <div className="mb-4">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#12241d] leading-[1.08]">
                VERZERI <span className="text-[#0d9488]">Médéric</span>
              </h1>
              <p className="mt-3 text-lg sm:text-xl font-semibold text-[#2f6f5e] leading-snug">
                {profile.role}
              </p>
            </div>

            {/* Intro paragraph */}
            <p className="text-base sm:text-lg text-[#374151] max-w-2xl leading-relaxed mb-6">
              {profile.intro}
            </p>

            {/* Quick Contact & Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#12241d] to-[#1c3a30] hover:from-[#0d9488] hover:to-[#0f766e] shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>Prendre contact</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`tel:${profile.mobileRaw}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold text-[#12241d] bg-white hover:bg-[#f3ede1] border border-[#12241d]/15 shadow-sm transition-all duration-200"
              >
                <Phone className="w-4 h-4 text-[#0d9488]" />
                <span>{profile.mobile}</span>
              </a>

              <a
                href={`tel:${profile.secondMobileRaw}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold text-[#12241d] bg-white hover:bg-[#f3ede1] border border-[#12241d]/15 shadow-sm transition-all duration-200"
              >
                <Phone className="w-4 h-4 text-[#0d9488]" />
                <span>{profile.secondMobile}</span>
              </a>

              <button
                onClick={handleDownloadVCard}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-semibold text-[#374151] bg-[#f3ede1]/80 hover:bg-[#ebe3d3] border border-[#12241d]/10 transition-colors"
                title="Télécharger la fiche contact vCard"
              >
                <Download className="w-4 h-4 text-[#0d9488]" />
                <span className="hidden sm:inline">Ajouter aux contacts</span>
                <span className="sm:hidden">vCard</span>
              </button>
            </div>

            {/* Essential Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl pt-4 border-t border-[#12241d]/10">
              
              {/* Location Card */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/70 border border-[#12241d]/10">
                <div className="p-2 rounded-lg bg-[#0d9488]/10 text-[#0d9488] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#12241d]">{profile.employer}</div>
                  <div className="text-xs text-[#4b5563]">{profile.address}, {profile.city}</div>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${profile.address} ${profile.city}`)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0d9488] hover:underline mt-0.5"
                  >
                    <span>Voir sur Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Hours Card */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/70 border border-[#12241d]/10">
                <div className="p-2 rounded-lg bg-[#0d9488]/10 text-[#0d9488] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#12241d]">Horaires de dépose</div>
                  <div className="text-xs text-[#4b5563]">{profile.openDays}</div>
                  <div className="text-[11px] text-[#6b7280] font-medium">{profile.scheduleNote}</div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Original Portrait Photo & Professional Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Decorative Card Glow */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-[#0d9488]/30 via-[#14b8a6]/10 to-[#12241d]/20 blur-xl opacity-70" />
              
              {/* Main Card Container */}
              <div className="relative rounded-2xl bg-white p-4 sm:p-5 shadow-xl border border-[#12241d]/10 overflow-hidden">
                
                {/* Photo Frame - Maintains Exact Canva Portrait Photo */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-[#12241d]/5 to-[#0d9488]/10 border border-[#12241d]/10 shadow-inner group">
                  <img
                    src={imageError ? profile.portraitFallback : profile.portrait}
                    alt={`${profile.firstName} ${profile.lastName}`}
                    onError={() => {
                      if (!imageError) {
                        setImageError(true);
                      }
                    }}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                  />

                  {/* Frosted Floating Pill over Photo */}
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold leading-tight">{profile.firstName} {profile.lastName}</p>
                      <p className="text-[11px] text-[#2dd4bf] leading-tight">Déchèt'Lab Beauvaisis</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#0d9488]/30 px-2 py-0.5 rounded text-[10px] font-semibold text-white border border-[#2dd4bf]/40">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2dd4bf]" />
                      <span>Certifié</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Chips */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  
                  {/* Phone Copy / Call */}
                  <div className="p-2.5 rounded-xl bg-[#f8fafc] border border-slate-200/80 flex flex-col justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Mobile direct</span>
                    <div className="flex items-center justify-between mt-1">
                      <a 
                        href={`tel:${profile.mobileRaw}`}
                        className="font-bold text-[#12241d] hover:text-[#0d9488] truncate"
                      >
                        {profile.mobile}
                      </a>
                      <button
                        onClick={() => handleCopy(profile.mobile, 'tel')}
                        className="p-1 text-slate-400 hover:text-[#0d9488] transition-colors"
                        title="Copier le numéro"
                      >
                        {copiedItem === 'tel' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <a href={`tel:${profile.secondMobileRaw}`} className="font-bold text-[#12241d] hover:text-[#0d9488] truncate">
                        {profile.secondMobile}
                      </a>
                      <button
                        onClick={() => handleCopy(profile.secondMobile, 'secondTel')}
                        className="p-1 text-slate-400 hover:text-[#0d9488] transition-colors"
                        title="Copier le deuxième numéro"
                      >
                        {copiedItem === 'secondTel' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Email Copy / Mailto */}
                  <div className="p-2.5 rounded-xl bg-[#f8fafc] border border-slate-200/80 flex flex-col justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Courriel direct</span>
                    <div className="flex items-center justify-between mt-1">
                      <a 
                        href={`mailto:${profile.email}`} 
                        className="font-bold text-[#12241d] hover:text-[#0d9488] truncate text-[11px]"
                      >
                        m.verzeri@...
                      </a>
                      <button
                        onClick={() => handleCopy(profile.email, 'email')}
                        className="p-1 text-slate-400 hover:text-[#0d9488] transition-colors"
                        title="Copier l'adresse e-mail"
                      >
                        {copiedItem === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                </div>

                {/* Affiliation footer inside card */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="truncate">Porté par la {profile.parentGroup}</span>
                  <a 
                    href={profile.groupSite} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-semibold text-[#0d9488] hover:underline inline-flex items-center gap-1"
                  >
                    <span>eco-solidaire.fr</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Marquee Ticker Bar */}
      <div className="mt-12 sm:mt-16 border-y border-[#12241d]/10 bg-[#12241d] text-white py-3 overflow-hidden shadow-inner">
        <div className="animate-marquee flex items-center gap-8 text-xs sm:text-sm font-semibold tracking-wider uppercase">
          {[...marquee, ...marquee].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 shrink-0">
              <span className="hover:text-[#14b8a6] transition-colors">{item}</span>
              <span className="text-[#14b8a6]">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
