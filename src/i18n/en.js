import { PROFILE } from "../data/profile.js";

export const en = {
  cvFile: "/cv/CV-Hadj-Salem-Anwar-EN.pdf",
  htmlLang: "en",
  tagline: "Full-Stack Engineer",
  subtitle: "Frontend, backend & LLM integration",
  nav: { work: "Work", skills: "Skills", education: "Education", contact: "Contact" },
  a11y: { theme: "Switch colour theme", lang: "Switch language", expand: "Show details", menu: "Menu" },
  hero: {
    lead: "I build the software companies run on.",
    body: `ERP platforms, invoicing and tax systems, e-commerce and industrial tools — ${PROFILE.yearsExperience}+ years of them. Angular and TypeScript on the front, Python, Node.js and .NET behind, PostgreSQL underneath, and I ship and run it myself.`,
    now: "Right now I'm putting LLMs on top of that: document extraction, retrieval over business documents, assistants that query relational data through tools.",
    cta: "See the work",
    ctaAlt: "Email me",
    ctaCv: "Download CV",
  },
  record: { role: "Role", based: "Based", languages: "Languages", focus: "Focus", available: "Available" },
  recordValues: {
    based: `${PROFILE.city}, Tunisia — remote, EU hours`,
    languages: "Arabic, French, English",
    focus: "Business systems + applied LLMs",
    available: "Open to remote roles",
  },
  sections: {
    work: { eyebrow: "Experience", title: "{n} records", note: "Filter by what you're hiring for. Click a row for detail." },
    skills: { eyebrow: "Stack", title: "What I reach for", note: "" },
    education: { eyebrow: "Education", title: "Where it started", note: "" },
    contact: { eyebrow: "Contact", title: "Let's talk", note: "" },
  },
  filters: { all: "Everything", ai: "AI / LLM", frontend: "Frontend", fullstack: "Full-stack", devops: "DevOps" },
  skillGroups: {
    ai: "AI / LLM", frontend: "Frontend", backend: "Backend", data: "Databases",
    ops: "DevOps & tools", security: "Security & auth", architecture: "Architecture",
  },
  modes: { remote: "Remote", hybrid: "Hybrid", onsite: "On-site" },
  labels: {
    present: "Present", internship: "Internship", concurrent: "Part-time, alongside the roles above",
    stack: "Stack", empty: "No roles match that filter yet.", emptyHint: "Try 'Everything'.",
  },
  contact: { lead: "The fastest way to reach me is email. I reply within a day.", email: "Email", phone: "Phone", elsewhere: "Elsewhere" },
  footer: "Built with React. Content from my CV — available in English and French.",
  roles: {
    "freelance-ai": {
      title: "Full-Stack Engineer (AI)",
      summary: "LLM-powered services and agentic workflows — Python back-ends with web front-ends.",
      bullets: [
        "Invoice extraction API — PDF invoices to structured data via LLM, validated with Pydantic (FastAPI).",
        "RAG over business documents — semantic search on PostgreSQL/pgvector, with source citations.",
        "Agentic assistant — answers natural-language questions over relational data via tool calling.",
        "Angular front-ends over Python services, containerised with Docker.",
      ],
    },
    inaz: {
      title: "Senior Frontend Developer",
      summary: "",
      bullets: [
        "Build and maintain application modules of INAZ's ERP platform for the Italian market, in Angular and TypeScript.",
        "Work inside the company's internal component library and design system, extending shared components.",
        "Implement data-heavy interfaces — forms, tables and reporting views — over REST APIs.",
      ],
    },
    sastec: {
      title: "Frontend Developer",
      summary: "",
      bullets: [
        "Front-end development (Vue.js, React, AngularJS) on a live streaming and video-on-demand platform for international organisations, including UNESCO.",
      ],
    },
    bigup: {
      title: "Full-Stack Engineer",
      summary: "",
      bullets: [
        "Built an HR web application for attendance and leave: check-in/check-out, approval workflow with automatic leave balances, and role-based access (employees, managers, HR).",
      ],
    },
    activsoft: {
      title: "Full-Stack Engineer · Freelance",
      summary: "",
      bullets: [
        "Built complete e-commerce platforms, from the catalogue to the admin back-office.",
        "Front-ends in Angular and React, back-end APIs in .NET and Node.js.",
        "Deployment with Docker.",
      ],
    },
    bps: {
      title: "Full-Stack Engineer",
      summary: "",
      bullets: [
        "Full-stack work across several business applications: an invoicing platform (Angular + Node.js REST API), a withholding tax application, and a survey & statistics platform.",
        "Designed PostgreSQL schemas and wrote PL/pgSQL functions.",
        "DevOps: Docker, Kubernetes, Grafana, Keycloak.",
      ],
    },
    "bps-intern": {
      title: "Full-Stack Engineer",
      summary: "",
      bullets: [
        "Parking management web application: real-time occupancy, vehicle entry/exit records, Node.js REST API and a MongoDB data model with automatic fee calculation and role-based access.",
      ],
    },
    tounes: {
      title: "PHP Developer",
      summary: "",
      bullets: [
        "Client–coach booking platform: profiles, search, session booking with email confirmation, and an admin back-office.",
      ],
    },
    epidor: {
      title: "PHP Developer",
      summary: "",
      bullets: [
        "Weighbridge application for truck weighing: gross/tare/net calculation and weighing-ticket history per vehicle and supplier.",
      ],
    },
  },
  education: {
    epi: {
      degree: "Computer Engineering",
      school: "Private Engineering School (EPI)",
      detail: "Software development, systems design and networking, with practical work in Java, Python and Django and an introduction to AI concepts. Solid grounding in Agile/Scrum, UML and Merise analysis.",
    },
    isg: {
      degree: "Applied Degree in Management Information Technology",
      school: "Higher Institute of Management, Sousse",
      detail: "Information systems, software development and systems analysis, with practical work in C++, Java and Java EE (Servlets).",
    },
  },
};
