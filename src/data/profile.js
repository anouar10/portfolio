/**
 * Language-neutral facts. Nothing here is translated: dates, technology names,
 * links and cities read the same in every language, so they live in one place
 * and get formatted at render time by lib/format.js.
 */

import avatarPlaceholder from "../assets/avatar-placeholder.svg";

export const PROFILE = {
  name: "Hadj Salem Anwar",
  initials: "HA",
  /* ── YOUR PHOTO GOES HERE ─────────────────────────────────────────────────
   * Paste a URL, or in a real project:  import photo from "./assets/me.jpg";
   * Leave it null and the card falls back to an initials monogram, which is a
   * deliberate look rather than a broken image.
   * Best results: square crop, face centred, at least 400×400.
   * ------------------------------------------------------------------------*/
  /* Swap this for your own photo:
   *   import photo from "../assets/me.jpg";   then use  photo,
   * Square crop, face centred, 400x400 or larger. */
  photo: avatarPlaceholder,
  email: "salim.anouar10@gmail.com",
  phone: "+216 53 776 475",
  city: "Monastir",
  country: { en: "Tunisia", fr: "Tunisie" },
  linkedin: "https://linkedin.com/in/hadj-salem-anwar-943404404",
  github: "https://github.com/anouar10",
  githubHandle: "github.com/anouar10",
  yearsExperience: 4,
};

/** Roles, newest start date first. `end: null` means current. */
export const ROLES = [
  {
    id: "freelance-ai",
    company: "Freelance",
    city: "Monastir",
    start: "2026-01",
    end: null,
    mode: "remote",
    tags: ["ai", "backend"],
    stack: ["Python", "FastAPI", "Pydantic", "OpenAI / Anthropic", "LangChain", "pgvector", "Angular", "Docker"],
  },
  {
    id: "inaz",
    company: "INAZ SRL",
    city: "Monastir",
    start: "2024-07",
    end: null,
    mode: "remote",
    tags: ["frontend"],
    stack: ["Angular", "TypeScript", "REST", "Design system"],
  },
  {
    id: "sastec",
    company: "Sastec",
    city: "Sousse",
    start: "2024-02",
    end: "2024-06",
    mode: "onsite",
    tags: ["frontend"],
    stack: ["Vue.js", "React", "AngularJS", "CSS"],
  },
  {
    id: "bigup",
    company: "BIGUP-CONSEILS",
    city: "Sousse",
    start: "2023-10",
    end: "2024-01",
    mode: "onsite",
    tags: ["fullstack"],
    stack: ["Angular", "NestJS", "AWS S3", "Git"],
  },
  {
    id: "activsoft",
    company: "Activ Soft SARL",
    city: "Monastir",
    start: "2022-06",
    end: "2025-12",
    mode: "remote",
    concurrent: true,
    tags: ["fullstack"],
    stack: ["Angular", "React", ".NET", "Node.js", "Docker"],
  },
  {
    id: "bps",
    company: "Business Process Solutions",
    city: "Monastir",
    start: "2022-06",
    end: "2023-10",
    mode: "hybrid",
    tags: ["fullstack", "devops"],
    stack: ["Angular", "TypeScript", "Node.js", "PostgreSQL", "PL/pgSQL", "Kubernetes", "Grafana", "Keycloak"],
  },
  {
    id: "bps-intern",
    company: "Business Process Solutions",
    city: "Monastir",
    start: "2022-01",
    end: "2022-06",
    mode: "hybrid",
    internship: true,
    tags: ["fullstack"],
    stack: ["Angular", "Node.js", "MongoDB"],
  },
  {
    id: "tounes",
    company: "Tounes Connect",
    city: "Monastir",
    start: "2020-06",
    end: "2020-09",
    mode: "hybrid",
    internship: true,
    tags: ["fullstack"],
    stack: ["PHP", "MySQL"],
  },
  {
    id: "epidor",
    company: "L'EPI D'OR",
    city: "Monastir",
    start: "2018-05",
    end: "2018-08",
    mode: "hybrid",
    internship: true,
    tags: ["fullstack"],
    stack: ["PHP", "MySQL"],
  },
];

export const SKILL_GROUPS = [
  { id: "ai", items: ["OpenAI & Anthropic APIs", "LangChain", "RAG", "Embeddings", "pgvector", "Tool calling", "Pydantic"] },
  { id: "frontend", items: ["Angular", "TypeScript", "React.js", "Vue.js", "HTML/CSS", "Design systems"] },
  { id: "backend", items: ["Python", "FastAPI", "Node.js", "NestJS", ".NET"] },
  { id: "data", items: ["PostgreSQL", "PL/pgSQL", "MySQL", "MongoDB", "Redis", "Supabase"] },
  { id: "ops", items: ["Docker", "Kubernetes", "Jenkins", "CI/CD", "Git", "Linux", "Nginx", "Traefik", "Grafana", "AWS S3"] },
  { id: "security", items: ["Keycloak", "JWT", "OAuth2"] },
  { id: "architecture", items: ["REST APIs", "Microservices", "Clean architecture", "Agile/Scrum", "UML", "MERISE"] },
];

export const EDUCATION = [
  { id: "epi", start: "2019-09", end: "2022-06", city: "Sousse" },
  { id: "isg", start: "2016-09", end: "2018-08", city: "Sousse" },
];
