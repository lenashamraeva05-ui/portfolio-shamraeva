import { StudyCanvas } from "./StudyLayout";
import { Grid3X3, FlaskConical, Search, Bell, CircleHelp, ChevronDown, ChevronUp, CalendarDays, ListFilter, Heart, ArrowUpRight, ArrowDownLeft, Rocket, Check, Hexagon } from "lucide-react";
import "./ExperimentStudy.css";

const reports = [
  ["Mobile home banner placement", "Completed", "Mobile home", 23, 1, true],
  ["Debit card onboarding CTA", "Running", "Debit card", 8, 2, true],
  ["Premium offer on the confirmation screen", "Analysis", "Savings", 12, 32],
  ["Local services entry point", "Paused", "City services", 2, 4],
  ["Personalised local offers", "Processing", "City services", 3, 5],
  ["Savings account confirmation message", "Analysis", "Savings", 25, 15],
  ["Premium banner on mobile home", "Analysis", "Mobile home", 22, 9],
  ["Referral message on mobile home", "Analysis", "Mobile home", 73, 0],
  ["Debit card benefit comparison", "Processing", "Debit card", 34, 7],
  ["Mobile operator referral copy", "Draft", "Mobile home", 8, 1],
] as const;
const colors: Record<string,string> = { Completed: "#64ce86", Running: "#7baaff", Analysis: "#bd93d5", Paused: "#ee9685", Processing: "#eec16c", Draft: "#9ba8b8" };
function Filter({label,calendar=false}:{label:string;calendar?:boolean}) { return <span className="experiment-control experiment-filter">{label}{calendar?<CalendarDays size={19}/>:<ChevronDown size={18}/>}</span>; }
export default function ExperimentStudy() {
  return <StudyCanvas className="experiment-stage" label="Forma experiment analytics interface study in a dark theme">
    <div className="experiment-shell">
      <header className="experiment-topbar">
        <span className="experiment-control experiment-apps"><Grid3X3 size={17}/></span>
        <span className="experiment-brand"><Hexagon size={24}/><strong>Forma</strong></span>
        <span className="experiment-control experiment-new"><FlaskConical size={17}/>New experiment</span>
        <span className="experiment-control experiment-tab experiment-tab-active">Experiments</span><span className="experiment-control experiment-tab">Surfaces</span>
        <div className="experiment-topbar-end"><span className="experiment-control experiment-docs">Documentation</span><span className="experiment-control experiment-notification"><Bell size={17}/><i/></span><span className="experiment-control"><CircleHelp size={17}/></span><span className="experiment-control experiment-account">T</span></div>
      </header>
      <div className="experiment-body">
        <section className="experiment-reports">
          <div className="experiment-toolbar"><span className="experiment-control experiment-search"><Search size={17}/>Search experiments</span><span className="experiment-segment"><span className="experiment-control experiment-selected">All</span><span className="experiment-control">Significant</span></span><span className="experiment-control experiment-sort">Calculation date<ListFilter size={17}/></span></div>
          <div className="experiment-rows">{reports.map(([name,status,product,positive,negative,pinned],index)=><div className="experiment-row" key={index}><span className="experiment-report-name">{name}{pinned&&<Rocket size={16} className="experiment-rocket"/>}</span><span><span className="experiment-status" style={{"--status-color":colors[status]} as React.CSSProperties}><i/>{status}</span></span><span className="experiment-product">{product}</span><span className="experiment-number"><ArrowUpRight size={17}/>{positive}</span><span className="experiment-number experiment-negative"><ArrowDownLeft size={17}/>{negative}</span></div>)}</div>
        </section>
        <aside className="experiment-aside">
          <section className="experiment-presets"><h3>Presets</h3><p>Save your filters and sorting<br/>for quick access.</p><span className="experiment-control experiment-save"><Heart size={17} fill="currentColor"/>Save as preset</span></section>
          <section className="experiment-filter-panel"><h3>Filters</h3><div className="experiment-filter-group"><Filter label="Status"/><Filter label="Experiment dates" calendar/></div><div className="experiment-filter-group"><Filter label="Product"/><Filter label="Owner"/><Filter label="Significant metrics"/></div><div className="experiment-extra"><h3>Advanced<ChevronUp size={17}/></h3><span className="experiment-control experiment-significance"><span><small>Significance level, α</small>0.01</span><ChevronDown size={17}/></span><span className="experiment-control experiment-toggle-row"><span className="experiment-toggle"><Check size={11}/><i/></span><span>Multiple-comparison<br/>correction</span></span><span className="experiment-control experiment-toggle-row"><span className="experiment-toggle"><Check size={11}/><i/></span><span>Validation passed</span></span></div></section>
        </aside>
      </div>
    </div>
  </StudyCanvas>;
}
