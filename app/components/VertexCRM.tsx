import "./VertexCRM.css";
import Image from "@/components/ResponsiveImage";
import { StudyCanvas } from "./StudyLayout";
import { PanelLeft, Layers, LayoutGrid, Bell, SquareCheck, NotebookPen, Mail, GraduationCap, Workflow, ChevronDown, Search, Command, Plus, Wallet, Target, Star, Building2, Users, LifeBuoy, Settings, MapPin, Link2, ArrowDownUp, List, Table2, Zap, ArrowUpRight, ChartNoAxesColumnIncreasing, Clock3, ChevronRight, EyeOff } from "lucide-react";

type Status = "To Contact" | "Follow-Up" | "In Negotiation" | "Complete";
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
  { name: "Tencent", logo: "T", color: "#d9e7ee", description: "Chinese technology conglomerate", domain: "tencent.com", city: "Shenzhen, China", flag: "🇨🇳", person: "Wei Chen", status: "Complete" },
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

function StatusPill({ value }: { value: string }) {
  return <span className={`vertex-status vertex-status-${value.toLowerCase().replaceAll(" ", "-")}`}><i />{value}</span>;
}
// Simple Icons brand SVGs are CC0; rendered as small CSS masks.
const brandIcons: Record<string, string> = { Apple: "apple", Google: "google", Tesla: "tesla", NVIDIA: "nvidia", Meta: "meta", Samsung: "samsung", ByteDance: "bytedance", SpaceX: "spacex", Intel: "intel", "Coca-Cola": "cocacola" };
function Brand({ company }: { company: Company }) {
  const icon = brandIcons[company.name];
  return <span className={`vertex-brand vertex-brand-${company.name.toLowerCase()}`} style={{ color: company.color }} aria-hidden="true">{icon ? <span className="vertex-brand-vector" style={{ maskImage: `url(/brands/${icon}.svg)` }} /> : company.name === "Microsoft" ? <span className="vertex-microsoft-mark"><i/><i/><i/><i/></span> : company.logo}</span>;
}

function CountryFlag({ flag }: { flag: string }) {
  return <svg className="vertex-country-flag" width="20" height="14" viewBox="0 0 24 16" aria-hidden="true">
    {flag === "🇺🇸" ? <><path fill="#fff" d="M0 0h24v16H0z"/>{[0,2.46,4.92,7.38,9.84,12.3,14.76].map(y=><path key={y} fill="#bd4b54" d={`M0 ${y}h24v1.24H0z`}/>)}<path fill="#42547a" d="M0 0h10v8.62H0z"/>{[2,4.4,6.8].flatMap(y=>[1.6,4,6.4,8.8].map(x=><circle key={`${x}-${y}`} cx={x} cy={y} r=".45" fill="#fff"/>))}</> : flag === "🇨🇳" ? <><path fill="#d54444" d="M0 0h24v16H0z"/><path fill="#ffe38b" d="m5 2 1 2.5 2.6.1-2 1.7.7 2.6L5 7.4 2.7 9l.7-2.7-2-1.7 2.6-.1L5 2Z"/>{[[10,2],[12,4],[12,7],[10,9]].map(([x,y])=><circle key={y} cx={x} cy={y} r=".7" fill="#ffe38b"/>)}</> : <><path fill="#f3f3f3" d="M0 0h24v16H0z"/><circle cx="12" cy="8" r="4" fill="#c4515c"/><path d="M8 8a4 4 0 0 0 8 0c-2-3-2 3-4 0s-2 0-4 0Z" fill="#4c6e9c"/><path d="m3 3 2 2m-3 0 2 2m16-4-2 2m3 0-2 2M3 11l2 2m-3 0 2 2m16-4-2 2m3 0-2 2" stroke="#343434" strokeWidth="1"/></>}
  </svg>;
}

export default function VertexCRM() {
  return <StudyCanvas className="vertex-stage vertex-dark vertex-study" label="Company1 CRM interface study: company table, filters and activity metrics in a dark theme">
    <div className="vertex-shell">
      <aside className="vertex-sidebar">
        <div className="vertex-workspace"><svg className="vertex-workspace-logo" width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"><rect width="30" height="30" rx="9" fill="#293333"/><path d="M8 9h7l7 6-7 6H8l7-6-7-6Z" fill="#D4E5DF"/><path d="m8 9 7 6-7 6" stroke="#91B6AA" strokeWidth="2" strokeLinejoin="round"/></svg><span><strong>Company1 <ChevronDown size={12}/></strong><small><Users size={11}/>67 members</small></span><PanelLeft size={15}/></div>
        <div className="vertex-side-search"><Search size={17}/><span className="vertex-search-placeholder">Search</span><span><Command size={12}/>K</span></div>
        <div className="vertex-nav">{navigation.map(([Icon,label]) => <span className="vertex-control" key={label}><Icon size={16}/>{label}{label === "Notifications" && <b>16</b>}</span>)}</div>
        <div className="vertex-nav-heading"><ChevronDown size={12}/>Favorites<Plus size={14}/></div>
        <div className="vertex-nav">{favorites.map(([Icon,label]) => <span className="vertex-control" key={label}><Icon size={15}/>{label}</span>)}</div>
        <div className="vertex-nav-heading"><ChevronDown size={12}/>Records<Plus size={14}/></div>
        <div className="vertex-nav"><span className="vertex-control vertex-nav-active"><Building2 size={16}/>Companies</span><span className="vertex-control"><Users size={16}/>People</span></div>
        <div className="vertex-sidebar-bottom"><div className="vertex-nav"><span className="vertex-control"><Wallet size={15}/>Affiliate program</span><span className="vertex-control"><LifeBuoy size={15}/>Help center</span><span className="vertex-control"><Layers size={15}/>Plans</span><span className="vertex-control"><Settings size={15}/>Settings</span></div>
          <div className="vertex-profile"><Image src="/avatar-small.webp" alt="" width={38} height={38} loading="lazy" decoding="async"/><span><strong>Elena Sh <ChevronDown size={11}/></strong><small>lena.shamraeva.05@gmail.com</small></span><span>···</span></div>
        </div>
      </aside>
      <div className="vertex-main">
        <div className="vertex-topbar"><div><Layers size={19}/><strong>Companies</strong><i>·</i><span>156 companies</span></div><div className="vertex-topbar-right"><div className="vertex-team">{["EJ","MT","SC","LB"].map((name,index)=><span key={name} className={`vertex-avatar vertex-avatar-${index}`}>{name}</span>)}<span className="vertex-more-members">+9</span></div><span className="vertex-control"><LayoutGrid size={15}/>All apps</span><span className="vertex-control vertex-enrich"><Zap size={15} fill="currentColor"/>Enrich data</span></div></div>
        <div className="vertex-content">
          <div className="vertex-metrics">{metrics.map((metric,index)=><div className="vertex-metric" key={metric.label}><div className="vertex-metric-label"><metric.icon size={18}/>{metric.label}</div><p><strong>{metric.value}</strong> {metric.unit}</p><span className={`vertex-change ${index===1?"vertex-change-negative":""}`}><ArrowUpRight size={15}/>{metric.change}</span><svg className={`vertex-sparkline vertex-sparkline-${index}`} viewBox="0 0 110 40" aria-hidden="true"><path d={index===1 ? "M2 8C7 8 5 27 12 26S17 14 23 22 26 32 33 23 37 8 43 18 44 33 50 26 52 19 58 24 62 12 68 21 73 37 80 25 84 25 90 28 99 13 108 15" : "M2 26C9 27 9 35 16 29S20 16 27 24 31 15 39 21 43 39 49 30 51 7 57 18 64 35 71 29 74 11 81 22 86 20 92 24 101 9 108 4"}/></svg></div>)}</div>
          <div className="vertex-tools"><div className="vertex-view-tabs"><span className="vertex-control vertex-current-view"><Table2 size={15}/>Table</span><span className="vertex-control"><LayoutGrid size={15}/>Board</span><span className="vertex-control"><List size={15}/>List</span></div><div className="vertex-tool-actions"><span className="vertex-control vertex-table-search"><Search size={16}/>Search</span><span className="vertex-control"><EyeOff size={14}/>Hide</span><span className="vertex-control"><Settings size={15}/>Settings</span><span className="vertex-control">Import / Export<ChevronDown size={13}/></span><span className="vertex-control vertex-new">New company<ChevronDown size={13}/></span></div></div>
          <div className="vertex-filters"><span className="vertex-control"><Users size={14}/>Person to contact<ChevronDown size={13}/></span><span className="vertex-control"><MapPin size={14}/>Location<ChevronDown size={13}/></span><span className="vertex-control vertex-add-filter"><Plus size={15}/>Add filter</span></div>
          <div className="vertex-table-wrap"><table className="vertex-table"><colgroup><col className="vertex-col-check"/><col className="vertex-col-company"/><col className="vertex-col-description"/><col className="vertex-col-domain"/><col className="vertex-col-location"/><col className="vertex-col-person"/><col className="vertex-col-status"/></colgroup><thead><tr><th><span className="vertex-checkbox"/></th><th><span>Company<ArrowDownUp size={13}/></span></th><th><span><NotebookPen size={14}/>Description<ArrowDownUp size={12}/></span></th><th><span><Link2 size={14}/>Domains<ArrowDownUp size={12}/></span></th><th><span><MapPin size={14}/>Location<ArrowDownUp size={12}/></span></th><th><span><Users size={14}/>Person to contact<ArrowDownUp size={12}/></span></th><th><span>Status<ArrowDownUp size={12}/></span></th></tr></thead><tbody>{initialCompanies.map((row,index)=><tr key={row.name}><td><span className="vertex-checkbox"/></td><td><span className="vertex-company-name"><Brand company={row}/>{row.name}</span></td><td><span className="vertex-description"><span>{row.description}</span><ChevronRight size={12}/></span></td><td>{row.domain}</td><td><span className="vertex-location"><CountryFlag flag={row.flag}/>{row.city}</span></td><td><span className="vertex-person"><span className={`vertex-avatar vertex-avatar-${index%4}`}>{row.person.split(" ").map(word=>word[0]).join("")}</span>{row.person}</span></td><td><StatusPill value={row.status}/></td></tr>)}</tbody></table></div>
        </div>
      </div>
    </div>
  </StudyCanvas>;
}
