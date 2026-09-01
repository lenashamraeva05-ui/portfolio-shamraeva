import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import PortfolioHeader from "./components/PortfolioHeader";
import ProjectCaseTabs, { type ProjectCaseData } from "./components/ProjectCaseTabs";
import SideRays from "../components/SideRays";
import Testimonials from "./components/Testimonials";
import HeroBlurText from "./components/HeroBlurText";
import MuseumStack from "./components/MuseumStack";

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
    eyebrow: "Product analytics at enterprise scale",
    summary: "Product design for a complex analytics environment where data, telemetry and daily decisions meet.",
    role: "Product Designer · UX/UI · Data-heavy workflows",
    status: "NDA · public context only",
    tags: ["Fintech", "Analytics platform", "Enterprise product", "NDA"],
    cover: "/projects/tbank-statist-hero.png",
    coverAlt: "Abstract analytics and product data visual for T-Bank Statist",
    challenge: "Help different teams navigate a dense analytics ecosystem without flattening the expert detail they rely on.",
    direction: "I worked on product design inside Statist. The contribution is intentionally described at a high level; every product fact shown here comes from T-Bank’s public materials.",
    result: "A decision-oriented experience for complex product and technical data.",
    metrics: [
      { value: "35B", label: "events / month · public platform scale" },
      { value: "3K+", label: "active users · public platform scale" },
    ],
    gallery: [
      { src: "/projects/tbank-statist-cover.png", alt: "Statist product analytics visual on a yellow background", label: "Approved public visual", fit: "contain" },
    ],
    tone: "statist",
    publicUrl: "https://www.tbank.ru/software/statist/",
  },
  {
    id: "02",
    slug: "ehu-museums",
    title: "EHU Museums",
    eyebrow: "A virtual exhibition for a university in exile",
    summary: "A multilingual museum landing that turns archives into an accessible, emotional digital story.",
    role: "UX/UI Design · Visual storytelling · Responsive web",
    status: "Launched concept · 2024",
    tags: ["Cultural heritage", "Virtual exhibition", "Landing", "BY / EN / LT"],
    cover: "/projects/ehu-museums-flow.png",
    coverAlt: "EHU Museums virtual exhibition screens",
    challenge: "University archives were difficult to access internationally, while conventional text pages struggled to create an emotional connection.",
    direction: "I shaped a multilingual, content-first exhibition with a clear narrative, simple movement between chapters and a responsive experience across devices.",
    result: "A unified digital home for museum stories and an international audience.",
    metrics: [
      { value: "+23%", label: "engagement target" },
      { value: "+25%", label: "session duration target" },
    ],
    gallery: [
      { src: "/projects/ehu-museums-overview.png", alt: "EHU Museums overview with problem, solution and impact", label: "Case overview", fit: "contain" },
      { src: "/projects/ehu-museums-flow.png", alt: "EHU Museums entry screen and exhibition ending", label: "Exhibition flow", fit: "contain" },
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

const otherWork = [
  { title: "Uservers", tags: "GameTech · Web platform", image: "/projects/uservers.png", alt: "Uservers game server platform interface", crop: "uservers" },
  { title: "EHU IT Hub — Social", tags: "Social media · Graphic design", image: "/projects/ehu-it-hub.png", alt: "EHU IT Hub social media design collection", crop: "ehu-social" },
  { title: "EHU IT Hub — Landing", tags: "EdTech · Responsive landing", image: "/projects/ehu-it-hub.png", alt: "EHU IT Hub landing page presentation", crop: "ehu-landing" },
  { title: "EHU IT Hub — Portal", tags: "EdTech · Student account", image: "/projects/ehu-it-hub.png", alt: "EHU IT Hub academic student portal", crop: "ehu-portal" },
  { title: "Student’s Hub", tags: "Talent marketplace · Web platform", image: "/projects/students-hub.png", alt: "Student’s Hub task marketplace case", crop: "students" },
  { title: "Whispers of the City", tags: "Urban quest · Mobile experience", alt: "Whispers of the City project preview coming later", crop: "whispers" },
  { title: "TableQuest", tags: "Restaurant quiz · Rewards", alt: "TableQuest restaurant quiz project preview coming later", crop: "tablequest" },
];

const principles = [
  { title: "Define", copy: "Align the problem, constraints and success criteria before designing the screen." },
  { title: "Research", copy: "Keep research and evidence close enough to challenge every product decision." },
  { title: "Develop", copy: "Turn the strongest signal into a clear, testable product direction." },
  { title: "Measure", copy: "Watch what happens in the real world, then name the next question." },
  { title: "Refine", copy: "Design the whole journey — edge cases, handoff, and the next iteration." },
];

const orbitImages = [
  "/projects/tbank-statist-cover.png",
  "/projects/ehu-museums-overview.png",
  "/projects/zernote-ideas.png",
  "/projects/zernote-research-dashboard.png",
  "/projects/zernote-jobs-tree.png",
  "/projects/ehu-museums-flow.png",
  "/projects/zernote-pitch-solution.png",
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
            <section className="project-stage" data-scroll-scene aria-label={`${project.title} visual introduction`}>
              <div className="project-stage-sticky">
                <div className="cinema-glow" aria-hidden="true" />
                <div className="cinema-frame">
                  {project.tone === "museum" ? (
                    <MuseumStack />
                  ) : (
                    <Image unoptimized src={project.cover} alt={project.coverAlt} fill sizes="(max-width: 760px) 96vw, 82vw" className="cinema-image" />
                  )}
                  <span className="cinema-sheen" aria-hidden="true" />
                </div>
                <div className="cinema-title" aria-hidden="true">
                  <span>{project.id}</span>
                  <strong>{project.title}</strong>
                </div>
                <div className="cinema-label">
                  <p>{project.eyebrow}</p><span>Scroll to explore</span>
                </div>
              </div>
            </section>

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

      <section className="more-work" aria-labelledby="more-work-title">
        <header>
          <h2 id="more-work-title" data-reveal>A wider field<br />of practice.</h2>
        </header>
        <div className="project-cloud" data-reveal style={{ "--delay": "90ms" } as CSSProperties} aria-label="Additional projects">
          {otherWork.map((item, index) => (
            <figure className={`project-cloud-card cloud-card-${index + 1} ${item.image ? "has-image" : "is-placeholder"}`} tabIndex={0} aria-label={`${item.title}. ${item.tags}`} key={item.title}>
              <div className="project-cloud-preview">
                {item.image ? (
                  <Image unoptimized src={item.image} alt={item.alt} fill sizes="(max-width: 760px) 50vw, 26vw" className={`cloud-image crop-${item.crop}`} />
                ) : (
                  <div className={`cloud-placeholder placeholder-${item.crop}`} aria-hidden="true">
                    <span>{item.title === "TableQuest" ? "Q / A" : "CITY / 01"}</span>
                    <i>{item.title === "TableQuest" ? "Answer · unlock · taste" : "Follow what the city whispers"}</i>
                  </div>
                )}
                <figcaption>
                  <p>{item.tags}</p>
                  <h3>{item.title}</h3>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </section>

      <section className="principles-section" id="about">
        <div className="principles-heading" data-reveal>
          <span className="section-kicker">A simple loop for better products</span>
          <h2>Clear thinking before polished pixels.</h2>
          <p>Every project moves through the same flexible loop — evidence in, sharper decisions out.</p>
          <div className="principle-links">
            <Link href="/about">Outside work <span aria-hidden="true">↗</span></Link>
            <Link href="/resume">Experience &amp; skills <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="process-graph" data-reveal aria-label="Design process: Define, Research, Develop, Measure and Refine">
          <div className="process-track process-track-top" aria-hidden="true">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs><marker id="process-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="currentColor" /></marker></defs>
              <path d="M7 73 H93" markerEnd="url(#process-arrow)" />
            </svg>
          </div>
          <div className="process-track process-track-loop" aria-hidden="true">
            <svg viewBox="0 0 760 210" preserveAspectRatio="none">
              <path d="M690 27 C735 27 742 34 742 76 V136 C742 166 728 178 698 178 H62 C30 178 18 165 18 136 V76 C18 45 29 34 61 34" />
              <path d="M60 34 L72 27 M60 34 L72 41" />
              <path d="M698 178 L686 171 M698 178 L686 185" />
            </svg>
          </div>
          <ol className="process-nodes">
            {principles.map((principle, index) => (
              <li className={`process-node process-node-${index + 1}`} key={principle.title} aria-label={`${principle.title}: ${principle.copy}`}>
                <span className="process-node-index">0{index + 1}</span>
                <strong>{principle.title}</strong>
                <span className="process-node-copy">{principle.copy}</span>
              </li>
            ))}
          </ol>
          <span className="process-caption">A living system — revisit any step when the evidence changes.</span>
        </div>
      </section>

      <Testimonials />

      <section className="contact-grid" aria-labelledby="connect-title">
        <div>
          <h2 id="connect-title" data-reveal>Let’s connect.</h2>
        </div>
        <div className="contact-cards" data-reveal>
          <a href="mailto:lena.shamraeva.05@gmail.com"><i aria-hidden="true">@</i><span>Email</span><b aria-hidden="true">↗</b></a>
          <a href="https://www.linkedin.com/in/elena-shamraeva-a73464393" target="_blank" rel="noreferrer"><i aria-hidden="true">in</i><span>LinkedIn</span><b aria-hidden="true">↗</b></a>
          <a href="https://t.me/ftr0ys_emmm" target="_blank" rel="noreferrer"><i aria-hidden="true">tg</i><span>Telegram</span><b aria-hidden="true">↗</b></a>
          <a href="https://wa.me/qr/WSCQFRDF6LCQI1" target="_blank" rel="noreferrer"><i aria-hidden="true">wa</i><span>WhatsApp</span><b aria-hidden="true">↗</b></a>
        </div>
      </section>

      <section className="contact-section" id="contact" data-scroll-panel>
        <div className="contact-intro" data-reveal>
          <p>It’s always the right time for thoughtful design.</p>
          <h2>Ready to bring an idea to life? Let’s make it happen.</h2>
          <a className="email-link" href="mailto:lena.shamraeva.05@gmail.com">
            <span className="contact-avatar" aria-hidden="true" />Let’s chat <b aria-hidden="true">↗</b>
          </a>
        </div>
        <div className="contact-orbit" aria-hidden="true">
          {orbitImages.map((src, index) => (
            <span className={`orbit-screen orbit-screen-${index + 1}`} key={src}>
              <Image unoptimized src={src} alt="" fill sizes="20vw" className="fit-cover" />
            </span>
          ))}
        </div>
        <footer>
          <span>© 2026 Elena Shamraeva</span>
          <div><span>Product design</span><span>Open to work</span></div>
          <a href="#top">Back to top ↑</a>
        </footer>
      </section>
    </main>
  );
}
