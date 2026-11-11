"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Moon, Sun, X, Maximize2 } from "lucide-react";
import VertexCRM, { useVertexModel } from "./VertexCRM";

// Add the two upcoming interfaces here: the layout supports three stacked cards.
const interfaces = [
  { id: "vertexpoint", name: "VertexPoint", type: "CRM · Desktop interface", description: "A workspace for the details that matter." },
];

function InterfaceCard({ item, index }: { item: typeof interfaces[number]; index: number }) {
  const model = useVertexModel();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!expanded || !dialog.current) return;
    const element = dialog.current;
    const previous = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => { element.close(); document.body.style.overflow = previous; };
  }, [expanded]);
  return <article className="style-showcase-card" style={{ "--stack-index": index } as CSSProperties} data-analytics-section={`style_${item.id}`}>
    <div className="style-showcase-toolbar">
      <span className="style-showcase-work-label">{item.name}</span>
      <div className="style-showcase-theme" role="group" aria-label={`${item.name} appearance`}>
        <button type="button" aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}><Moon size={15} aria-hidden="true" />Dark</button>
        <button type="button" aria-pressed={theme === "light"} onClick={() => setTheme("light")}><Sun size={15} aria-hidden="true" />Light</button>
      </div>
    </div>
    <div className="style-showcase-perspective">
      <div className="style-showcase-surface">
        <VertexCRM theme={theme} model={model} />
      </div>
    </div>
    <button className="style-showcase-open" type="button" onClick={() => setExpanded(true)} aria-label={`Expand ${item.name} interactive interface`}><Maximize2 size={15} aria-hidden="true" />Explore full size<ArrowUpRight size={15} aria-hidden="true" /></button>
    <dialog ref={dialog} className="style-showcase-dialog" aria-label={`${item.name} interface preview`} onCancel={() => setExpanded(false)} onClose={() => setExpanded(false)} onClick={event => { if (event.target === event.currentTarget) setExpanded(false); }}>
      <div className="style-showcase-dialog-content">
        <header><span>{item.name} / {theme === "dark" ? "Dark" : "Light"}</span><button type="button" autoFocus onClick={() => setExpanded(false)} aria-label="Close interface preview"><X size={22} /></button></header>
        {expanded && <VertexCRM theme={theme} model={model} />}
      </div>
    </dialog>
  </article>;
}

export default function StyleShowcase() {
  return <section className="style-showcase" id="style" aria-labelledby="style-showcase-title">
    <header className="style-showcase-heading">
      <div><h2 id="style-showcase-title">A feel for my style.</h2></div>
      <p>You’re here to see my work and how I think. Older projects no longer reflect my level, and recent work is under NDA. These studies show my skills, structure and style today.</p>
    </header>
    <div className="style-showcase-stack">{interfaces.map((item, index) => <InterfaceCard key={item.id} item={item} index={index} />)}</div>
  </section>;
}
