import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { DechetLabSection } from './components/DechetLabSection';
import { CompaniesSection } from './components/CompaniesSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPage } from './components/AdminPage';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const galleryPage = new URLSearchParams(window.location.search).get('page') === 'galerie';
  const adminPage = new URLSearchParams(window.location.search).get('page') === 'admin';
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (adminPage) return <AdminPage />;

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4] text-[#12241d] selection:bg-[#0d9488]/20 selection:text-[#0d9488]">
      
      {/* Sticky Modern Navbar with exact tabs */}
      <Navbar galleryPage={galleryPage} />

      {/* Main Content */}
      <main className="flex-1">
        {galleryPage ? (
          <GallerySection fullPage />
        ) : (
          <>
            <Hero />
            <AboutSection />
            <DechetLabSection />
            <CompaniesSection />
            <GallerySection />
            <ContactSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer galleryPage={galleryPage} />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2.5">
        
        {/* Scroll To Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white text-[#12241d] hover:text-[#0d9488] border border-[#12241d]/15 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
}
