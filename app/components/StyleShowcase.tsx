"use client";

import type { CSSProperties } from "react";
import VertexCRM from "./VertexCRM";

const interfaces = [{ id: "company1", name: "Company1" }];

export default function StyleShowcase() {
  return <section className="style-showcase" id="style" aria-labelledby="style-showcase-title">
    <header className="style-showcase-heading">
      <div><h2 id="style-showcase-title">A feel for my style.</h2></div>
      <p>You’re here to see my work and how I think. Older projects no longer reflect my level, and recent work is under NDA. These studies show my skills, structure and style today.</p>
    </header>
    <div className="style-showcase-stack">{interfaces.map((item,index)=><article key={item.id} className="style-showcase-card" style={{ "--stack-index": index } as CSSProperties} data-analytics-section={`style_${item.id}`}>
      <div className="style-showcase-perspective"><div className="style-showcase-surface"><VertexCRM/></div></div>
    </article>)}</div>
    <p className="style-showcase-pan-hint">Swipe to explore the interface.</p>
  </section>;
}
