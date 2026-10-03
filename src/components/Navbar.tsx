import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { useOpeningStatus } from '../hooks/useOpeningStatus';
import { useSite } from '../data/siteStore';

interface NavbarProps {
  galleryPage?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ galleryPage = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(galleryPage ? 'galerie' : 'accueil');
  const status = useOpeningStatus();
  const { profile } = useSite().content;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (galleryPage) return;
      // Section tracking
      const sections = ['accueil', 'a-propos', 'nos-entreprises', 'galerie', 'contact'];
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [galleryPage]);

  // EXACT original tabs
  const navTabs = [
    { label: 'Accueil', href: galleryPage ? './#accueil' : '#accueil', id: 'accueil' },
    { label: 'A propos de moi', href: galleryPage ? './#a-propos' : '#a-propos', id: 'a-propos' },
    { label: 'Nos entreprises', href: galleryPage ? './#nos-entreprises' : '#nos-entreprises', id: 'nos-entreprises' },
    { label: 'Galerie', href: galleryPage ? '?page=galerie' : '#galerie', id: 'galerie' },
    { label: 'Contactez-nous', href: galleryPage ? './#contact' : '#contact', id: 'contact' },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'glass-header shadow-sm border-b border-[#12241d]/10 py-3' 
        : 'bg-[#fbf9f4]/95 backdrop-blur-md border-b border-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Identity */}
          <a 
            href={galleryPage ? './#accueil' : '#accueil'}
            className="group flex items-center gap-3.5 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#12241d] to-[#1a382e] text-[#14b8a6] flex items-center justify-center font-heading font-bold text-lg shadow-sm border border-[#14b8a6]/30 group-hover:scale-105 transition-transform">
              MV
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-base tracking-tight text-[#12241d] group-hover:text-[#0d9488] transition-colors leading-tight">
                {profile.lastName.toUpperCase()} {profile.firstName}
              </span>
              <span className="text-[11px] font-medium text-[#0d9488] flex items-center gap-1.5 leading-tight">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]"></span>
                {profile.employer} · Insertion & Économie Circulaire
              </span>
            </div>
          </a>

          {/* Desktop Navigation Tabs (Strictly Preserved) */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#f3ede1]/80 p-1.5 rounded-full border border-[#12241d]/10">
            {navTabs.map((tab) => {
              const isActive = activeSection === tab.id;
              return (
                <a
                  key={tab.id}
                  href={tab.href}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-[#12241d] text-white shadow-sm'
                      : 'text-[#374151] hover:text-[#12241d] hover:bg-white/60'
                  }`}
                >
                  {tab.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Live Status Pill */}
            <div 
              className={`hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium border ${
                status.isOpen 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
              title={status.nextStatus}
            >
              <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="truncate max-w-[170px]">{status.isOpen ? `${profile.employer} ouvert` : profile.openDays}</span>
            </div>

            {/* Direct Phone Call Button */}
            <a
              href={`tel:${profile.mobileRaw}`}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#0d9488] to-[#0f766e] hover:from-[#0f766e] hover:to-[#115e59] shadow-sm hover:shadow transition-all duration-200"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{profile.mobile}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#12241d] bg-[#f3ede1] rounded-lg hover:bg-[#ebe3d3] transition-colors"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#12241d]/10 bg-[#fbf9f4] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-1.5 mb-4">
            {navTabs.map((tab) => {
              const isActive = activeSection === tab.id;
              return (
                <a
                  key={tab.id}
                  href={tab.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#12241d] text-white'
                      : 'text-[#12241d] hover:bg-[#f3ede1]'
                  }`}
                >
                  {tab.label}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#12241d]/10 flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs text-[#4b5563] px-1">
              <span>Statut Déchèt'Lab :</span>
              <span className="font-semibold text-[#12241d]">{status.nextStatus}</span>
            </div>
            
            <a
              href={`tel:${profile.mobileRaw}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white bg-[#0d9488] hover:bg-[#0f766e]"
            >
              <Phone className="w-4 h-4" />
              <span>Appeler {profile.firstName} {profile.lastName} ({profile.mobile})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
