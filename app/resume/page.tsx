import Link from "next/link";
import type { CSSProperties } from "react";
import PortfolioHeader from "../components/PortfolioHeader";

const skillGroups = [
  { title: "Product design", items: ["Problem framing", "JTBD", "Product strategy", "Success criteria", "Data-heavy workflows"] },
  { title: "UX & research", items: ["Customer interviews", "Qual + quant research", "User flows", "Prototyping", "Usability testing"] },
  { title: "Visual design", items: ["Interface design", "Design systems", "Graphic design", "Social design", "Responsive web"] },
  { title: "Collaboration", items: ["Investor communication", "Pitch decks", "Design handoff", "Mentorship", "Team facilitation"] },
];

const practice = [
  {
    period: "NDA",
    title: "T-Bank Statist",
    role: "Product Designer · Fintech analytics",
    copy: "Product design inside a complex product analytics environment. Public context only.",
    result: "Enterprise platform",
  },
  {
    period: "2026",
    title: "Zernote",
    role: "Product Designer · AI research SaaS",
    copy: "Designed the MVP platform and pitch deck, joined investor conversations and mentored 3 interns.",
    result: "MVP + pre-seed",
  },
  {
    period: "2024",
    title: "EHU Museums",
    role: "UX/UI Designer · Cultural heritage",
    copy: "Created a multilingual virtual exhibition experience for an international audience.",
    result: "Responsive landing",
  },
];

const process = [
  ["Frame", "Align the goal, constraints and measure of success."],
  ["Research", "Find the friction and evidence behind it."],
  ["Shape", "Compare concepts, risks and trade-offs."],
  ["Test", "Learn early, refine and prepare a clear handoff."],
  ["Measure", "Follow the outcome and decide what improves next."],
];

const learning = [
  {
    type: "Course",
    title: "UX Design for Mid-Level Designers",
    institution: "Yandex Practicum",
    detail: "Advanced UX practice · Professional development",
    status: "Completed",
  },
  {
    type: "Education",
    title: "BA in Multimedia Design",
    institution: "Graphic Design track",
    detail: "Bachelor’s degree · Year 4",
    status: "In progress",
  },
];

export default function ResumePage() {
  return (
    <main className="inner-page resume-page" id="main-content" tabIndex={-1}>
      <PortfolioHeader />

      <section className="resume-hero" id="resume">
        <p data-reveal>Experience at a glance</p>
        <h1 data-reveal style={{ "--delay": "45ms" } as CSSProperties}>Research-led,<br />detail-focused product design.</h1>
        <div className="resume-contact-row" data-reveal style={{ "--delay": "90ms" } as CSSProperties}>
          <span><i aria-hidden="true" />Available worldwide</span>
          <a href="mailto:lena.shamraeva.05@gmail.com">lena.shamraeva.05@gmail.com</a>
        </div>
      </section>

      <section className="resume-block skills-resume" id="skills">
        <div className="section-heading" data-reveal><p>Skills</p><p>How I contribute</p></div>
        <div className="skill-groups">
          {skillGroups.map((group, index) => (
            <article key={group.title} data-reveal style={{ "--delay": `${index * 45}ms` } as CSSProperties}>
              <span>0{index + 1}</span>
              <h2>{group.title}</h2>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-block experience-resume">
        <div className="section-heading" data-reveal><p>Selected experience</p><p>Recent product work</p></div>
        <div className="experience-list">
          {practice.map((item, index) => (
            <article key={item.title} data-reveal style={{ "--delay": `${index * 45}ms` } as CSSProperties}>
              <span>{item.period}</span>
              <div><h2>{item.title}</h2><p>{item.role}</p></div>
              <p>{item.copy}</p>
              <strong>{item.result}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-block learning-resume">
        <div className="section-heading" data-reveal><p>Education &amp; learning</p><p>Formal study &amp; continued growth</p></div>
        <div className="learning-list">
          {learning.map((item, index) => (
            <article key={item.title} data-reveal style={{ "--delay": `${index * 45}ms` } as CSSProperties}>
              <span>0{index + 1}</span>
              <div>
                <p>{item.type} · {item.institution}</p>
                <h2>{item.title}</h2>
                <small>{item.detail}</small>
              </div>
              <strong>{item.status}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-process">
        <div className="section-heading" data-reveal><p>Working rhythm</p><p>From question to outcome</p></div>
        <ol>
          {process.map(([title, copy], index) => (
            <li key={title} data-reveal style={{ "--delay": `${index * 35}ms` } as CSSProperties}>
              <span>0{index + 1}</span><strong>{title}</strong><p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="inner-cta" data-scroll-panel>
        <p data-reveal>Looking for a product designer?</p>
        <h2 data-reveal style={{ "--delay": "45ms" } as CSSProperties}>Let’s make the complex feel obvious.</h2>
        <a data-reveal style={{ "--delay": "90ms" } as CSSProperties} href="mailto:lena.shamraeva.05@gmail.com">Email Elena <span aria-hidden="true">↗</span></a>
      </section>

      <footer className="inner-footer">
        <span>© 2026 Elena Shamraeva</span>
        <Link href="/">Back home ↑</Link>
      </footer>
    </main>
  );
}
