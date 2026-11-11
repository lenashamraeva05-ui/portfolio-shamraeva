import {
  BookOpen,
  Blocks,
  ChartNoAxesCombined,
  ChartNetwork,
  ContactRound,
  Download,
  GitBranch,
  GraduationCap,
  ListChecks,
  MapPin,
  MapPinned,
  MousePointer2,
  Network,
  PanelsTopLeft,
  Route,
  SearchCheck,
  Sprout,
  UserRound,
  UserRoundPlus,
  UserRoundSearch,
  University,
  UsersRound,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "@/components/ResponsiveImage";
import PortfolioHeader from "../components/PortfolioHeader";
import DarkVeil from "../../components/DarkVeil";
import ContactActions from "./ContactActions";

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
      { label: "Culture & Principles", icon: Sprout },
      { label: "Team processes", icon: GitBranch },
      { label: "Mentorship", icon: GraduationCap },
      { label: "Recruitment", icon: UsersRound },
    ],
  },
];

const languages = [
  { name: "English", level: "B2", flag: "gb" },
  { name: "Russian", level: "Native", flag: "ru" },
];

type Experience = {
  company: string;
  role: string;
  dates: string;
  description: string;
  mark: "uservers" | "zernote" | "tbank" | "students" | "ehu" | "freelance";
  logo?: string;
};

const experience: Experience[] = [
  {
    company: "U-Servers",
    role: "Middle UX/UI designer",
    dates: "Aug 2024 - Present · 2 yrs 2 mos",
    description: "A digital gaming platform. Drove product discovery, CustDev, growth-oriented UX optimisation, and scalable design systems across core product experiences.",
    mark: "uservers",
    logo: "/logos/uservers.svg",
  },
  {
    company: "Zernote",
    role: "Middle Product designer",
    dates: "Feb 2026 - Nov 2026 · 10 mos",
    description: "An AI-powered user research platform. Led user interviews, mentored pre-junior designers, prototyped an MVP in Figma, vibe-coded its implementation, created pitch deck, and pitched to investors.",
    mark: "zernote",
    logo: "/logos/zernote.svg",
  },
  {
    company: "T-Bank",
    role: "Intern Product Designer",
    dates: "May 2026 - Sep 2026 · 3 mos",
    description:
      "A major digital bank. Designed and refined interfaces for Statist, an internal analytics platform, contributing to product launch readiness and go-to-market preparation.",
    mark: "tbank",
    logo: "/logos/t-bank.webp",
  },
  {
    company: "Student's Hub",
    role: "Junior Product designer",
    dates: "Dec 2023 - Apr 2025 · 1 yr 5 mos",
    description: "A university-backed student freelance marketplace. Shaped marketplace UX, user flows, and product discovery to streamline student-client interactions.",
    mark: "students",
    logo: "/logos/students-hub.webp",
  },
  {
    company: "EHU IT Hub",
    role: "Designer",
    dates: "Mar 2024 - Nov 2024 · 9 mos",
    description: "A university IT community. Built visual systems, data dashboards, and conversion-focused landing pages.",
    mark: "ehu",
    logo: "/logos/ehu-it-hub.svg",
  },
  {
    company: "Freelance",
    role: "Freelance Designer",
    dates: "Feb 2022 - May 2023 · 1 yr 4 mos",
    description: "Worked on design projects for freelance clients.",
    mark: "freelance",
  },
];

type Education = {
  institution: string;
  program: string;
  dates: string;
  detail?: string;
  icon: LucideIcon;
};

const education: Education[] = [
  {
    institution: "Yandex Practicum",
    program: "UX Research for Designers",
    dates: "Oct 2024 - Feb 2025",
    detail: "Grade: 160 hours",
    icon: BookOpen,
  },
  {
    institution: "Moscow Polytechnic University",
    program: "Bachelor's degree, Graphic Design",
    dates: "Aug 2023 - Feb 2028",
    icon: University,
  },
  {
    institution: "yudaevschool",
    program: "UX/UI",
    dates: "Sep 2021 - Apr 2022 · 6 mos",
    icon: GraduationCap,
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
              src="/resume-avatar.webp"
              alt="Helen working at her laptop"
              fill
              priority
              sizes="(max-width: 760px) 26vw, 148px"
            />
          </div>
          <h1 className="resume-reference-title">Experience at a glance</h1>
        </div>
        <p className="resume-reference-subtitle">
          Passionate about user-centered design, data-driven strategies, and product growth. With a background in graphic design, I bring strong visual thinking and craft into digital product experiences.
        </p>
        <div className="resume-reference-contact">
          <span><MapPin className="resume-contact-icon" aria-hidden="true" />Eastbourne, UK</span>
          <ContactActions />
        </div>
        <nav className="resume-profile-links" aria-label="Professional links">
          <a href="https://www.linkedin.com/in/elena-shamraeva-a73464393/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://calendly.com/lena-shamraeva-05/30min" target="_blank" rel="noreferrer">Calendly</a>
          <a href="https://wa.me/447956042838" target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="https://t.me/ftr0ys_emmm" target="_blank" rel="noreferrer">Telegram</a>
        </nav>
      </header>

      <section className="resume-reference-skills" aria-labelledby="resume-skills-title">
        <div className="resume-reference-section-label">
          <span className="resume-label-dot" aria-hidden="true" />
          <h2 id="resume-skills-title">Skills</h2>
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
            <h2 id="resume-experience-title">Experience</h2>
          </div>
          <a className="resume-download" href="/resume.pdf?v=62720381fe29" download>
            <Download aria-hidden="true" />
            <span>Download CV</span>
          </a>
        </header>

        <div className="resume-experience-list">
          {experience.map(({ company, role, dates, description, mark, logo }) => (
            <article className="resume-experience-item" key={company}>
              <div className="resume-company">
                {logo ? (
                  <Image
                    className="resume-company-logo"
                    src={logo}
                    alt=""
                    width={36}
                    height={36}
                    unoptimized
                    aria-hidden="true"
                  />
                ) : (
                  <span className={`resume-company-mark resume-company-mark-${mark}`} aria-hidden="true" />
                )}
                <h3>{company}</h3>
              </div>
              <div className="resume-experience-copy">
                <h3>{role}</h3>
                {dates && <p className="resume-experience-dates">{dates}</p>}
                {description && <p className="resume-experience-description">{description}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-reference-experience resume-reference-education" aria-labelledby="resume-education-title">
        <header className="resume-experience-heading">
          <div className="resume-reference-section-label">
            <span className="resume-label-dot" aria-hidden="true" />
            <h2 id="resume-education-title">Education</h2>
          </div>
        </header>

        <div className="resume-experience-list">
          {education.map(({ institution, program, dates, detail, icon: Icon }) => (
            <article className="resume-experience-item resume-education-item" key={institution}>
              <div className="resume-company">
                <Icon className="resume-education-icon" aria-hidden="true" />
                <h3>{institution}</h3>
              </div>
              <div className="resume-experience-copy">
                <h3>{program}</h3>
                <p className="resume-experience-dates">{dates}</p>
                {detail && <p className="resume-experience-description">{detail}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
