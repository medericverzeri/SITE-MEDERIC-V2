import React from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Phone, 
  ExternalLink, 
  Sparkles, 
  Truck, 
  ArrowUpRight 
} from 'lucide-react';
import { useSite } from '../data/siteStore';
import { useOpeningStatus } from '../hooks/useOpeningStatus';

export const DechetLabSection: React.FC = () => {
  const { profile, steps, headings } = useSite().content;
  const status = useOpeningStatus();

  return (
    <section className="py-16 md:py-20 bg-[#fbf9f4] border-t border-[#12241d]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#12241d] text-[#14b8a6] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            02 — Le lieu d'exercice
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12241d] tracking-tight">
            {headings?.workplaceTitle ?? `${profile.employer}, déchèterie pro`}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4b5563] leading-relaxed">
            {headings?.workplaceDescription}
          </p>
        </div>

        {/* 2-Column Hub Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 3 Steps (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-heading text-xl font-bold text-[#12241d] mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#0d9488]" />
              Comment déposer vos matériaux en 3 étapes ?
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-[#12241d]/10 hover:border-[#0d9488]/40 shadow-sm transition-all duration-200 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#12241d] text-[#14b8a6] flex items-center justify-center font-heading font-extrabold text-lg shrink-0 shadow-inner">
                    {step.n}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-heading text-lg font-bold text-[#12241d]">
                        {step.title}
                      </h4>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#f3ede1] text-[#7c5c34]">
                        {step.badge}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-[#4b5563] leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Link to Official Déchèt'Lab Webpage */}
            <div className="pt-2">
              <a
                href={profile.site}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0d9488] hover:text-[#0f766e] bg-white px-5 py-3 rounded-xl border border-[#0d9488]/30 shadow-sm transition-colors"
              >
                <span>Consulter la page officielle Déchèt'Lab (Maison d'Économie Solidaire)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Practical Site Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#12241d] text-white p-6 sm:p-7 shadow-xl border border-[#12241d]/20 relative overflow-hidden">
              
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0d9488]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-5 h-5 text-[#14b8a6]" />
                    <span className="font-heading font-bold text-lg text-white">Dépose Préservante</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    status.isOpen ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    {status.isOpen ? 'Ouvert' : 'Fermé'}
                  </span>
                </div>

                {/* Practical Details */}
                <div className="mt-5 space-y-4">
                  
                  {/* Address */}
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-[#14b8a6] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Adresse</p>
                      <p className="font-bold text-base text-white mt-0.5">{profile.address}</p>
                      <p className="text-sm text-slate-300">{profile.postalCode} {profile.city}</p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${profile.address} ${profile.city}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#2dd4bf] hover:underline mt-1 font-semibold"
                      >
                        <span>Ouvrir l'itinéraire Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-[#14b8a6] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Jours & Horaires</p>
                      <p className="font-bold text-sm text-white mt-0.5">{profile.openDays}</p>
                      <p className="text-xs text-slate-300">{profile.scheduleNote}</p>
                      <p className="text-[11px] text-[#2dd4bf] mt-1 font-medium italic">
                        {status.nextStatus}
                      </p>
                    </div>
                  </div>

                  {/* Standard Phone */}
                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-[#14b8a6] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Téléphones</p>
                      <div className="mt-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-300">Portable :</span>
                          <a href={`tel:${profile.mobileRaw}`} className="font-bold text-sm text-[#2dd4bf] hover:underline">
                            {profile.mobile}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-300">2e mobile :</span>
                          <a href={`tel:${profile.secondMobileRaw}`} className="font-bold text-sm text-[#2dd4bf] hover:underline">
                            {profile.secondMobile}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-300">Standard :</span>
                          <a href={`tel:${profile.deskRaw}`} className="font-bold text-sm text-white hover:text-[#2dd4bf]">
                            {profile.desk}
                          </a>
                          <span className="text-[10px] text-slate-400">(choix 1)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Direct Action Button */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <a
                    href={`tel:${profile.mobileRaw}`}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#14b8a6] hover:to-[#0d9488] text-white shadow-md transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Appeler Médéric Verzeri</span>
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
