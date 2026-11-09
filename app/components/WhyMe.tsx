"use client";

import { useRef, useState, type KeyboardEvent } from "react";

const reasons = [
  {
    id: "foundation", label: "Flexible foundation", kicker: "A little like clay",
    title: "A strong foundation. Room to take shape.",
    body: "I bring a foundation in product design and research, with the flexibility to learn your tools, rhythms and ways of working. Clear feedback helps me adapt and contribute with more confidence.",
    points: ["Curious about how your team works", "Open to feedback and new approaches", "Ready to try, test and refine"],
  },
  {
    id: "workflow", label: "Smarter workflows", kicker: "AI in everyday practice",
    title: "Make the process faster, clearer and more enjoyable.",
    body: "If something is slow or repetitive, I look for a better way to do it while protecting quality. I use AI-assisted prototypes in research, AI note-taking and MCP connections to turn meeting notes into documentation, chat updates and tasks.",
    points: ["Prototype to learn and test ideas earlier", "Connect tools through MCP and reduce manual steps", "Use Codex, Claude, Cursor and other tools where they help"],
    note: "This portfolio is part of that practice, built with Codex, Claude, Cursor and hands-on design iteration.",
  },
  {
    id: "handoff", label: "Clear handoff", kicker: "A system people can follow",
    title: "The thinking is documented, right in Figma.",
    body: "I make the product logic clear for the next person: how the flow works, how components behave and what happens beyond the happy path. Design files should help people make progress with fewer unanswered questions.",
    points: ["Readable flows and interaction notes", "Loading, empty, error and success states", "Consistent components and documented decisions"],
  },
  {
    id: "research", label: "Research & references", kicker: "Understand the decision behind the screen",
    title: "Real examples, thoughtful questions and evidence.",
    body: "I look at working products and research the problem before choosing a direction. I ask why a team made a particular decision, what constraints shaped it and whether the same reasoning fits our users and context.",
    points: ["Research to understand the actual problem", "References from real, working products", "Ideas tested against our own context"],
  },
  {
    id: "uk", label: "Growing in the UK", kicker: "My next chapter",
    title: "Experience to contribute, and plenty of room to grow.",
    body: "I recently moved to the UK and am open to a junior or mid-level role that fits the team. I bring practical experience, a willingness to learn the local context and a focus on contributing well while growing with the people around me.",
    points: ["Based in Eastbourne, UK", "Open to the right junior or mid-level opportunity", "Motivated by a supportive team and meaningful product work"],
  },
];

function ClayArt() {
  return (
        <div className="clay-media" role="img" aria-label="An abstract clay form, representing a strong foundation and room to grow">
          <svg viewBox="0 0 400 400" aria-hidden="true" focusable="false">
            <defs>
              <radialGradient id="clay-light" cx="35%" cy="25%" r="75%"><stop offset="0" stopColor="#e1ded5" /><stop offset=".45" stopColor="#9c9b95" /><stop offset=".8" stopColor="#505654" /><stop offset="1" stopColor="#242c2d" /></radialGradient>
              <linearGradient id="clay-fold" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#b7c7ce" /><stop offset="1" stopColor="#4a5150" /></linearGradient>
              <filter id="clay-shadow"><feGaussianBlur stdDeviation="12" /></filter>
            </defs>
            <ellipse cx="204" cy="314" rx="105" ry="18" fill="#000" opacity=".5" filter="url(#clay-shadow)" />
            <path d="M111 275C77 241 87 187 106 148C125 110 150 80 193 85C229 89 232 116 268 130C309 147 330 180 317 220C304 258 286 303 241 312C194 323 145 310 111 275Z" fill="url(#clay-light)" />
            <path d="M117 250C139 220 168 243 193 217C219 189 206 149 250 139C276 133 301 156 304 178C276 159 259 174 250 202C239 236 215 252 184 254C157 255 139 251 128 277Z" fill="url(#clay-fold)" opacity=".75" />
            <path d="M119 156C139 123 164 106 191 111" fill="none" stroke="#e7e7df" strokeOpacity=".35" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <span>Always taking shape.</span>
        </div>
  );
}

function ReasonVisual({ id }: { id: string }) {
  if (id === "foundation") return <ClayArt />;
  const flow = id === "workflow" ? ["Capture notes", "Document decisions", "Tasks & chat updates"]
    : id === "handoff" ? ["Map the flow", "Define every state", "Share the reasoning"]
    : id === "research" ? ["Observe real products", "Understand the why", "Apply & test in context"]
    : ["Eastbourne, UK", "Practical experience", "A team to grow with"];
  return <div className={`why-me-visual why-me-visual-${id}`} aria-label={flow.join(", ")}>
    <span className="why-me-visual-label">{id === "workflow" ? "A connected workflow" : id === "handoff" ? "Clarity from flow to handoff" : id === "research" ? "A considered design decision" : "A new chapter"}</span>
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
        <p>A practical foundation, clear communication and a process that keeps improving.</p>
      </header>
      <div className="why-me-tabs" role="tablist" aria-label="Reasons to work with Elena">
        {reasons.map((reason, index) => <button key={reason.id} type="button" role="tab" id={`why-me-tab-${reason.id}`} aria-controls={`why-me-panel-${reason.id}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} ref={(node) => { buttons.current[index] = node; }} onClick={() => setActive(index)} onKeyDown={(event) => handleKeyDown(event, index)}>{reason.label}</button>)}
      </div>
      {reasons.map((reason, index) => <div className="why-me-panel" role="tabpanel" id={`why-me-panel-${reason.id}`} aria-labelledby={`why-me-tab-${reason.id}`} hidden={active !== index} tabIndex={0} key={reason.id}>
        <div className="why-me-copy">
          <p className="why-me-kicker">{reason.kicker}</p>
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
