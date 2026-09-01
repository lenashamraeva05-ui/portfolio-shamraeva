import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import PortfolioHeader from "../components/PortfolioHeader";
import Lanyard from "../../components/Lanyard";

const roles = [
  {
    name: "Researcher",
    note: "finding the real problem",
    copy: "I start with context: conversations, behaviour and evidence. The goal is not more research, but a clearer decision.",
    image: "/projects/zernote-research-dashboard.png",
  },
  {
    name: "Product thinker",
    note: "connecting the system",
    copy: "I map the whole journey, surface dependencies and make complex product logic feel calm and understandable.",
    image: "/projects/ehu-museums-flow.png",
  },
  {
    name: "Visual designer",
    note: "giving ideas character",
    copy: "Typography, hierarchy and rhythm are tools for meaning. I use them to make interfaces feel confident without becoming noisy.",
    image: "/projects/ehu-it-hub.png",
  },
  {
    name: "Teammate",
    note: "making ambiguity visible",
    copy: "I ask questions early, explain trade-offs clearly and keep the product goal present from discovery through handoff.",
    image: "/projects/zernote-design-notes.png",
  },
];

const gallery = [
  { image: "/projects/zernote-idea-detail.png", label: "Research synthesis" },
  { image: "/projects/tbank-statist-cover.png", label: "Product storytelling" },
  { image: "/projects/students-hub.png", label: "Interface systems" },
  { image: "/projects/ehu-museums-overview.png", label: "Service journeys" },
];

const principles = [
  ["01", "Clarity before novelty", "A strong hierarchy should explain the product before decoration begins."],
  ["02", "Evidence over instinct", "Taste matters, but the best decisions connect user needs with business reality."],
  ["03", "Systems that can grow", "A screen is successful when the team can extend it without losing its logic."],
  ["04", "Care in the details", "The smallest interaction can change whether a product feels difficult or natural."],
];

export default function AboutPage() {
  return (
    <main className="inner-page about-page about-editorial" id="main-content" tabIndex={-1}>
      <PortfolioHeader />

      <section className="about-opening" id="about" data-scroll-panel>
        <div className="about-opening-art" aria-hidden="true">
          <Image unoptimized src="/portfolio-folder-bg.png" alt="" fill priority sizes="100vw" />
        </div>
        <div className="about-opening-lanyard" data-reveal aria-label="Interactive Elena Shamraeva profile card">
          <Lanyard
            position={[0, 0, 20]}
            gravity={[0, -40, 0]}
            frontImage="/elena-portrait-blue-v1.png"
            imageFit="cover"
          />
        </div>
        <div className="about-opening-statement" data-reveal style={{ "--delay": "60ms" } as CSSProperties}>
          <p>
            A product designer who turns <strong>research</strong>, complex systems and business goals into
            <strong> clear digital products</strong>. I care about the logic behind a decision, the system around the screen
            and the detail that makes an experience easier.
          </p>
        </div>
        <p className="about-opening-aside" data-reveal style={{ "--delay": "120ms" } as CSSProperties}>
          I admire digital products that remove friction, respect attention and help people feel capable.
        </p>
      </section>

      <section className="about-team" data-scroll-panel>
        <div className="about-team-image" aria-hidden="true">
          <Image unoptimized src="/projects/ehu-it-hub.png" alt="" fill sizes="100vw" />
        </div>
        <h1 data-reveal>Product thinking,<br />with a visual point of view.</h1>
        <p data-reveal style={{ "--delay": "60ms" } as CSSProperties}>
          At work, I wear many hats: designer, researcher, facilitator and storyteller. The role changes, but the purpose stays the same — help a team see the right problem and move forward together.
        </p>
      </section>

      <section className="about-role-grid" aria-label="How Elena works">
        {roles.map((role, index) => (
          <article className="about-role" key={role.name} data-reveal style={{ "--delay": `${(index % 2) * 55}ms` } as CSSProperties}>
            <div className="about-role-media">
              <Image unoptimized src={role.image} alt="" fill sizes="200px" />
            </div>
            <div className="about-role-copy">
              <p>{role.copy}</p>
              <strong>{role.name}</strong>
              <span>{role.note}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="about-fusion" data-scroll-panel>
        <div className="about-fusion-heading">
          <h2 data-reveal>Curious about the place where<br /><span>people, systems and visuals meet.</span></h2>
        </div>
        <div className="about-fusion-stage" aria-hidden="true">
          <div className="fusion-screen fusion-screen-a"><Image unoptimized src="/projects/zernote-jobs-tree.png" alt="" fill sizes="44vw" /></div>
          <div className="fusion-screen fusion-screen-b"><Image unoptimized src="/projects/ehu-museums-overview.png" alt="" fill sizes="44vw" /></div>
          <div className="fusion-core">UX<span>↗</span></div>
        </div>
      </section>

      <section className="about-beyond">
        <h2 data-reveal>While product design is my craft, curiosity extends far beyond the interface.</h2>
        <div className="about-type-note" data-reveal>
          <span aria-hidden="true">Aa</span>
          <div>
            <h3>I appreciate the role of typography in effective communication.</h3>
            <p>Typography is more than choosing a font. It is a careful evaluation of characters, alignment, contrast and priority that creates a balanced, readable experience.</p>
          </div>
        </div>
        <div className="about-type-poster" data-scroll-panel aria-label="Typography study using Elena's work">
          <div className="type-poster-word" aria-hidden="true">Aa</div>
          <Image unoptimized src="/projects/zernote-pitch-solution.png" alt="A product presentation showing Elena's use of typography and hierarchy" fill sizes="calc(100vw - 64px)" />
        </div>
      </section>

      <section className="about-gallery-section">
        <div className="about-gallery-heading" data-reveal>
          <h2>Fascinated by logic, structure and the moment an idea clicks.</h2>
          <p>I collect patterns across research, editorial design and digital products, then translate them into practical systems.</p>
        </div>
        <div className="about-gallery-window">
          <div className="about-gallery-track">
            {[...gallery, ...gallery].map((item, index) => (
              <figure key={`${item.label}-${index}`}>
                <Image unoptimized src={item.image} alt={index < gallery.length ? item.label : ""} fill sizes="min(78vw, 1000px)" />
                <figcaption>{item.label}<span>0{(index % gallery.length) + 1}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="about-principles" data-scroll-panel>
        <div className="about-principles-lead" data-reveal>
          <span>My working principles</span>
          <h2>Influenced by design that stays useful.</h2>
          <p>I want the result to feel inevitable: clear in purpose, restrained in form and considerate of the people using it.</p>
        </div>
        <div className="about-principles-image" data-parallax>
          <Image unoptimized src="/projects/ehu-museums-overview.png" alt="EHU Museums product interface designed by Elena" fill sizes="(max-width: 760px) 100vw, 52vw" />
        </div>
        <ol>
          {principles.map(([number, title, copy]) => (
            <li key={number} data-reveal>
              <span>{number}</span><strong>{title}</strong><p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-closing" data-scroll-panel>
        <p data-reveal>More stories coming soon…</p>
        <h2 data-reveal style={{ "--delay": "55ms" } as CSSProperties}>More experiments in product thinking, visual systems and the quiet details that make technology feel human.</h2>
        <div data-reveal style={{ "--delay": "110ms" } as CSSProperties}>
          <Link href="/#work">Selected work <span aria-hidden="true">↗</span></Link>
          <Link href="/resume">Experience &amp; skills <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <footer className="inner-footer">
        <span>© 2026 Elena Shamraeva</span>
        <a href="mailto:lena.shamraeva.05@gmail.com">Let&apos;s chat ↗</a>
      </footer>
    </main>
  );
}
