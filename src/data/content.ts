export interface Company {
  id: string;
  group: 'Siège' | 'Services' | 'Formation' | 'Réemploi' | 'Matériaux';
  category: string;
  name: string;
  place: string;
  text: string;
  href: string;
  logo: string;
  fallbackLogo?: string;
  badge?: string;
}

export interface Shot {
  id: string;
  src: string;
  fallbackSrc: string;
  alt: string;
  caption: string;
  tag: 'Déchèt\'Lab' | 'Dépose & Tri' | 'Économie Circulaire' | 'Matériaux';
  wide?: boolean;
}

export interface Faq {
  title: string;
  text: string;
}

export interface Step {
  n: string;
  title: string;
  text: string;
  badge: string;
}

export interface SiteContent {
  headings: {
    workplaceTitle: string;
    workplaceDescription: string;
    companiesTitle: string;
    companiesDescription: string;
    galleryTitle: string;
    galleryDescription: string;
    contactTitle: string;
    contactDescription: string;
  };
  profile: {
    firstName: string;
    lastName: string;
    role: string;
    subrole: string;
    employer: string;
    parentGroup: string;
    intro: string;
    email: string;
    mobile: string;
    mobileRaw: string;
    secondMobile: string;
    secondMobileRaw: string;
    desk: string;
    deskRaw: string;
    address: string;
    city: string;
    postalCode: string;
    site: string;
    groupSite: string;
    hours: string;
    openDays: string;
    scheduleNote: string;
    openingWeekdays: string;
    morningStart: string;
    morningEnd: string;
    afternoonStart: string;
    afternoonEnd: string;
    portrait: string;
    portraitFallback: string;
  };
  about: {
    title: string;
    subtitle: string;
    lead: string;
    paragraphs: string[];
    missions: {
      number: string;
      title: string;
      description: string;
    }[];
    highlights: {
      label: string;
      value: string;
      desc: string;
    }[];
  };
  steps: Step[];
  companies: Company[];
  gallery: Shot[];
  faqs: Faq[];
  marquee: string[];
}

// Media helper with proxy and direct Canva fallbacks
const canvaMedia = (file: string, width = 1400) => 
  `https://images.weserv.nl/?url=recyclaide.my.canva.site%2Fverzeri-mederic%2F_assets%2Fmedia%2F${file}&w=${width}&q=85&output=jpg`;

const directCanva = (file: string) => 
  `https://recyclaide.my.canva.site/verzeri-mederic/_assets/media/${file}`;

export const siteData: SiteContent = {
  headings: {
    workplaceTitle: "Déchèt'Lab, déchèterie pro",
    workplaceDescription: "Une déchèterie professionnelle expérimentale pour les artisans et entreprises du BTP. Objectif : simplifier le tri à la source, favoriser le réemploi solidaire et réduire durablement l’enfouissement des déchets du bâtiment dans le Beauvaisis.",
    companiesTitle: "Le groupe, comme réponse au territoire",
    companiesDescription: "Les structures fédérées par la Maison d’Économie Solidaire, du siège social au réemploi des aides techniques, des textiles et des matériaux.",
    galleryTitle: "Déchèterie pro, dépose préservante",
    galleryDescription: "Un aperçu du terrain, des gestes du tri et de la seconde vie des matériaux. La galerie complète se trouve sur une page dédiée.",
    contactTitle: "À votre écoute, pour répondre à vos besoins",
    contactDescription: "Vous avez une question concernant le Déchèt'Lab, un dépôt de chantier ou le parcours d'insertion ? Choisissez le moyen qui vous convient.",
  },
  profile: {
    firstName: "Médéric",
    lastName: "Verzeri",
    role: "Encadrant technique d’insertion en économie circulaire",
    subrole: "Déchèt'Lab · Beauvaisis",
    employer: "Déchèt'Lab",
    parentGroup: "Maison d’Économie Solidaire",
    intro: "Encadrant technique d’insertion en économie circulaire chez Déchèt'Lab, la déchèterie professionnelle du Beauvaisis portée par la Maison d’Économie Solidaire.",
    email: "m.verzeri@eco-solidaire.fr",
    mobile: "06 10 50 87 83",
    mobileRaw: "+33610508783",
    secondMobile: "07 69 29 48 12",
    secondMobileRaw: "+33769294812",
    desk: "03 75 15 04 76",
    deskRaw: "+33375150476",
    address: "17 rue Joseph Cugnot",
    city: "Beauvais",
    postalCode: "60000",
    site: "https://eco-solidaire.fr/dechetlab",
    groupSite: "https://eco-solidaire.fr",
    hours: "Lundi, mercredi et vendredi · 08h30–12h15 et 13h30–17h30",
    openDays: "Lundi, mercredi & vendredi",
    scheduleNote: "08h30 à 12h15 et 13h30 à 17h30",
    openingWeekdays: "lundi, mercredi, vendredi",
    morningStart: "08:30",
    morningEnd: "12:15",
    afternoonStart: "13:30",
    afternoonEnd: "17:30",
    portrait: canvaMedia("62414ef3627b5635834d71bc45cf81ff.png", 700),
    portraitFallback: directCanva("62414ef3627b5635834d71bc45cf81ff.png"),
  },
  about: {
    title: "Encadrant technique au Déchèt'Lab",
    subtitle: "Insertion sociale & transition écologique",
    lead: "Management de proximité, transmission et organisation d’une déchèterie qui sert à la fois l’emploi et le réemploi.",
    paragraphs: [
      "Mon rôle est d’assurer l’encadrement et l’accompagnement des salariés en insertion dans leur parcours professionnel, tout en garantissant le bon fonctionnement de la déchèterie professionnelle.",
      "J’allie management de proximité, transmission des savoir-faire et organisation des activités afin de concilier performance opérationnelle, ainsi que la sécurité."
    ],
    missions: [
      {
        number: "01",
        title: "Formation & Accompagnement",
        description: "Encadrer, former et accompagner les salariés en insertion dans le développement de leurs compétences et leur retour durable à l'emploi."
      },
      {
        number: "02",
        title: "Organisation Opérationnelle",
        description: "Organiser et coordonner les activités quotidiennes, flux et logistique de la déchèterie professionnelle."
      },
      {
        number: "03",
        title: "Accueil Professionnel BTP",
        description: "Accueillir, guider et accompagner les professionnels du bâtiment et de l'artisanat dans leurs dépôts."
      },
      {
        number: "04",
        title: "Sécurité & Qualité du Tri",
        description: "Veiller scrupuleusement au respect des consignes de sécurité, des procédures et de l'exigence de qualité du tri."
      },
      {
        number: "05",
        title: "Sensibilisation Éco-responsable",
        description: "Sensibiliser les usagers aux enjeux majeurs du réemploi, du recyclage et de l’économie circulaire locale."
      }
    ],
    highlights: [
      { label: "Spécialisation", value: "Économie circulaire", desc: "Tri préservant & revalorisation" },
      { label: "Impact", value: "Insertion sociale", desc: "Tremplin vers l'emploi durable" },
      { label: "Territoire", value: "Beauvaisis / Oise", desc: "Ancrage local fort" },
      { label: "Partenariat", value: "Artisans & BTP", desc: "Filière locale vertueuse" }
    ]
  },
  steps: [
    {
      n: "01",
      title: "S’inscrire",
      text: "L’accès des professionnels se fait après inscription auprès de Déchèt'Lab et validation des informations de votre entreprise.",
      badge: "Préalable"
    },
    {
      n: "02",
      title: "Déclarer le dépôt",
      text: "Le passage est préparé et déclaré directement dans la plateforme Valodépôt, avant d’arriver sur site.",
      badge: "Valodépôt"
    },
    {
      n: "03",
      title: "Déposer, trié",
      text: "Les apports s'effectuent les jours d’ouverture (lundi, mercredi et vendredi). Notre équipe vous oriente, sécurise le déchargement et qualifie le tri.",
      badge: "Sur site"
    }
  ],
  companies: [
    {
      id: "mes",
      group: "Siège",
      category: "Le siège social",
      name: "La Maison d’Économie Solidaire",
      place: "Pays de Bray · Oise",
      text: "Société coopérative d’intérêt collectif. Elle rassemble les structures d’insertion et porte les projets d’économie solidaire du territoire.",
      href: "https://eco-solidaire.fr",
      logo: "https://framerusercontent.com/images/EEAte3AxaVpk85g8Dwe1oKzSiHc.png?width=1475&height=1271",
      badge: "SCIC Coordonnatrice"
    },
    {
      id: "pbs",
      group: "Services",
      category: "Service d’aide à la personne",
      name: "Pays de Bray Services",
      place: "Oise & Seine-Maritime",
      text: "Mise à disposition de personnel qualifié pour accompagner les personnes en perte d’autonomie, à domicile.",
      href: "https://eco-solidaire.fr/groupe-mes/paysdebrayservice",
      logo: "https://framerusercontent.com/images/lDj1tB9ZFRxWkSQHRqrznuJP3h0.png?width=987&height=1231",
      badge: "Aide à domicile"
    },
    {
      id: "alicias",
      group: "Formation",
      category: "Formations et accompagnement",
      name: "Alicias",
      place: "Organisme de formation",
      text: "Formations qualifiantes, professionnalisantes et accompagnement socioprofessionnel des demandeurs d’emploi, des jeunes et des salariés.",
      href: "https://eco-solidaire.fr/groupe-mes/alicias",
      logo: "https://framerusercontent.com/images/TUGEAFZ9xQzI8bRfYITmxlMtlI.png?width=896&height=721",
      badge: "Formation Pro"
    },
    {
      id: "recyclerie-60",
      group: "Réemploi",
      category: "Boutique et réemploi",
      name: "La Recyclerie (Lachapelle)",
      place: "Lachapelle-aux-Pots",
      text: "Collecte, valorisation et vente solidaire, au sein du tiers-lieu Solidarium, 4 rue de la Prairie.",
      href: "https://eco-solidaire.fr/groupe-mes/la-recyclerie-du-pays-de-bray",
      logo: "https://framerusercontent.com/images/kexghhWsfgkQcWeMOSTC7iOTVdw.png?width=1324&height=1017",
      badge: "Tiers-lieu Solidarium"
    },
    {
      id: "recyclerie-76",
      group: "Réemploi",
      category: "Boutique et réemploi",
      name: "La Recyclerie (Gournay)",
      place: "Gournay-en-Bray",
      text: "Essaimage de la recyclerie à l’ESSpace 150, pôle de services de proximité, 150 route de Paris.",
      href: "https://eco-solidaire.fr/groupe-mes/nos-lieux/esspace150",
      logo: "https://framerusercontent.com/images/jeX0S55hWWxXIv4Llwr8Pi6M.png?width=1757&height=1771",
      badge: "ESSpace 150"
    },
    {
      id: "lsdb",
      group: "Matériaux",
      category: "Constructeurs de solutions",
      name: "Les Sens du Bray",
      place: "Éco-construction",
      text: "Bureau d’études et maîtrise d’œuvre pour la construction neuve, la réhabilitation et la rénovation énergétique.",
      href: "https://eco-solidaire.fr/groupe-mes/sensdubray",
      logo: "https://framerusercontent.com/images/P3NeiGDlmS2kwRqOXRAnFH2Juf4.png?width=500&height=500",
      badge: "Rénovation & Études"
    },
    {
      id: "materiosol",
      group: "Matériaux",
      category: "L’économie circulaire des matériaux",
      name: "Matériosol",
      place: "Beauvaisis",
      text: "Filière locale de réemploi des matériaux de construction, adossée à la déchèterie professionnelle Déchèt'Lab.",
      href: "https://eco-solidaire.fr/materiosol",
      logo: "https://framerusercontent.com/images/2ZwlDHGFHa0XdV0sEgV1p00EVA.png?width=889&height=866",
      badge: "Réemploi BTP"
    },
    {
      id: "recyclaide",
      group: "Réemploi",
      category: "Le réemploi des aides techniques",
      name: "Recycl'Aide Oise",
      place: "Aides techniques médicales",
      text: "Collecte, remise en état d’usage et vente à prix solidaire de fauteuils, déambulateurs et équipements médicaux de seconde main.",
      href: "https://recyclaide.fr",
      logo: "https://framerusercontent.com/images/3e34q9jiYcE1QYEWP20kE3i01Y0.png?width=800&height=800",
      badge: "Santé & Autonomie"
    },
    {
      id: "solitex",
      group: "Réemploi",
      category: "Le réemploi du textile",
      name: "Solitex'Oise",
      place: "Textiles, linge, chaussures",
      text: "Plateforme de collecte, tri et revalorisation textile dans l’Oise, en convention avec l’éco-organisme Refashion.",
      href: "https://www.solitex-oise.com/",
      logo: "https://framerusercontent.com/images/ZBZxwwLJ1xBLjfbpvWUEl6Q4Ic.jpg?width=1755&height=1405",
      badge: "Filière Refashion"
    }
  ],
  gallery: [
    {
      id: "g1",
      src: canvaMedia("468e7b70d1a701296d5da3cfad9d1f00.jpg", 1600),
      fallbackSrc: directCanva("468e7b70d1a701296d5da3cfad9d1f00.jpg"),
      alt: "Vue du site Déchèt'Lab à Beauvais",
      caption: "Déchèt'Lab — déchèterie professionnelle du Beauvaisis",
      tag: "Déchèt'Lab",
      wide: true
    },
    {
      id: "g2",
      src: canvaMedia("eff694173c78095d7258e3073f104868.jpg", 1200),
      fallbackSrc: directCanva("eff694173c78095d7258e3073f104868.jpg"),
      alt: "Dépose préservante sur site",
      caption: "Dépose préservante et orientation des matières",
      tag: "Dépose & Tri"
    },
    {
      id: "g3",
      src: canvaMedia("49f9c185918cef650e0900106db6ccb0.jpg", 1200),
      fallbackSrc: directCanva("49f9c185918cef650e0900106db6ccb0.jpg"),
      alt: "Tri des matériaux de construction",
      caption: "Qualification et valorisation des apports BTP",
      tag: "Matériaux"
    },
    {
      id: "g4",
      src: canvaMedia("77c639b4c0a15f94967ab36c5ffff862.jpg", 1600),
      fallbackSrc: directCanva("77c639b4c0a15f94967ab36c5ffff862.jpg"),
      alt: "Économie circulaire des matériaux",
      caption: "Économie circulaire des matériaux et chaîne du réemploi",
      tag: "Économie Circulaire",
      wide: true
    },
    {
      id: "g5",
      src: canvaMedia("af664998db300d52df57c30dd68c7e33.jpg", 1200),
      fallbackSrc: directCanva("af664998db300d52df57c30dd68c7e33.jpg"),
      alt: "Atelier de tri et réemploi",
      caption: "Atelier et valorisation des gisements",
      tag: "Dépose & Tri"
    },
    {
      id: "g6",
      src: canvaMedia("f4891a6416110c10180e2dc5e18d6a0a.jpg", 1200),
      fallbackSrc: directCanva("f4891a6416110c10180e2dc5e18d6a0a.jpg"),
      alt: "Conditionnement des matériaux réutilisables",
      caption: "Conditionnement des flux pour la seconde vie",
      tag: "Matériaux"
    },
    {
      id: "g7",
      src: canvaMedia("4e0fa9198377abef16c2ce50fa7f277b.png", 1400),
      fallbackSrc: directCanva("4e0fa9198377abef16c2ce50fa7f277b.png"),
      alt: "Signalétique et accueil Déchèt'Lab",
      caption: "Déchèt'Lab — Signalétique et accueil des artisans",
      tag: "Déchèt'Lab"
    },
    {
      id: "g8",
      src: canvaMedia("59af670f85cbe3bb1fb1b3acf4c34e45.png", 1400),
      fallbackSrc: directCanva("59af670f85cbe3bb1fb1b3acf4c34e45.png"),
      alt: "Zone de dépose préservante",
      caption: "Bennes et modules de stockage préservant",
      tag: "Dépose & Tri"
    },
    {
      id: "g9",
      src: canvaMedia("f184726d58311ea89655434d0a402c96.png", 1400),
      fallbackSrc: directCanva("f184726d58311ea89655434d0a402c96.png"),
      alt: "Vue globale des installations",
      caption: "Installations de dépose et tri du Beauvaisis",
      tag: "Déchèt'Lab",
      wide: true
    }
  ],
  faqs: [
    {
      title: "Déchets acceptés",
      text: "Déchèt'Lab est pensé pour les artisans et entreprises du BTP. On y dépose des déchets et matériaux de chantier destinés au tri et au réemploi : bois, plâtre, isolants, carrelage, menuiseries, métaux, etc. Le tout-venant (DIB) n’entre pas dans la gratuité. La liste à jour est confirmée lors de votre inscription."
    },
    {
      title: "Inscription & compte",
      text: "L’accès des professionnels se fait après inscription préalable. Le dépôt est ensuite déclaré simplement dans la plateforme Valodépôt avant le passage. La démarche complète est disponible sur la page Déchèt'Lab de la Maison d’Économie Solidaire."
    },
    {
      title: "Modalités de dépôt",
      text: "Les apports s'effectuent les jours d’ouverture (lundi, mercredi et vendredi), idéalement déjà triés dans vos véhicules ou remorques. L’équipe vous accueille, sécurise et oriente le déchargement, tout en veillant à la conformité et à la qualité du tri."
    },
    {
      title: "Horaires & fonctionnement",
      text: "Ouverture le lundi, le mercredi et le vendredi, de 08h30 à 12h15 et de 13h30 à 17h30. Adresse : 17 rue Joseph Cugnot, 60000 Beauvais. En dehors de ces créneaux, un simple appel ou un e-mail permet d'anticiper et préparer votre venue."
    },
    {
      title: "Tarifs & conditions",
      text: "Le dépôt des matières valorisables est gratuit pour les professionnels du BTP selon les filières agréées (hors tout-venant / DIB soumis à barème). Les conditions tarifaires précises et barèmes vous sont confirmés dès l’inscription."
    },
    {
      title: "Réemploi & Matériosol",
      text: "Les matériaux encore utilisables sont soigneusement triés, nettoyés et préparés par Matériosol, puis remis à disposition à prix solidaires. Déchèt'Lab et Matériosol constituent une véritable boucle vertueuse locale : de la dépose sur chantier à la seconde vie."
    },
    {
      title: "Autre question ou projet d'insertion ?",
      text: "Professionnels du BTP, partenaires institutionnels, prescripteurs de l'emploi ou personnes souhaitant rejoindre notre parcours d'insertion : contactez directement Médéric Verzeri par téléphone (06 10 50 87 83 ou 07 69 29 48 12) ou par e-mail (m.verzeri@eco-solidaire.fr)."
    }
  ],
  marquee: [
    "Réemploi",
    "Insertion Professionnelle",
    "Tri à la source",
    "Sécurité & Prévention",
    "Transmission des Savoir-Faire",
    "Économie Circulaire",
    "Beauvaisis",
    "Seconde Vie des Matériaux",
    "Dépose Préservante",
    "BTP Responsable"
  ]
};

// Opening hours are evaluated in Paris time, including the lunch break.
export function isDechetLabOpen(now = new Date(), profile: SiteContent['profile'] = siteData.profile): { isOpen: boolean; nextStatus: string } {
  try {
    const options: Intl.DateTimeFormatOptions = { 
      timeZone: 'Europe/Paris', 
      weekday: 'long',
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: false 
    };
    const formatter = new Intl.DateTimeFormat('fr-FR', options);
    const parts = formatter.formatToParts(now);
    
    let day = '';
    let hour = 0;
    let minute = 0;

    for (const p of parts) {
      if (p.type === 'weekday') day = p.value.toLowerCase();
      if (p.type === 'hour') hour = parseInt(p.value, 10);
      if (p.type === 'minute') minute = parseInt(p.value, 10);
    }

    const currentMinutes = hour * 60 + minute;
    const minutes = (value: string | undefined, fallback: string) => {
      const [hours, mins] = (value || fallback).split(':').map(Number);
      return Number.isFinite(hours) && Number.isFinite(mins) ? hours * 60 + mins : 0;
    };
    const displayTime = (value: string | undefined, fallback: string) => (value || fallback).replace(':', 'h');
    const morningStart = minutes(profile.morningStart, '08:30');
    const morningEnd = minutes(profile.morningEnd, '12:15');
    const afternoonStart = minutes(profile.afternoonStart, '13:30');
    const afternoonEnd = minutes(profile.afternoonEnd, '17:30');
    const openDays = (profile.openingWeekdays || 'lundi, mercredi, vendredi').toLowerCase().split(',').map(d => d.trim());
    const weekdayOrder = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const currentDayIndex = weekdayOrder.indexOf(day);

    const nextDay = () => {
      for (let offset = 1; offset <= 7; offset++) {
        const candidate = weekdayOrder[(currentDayIndex + offset) % 7];
        if (openDays.includes(candidate)) return candidate;
      }
      return 'lundi';
    };

    if (openDays.includes(day)) {
      if (
        (currentMinutes >= morningStart && currentMinutes < morningEnd) ||
        (currentMinutes >= afternoonStart && currentMinutes < afternoonEnd)
      ) {
        return {
          isOpen: true,
          nextStatus: `Ouvert aujourd'hui jusqu'à ${currentMinutes < morningEnd ? displayTime(profile.morningEnd, '12:15') : displayTime(profile.afternoonEnd, '17:30')}`
        };
      }
      if (currentMinutes < morningStart) {
        return {
          isOpen: false,
          nextStatus: `Ouvre aujourd'hui à ${displayTime(profile.morningStart, '08:30')}`
        };
      }
      if (currentMinutes >= morningEnd && currentMinutes < afternoonStart) {
        return {
          isOpen: false,
          nextStatus: `Pause méridienne · Réouverture à ${displayTime(profile.afternoonStart, '13:30')}`
        };
      }
      return {
        isOpen: false,
        nextStatus: `Fermé · Prochain créneau ${nextDay()} à ${displayTime(profile.morningStart, '08:30')}`
      };
    }

    return {
      isOpen: false,
      nextStatus: `Fermé aujourd'hui · Prochain créneau ${nextDay()} à ${displayTime(profile.morningStart, '08:30')}`
    };
  } catch {
    return {
      isOpen: false,
      nextStatus: "Lundi, mercredi & vendredi · 08h30-12h15 et 13h30-17h30"
    };
  }
}

// Generate vCard download
export function generateVCard(profile: SiteContent["profile"]): string {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${profile.lastName};${profile.firstName};;;`,
    `FN:${profile.firstName} ${profile.lastName}`,
    `TITLE:${profile.role}`,
    `ORG:${profile.employer} - ${profile.parentGroup}`,
    `TEL;TYPE=CELL:${profile.mobileRaw}`,
    `TEL;TYPE=CELL:${profile.secondMobileRaw}`,
    `TEL;TYPE=WORK:${profile.deskRaw}`,
    `EMAIL:${profile.email}`,
    `URL:${profile.site}`,
    `ADR;TYPE=WORK:;;${profile.address};${profile.city};;${profile.postalCode};France`,
    `NOTE:Encadrant technique d'insertion en économie circulaire - Horaires : ${profile.hours}`,
    "END:VCARD"
  ].join("\r\n");
}
