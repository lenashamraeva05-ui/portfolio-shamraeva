"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "@/components/ResponsiveImage";

const reasons = [
  {
    id: "foundation", label: "Room to shape",
    title: "Solid craft. Soft edges.",
    body: <>A grounding in <strong className="project-copy-highlight">product design and research</strong>, with room for your team’s way of working. Like clay, I adapt without losing structure.</>,
    points: ["Learn your rhythm", "Turn feedback into iterations", "Bring craft, leave room to grow"],
  },
  {
    id: "workflow", label: "Less busywork",
    title: "Automate the friction.",
    body: <>I use <strong className="project-copy-highlight">AI prototyping, note-takers and MCP</strong> to shorten the path from question to test. Notes become docs, updates and tasks. <strong className="project-copy-highlight">Judgement stays human.</strong></>,
    points: ["Prototype before overcommitting", "Connect tools, cut repeat work", "Check the output, protect the craft"],
    note: "Built this portfolio with Codex, Claude, Cursor and hands-on iteration.",
  },
  {
    id: "handoff", label: "Build-ready",
    title: "No guesswork in Figma.",
    body: <>The file explains the product: <strong className="project-copy-highlight">flows, states and interaction logic</strong>, with the reasoning close by. Fewer loose ends between design and build.</>,
    points: ["Flows you can follow", "Edge cases, not just the happy path", "Reusable components, recorded decisions"],
  },
  {
    id: "research", label: "Pattern thinking",
    title: "Borrow the logic, not the look.",
    body: <>I study <strong className="project-copy-highlight">real products and real behaviour</strong> to understand why a pattern works. Then I test whether that logic fits <strong className="project-copy-highlight">our users and constraints.</strong></>,
    points: ["Start with the problem", "Decode working patterns", "Test the fit in our context"],
  },
  {
    id: "uk", label: "New context",
    title: "A new market. A running start.",
    body: <>Now based in <strong className="project-copy-highlight">Eastbourne, UK</strong>. I bring practical experience and am open to <strong className="project-copy-highlight">junior or mid-level roles</strong> where I can contribute, learn the context and grow with the team.</>,
    points: ["Experience to contribute from day one", "Open to the right level and scope", "Team fit over title"],
  },
];

function ClayArt() {
  return (
    <div className="clay-media">
      <Image src="/blue-clay-v2.webp" alt="Blue clay with visible fingerprints, ready to take a new shape" width={1080} height={1018} sizes="(max-width: 760px) 360px, 440px" />
    </div>
  );
}

function ReasonVisual({ id }: { id: string }) {
  if (id === "foundation") return <ClayArt />;
  const flow = id === "workflow" ? ["Capture", "Connect", "Put it to work"]
    : id === "handoff" ? ["Map the flow", "Cover the states", "Explain the decisions"]
    : id === "research" ? ["Find the pattern", "Unpack the logic", "Test the fit"]
    : ["Eastbourne, UK", "Experience in practice", "Room to grow"];
  return <div className={`why-me-visual why-me-visual-${id}`} aria-label={flow.join(", ")}>

    <ol>{flow.map((step, index) => <li key={step}><span aria-hidden="true">0{index + 1}</span>{step}</li>)}</ol>
    <div className="why-me-visual-tags">{(id === "workflow" ? ["AI prototypes", "MCP", "Notes to action"] : id === "handoff" ? ["Loading", "Error", "Empty", "Success"] : id === "research" ? ["Research", "References", "Context"] : ["Curiosity", "Feedback", "Growth"]).map(tag => <span key={tag}>{tag}</span>)}</div>
  </div>;
}

export default function WhyMe() {
  const [active, setActive] = useState(0);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % reasons.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + reasons.length) % reasons.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = reasons.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus({ preventScroll: true });
    buttons.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };
  return (
    <section className="why-me" aria-labelledby="why-me-title">
      <header className="why-me-intro">
        <h2 id="why-me-title">Why work with me?</h2>
        <p>Clear thinking. Considered craft. Less friction.</p>
      </header>
      <div className="why-me-tabs" role="tablist" aria-label="Reasons to work with Helen">
        {reasons.map((reason, index) => <button key={reason.id} type="button" role="tab" id={`why-me-tab-${reason.id}`} aria-controls={`why-me-panel-${reason.id}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} ref={(node) => { buttons.current[index] = node; }} onClick={() => setActive(index)} onKeyDown={(event) => handleKeyDown(event, index)}>{reason.label}</button>)}
      </div>
      {reasons.map((reason, index) => <div className="why-me-panel" role="tabpanel" id={`why-me-panel-${reason.id}`} aria-labelledby={`why-me-tab-${reason.id}`} hidden={active !== index} tabIndex={0} key={reason.id}>
        <div className="why-me-copy">
          <h3>{reason.title}</h3>
          <p>{reason.body}</p>
          <ul>{reason.points.map(point => <li key={point}>{point}</li>)}</ul>
          {reason.note && <p className="why-me-note">{reason.note}</p>}
        </div>
        <ReasonVisual id={reason.id} />
      </div>)}
    </section>
  );
}
