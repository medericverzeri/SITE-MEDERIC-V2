import React from 'react';
import { 
  Users, 
  Sparkles, 
  GraduationCap, 
  Workflow, 
  HardHat, 
  ShieldAlert, 
  Recycle,
  CheckCircle2,
  Quote
} from 'lucide-react';
import { useSite } from '../data/siteStore';

export const AboutSection: React.FC = () => {
  const { about } = useSite().content;

  const missionIcons = [
    <GraduationCap className="w-5 h-5 text-[#0d9488]" key="1" />,
    <Workflow className="w-5 h-5 text-[#0d9488]" key="2" />,
    <HardHat className="w-5 h-5 text-[#0d9488]" key="3" />,
    <ShieldAlert className="w-5 h-5 text-[#0d9488]" key="4" />,
    <Recycle className="w-5 h-5 text-[#0d9488]" key="5" />,
  ];

  return (
    <section id="a-propos" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0d9488]/10 text-[#0d9488] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            01 — À propos de moi
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12241d] tracking-tight leading-tight">
            {about.title}
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-[#2f6f5e] font-semibold leading-relaxed">
            {about.lead}
          </p>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Vision & Philosophy (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Editorial Quote Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#fbf9f4] border border-[#12241d]/10 relative shadow-sm">
              <Quote className="w-10 h-10 text-[#0d9488]/20 absolute top-5 right-5" />
              <div className="space-y-4 relative z-10 text-base text-[#374151] leading-relaxed">
                {about.paragraphs.map((p, idx) => (
                  <p key={idx} className={idx === 0 ? "font-medium text-[#12241d]" : ""}>
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-[#12241d]/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#12241d] text-white flex items-center justify-center font-bold text-sm">
                  MV
                </div>
                <div>
                  <div className="text-sm font-bold text-[#12241d]">Médéric Verzeri</div>
                  <div className="text-xs text-[#0d9488] font-medium">Encadrement technique · Insertion professionnelle</div>
                </div>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-3">
              {about.highlights.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-[#12241d]/10 hover:border-[#0d9488]/40 transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    {item.label}
                  </span>
                  <div className="font-heading font-bold text-[#12241d] text-sm leading-tight">
                    {item.value}
                  </div>
                  <div className="text-xs text-[#6b7280] mt-1 leading-snug">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Dual Commitment Banner */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-[#12241d] to-[#1e3c32] text-white flex items-center gap-4 shadow-md">
              <div className="p-3 rounded-lg bg-[#0d9488]/20 text-[#14b8a6] shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-xs sm:text-sm">
                <p className="font-bold text-white mb-0.5">Double finalité solidaire & écologique</p>
                <p className="text-slate-300">Concilier dignité de l'emploi et valorisation des ressources de chantier.</p>
              </div>
            </div>

          </div>

          {/* Right Column: Missions Breakdown (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#12241d]/10">
              <h3 className="font-heading text-xl font-bold text-[#12241d]">
                Mes principales missions sur le terrain
              </h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#12241d] text-white">
                5 Engagements
              </span>
            </div>

            <div className="space-y-3.5">
              {about.missions.map((mission, idx) => (
                <div 
                  key={idx}
                  className="group p-4 sm:p-5 rounded-xl bg-[#fbf9f4] hover:bg-white border border-[#12241d]/10 hover:border-[#0d9488]/40 shadow-sm hover:shadow-md transition-all duration-200 flex items-start gap-4"
                >
                  {/* Number & Icon Pill */}
                  <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                    <div className="w-8 h-8 rounded-lg bg-white group-hover:bg-[#0d9488]/10 border border-[#12241d]/10 flex items-center justify-center transition-colors">
                      {missionIcons[idx]}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      {mission.number}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading text-base font-bold text-[#12241d] group-hover:text-[#0d9488] transition-colors">
                        {mission.title}
                      </h4>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0d9488] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="mt-1 text-sm text-[#4b5563] leading-relaxed">
                      {mission.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Callout */}
            <div className="mt-8 p-4 rounded-xl bg-[#0d9488]/5 border border-[#0d9488]/20 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-[#2f6f5e]">
                <span className="font-bold text-[#12241d]">Une question sur le parcours d'insertion ou un dépôt ?</span>
                <p className="mt-0.5">Médéric vous répond directement par téléphone ou sur site.</p>
              </div>
              <a
                href="#contact"
                className="text-xs font-bold px-4 py-2 rounded-lg bg-[#0d9488] hover:bg-[#0f766e] text-white transition-colors shrink-0"
              >
                Contacter l'encadrant
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
