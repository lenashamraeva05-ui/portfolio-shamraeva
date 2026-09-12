import {
  Blocks,
  ChartNoAxesCombined,
  ChartNetwork,
  ContactRound,
  Download,
  GitBranch,
  GraduationCap,
  ListChecks,
  Mail,
  MapPin,
  MapPinned,
  MousePointer2,
  Network,
  PanelsTopLeft,
  Phone,
  Presentation,
  Route,
  SearchCheck,
  Sprout,
  UserRound,
  UserRoundPlus,
  UserRoundSearch,
  UsersRound,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import PortfolioHeader from "../components/PortfolioHeader";
import DarkVeil from "../../components/DarkVeil";

type Skill = { label: string; icon: LucideIcon };
type SkillGroup = { title: string; skills: Skill[] };

const skillGroups: SkillGroup[] = [
  {
    title: "Design",
    skills: [
      { label: "Information architecture", icon: Network },
      { label: "Customer interviews", icon: UserRoundSearch },
      { label: "Research & Scrutiny", icon: SearchCheck },
      { label: "User experience", icon: UserRound },
      { label: "Interaction design", icon: MousePointer2 },
      { label: "Rapid prototyping", icon: PanelsTopLeft },
      { label: "Solution testing", icon: ListChecks },
      { label: "Design system", icon: Blocks },
    ],
  },
  {
    title: "Product",
    skills: [
      { label: "Customer development", icon: UserRoundPlus },
      { label: "Customer journey", icon: Route },
      { label: "Service blueprint", icon: Workflow },
      { label: "Growth Funnels", icon: ChartNoAxesCombined },
      { label: "User-personas", icon: ContactRound },
      { label: "Data analysis", icon: ChartNetwork },
      { label: "Roadmap planning", icon: MapPinned },
    ],
  },
  {
    title: "Leadership",
    skills: [
      { label: "Workshop hosting", icon: Presentation },
      { label: "Culture & Principles", icon: Sprout },
      { label: "Team processes", icon: GitBranch },
      { label: "Mentorship", icon: GraduationCap },
      { label: "Recruitment", icon: UsersRound },
    ],
  },
];

const languages = [
  { name: "English", level: "B2 – C1", flag: "gb" },
  { name: "Russian", level: "Native", flag: "ru" },
  { name: "Portuguese", level: "A1", flag: "pt" },
];

type Experience = {
  company: string;
  role: string;
  dates: string;
  description: string;
  mark: "novu" | "approveit" | "citrix" | "wrike";
};

const experience: Experience[] = [
  {
    company: "Novu",
    role: "Product Design Lead",
    dates: "Feb 2023 – current moment",
    description:
      "Led design for Novu, an open-source notification infrastructure. Managed a team of 2 designers, rebuilt the design system, and enhanced user experience. Optimized growth funnels to increase adoption and implemented Scrum for improved processes. Supported two company pivots.",
    mark: "novu",
  },
  {
    company: "Approveit",
    role: "Design Mentor",
    dates: "Feb 2023 – Mar 2024",
    description:
      "Mentored mid-level designers, teaching user research, customer development, persona creation, and workshop facilitation. Guided them in service blueprinting, customer journey mapping, and writing use cases using my adapted JTBD framework. Enabled them to apply design thinking and contribute meaningfully to projects.",
    mark: "approveit",
  },
  {
    company: "Citrix",
    role: "Staff Product Designer",
    dates: "March 2021 – Jan 2023",
    description:
      "As part of Citrix's acquisition and integration of Wrike, I played a key role in expanding Wrike's Professional Services solutions across Citrix's portfolio. My responsibilities included driving strategic initiatives, fostering collaboration between teams, and ensuring the seamless integration of Wrike's project management tools into various Citrix divisions to maximize client engagement and efficiency.",
    mark: "citrix",
  },
  {
    company: "Wrike",
    role: "Senior Product Designer",
    dates: "Aug 2019 – Jan 2023",
    description:
      "Shipped comprehensive resource management and capacity planning solutions, budgeting and tools for marketers. Drove Design Debt initiatives and managed professional services domain.",
    mark: "wrike",
  },
];

export default function ResumePage() {
  return (
    <main className="resume-reference" id="main-content" tabIndex={-1}>
      <PortfolioHeader />
      <div className="resume-reference-veil" aria-hidden="true">
        <DarkVeil hueShift={20} />
      </div>
      <header className="resume-reference-header">
        <div className="resume-reference-title-row">
          <div className="resume-reference-photo">
            <Image
              unoptimized
              src="/resume-avatar.png"
              alt="Elena working at her laptop"
              fill
              priority
              sizes="(max-width: 760px) 26vw, 148px"
            />
          </div>
          <h1 className="resume-reference-title">Experience at a glance</h1>
        </div>
        <p className="resume-reference-subtitle">
          User-centered product designer. Data-driven, growth-focused.
        </p>
        <div className="resume-reference-contact">
          <span><MapPin className="resume-contact-icon" aria-hidden="true" />Lisbon, Portugal</span>
          <a href="mailto:n.knyshov@gmail.com" className="resume-contact-link"><Mail className="resume-contact-icon" aria-hidden="true" />n.knyshov@gmail.com</a>
          <a href="tel:+351921090349" className="resume-contact-link"><Phone className="resume-contact-icon" aria-hidden="true" />+351 921 090 349</a>
        </div>
      </header>

      <section className="resume-reference-skills" aria-labelledby="resume-skills-title">
        <div className="resume-reference-section-label">
          <span className="resume-label-dot" aria-hidden="true" />
          <h2 id="resume-skills-title">SKILLS</h2>
        </div>

        <div className="resume-reference-grid">
          {skillGroups.map((group) => (
            <section className="resume-skill-group" key={group.title}>
              <h2>{group.title}</h2>
              <ul>
                {group.skills.map(({ label, icon: Icon }) => (
                  <li key={label}>
                    <Icon aria-hidden="true" strokeWidth={1.35} />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="resume-skill-group resume-language-group">
            <h2>Languages</h2>
            <ul>
              {languages.map(({ name, level, flag }) => (
                <li key={name}>
                  <span className={`resume-flag resume-flag-${flag}`} aria-hidden="true" />
                  <span>{name} <em>{level}</em></span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <section className="resume-reference-experience" aria-labelledby="resume-experience-title">
        <header className="resume-experience-heading">
          <div className="resume-reference-section-label">
            <span className="resume-label-dot" aria-hidden="true" />
            <h2 id="resume-experience-title">EXPERIENCE</h2>
          </div>
          <a className="resume-download" href="/resume.pdf" download>
            <Download aria-hidden="true" />
            <span>Download CV</span>
          </a>
        </header>

        <div className="resume-experience-list">
          {experience.map(({ company, role, dates, description, mark }) => (
            <article className="resume-experience-item" key={company}>
              <div className="resume-company">
                <span className={`resume-company-mark resume-company-mark-${mark}`} aria-hidden="true" />
                <h3>{company}</h3>
              </div>
              <div className="resume-experience-copy">
                <h3>{role}</h3>
                <p className="resume-experience-dates">{dates}</p>
                <p className="resume-experience-description">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
