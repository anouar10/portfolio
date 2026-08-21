import { PROFILE } from "../data/profile.js";

export const fr = {
  cvFile: "/cv/CV-Hadj-Salem-Anwar-FR.pdf",
  htmlLang: "fr",
  tagline: "Ingénieur Full-Stack",
  subtitle: "Frontend, backend & intégration LLM",
  nav: { work: "Parcours", skills: "Compétences", education: "Formation", contact: "Contact" },
  a11y: { theme: "Changer de thème", lang: "Changer de langue", expand: "Voir le détail", menu: "Menu" },
  hero: {
    lead: "Je construis les logiciels qui font tourner les entreprises.",
    body: `Plateformes ERP, systèmes de facturation et de fiscalité, e-commerce et outils industriels — plus de ${PROFILE.yearsExperience} ans. Angular et TypeScript devant, Python, Node.js et .NET derrière, PostgreSQL en base, et je déploie et j'exploite moi-même.`,
    now: "Aujourd'hui j'ajoute les LLM par-dessus : extraction documentaire, recherche sur documents métier, assistants qui interrogent des données relationnelles via des outils.",
    cta: "Voir le parcours",
    ctaAlt: "M'écrire",
    ctaCv: "Télécharger le CV",
  },
  record: { role: "Poste", based: "Basé à", languages: "Langues", focus: "Spécialité", available: "Disponibilité" },
  recordValues: {
    based: `${PROFILE.city}, Tunisie — à distance, horaires UE`,
    languages: "Arabe, français, anglais",
    focus: "Systèmes métier + LLM appliqués",
    available: "Ouvert aux postes à distance",
  },
  sections: {
    work: { eyebrow: "Expérience", title: "{n} entrées", note: "Filtrez selon ce que vous recherchez. Cliquez sur une ligne pour le détail." },
    skills: { eyebrow: "Stack", title: "Ce que j'utilise", note: "" },
    education: { eyebrow: "Formation", title: "Le point de départ", note: "" },
    contact: { eyebrow: "Contact", title: "Parlons-en", note: "" },
  },
  filters: { all: "Tout", ai: "IA / LLM", frontend: "Frontend", fullstack: "Full-stack", devops: "DevOps" },
  skillGroups: {
    ai: "IA / LLM", frontend: "Frontend", backend: "Backend", data: "Bases de données",
    ops: "DevOps & outils", security: "Sécurité & authentification", architecture: "Architecture",
  },
  modes: { remote: "À distance", hybrid: "Hybride", onsite: "Sur site" },
  labels: {
    present: "Aujourd'hui", internship: "Stage", concurrent: "Temps partiel, en parallèle des postes ci-dessus",
    stack: "Technologies", empty: "Aucun poste ne correspond à ce filtre.", emptyHint: "Essayez « Tout ».",
  },
  contact: { lead: "Le plus rapide reste l'e-mail. Je réponds sous 24 heures.", email: "E-mail", phone: "Téléphone", elsewhere: "Ailleurs" },
  footer: "Réalisé avec React. Contenu issu de mon CV — disponible en français et en anglais.",
  roles: {
    "freelance-ai": {
      title: "Ingénieur Full-Stack (IA)",
      summary: "Services basés sur les LLM et workflows agentiques — back-ends Python avec front-ends web.",
      bullets: [
        "API d'extraction de factures — factures PDF vers données structurées via LLM, validées par Pydantic (FastAPI).",
        "RAG sur documents métier — recherche sémantique sur PostgreSQL/pgvector, avec citation des sources.",
        "Assistant agentique — répond à des questions en langage naturel sur des données relationnelles via l'appel d'outils.",
        "Front-ends Angular au-dessus des services Python, conteneurisés avec Docker.",
      ],
    },
    inaz: {
      title: "Développeur Frontend Senior",
      summary: "",
      bullets: [
        "Développement et maintenance de modules applicatifs de la plateforme ERP d'INAZ pour le marché italien, en Angular et TypeScript.",
        "Travail avec la bibliothèque de composants et le design system internes, en étendant les composants partagés.",
        "Réalisation d'interfaces à forte densité de données — formulaires, tableaux et vues de reporting — au-dessus d'API REST.",
      ],
    },
    sastec: {
      title: "Développeur Frontend",
      summary: "",
      bullets: [
        "Développement front-end (Vue.js, React, AngularJS) d'une plateforme de streaming en direct et de vidéo à la demande pour des organisations internationales, dont l'UNESCO.",
      ],
    },
    bigup: {
      title: "Ingénieur Full-Stack",
      summary: "",
      bullets: [
        "Développement d'une application web RH de gestion des présences et des congés : pointage entrée/sortie, workflow de validation avec calcul automatique des soldes, et accès par rôle (employés, managers, RH).",
      ],
    },
    activsoft: {
      title: "Ingénieur Full-Stack · Freelance",
      summary: "",
      bullets: [
        "Développement de plateformes e-commerce complètes, du catalogue au back-office d'administration.",
        "Front-ends en Angular et React, API back-end en .NET et Node.js.",
        "Déploiement avec Docker.",
      ],
    },
    bps: {
      title: "Ingénieur Full-Stack",
      summary: "",
      bullets: [
        "Travail full-stack sur plusieurs applications métier : une plateforme de facturation (Angular + API REST Node.js), une application de retenue à la source, et une plateforme d'enquêtes et de statistiques.",
        "Conception des schémas PostgreSQL et écriture de fonctions PL/pgSQL.",
        "DevOps : Docker, Kubernetes, Grafana, Keycloak.",
      ],
    },
    "bps-intern": {
      title: "Ingénieur Full-Stack",
      summary: "",
      bullets: [
        "Application web de gestion de parking : occupation en temps réel, enregistrement des entrées/sorties de véhicules, API REST Node.js et modèle de données MongoDB avec calcul automatique des tarifs et accès par rôle.",
      ],
    },
    tounes: {
      title: "Développeur PHP",
      summary: "",
      bullets: [
        "Plateforme de mise en relation clients–coachs : profils, recherche, réservation de séances avec confirmation par e-mail, et back-office d'administration.",
      ],
    },
    epidor: {
      title: "Développeur PHP",
      summary: "",
      bullets: [
        "Application de pont-bascule pour la pesée de camions : calcul brut/tare/net et historique des tickets de pesée par véhicule et par fournisseur.",
      ],
    },
  },
  education: {
    epi: {
      degree: "Cycle d'ingénieur en Informatique",
      school: "École Privée d'Ingénierie (EPI)",
      detail: "Développement logiciel, conception de systèmes et réseaux, avec une pratique de Java, Python et Django et une introduction aux concepts de l'IA. Bases solides en Agile/Scrum, UML et analyse Merise.",
    },
    isg: {
      degree: "Licence appliquée en Informatique de Gestion",
      school: "Institut Supérieur de Gestion de Sousse",
      detail: "Systèmes d'information, développement logiciel et analyse des systèmes, avec une pratique de C++, Java et Java EE (Servlets).",
    },
  },
};
