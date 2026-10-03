import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Download, 
  Copy, 
  Check, 
  ChevronDown, 
  Send, 
  Sparkles, 
  Building2, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { generateVCard } from '../data/content';
import { useSite } from '../data/siteStore';

export const ContactSection: React.FC = () => {
  const { profile, faqs, headings } = useSite().content;
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form State
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: 'Dépôt de matériaux BTP',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0d9488]/10 text-[#0d9488] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            05 — Contactez-nous
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12241d] tracking-tight">
            {headings?.contactTitle}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#4b5563]">
            {headings?.contactDescription}
          </p>
        </div>

        {/* 2 Columns: Contact Cards & Form / FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <h3 className="font-heading text-xl font-bold text-[#12241d] mb-4">
              Coordonnées directes
            </h3>

            {/* Mobile Card */}
            <div className="p-5 rounded-2xl bg-[#fbf9f4] border border-[#12241d]/10 hover:border-[#0d9488]/40 transition-colors shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#0d9488]/10 text-[#0d9488]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Mobile direct</span>
                    <a
                      href={`tel:${profile.mobileRaw}`}
                      className="block font-heading font-extrabold text-lg text-[#12241d] hover:text-[#0d9488] transition-colors"
                    >
                      {profile.mobile}
                    </a>
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${profile.secondMobileRaw}`}
                        className="font-heading font-extrabold text-lg text-[#12241d] hover:text-[#0d9488] transition-colors"
                      >
                        {profile.secondMobile}
                      </a>
                      <button
                        onClick={() => handleCopy(profile.secondMobile, 'secondMobile')}
                        className="p-1 text-slate-400 hover:text-[#0d9488]"
                        title="Copier le deuxième mobile"
                        aria-label="Copier le deuxième mobile"
                      >
                        {copiedItem === 'secondMobile' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(profile.mobile, 'mobile')}
                  className="p-2 rounded-lg text-slate-400 hover:text-[#0d9488] hover:bg-white transition-colors"
                  title="Copier le numéro"
                >
                  {copiedItem === 'mobile' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-[#6b7280] mt-2.5">
                Deux mobiles pour appeler ou envoyer un SMS directement à Médéric Verzeri.
              </p>
            </div>

            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-[#fbf9f4] border border-[#12241d]/10 hover:border-[#0d9488]/40 transition-colors shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#0d9488]/10 text-[#0d9488]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Courriel professionnel</span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="block font-heading font-bold text-sm sm:text-base text-[#12241d] hover:text-[#0d9488] transition-colors truncate"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(profile.email, 'email')}
                  className="p-2 rounded-lg text-slate-400 hover:text-[#0d9488] hover:bg-white transition-colors shrink-0"
                  title="Copier le courriel"
                >
                  {copiedItem === 'email' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-[#6b7280] mt-2.5">
                Réponse rapide pour vos déclarations, devis ou partenariats.
              </p>
            </div>

            {/* Standard Landline Card */}
            <div className="p-5 rounded-2xl bg-[#fbf9f4] border border-[#12241d]/10 hover:border-[#0d9488]/40 transition-colors shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#12241d]/5 text-[#12241d]">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Standard Déchèt'Lab</span>
                  <a
                    href={`tel:${profile.deskRaw}`}
                    className="block font-heading font-bold text-base text-[#12241d] hover:text-[#0d9488]"
                  >
                    {profile.desk} <span className="text-xs font-normal text-slate-500">(choix 1)</span>
                  </a>
                  <p className="text-xs text-[#6b7280] mt-0.5">Demander Médéric Verzeri.</p>
                </div>
              </div>
            </div>

            {/* Location & Hours Card */}
            <div className="p-5 rounded-2xl bg-[#fbf9f4] border border-[#12241d]/10 shadow-sm space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0d9488] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#12241d]">{profile.employer}</p>
                  <p className="text-xs text-[#4b5563]">{profile.address}, {profile.postalCode} {profile.city}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${profile.address} ${profile.city}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#0d9488] font-bold hover:underline mt-1"
                  >
                    <span>Itinéraire Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-[#12241d]/10 flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#0d9488] shrink-0 mt-0.5" />
                <div className="text-xs text-[#4b5563]">
                  <p className="font-bold text-[#12241d]">{profile.openDays}</p>
                  <p>{profile.scheduleNote}</p>
                </div>
              </div>
            </div>

            {/* vCard Button */}
            <button
              onClick={handleDownloadVCard}
              className="w-full py-3.5 px-4 rounded-xl bg-[#12241d] hover:bg-[#0d9488] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Download className="w-4 h-4 text-[#14b8a6]" />
              <span>Télécharger la fiche contact numérique (.vcf)</span>
            </button>

          </div>

          {/* Right Column: Contact Form & FAQ Accordion (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Interactive Form */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#fbf9f4] border border-[#12241d]/10 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-[#12241d] mb-2">
                Envoyer un message en ligne
              </h3>
              <p className="text-xs sm:text-sm text-[#4b5563] mb-6">
                Préparez votre message, puis confirmez son envoi dans votre messagerie.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-emerald-900">
                    Votre message est prêt
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                    Cliquez sur le bouton ci-dessous, puis envoyez le message depuis votre application de messagerie. Rien n'a encore été envoyé.
                  </p>
                  <div className="pt-2">
                    <a
                      href={`mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Nom: ${form.name}\nEntreprise: ${form.company}\nE-mail: ${form.email}\nTéléphone: ${form.phone}\n\nMessage:\n${form.message}`)}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Ouvrir dans mon logiciel de messagerie</span>
                    </a>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        subject: 'Dépôt de matériaux BTP',
                        message: ''
                      });
                    }}
                    className="block text-xs text-slate-500 hover:text-slate-800 underline mx-auto mt-2"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#12241d] mb-1">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jean Dupont"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#12241d]/15 bg-white text-sm text-[#12241d] focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#12241d] mb-1">
                        Entreprise / Structure
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Entreprise BTP, artisan, prescripteur..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#12241d]/15 bg-white text-sm text-[#12241d] focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#12241d] mb-1">
                        Adresse e-mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jean@exemple.fr"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#12241d]/15 bg-white text-sm text-[#12241d] focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#12241d] mb-1">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="06 00 00 00 00"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#12241d]/15 bg-white text-sm text-[#12241d] focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#12241d] mb-1">
                      Objet de votre demande
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#12241d]/15 bg-white text-sm text-[#12241d] focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
                    >
                      <option value="Dépôt de matériaux BTP">Dépôt de matériaux BTP / Artisans</option>
                      <option value="Inscription Déchèt'Lab">Inscription & compte Valodépôt</option>
                      <option value="Insertion Professionnelle">Parcours d'insertion & Emploi</option>
                      <option value="Réemploi & Matériosol">Réemploi des matériaux (Matériosol)</option>
                      <option value="Autre demande">Autre question ou partenariat</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#12241d] mb-1">
                      Votre message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Précisez votre demande, vos types de matériaux ou votre question..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#12241d]/15 bg-white text-sm text-[#12241d] focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#12241d] to-[#1a382e] hover:from-[#0d9488] hover:to-[#0f766e] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all duration-200"
                  >
                    <Send className="w-4 h-4 text-[#14b8a6]" />
                    <span>Envoyer mon message</span>
                  </button>
                </form>
              )}
            </div>

            {/* Questions Fréquentes Accordion */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-[#0d9488]" />
                <h3 className="font-heading text-xl font-bold text-[#12241d]">
                  Questions Fréquentes & Modalités
                </h3>
              </div>

              <div className="space-y-2.5">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-[#12241d]/10 bg-white overflow-hidden transition-all duration-200"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-[#12241d] hover:text-[#0d9488] transition-colors"
                      >
                        <span>{faq.title}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#0d9488]' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 text-xs sm:text-sm text-[#4b5563] leading-relaxed border-t border-slate-100 pt-3">
                          {faq.text}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
