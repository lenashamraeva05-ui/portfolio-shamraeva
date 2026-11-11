"use client";

import "./VertexCRM.css";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Rss, PanelLeft, Layers, LayoutGrid, Bell, SquareCheck, NotebookPen, Mail, GraduationCap, Workflow, ChevronDown, Search, Command, Plus, Wallet, Target, Star, Building2, Users, LifeBuoy, Settings, MapPin, Link2, ArrowDownUp, List, Table2, Zap, ArrowUpRight, ChartNoAxesColumnIncreasing, Clock3, ChevronRight, Check, X, Download, EyeOff } from "lucide-react";

const statuses = ["To Contact", "Follow-Up", "In Negotiation", "Complete"] as const;
type Status = typeof statuses[number];
type Company = { name: string; logo: string; color: string; description: string; domain: string; city: string; flag: string; person: string; status: Status };
const initialCompanies: Company[] = [
  { name: "Apple", logo: "●", color: "#eceef0", description: "Global leader in consumer electronics", domain: "apple.com", city: "Cupertino, CA", flag: "🇺🇸", person: "Giannis Prophen", status: "To Contact" },
  { name: "Microsoft", logo: "▦", color: "#f6b33d", description: "Technology giant providing software", domain: "microsoft.com", city: "Redmond, WA", flag: "🇺🇸", person: "Rachel Summers", status: "Follow-Up" },
  { name: "Amazon", logo: "a", color: "#f4a43b", description: "E-commerce, cloud computing and more", domain: "amazon.com", city: "Seattle, WA", flag: "🇺🇸", person: "Michael Tan", status: "In Negotiation" },
  { name: "Google", logo: "G", color: "#4285f4", description: "Global leader in search and advertising", domain: "google.com", city: "Mountain View, CA", flag: "🇺🇸", person: "Sofia Carter", status: "Complete" },
  { name: "Tesla", logo: "T", color: "#dee1e5", description: "Electric vehicle and clean energy company", domain: "tesla.com", city: "Palo Alto, CA", flag: "🇺🇸", person: "Liam Bennett", status: "To Contact" },
  { name: "NVIDIA", logo: "◉", color: "#91c736", description: "Pioneering graphics and AI technologies", domain: "nvidia.com", city: "Santa Clara, CA", flag: "🇺🇸", person: "John Harrison", status: "Follow-Up" },
  { name: "Meta", logo: "∞", color: "#0ca8e7", description: "Social media and the metaverse", domain: "meta.com", city: "Menlo Park, CA", flag: "🇺🇸", person: "Emma Jones", status: "Complete" },
  { name: "Samsung", logo: "S", color: "#6293e6", description: "Leading electronics and technology", domain: "samsung.com", city: "Suwon, South Korea", flag: "🇰🇷", person: "Min-Ji Park", status: "To Contact" },
  { name: "Oracle", logo: "⊂⊃", color: "#ed4539", description: "Major player in cloud computing", domain: "oracle.com", city: "Austin, TX", flag: "🇺🇸", person: "Ethan Brown", status: "Follow-Up" },
  { name: "Tencent", logo: "♟", color: "#d9e7ee", description: "Chinese technology conglomerate", domain: "tencent.com", city: "Shenzhen, China", flag: "🇨🇳", person: "Wei Chen", status: "Complete" },
  { name: "ByteDance", logo: "▥", color: "#72c9e1", description: "Innovative tech company behind TikTok", domain: "bytedance.com", city: "Beijing, China", flag: "🇨🇳", person: "Jing Liu", status: "In Negotiation" },
  { name: "SpaceX", logo: "X", color: "#cbd8e4", description: "Aerospace manufacturer and transport", domain: "spacex.com", city: "Hawthorne, CA", flag: "🇺🇸", person: "Noah Wilson", status: "To Contact" },
  { name: "Intel", logo: "intel", color: "#70a6ed", description: "Semiconductor leader in processors", domain: "intel.com", city: "Santa Clara, CA", flag: "🇺🇸", person: "Sandy Nguyen", status: "Follow-Up" },
  { name: "Coca-Cola", logo: "C", color: "#ff5751", description: "Global beverage company", domain: "coca-cola.com", city: "Atlanta, GA", flag: "🇺🇸", person: "Grace Lee", status: "In Negotiation" },
  { name: "Pfizer", logo: "Ƶ", color: "#31b4f4", description: "Leading pharmaceutical company", domain: "pfizer.com", city: "New York City, NY", flag: "🇺🇸", person: "Alice Cooper", status: "Complete" },
];
const navigation = [ [LayoutGrid, "Dashboard"], [Bell, "Notifications"], [SquareCheck, "Tasks"], [NotebookPen, "Notes"], [Mail, "Emails"], [GraduationCap, "Reports"], [Zap, "Automations"], [Workflow, "Workflows"]] as const;
const favorites = [[Wallet, "Key Accounts"], [ChartNoAxesColumnIncreasing, "Strategic Initiatives"], [Target, "Focus Areas"], [Star, "Starred Items"]] as const;
const metrics = [
  { label: "Active Opportunities", value: "78", unit: "active", change: "3.5%", icon: ChartNoAxesColumnIncreasing },
  { label: "Deals Closed This Month", value: "15", unit: "completed", change: "1.2%", icon: Layers },
  { label: "Average Response Time", value: "4.2", unit: "days", change: "0.8%", icon: Clock3 },
  { label: "Engagement Rate", value: "62", unit: "%", change: "8.34%", icon: ChartNoAxesColumnIncreasing },
];

export function useVertexModel() {
  const [companies, setCompanies] = useState(initialCompanies);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [location, setLocation] = useState("All");
  const [view, setView] = useState<"Table" | "Board" | "List">("Table");
  const [sort, setSort] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [dense, setDense] = useState(false);
  const [metricsVisible, setMetricsVisible] = useState(true);
  const [menu, setMenu] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const filtered = useMemo(() => {
    const rows = companies.filter(company => `${company.name} ${company.description} ${company.domain} ${company.person}`.toLowerCase().includes(query.toLowerCase()) && (status === "All" || company.status === status) && (location === "All" || company.flag === location));
    return sort ? [...rows].sort((a,b) => a.name.localeCompare(b.name)) : rows;
  }, [companies, query, status, location, sort]);
  const toggle = (name: string) => setSelected(current => current.includes(name) ? current.filter(item => item !== name) : [...current,name]);
  return { companies, setCompanies, query, setQuery, status, setStatus, location, setLocation, view, setView, sort, setSort, selected, setSelected, dense, setDense, metricsVisible, setMetricsVisible, menu, setMenu, notice, setNotice, filtered, toggle };
}
type Model = ReturnType<typeof useVertexModel>;

function StatusPill({ value }: { value: string }) {
  return <span className={`vertex-status vertex-status-${value.toLowerCase().replaceAll(" ", "-")}`}><i />{value}</span>;
}
// Simple Icons brand SVGs are CC0; rendered as small CSS masks.
const brandIcons: Record<string, string> = { Apple: "apple", Google: "google", Tesla: "tesla", NVIDIA: "nvidia", Meta: "meta", Samsung: "samsung", ByteDance: "bytedance", SpaceX: "spacex", Intel: "intel", "Coca-Cola": "cocacola" };
function Brand({ company }: { company: Company }) {
  const icon = brandIcons[company.name];
  return <span className={`vertex-brand vertex-brand-${company.name.toLowerCase()}`} style={{ color: company.color }} aria-hidden="true">{icon ? <span className="vertex-brand-vector" style={{ maskImage: `url(/brands/${icon}.svg)` }} /> : company.name === "Microsoft" ? <span className="vertex-microsoft-mark"><i/><i/><i/><i/></span> : company.logo}</span>;
}

export default function VertexCRM({ theme, model: m }: { theme: "dark" | "light"; model: Model }) {
  const stage = useRef<HTMLDivElement>(null);
  const search = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const resize = () => el.style.setProperty("--crm-scale", String(el.clientWidth / 1320));
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const toggleMenu = (name: string) => m.setMenu(m.menu === name ? null : name);
  const addCompany = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("company") ?? "").trim();
    if (!name) return;
    if (m.companies.some(company => company.name.toLowerCase() === name.toLowerCase())) { m.setNotice("That company is already in this workspace."); return; }
    m.setCompanies(current => [...current, { name, domain: String(data.get("domain") ?? "").trim(), description: "New company", logo: name[0], color: "#68b990", city: "Not specified", flag: "🌐", person: "Unassigned", status: "To Contact" }]);
    m.setQuery(""); m.setStatus("All"); m.setLocation("All"); m.setMenu(null); m.setNotice(`${name} added to this demo workspace.`);
  };
  const exportCSV = () => {
    const csv = [ ["Company", "Domain", "Location", "Contact", "Status"], ...m.filtered.map(row => [row.name,row.domain,row.city,row.person,row.status]) ].map(row => row.map(value => `"${value.replaceAll('"','""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "vertexpoint-demo.csv"; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000); m.setMenu(null);
  };
  return <div ref={stage} className={`vertex-stage vertex-${theme}`} role="region" aria-label="Interactive VertexPoint CRM design" onKeyDown={event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); search.current?.focus(); }
    if (event.key === "Escape") m.setMenu(null);
  }}>
    <div className={`vertex-shell ${m.dense ? "vertex-dense" : ""}`}>
      <aside className="vertex-sidebar">
        <button className="vertex-workspace" type="button" onClick={() => toggleMenu("workspace")} aria-expanded={m.menu === "workspace"}><Rss size={22}/><span><strong>VertexPoint <ChevronDown size={12}/></strong><small><Users size={11}/>21 members</small></span><PanelLeft size={15}/></button>
        <label className="vertex-side-search"><Search size={17}/><input ref={search} aria-label="Search companies" value={m.query} onChange={event => m.setQuery(event.target.value)} placeholder="Search" data-clarity-mask="true"/><span><Command size={12}/>K</span></label>
        <nav className="vertex-nav" aria-label="CRM workspace">
          {navigation.map(([Icon,label]) => <button type="button" key={label} onClick={() => { if (label === "Dashboard") { m.setView("Board"); m.setStatus("All"); } else if (label === "Tasks") { m.setView("List"); m.setStatus("Follow-Up"); } else toggleMenu(label); }}><Icon size={16}/>{label}{label === "Notifications" && <b>16</b>}</button>)}
        </nav>
        <div className="vertex-nav-heading"><ChevronDown size={12}/>Favorites<Plus size={14}/></div>
        <div className="vertex-nav">{favorites.map(([Icon,label],index) => <button type="button" key={label} onClick={() => { m.setStatus(index === 0 ? "In Negotiation" : index === 1 ? "Complete" : "All"); m.setQuery(""); m.setNotice(`${label} view`); }}><Icon size={15}/>{label}</button>)}</div>
        <div className="vertex-nav-heading"><ChevronDown size={12}/>Records<Plus size={14}/></div>
        <div className="vertex-nav"><button type="button" className="vertex-nav-active" onClick={() => { m.setQuery(""); m.setStatus("All"); m.setLocation("All"); m.setView("Table"); }}><Building2 size={16}/>Companies</button><button type="button" onClick={() => { m.setView("List"); m.setNotice("People are shown alongside their companies."); }}><Users size={16}/>People</button></div>
        <div className="vertex-sidebar-bottom"><div className="vertex-nav">{[[Wallet,"Affiliate program"],[LifeBuoy,"Help center"],[Layers,"Plans"],[Settings,"Settings"]].map(([Icon,label]) => { const I = Icon as typeof Wallet; return <button key={String(label)} type="button" onClick={() => toggleMenu(String(label))}><I size={15}/>{String(label)}</button>; })}</div><button className="vertex-profile" type="button" onClick={() => toggleMenu("profile")}><span className="vertex-avatar vertex-avatar-profile">LS</span><span><strong>Liam Smith <ChevronDown size={11}/></strong><small>smith@example.com</small></span><span>···</span></button></div>
      </aside>
      <div className="vertex-main">
        <header className="vertex-topbar"><div><Layers size={19}/><strong>Companies</strong><i>·</i><span>{156 + m.companies.length - initialCompanies.length} companies</span></div><div className="vertex-topbar-right"><div className="vertex-team">{["EJ","MT","SC","LB"].map((name,index) => <span key={name} className={`vertex-avatar vertex-avatar-${index}`}>{name}</span>)}<span className="vertex-more-members">+9</span></div><button type="button" onClick={() => toggleMenu("apps")}><LayoutGrid size={15}/>All Apps</button><button className="vertex-enrich" type="button" onClick={() => m.setNotice("Company data is up to date. This is an interactive design demo.")}><Zap size={15} fill="currentColor"/>Enrich data</button></div></header>
        <div className="vertex-content">
          {m.metricsVisible && <div className="vertex-metrics">{metrics.map((metric,index) => <div className="vertex-metric" key={metric.label}><div className="vertex-metric-label"><metric.icon size={18}/>{metric.label}</div><p><strong>{metric.value}</strong> {metric.unit}</p><span className="vertex-change"><ArrowUpRight size={15}/>{metric.change}</span><svg className={`vertex-sparkline vertex-sparkline-${index}`} viewBox="0 0 110 40" aria-hidden="true"><path d={index===1 ? "M2 8C7 8 5 27 12 26S17 14 23 22 26 32 33 23 37 8 43 18 44 33 50 26 52 19 58 24 62 12 68 21 73 37 80 25 84 25 90 28 99 13 108 15" : "M2 26C9 27 9 35 16 29S20 16 27 24 31 15 39 21 43 39 49 30 51 7 57 18 64 35 71 29 74 11 81 22 86 20 92 24 101 9 108 4"}/></svg></div>)}</div>}
          <div className="vertex-tools"><div className="vertex-view-tabs" role="group" aria-label="Company view">{[[Table2,"Table"],[LayoutGrid,"Board"],[List,"List"]].map(([Icon,label]) => { const I=Icon as typeof Table2; const name=label as Model["view"]; return <button type="button" aria-pressed={m.view===name} key={name} onClick={() => m.setView(name)}><I size={15}/>{name}</button>; })}</div><div className="vertex-tool-actions"><label className="vertex-table-search"><Search size={16}/><input aria-label="Filter company table" placeholder="Search" value={m.query} onChange={event => m.setQuery(event.target.value)} data-clarity-mask="true"/></label><button type="button" aria-pressed={!m.metricsVisible} onClick={() => m.setMetricsVisible(!m.metricsVisible)}><EyeOff size={14}/>Hide</button><button type="button" onClick={() => toggleMenu("settings")}><Settings size={15}/>Settings</button><button type="button" onClick={() => toggleMenu("export")}><span>Import / Export</span><ChevronDown size={13}/></button><button className="vertex-new" type="button" onClick={() => toggleMenu("new")} aria-expanded={m.menu==="new"}>New company<ChevronDown size={13}/></button></div></div>
          <div className="vertex-filters"><button type="button" onClick={() => toggleMenu("status")} aria-expanded={m.menu==="status"}><Users size={14}/>{m.status === "All" ? "Person to contact" : m.status}<ChevronDown size={13}/></button><button type="button" onClick={() => toggleMenu("location")} aria-expanded={m.menu==="location"}><MapPin size={14}/>{m.location === "All" ? "Location" : m.location}<ChevronDown size={13}/></button><button className="vertex-add-filter" type="button" onClick={() => toggleMenu("status")}><Plus size={15}/>Add filter</button>{(m.query || m.status!=="All" || m.location!=="All") && <button type="button" onClick={() => { m.setQuery("");m.setStatus("All");m.setLocation("All"); }}>Clear filters<X size={12}/></button>}{m.selected.length>0 && <span className="vertex-selected-count">{m.selected.length} selected <button type="button" onClick={() => m.setSelected([])}>Clear</button></span>}</div>
          {m.view === "Board" ? <div className="vertex-board">{statuses.map(status => <section key={status}><h4><StatusPill value={status}/><span>{m.filtered.filter(row=>row.status===status).length}</span></h4>{m.filtered.filter(row=>row.status===status).map(row=><button type="button" key={row.name} onClick={()=>m.toggle(row.name)} aria-pressed={m.selected.includes(row.name)}><Brand company={row}/><strong>{row.name}</strong><small>{row.domain}</small><span>{row.person}</span></button>)}</section>)}</div>
          : <div className={`vertex-table-wrap ${m.view === "List" ? "vertex-list-view" : ""}`}><table className="vertex-table"><colgroup><col className="vertex-col-check"/><col className="vertex-col-company"/><col className="vertex-col-description"/><col className="vertex-col-domain"/><col className="vertex-col-location"/><col className="vertex-col-person"/><col className="vertex-col-status"/></colgroup><thead><tr><th><input aria-label="Select all visible companies" type="checkbox" checked={m.filtered.length>0 && m.filtered.every(row=>m.selected.includes(row.name))} onChange={event=>m.setSelected(event.target.checked ? m.filtered.map(row=>row.name) : [])}/></th><th><button type="button" onClick={()=>m.setSort(!m.sort)}>Company<ArrowDownUp size={13}/></button></th><th><span><NotebookPen size={14}/>Description<ArrowDownUp size={12}/></span></th><th><span><Link2 size={14}/>Domains<ArrowDownUp size={12}/></span></th><th><span><MapPin size={14}/>Location<ArrowDownUp size={12}/></span></th><th><span><Users size={14}/>Person to contact<ArrowDownUp size={12}/></span></th><th><span>Status<ArrowDownUp size={12}/></span></th></tr></thead><tbody>{m.filtered.map((row,index)=><tr key={row.name} className={m.selected.includes(row.name) ? "vertex-row-selected" : ""}><td><input type="checkbox" aria-label={`Select ${row.name}`} checked={m.selected.includes(row.name)} onChange={()=>m.toggle(row.name)}/></td><td><span className="vertex-company-name"><Brand company={row}/>{row.name}</span></td><td><span className="vertex-description" title={row.description}>{row.description}<ChevronRight size={12}/></span></td><td>{row.domain}</td><td><span className="vertex-location"><span>{row.flag}</span>{row.city}</span></td><td><span className="vertex-person"><span className={`vertex-avatar vertex-avatar-${index%4}`}>{row.person.split(" ").map(word=>word[0]).join("")}</span>{row.person}</span></td><td><button type="button" className="vertex-status-button" title={`Change status for ${row.name}`} onClick={()=>m.setCompanies(current=>current.map(company=>company.name===row.name ? {...company,status:statuses[(statuses.indexOf(company.status)+1)%statuses.length]}:company))}><StatusPill value={row.status}/></button></td></tr>)}</tbody></table>{m.filtered.length===0 && <div className="vertex-empty"><Search size={25}/><strong>No companies found</strong><p>Try another name or clear your filters.</p><button type="button" onClick={()=>{m.setQuery("");m.setStatus("All");m.setLocation("All");}}>Clear filters</button></div>}</div>}
        </div>
      </div>
      {m.menu && <><button type="button" className="vertex-menu-backdrop" aria-label="Dismiss workspace menu" onClick={()=>m.setMenu(null)}/><section className={`vertex-popover ${m.menu==="new" ? "vertex-new-form" : ""}`} aria-label="Workspace controls"><header><strong>{m.menu==="new" ? "New company" : m.menu==="status" ? "Filter by status" : m.menu==="location" ? "Filter by location" : m.menu==="settings" ? "Display settings" : m.menu==="export" ? "Export companies" : m.menu==="workspace" ? "VertexPoint workspace" : m.menu}</strong><button type="button" aria-label="Close workspace menu" onClick={()=>m.setMenu(null)}><X size={17}/></button></header>
        {m.menu==="status" ? ["All",...statuses].map(status=><button className="vertex-menu-option" type="button" key={status} onClick={()=>{m.setStatus(status);m.setMenu(null);}}>{status}{m.status===status&&<Check size={14}/>}</button>)
        :m.menu==="location" ? [["All","All locations"],["🇺🇸","United States"],["🇨🇳","China"],["🇰🇷","South Korea"]].map(([value,label])=><button className="vertex-menu-option" type="button" key={value} onClick={()=>{m.setLocation(value);m.setMenu(null);}}>{label}{m.location===value&&<Check size={14}/>}</button>)
        :m.menu==="settings"||m.menu==="Settings" ? <><button className="vertex-menu-option" type="button" onClick={()=>m.setDense(!m.dense)}>Compact rows{m.dense&&<Check size={14}/>}</button><button className="vertex-menu-option" type="button" onClick={()=>m.setMetricsVisible(!m.metricsVisible)}>Show metrics{m.metricsVisible&&<Check size={14}/>}</button></>
        :m.menu==="export" ? <><p>Download the {m.filtered.length} companies in the current view.</p><button className="vertex-menu-option" type="button" onClick={exportCSV}><Download size={15}/>Export CSV</button></>
        :m.menu==="new" ? <form onSubmit={addCompany} data-clarity-mask="true"><label>Company name<input name="company" required maxLength={60} placeholder="Company name"/></label><label>Domain<input name="domain" maxLength={80} placeholder="company.com"/></label><p>Changes stay in this interactive demo.</p><button className="vertex-new" type="submit"><Plus size={14}/>Add company</button></form>
        :m.menu==="Notifications" ? <div className="vertex-activity"><p><strong>Rachel Summers</strong> updated Microsoft’s status.</p><p><strong>Liam Bennett</strong> added Tesla to Key Accounts.</p><p><strong>Emma Jones</strong> completed the Meta opportunity.</p></div>
        :m.menu==="apps" ? <div className="vertex-apps">{[[Building2,"Companies"],[Users,"People"],[LayoutGrid,"Pipeline"]].map(([Icon,label])=>{const I=Icon as typeof Building2;return <button type="button" key={String(label)} onClick={()=>{m.setView(label==="Pipeline"?"Board":label==="People"?"List":"Table");m.setMenu(null);}}><I size={22}/>{String(label)}</button>;})}</div>
        :m.menu==="workspace"||m.menu==="profile" ? <div className="vertex-activity"><p><strong>VertexPoint</strong><br/>21 members · Design demo</p><p>Liam Smith<br/>smith@example.com</p></div>
        : <div className="vertex-activity"><p>This preview focuses on the company workspace.</p><p>Try searching, sorting, filtering, switching views or adding a company.</p><button className="vertex-new" type="button" onClick={()=>m.setMenu(null)}>Explore companies</button></div>}
      </section></>}
      {m.notice && <div className="vertex-notice" role="status">{m.notice}<button type="button" aria-label="Dismiss notification" onClick={()=>m.setNotice("")}><X size={14}/></button></div>}
    </div>
  </div>;
}
