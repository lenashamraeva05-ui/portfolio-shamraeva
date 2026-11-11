import type { CSSProperties } from "react";
import { StudyStack } from "./StudyLayout";
import VertexCRM from "./VertexCRM";
import ExperimentStudy from "./ExperimentStudy";
import FlowStudy from "./FlowStudy";

const interfaces = [{ id: "company1", component: VertexCRM }, { id: "forma", component: ExperimentStudy }, { id: "orbit", component: FlowStudy }];

export default function StyleShowcase() {
  return <section className="style-showcase" id="style" aria-labelledby="style-showcase-title">
    <header className="style-showcase-heading">
      <div><h2 id="style-showcase-title">My style.</h2></div>
      <p>You’re here to see my work and how I think. Older projects no longer reflect my level, and recent work is under NDA. These studies show my skills, structure and style today.</p>
    </header>
    <StudyStack>{interfaces.map((item,index)=><article key={item.id} className="style-showcase-card" style={{ "--stack-index": index } as CSSProperties} data-analytics-section={`style_${item.id}`}>
      <div className="style-showcase-perspective"><div className="style-showcase-surface"><item.component/></div></div>
    </article>)}</StudyStack>
    <p className="style-showcase-pan-hint">Swipe to explore the interface.</p>
  </section>;
}
