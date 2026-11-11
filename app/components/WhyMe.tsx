"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "@/components/ResponsiveImage";
import { Fingerprint, Workflow, Sparkles, MapPin } from "lucide-react";

const reasons = [
  {
    id: "foundation", label: "Teamwork", icon: Fingerprint,
    title: "Experience, with room to adapt.",
    body: <>I bring three years of <strong className="project-copy-highlight">product design and research experience</strong> across B2B and B2C. I take time to understand how your team works, share my reasoning and use feedback to improve the design. Like clay, I can take a new shape without starting from scratch.</>,
  },
  {
    id: "workflow", label: "Less busywork", icon: Workflow,
    title: "More time for the actual design.",
    body: <>I connect tools and automate repetitive work: turning meeting notes into tasks, organising research material and building early prototypes. <strong className="project-copy-highlight">Less time moving information around means more time to understand the problem</strong>, explore ideas and test them with people.</>,
  },
  {
    id: "human-ai", label: "Human + AI", icon: Sparkles,
    title: "The future of research and design is human + AI.",
    body: <>I use AI to explore directions, work through research material and turn ideas into working prototypes. But understanding people, questioning the evidence and deciding what to build still takes human judgement. <strong className="project-copy-highlight">I see the future as people and AI working together</strong>, and I’m already bringing that approach into my practice.</>,
  },
  {
    id: "uk", label: "Based in the UK", icon: MapPin,
    title: "A new place. Experience to bring.",
    body: <>I’m based in <strong className="project-copy-highlight">Eastbourne, UK</strong>, and looking for a product design team to join. I’m open to junior and mid-level roles, depending on the scope and support. I bring hands-on experience, curiosity about a new market and a willingness to learn from the people around me.</>,
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
  const flow = id === "workflow" ? ["Meeting notes → tasks", "Research material → organised insights", "Early ideas → testable prototypes"]
    : id === "human-ai" ? ["Human curiosity & context", "AI exploration & prototyping", "Human judgement & decisions"]
    : ["Eastbourne, UK", "B2B & B2C product experience", "Open to junior & mid-level roles"];
  return <div className={`why-me-visual why-me-visual-${id}`} aria-label={flow.join(", ")}>

    <ol>{flow.map((step, index) => <li key={step}><span aria-hidden="true">0{index + 1}</span>{step}</li>)}</ol>

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
        <p>How I work, what I bring and where I’m heading.</p>
      </header>
      <div className="why-me-tabs" role="tablist" aria-label="Reasons to work with Helen">
        {reasons.map((reason, index) => <button key={reason.id} type="button" role="tab" id={`why-me-tab-${reason.id}`} aria-controls={`why-me-panel-${reason.id}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} ref={(node) => { buttons.current[index] = node; }} onClick={() => setActive(index)} onKeyDown={(event) => handleKeyDown(event, index)}><reason.icon size={19} strokeWidth={1.8} aria-hidden="true" /><span>{reason.label}</span></button>)}
      </div>
      {reasons.map((reason, index) => <div className="why-me-panel" role="tabpanel" id={`why-me-panel-${reason.id}`} aria-labelledby={`why-me-tab-${reason.id}`} hidden={active !== index} tabIndex={0} key={reason.id}>
        <div className="why-me-copy">
          <h3>{reason.title}</h3>
          <p>{reason.body}</p>
        </div>
        <ReasonVisual id={reason.id} />
      </div>)}
    </section>
  );
}
