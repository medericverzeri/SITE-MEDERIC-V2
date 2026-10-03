import React from 'react';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { useSite } from '../data/siteStore';
import { FileDownloadButton } from './FileDownloadButton';

interface FooterProps { galleryPage?: boolean; }

export const Footer: React.FC<FooterProps> = ({ galleryPage = false }) => {
  const { profile } = useSite().content;

  return (
    <footer className="bg-[#12241d] text-white pt-14 pb-10 border-t border-[#12241d]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Identity & Mission (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-[#2dd4bf] flex items-center justify-center font-heading font-extrabold text-lg border border-white/10">
                MV
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-lg text-white">
                  {profile.lastName.toUpperCase()} {profile.firstName}
                </h4>
                <p className="text-xs text-[#2dd4bf]">
                  {profile.role}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              Déchèt'Lab, la déchèterie professionnelle du Beauvaisis portée par la Maison d’Économie Solidaire. 
              Favoriser l'insertion sociale et la transition écologique par le tri et le réemploi.
            </p>

            <FileDownloadButton />

          </div>

          {/* Exact 5 Navigation Tabs (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
              Navigation
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href={galleryPage ? './#accueil' : '#accueil'} className="text-slate-300 hover:text-[#2dd4bf] transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href={galleryPage ? './#a-propos' : '#a-propos'} className="text-slate-300 hover:text-[#2dd4bf] transition-colors">
                  A propos de moi
                </a>
              </li>
              <li>
                <a href={galleryPage ? './#nos-entreprises' : '#nos-entreprises'} className="text-slate-300 hover:text-[#2dd4bf] transition-colors">
                  Nos entreprises
                </a>
              </li>
              <li>
                <a href={galleryPage ? '?page=galerie' : '#galerie'} className="text-slate-300 hover:text-[#2dd4bf] transition-colors">
                  Galerie
                </a>
              </li>
              <li>
                <a href={galleryPage ? './#contact' : '#contact'} className="text-slate-300 hover:text-[#2dd4bf] transition-colors">
                  Contactez-nous
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Contact & Address (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h5 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
              Coordonnées
            </h5>
            
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#2dd4bf] shrink-0" />
                <a href={`tel:${profile.mobileRaw}`} className="hover:text-white font-semibold">
                  {profile.mobile}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#2dd4bf] shrink-0" />
                <a href={`tel:${profile.secondMobileRaw}`} className="hover:text-white font-semibold">
                  {profile.secondMobile}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#2dd4bf] shrink-0" />
                <a href={`mailto:${profile.email}`} className="hover:text-white truncate">
                  {profile.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2dd4bf] shrink-0 mt-0.5" />
                <span>
                  {profile.employer} · {profile.address}, {profile.postalCode} {profile.city}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={profile.groupSite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#2dd4bf] hover:underline font-semibold"
              >
                <span>Maison d’Économie Solidaire (eco-solidaire.fr)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Médéric Verzeri · Déchèt'Lab · Maison d'Économie Solidaire. Tous droits réservés.
          </p>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <a href="?page=admin" className="text-slate-300 hover:text-[#2dd4bf]">Espace admin</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
