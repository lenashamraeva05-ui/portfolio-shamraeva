import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import PortfolioHeader from "./components/PortfolioHeader";
import ProjectCaseTabs, { type ProjectCaseData } from "./components/ProjectCaseTabs";
import SideRays from "../components/SideRays";
import HeroBlurText from "./components/HeroBlurText";
import DriftWallSection from "./components/DriftWallSection";

type Project = ProjectCaseData & {
  id: string;
  summary: string;
  role: string;
  tags: string[];
};

const projects: Project[] = [
  {
    id: "01",
    slug: "t-bank-statist",
    title: "T-Bank Statist",
    eyebrow: "A digital bank and financial ecosystem",
    summary: "Product design for a complex analytics environment where data, telemetry and daily decisions meet.",
    role: "Product Designer · UX/UI · Data-heavy workflows",
    status: "NDA · public context only",
    tags: ["Fintech", "Analytics platform", "Enterprise product", "NDA"],
    cover: "/projects/tbank-statist-hero.png",
    coverAlt: "Abstract analytics and product data visual for T-Bank Statist",
    overviewVideo: "/projects/t-bank-overview.webm",
    challenge: "Help different teams navigate a dense analytics ecosystem without flattening the expert detail they rely on.",
    direction: "I worked on product design for Statist, T‑Bank’s internal product-analytics tool. Statist brings product signals into one place so teams can understand what is happening, interpret patterns and make better decisions. The challenge was to make a complex, data-heavy system feel clear and useful without hiding the detail expert teams depend on. I participated in preparing Statist for a future market launch; for now, it remains an internal T‑Bank tool.",
    directionHighlights: [
      "internal product-analytics tool",
      "brings product signals into one place",
      "make better decisions",
      "complex, data-heavy system feel clear and useful",
      "preparing Statist for a future market launch",
    ],
    directionLinks: [
      { label: "What is Statist?", url: "https://www.tbank.ru/software/statist/" },
      { label: "Statist at T‑Bank", url: "https://www.tbank.ru/career/technologies/statist/" },
    ],
    result: "T‑Bank brings banking, payments and everyday services together in one connected ecosystem.",
    metrics: [
      { value: "55M+", label: "customers · chose T‑Bank" },
    ],
    overviewDetails: {
      companyDescription: "T‑Bank is a digital bank and financial ecosystem built around everyday services — from payments and cards to investments, travel and more.",
      companyUrl: "https://www.tbank.ru/",
      internship: "May–Sep 2026 · 3 months",
      focus: ["Learning by doing", "Working across the ecosystem", "Building a component library", "Pages & research", "Simplifying workflows"],
    },
    overviewHighlights: [
      "digital bank and financial ecosystem",
      "everyday services",
    ],
    challengeStory: {
      image: "/projects/tbank-internship.png",
      imageAlt: "Yellow T‑Bank jacket and branded keychain",
      overlayImage: "/projects/tbank-internship-clock.png",
      overlayAlt: "T‑Bank branded desk clock, notebook and coffee",
      title: "My internship at T‑Bank.",
      body: "Three months at T‑Bank turned a learning experience into real product practice: I learned how to find signal in complex systems, build confidence in my decisions and communicate my work clearly.",
      highlights: [
        { label: "Confidence", text: "Weekly demos and company events helped me speak about my work with clarity and trust my point of view.", highlights: ["speak about my work with clarity"] },
        { label: "Working in a system", text: "I saw how design reviews, approvals and component libraries keep a large ecosystem consistent.", highlights: ["component libraries"] },
        { label: "Research to action", text: "I dug for context, turned findings into tasks and moved ideas forward with product and engineering teams.", highlights: ["turned findings into tasks"] },
        { label: "Collaboration", text: "Regular communication with designers, developers, product managers and partners made the work sharper.", highlights: ["made the work sharper"] },
        { label: "What came next", text: "The internship ended with an invitation to continue working together — a meaningful sign that the contribution was valued.", highlights: ["invitation to continue working together"] },
      ],
    },
    challengeHighlights: [
      "find signal in complex systems",
      "build confidence in my decisions",
    ],
    gallery: [
      { src: "/projects/tbank-statist-cover.png", alt: "Statist product analytics visual on a yellow background", label: "Approved public visual", fit: "contain" },
    ],
    screensVisual: "nda",
    screensCopy: {
      title: "Product work, kept private.",
      body: "I owned the design of reusable components and key product surfaces across Event Properties, User Properties and related data views. I shaped the property library, the table that brings properties into focus and the detail view behind each row — then made change updates easier to discover with a clear changelog. Along the way, I researched workflows, spoke with users in quick corridor conversations and used those signals to make the pages more useful. There were plenty of smaller product tasks around the edges, too: clarifying states, tightening interactions and helping the system grow without losing its logic.",
      highlights: [
        "reusable components",
        "User Properties",
        "property library",
        "detail view",
        "clear changelog",
        "researched workflows",
        "make the pages more useful",
        "helping the system grow",
      ],
    },
    tone: "statist",
  },
  {
    id: "02",
    slug: "ehu-museums",
    title: "EHU Museums",
    eyebrow: "Designing a digital exhibition for a complex institutional history",
    summary: "A chapter-based editorial experience that turns EHU's archive into a clear, emotional story people can move through.",
    role: "UX/UI Design · Information architecture · Editorial storytelling",
    status: "Editorial concept · 2023",
    tags: ["Cultural heritage", "Editorial UX", "Virtual exhibition", "BY / EN / LT"],
    cover: "/projects/ehu-museums-flow.png",
    coverAlt: "EHU Museums virtual exhibition screens",
    challenge: "The archive combined documents, photographs, quotes, maps and emotionally heavy history. The challenge was preserving its depth without making the experience feel like a reference book.",
    direction: "I structured the story into five chapters, designed a clear wayfinding model and built an editorial system that balances factual content with visual metaphors, pacing and whitespace.",
    result: "A long-form digital exhibition that helps international audiences understand EHU's history, chapter by chapter, without losing its human voice.",
    metrics: [
      { value: "5", label: "story chapters" },
      { value: "3", label: "language versions" },
    ],
    gallery: [
      { src: "/projects/ehu-museums-overview.png", alt: "Placeholder for EHU Museums chapter map and exhibition overview", label: "Chapter map", fit: "contain" },
      { src: "/projects/ehu-museums-flow.png", alt: "Placeholder for EHU Museums editorial chapter layout", label: "Editorial layout", fit: "contain" },
    ],
    tone: "museum",
  },
  {
    id: "03",
    slug: "zernote",
    title: "Zernote",
    eyebrow: "AI research SaaS from interview to decision",
    summary: "An end-to-end discovery platform that keeps evidence connected from live research to product decisions.",
    role: "Product Design · MVP · Pitch deck · Investor communication",
    status: "Active startup · pre-seed",
    tags: ["AI SaaS", "UX research", "MVP", "Product strategy"],
    cover: "/projects/zernote-jobs-tree.png",
    coverAlt: "Zernote jobs tree interface",
    overviewImage: "/projects/zernote-hero.png",
    overviewImageAlt: "Zernote product illustration with glowing evidence cards, interview signals and a connected research workspace",
    challenge: "Interview evidence was scattered across tools, analysis took hours and teams lost the context behind product decisions.",
    direction: "I designed the MVP platform, created the investor pitch deck, joined investor conversations and mentored 3 design interns while the product moved from concept to a live workflow.",
    result: "A connected research workspace for interviews, insights, jobs, ideas and evidence-backed outputs.",
    metrics: [
      { value: "3–4 h → 10 min", label: "analysis per interview" },
      { value: "21+", label: "research interviews in 3 weeks" },
    ],
    gallery: [
      { src: "/projects/zernote-ideas.png", alt: "Zernote ideas table with confidence and evidence", label: "Evidence-backed ideas", fit: "contain" },
      { src: "/projects/zernote-idea-detail.png", alt: "Zernote idea detail with supporting evidence", label: "Idea detail", fit: "contain" },
      { src: "/projects/zernote-research-dashboard.png", alt: "Zernote research dashboard and activity graph", label: "Research overview", fit: "contain" },
      { src: "/projects/zernote-jobs-tree.png", alt: "Zernote jobs tree and job detail panel", label: "Jobs tree", fit: "contain" },
      { src: "/projects/zernote-design-notes.png", alt: "Annotated Zernote table design specifications", label: "System thinking", fit: "contain" },
      { src: "/projects/zernote-pitch-solution.png", alt: "Zernote pitch deck solution slide", label: "Pitch deck · solution", fit: "contain" },
      { src: "/projects/zernote-pitch-traction.png", alt: "Zernote pitch deck traction slide", label: "Pitch deck · traction", fit: "contain" },
    ],
    tone: "zernote",
  },
];

const principles = [
  "Define",
  "Research",
  "Develop",
  "Measure",
  "Refine",
];

export default function Home() {
  return (
    <main className="home-page" id="main-content" tabIndex={-1}>
      <PortfolioHeader />

      <section className="hero" id="top">
        <div className="hero-rays" aria-hidden="true">
          <SideRays
            animate
            speed={2.5}
            rayColor1="#EAB308"
            rayColor2="#96c8ff"
            intensity={2}
            spread={2}
            origin="top-right"
            tilt={0}
            saturation={1.5}
            blend={0.75}
            falloff={1.6}
            opacity={1.0}
          />
        </div>
        <div className="hero-statement">
          <ul className="hero-badges" aria-label="Areas of practice">
            {["UX/UI", "Research", "CustDev", "Growth", "Analytics", "Design System", "Workshop hosting", "Leadership"].map((badge, index) => (
              <li key={badge} style={{ "--badge-delay": `${index * 35}ms` } as CSSProperties}>{badge}</li>
            ))}
          </ul>
          <h1 className="sr-only">I’m Elena, an empathetic product designer turning complex problems into functional products.</h1>
          <HeroBlurText />
          <p className="hero-summary">I work step by step, turning research and complex systems into clear digital products — while catching the details others miss.</p>
          <div className="hero-actions">
            <a className="talk-pill" href="mailto:lena.shamraeva.05@gmail.com">
              <span className="hero-avatar" aria-hidden="true" />
              <span className="talk-hover-amp" aria-hidden="true">&amp;</span>
              <span className="talk-hover-you" aria-hidden="true">You</span>
              <span className="talk-label">Book a 30-min call</span>
            </a>
            <span className="hero-availability"><i aria-hidden="true" />Available for work</span>
          </div>
        </div>
      </section>

      <div className="case-chapters" id="work">
        {projects.map((project) => (
          <article className={`project-story project-${project.tone}`} id={project.slug} key={project.slug}>
            {project.tone !== "statist" && project.tone !== "zernote" && (
              <section
                className={`project-stage ${project.tone === "museum" ? "project-stage-museum" : ""}`}
                {...(project.tone === "museum" || project.tone === "zernote" ? {} : { "data-scroll-scene": true })}
                aria-label={`${project.title} visual introduction`}
              >
                <div className="project-stage-sticky">
                  <div className="cinema-glow" aria-hidden="true" />
                  <div className="cinema-frame">
                    {project.tone === "museum" ? (
                      <Image
                        unoptimized
                        src="/projects/ehu-museums-hero.png"
                        alt="EHU Museum virtual exhibition poster"
                        fill
                        sizes="(max-width: 760px) 96vw, 88vw"
                        className="cinema-image museum-hero-image"
                      />
                    ) : (
                      <Image
                        unoptimized
                        src={project.cover}
                        alt={project.coverAlt}
                        fill
                        sizes="(max-width: 760px) 96vw, 82vw"
                        className="cinema-image"
                      />
                    )}
                    <span className="cinema-sheen" aria-hidden="true" />
                  </div>
                  {project.tone === "museum" && (
                    <div className="museum-floating-figures" aria-hidden="true">
                      <span className="museum-floating-figure museum-floating-figure-reading">
                        <Image
                          unoptimized
                          src="/projects/ehu-reading-figure.png"
                          alt=""
                          fill
                          sizes="(max-width: 760px) 27vw, 16vw"
                          className="museum-floating-image"
                        />
                      </span>
                      <span className="museum-floating-figure museum-floating-figure-campus">
                        <Image
                          unoptimized
                          src="/projects/ehu-campus-figure.png"
                          alt=""
                          fill
                          sizes="(max-width: 760px) 29vw, 18vw"
                          className="museum-floating-image"
                        />
                      </span>
                    </div>
                  )}
                  <div className="cinema-title" aria-hidden="true">
                    <span>{project.id}</span>
                    <strong>{project.title}</strong>
                  </div>
                </div>
              </section>
            )}

            <header className="project-intro">
              <div className="case-tags" data-reveal aria-label={`${project.title} categories`}>
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <h2 data-reveal style={{ "--delay": "45ms" } as CSSProperties}>{project.title}</h2>
              <p data-reveal style={{ "--delay": "90ms" } as CSSProperties}>{project.summary}</p>
            </header>

            <ProjectCaseTabs project={project} />
          </article>
        ))}
      </div>

      <section
        className="more-work"
        aria-labelledby="more-work-title"
      >
        <header>
          <h2 id="more-work-title" data-reveal>Other projects.</h2>
        </header>
        <span className="sr-only">Whispers of the City, TableQuest, EHU IT Hub — Social, EHU IT Hub — Landing, EHU IT Hub — Portal</span>
        <DriftWallSection />
      </section>

      <section className="principles-section" id="about">
        <div className="principles-heading" data-reveal>
          <h2>I design functional products <span className="principles-highlight">step by step – even when things get complex.</span></h2>
        </div>
        <div className="process-graph" data-reveal aria-label="Design process: Define, Research, Develop, Measure and Refine">
          <div className="process-track process-track-top" aria-hidden="true">
              <svg viewBox="0 0 860 322" preserveAspectRatio="none">
                <defs><marker id="process-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="currentColor" /></marker></defs>
                <path d="M172 60 H350" markerEnd="url(#process-arrow)" />
                <path d="M494 60 H672" markerEnd="url(#process-arrow)" />
              </svg>
          </div>
          <div className="process-track process-track-bottom" aria-hidden="true">
            <svg viewBox="0 0 860 322" preserveAspectRatio="none">
              <defs><marker id="process-bottom-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="currentColor" /></marker></defs>
              <path d="M792 152 H662" markerEnd="url(#process-bottom-arrow)" />
              <path d="M518 152 H342" markerEnd="url(#process-bottom-arrow)" />
              <path d="M206 152 H68" markerEnd="url(#process-bottom-arrow)" />
            </svg>
          </div>
          <div className="process-track process-track-loop" aria-hidden="true">
            <svg viewBox="0 0 860 322" preserveAspectRatio="none">
              <defs><marker id="process-loop-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="currentColor" /></marker></defs>
              <path d="M850 92 V188 C850 218 834 238 802 238 H58 C26 238 10 218 10 188 V92" />
              <path d="M850 92 V122" markerEnd="url(#process-loop-arrow)" />
              <path d="M802 238 H748" markerEnd="url(#process-loop-arrow)" />
              <path d="M10 188 V92" markerEnd="url(#process-loop-arrow)" />
            </svg>
          </div>
          <ol className="process-nodes">
            {principles.map((principle, index) => (
              <li className={`process-node process-node-${index + 1}`} key={principle} aria-label={principle}>
                <strong>{principle}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="contact-grid" aria-labelledby="connect-title">
        <div className="contact-heading" data-reveal>
          <h2 id="connect-title">Let&apos;s build it <em>right.</em></h2>
          <p>Have a project in mind, or simply want to chat? Reach out</p>
        </div>
        <div className="contact-cards" data-reveal>
          <a href="mailto:lena.shamraeva.05@gmail.com" aria-label="Email Elena">
            <i className="contact-icon contact-icon-mail" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3.5 6.75h17v10.5h-17z"/><path d="m4 7.5 8 6 8-6"/></svg></i><span>Email</span>
          </a>
          <a href="https://calendly.com/" target="_blank" rel="noreferrer" aria-label="Book time on Calendly">
            <i className="contact-icon contact-icon-calendar" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M15.3 8.9a4.5 4.5 0 1 0 0 6.2"/></svg></i><span>Calendly</span>
          </a>
          <a href="https://www.linkedin.com/in/elena-shamraeva-a73464393" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
            <i className="contact-icon contact-icon-linkedin" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 10v6M8 7.5v.01M11.5 16v-6M11.5 13.25c0-1.9 1-3.25 2.7-3.25s2.3 1.16 2.3 3.25V16"/></svg></i><span>LinkedIn</span>
          </a>
          <a href="https://t.me/ftr0ys_emmm" target="_blank" rel="noreferrer" aria-label="Telegram">
            <i className="contact-icon contact-icon-telegram" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m20.5 4.5-3.1 15-5.1-4.1-2.9 2.8.3-4.2L17 7.6l-8.8 5.5-3.7-1.2z"/></svg></i><span>Telegram</span>
          </a>
          <a href="https://wa.me/qr/WSCQFRDF6LCQI1" target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <i className="contact-icon contact-icon-whatsapp" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 4.25a7.75 7.75 0 0 0-6.7 11.65L4.2 19.8l4.1-1.05A7.75 7.75 0 1 0 12 4.25Z"/><path d="M9.1 9.2c.2-.45.4-.46.7-.46h.45c.15 0 .3.06.38.28l.53 1.28c.08.2.04.36-.08.52l-.42.52c-.1.12-.1.27-.03.4.25.47.86 1.28 1.95 1.73.15.06.26.03.36-.08l.52-.61c.11-.13.27-.17.43-.1l1.22.58c.19.1.25.2.2.42-.18.76-.9 1.15-1.54 1.15-.44 0-1.7-.38-2.83-1.41-1.27-1.16-1.75-2.53-1.84-3.06-.08-.45-.05-.83.08-1.16Z"/></svg></i><span>WhatsApp</span>
          </a>
        </div>
      </section>

      <footer className="site-footer" id="contact">
        <div className="site-footer-inner">
          <div className="site-footer-copy">
            <strong>© 2026 Elena Shamraeva. All Rights Reserved.</strong>
            <span>Built with care. Research-led, detail-driven.</span>
          </div>
          <div className="site-footer-links">
            <nav aria-label="Footer navigation">
              <Link href="/#work">Work</Link>
              <Link href="/#contact">Contact</Link>
              <Link href="/resume">Resume</Link>
              <Link href="/about">About</Link>
            </nav>
            <span>Product designer · Available for work</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
