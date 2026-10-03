import React, { useState } from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { type Company } from '../data/content';
import { useSite } from '../data/siteStore';

export const CompaniesSection: React.FC = () => {
  const { companies, profile, headings } = useSite().content;
  const [selectedGroup, setSelectedGroup] = useState<string>('Toutes');
  const [failedLogos, setFailedLogos] = useState<Record<string, boolean>>({});

  const groups = ['Toutes', 'Siège', 'Réemploi', 'Matériaux', 'Services', 'Formation'];

  const filtered = selectedGroup === 'Toutes'
    ? companies
    : companies.filter((c) => c.group === selectedGroup);

  const handleLogoError = (id: string) => {
    setFailedLogos((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="nos-entreprises" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0d9488]/10 text-[#0d9488] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              03 — Nos entreprises
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12241d] tracking-tight">
              {headings?.companiesTitle}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#4b5563]">
              {headings?.companiesDescription}
            </p>
          </div>

          <a
            href={profile.groupSite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#12241d] hover:bg-[#0d9488] transition-colors shrink-0 shadow-sm"
          >
            <span>Portail eco-solidaire.fr</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {groups.map((group) => {
            const count = group === 'Toutes' ? companies.length : companies.filter((c) => c.group === group).length;
            const isSelected = selectedGroup === group;
            return (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#12241d] text-white shadow-sm'
                    : 'bg-[#fbf9f4] text-[#4b5563] hover:text-[#12241d] hover:bg-[#f3ede1] border border-[#12241d]/10'
                }`}
              >
                <span>{group}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-[#12241d]/10 text-[#12241d]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Companies Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((company: Company) => {
            const hasError = failedLogos[company.id];
            return (
              <div
                key={company.id}
                className="group rounded-2xl bg-[#fbf9f4] hover:bg-white border border-[#12241d]/10 hover:border-[#0d9488]/40 p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  
                  {/* Top Bar: Logo & Badge */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    
                    {/* Logo Box */}
                    <div className="w-16 h-16 rounded-xl bg-white p-2.5 border border-[#12241d]/10 flex items-center justify-center shadow-sm shrink-0 overflow-hidden group-hover:border-[#0d9488]/30 transition-colors">
                      {!hasError && company.logo ? (
                        <img
                          src={company.logo}
                          alt={`Logo ${company.name}`}
                          onError={() => handleLogoError(company.id)}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full rounded-lg bg-gradient-to-br from-[#12241d] to-[#0d9488] text-white font-heading font-extrabold text-xl flex items-center justify-center">
                          {company.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* Group Tag */}
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-[#0d9488] border border-[#0d9488]/20 shadow-xs">
                      {company.group}
                    </span>
                  </div>

                  {/* Category & Name */}
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-[#0d9488]">
                      {company.category}
                    </p>
                    <h3 className="font-heading text-xl font-extrabold text-[#12241d] group-hover:text-[#0d9488] transition-colors mt-0.5">
                      {company.name}
                    </h3>
                    <p className="text-xs text-[#6b7280] font-medium mt-1">
                      📍 {company.place}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#4b5563] leading-relaxed mb-6">
                    {company.text}
                  </p>

                </div>

                {/* Card Footer: Link */}
                <div className="pt-4 border-t border-[#12241d]/10 flex items-center justify-between">
                  <span className="text-[11px] text-[#6b7280]">
                    {company.badge || 'Filière solidaire'}
                  </span>
                  
                  <a
                    href={company.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#12241d] group-hover:text-[#0d9488] transition-colors"
                  >
                    <span>Découvrir</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
