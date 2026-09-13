"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent, type WheelEvent } from "react";
import type { ReactNode } from "react";

type ProjectImage = {
  src: string;
  alt: string;
  label: string;
  fit?: "cover" | "contain";
};

export type ProjectCaseData = {
  slug: string;
  title: string;
  eyebrow: string;
  status: string;
  cover: string;
  coverAlt: string;
  overviewImage?: string;
  overviewImageAlt?: string;
  overviewVideo?: string;
  challenge: string;
  direction: string;
  directionVisual?: string;
  directionVisualAlt?: string;
  screensVisualImage?: string;
  screensVisualImageAlt?: string;
  directionLinks?: { label: string; url: string }[];
  result: string;
  metrics: { value: string; label: string }[];
  toolkit?: { name: string; description: string }[];
  overviewDetails?: {
    companyDescription: string;
    companyUrl: string;
    internship: string;
    focus: string[];
  };
  challengeStory?: {
    image: string;
    imageAlt: string;
    overlayImage?: string;
    overlayAlt?: string;
    title: string;
    body: string;
    highlights: { label: string; text: string; highlights?: string[] }[];
  };
  gallery: ProjectImage[];
  tone: "statist" | "museum" | "zernote";
  screensCopy?: { title: string; body: string; highlights?: string[] };
  overviewHighlights?: string[];
  challengeHighlights?: string[];
  directionHighlights?: string[];
  screensVisual?: "nda";
};

type TabId = "overview" | "challenge" | "direction" | "screens";

const tabs: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "Challenge" },
  { id: "direction", label: "Direction" },
  { id: "screens", label: "Screens" },
];

const getProjectTabs = (project: ProjectCaseData) => project.slug === "t-bank-statist"
  ? [
      { id: "overview", label: "Overview" },
      { id: "challenge", label: "Internship" },
      { id: "direction", label: "Statist" },
      { id: "screens", label: "Product work" },
    ] satisfies { id: TabId; label: string }[]
  : project.slug === "zernote"
    ? [
        { id: "overview", label: "Overview" },
        { id: "challenge", label: "Mentoring" },
        { id: "direction", label: "Concept" },
        { id: "screens", label: "Screens" },
      ] satisfies { id: TabId; label: string }[]
  : tabs;

const museumLandingParts = [
  { src: "/projects/ehu-landing/part-01.webp", height: 3600 },
  { src: "/projects/ehu-landing/part-02.webp", height: 3600 },
  { src: "/projects/ehu-landing/part-03.webp", height: 3600 },
  { src: "/projects/ehu-landing/part-04.webp", height: 3600 },
  { src: "/projects/ehu-landing/part-05.webp", height: 3600 },
  { src: "/projects/ehu-landing/part-06.webp", height: 3600 },
  { src: "/projects/ehu-landing/part-07.webp", height: 3600 },
  { src: "/projects/ehu-landing/part-08.webp", height: 3600 },
  { src: "/projects/ehu-landing/part-09.webp", height: 1966 },
];

const museumLandingCopy = [
  { kicker: "Overview", title: "A digital exhibition for EHU's history.", body: "EHU (European Humanities University) is a liberal-arts university founded in Belarus and now continuing its academic life in exile. I designed a long-form landing that turns its history into a clear, human story — a place where an international visitor can understand the institution, its people and its journey without opening a dense archive.", highlights: ["EHU (European Humanities University)", "continuing its academic life in exile", "long-form landing", "clear, human story", "international visitor"] },
  { kicker: "Context", title: "A university story told through many voices.", body: "The archive moves between institutional milestones and intimate memories. The opening gives visitors enough context to know where they are, then leaves room for the people, places and decisions that shaped EHU.", highlights: ["many voices", "institutional milestones", "intimate memories", "enough context"] },
  { kicker: "Challenge", title: "The problem was not a lack of content. It was its weight.", body: "The source mixed archival photographs, official documents, quotes, maps and handwritten illustrations. The design task was to protect factual depth while lowering cognitive load: create a mental model before the scroll, establish hierarchy and give emotionally heavy moments enough space to land.", highlights: ["not a lack of content", "protect factual depth", "lowering cognitive load", "mental model", "establish hierarchy"] },
  { kicker: "Structure", title: "Five chapters, one continuous journey.", body: "Beginning, Establishing, Relocation, E.H.U. International and EHU in exile become a simple route through a complex history. A chapter map keeps the whole story visible while each section earns the visitor's attention.", highlights: ["Five chapters", "simple route", "complex history", "chapter map"] },
  { kicker: "Pacing", title: "Let the archive breathe.", body: "Large pauses, focused captions and deliberate transitions separate moments that deserve reflection from moments that move the story forward. The scroll feels paced like an exhibition, not a document dump.", highlights: ["Large pauses", "focused captions", "deliberate transitions", "paced like an exhibition"] },
  { kicker: "Visual language", title: "A visual system that can grow with the archive.", body: "Blue, white, yellow and black; lines, arrows, paper textures, collage and handwritten marks turn photographs, documents, maps and illustrations into one coherent language.", highlights: ["visual system", "paper textures", "one coherent language"] },
  { kicker: "People", title: "History becomes tangible through its people.", body: "Portraits, quotes and small details shift the focus from an institution to a living community. Visitors can recognise the human stakes behind every move, change and new beginning.", highlights: ["through its people", "living community", "human stakes"] },
  { kicker: "Result", title: "A long scroll with a clear sense of place.", body: "The final landing gives EHU a flexible editorial foundation: a visitor can understand what happened, feel why it matters and keep exploring as the archive grows.", highlights: ["flexible editorial foundation", "why it matters", "archive grows"] },
];

function MuseumLandingScroll({ onProgress }: { onProgress: (value: number) => void }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef(0);
  const visualProgressRef = useRef(0);
  const lastFrameRef = useRef(0);
  const resumeAtRef = useRef(0);
  const draggingRef = useRef(false);
  const phaseRef = useRef(-1);
  const pausedRef = useRef(false);

  const togglePaused = () => {
    pausedRef.current = !pausedRef.current;
    setIsPaused(pausedRef.current);
  };

  useEffect(() => {
    let frame = 0;
    const duration = 72000;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = (now: number) => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (viewport && track) {
        const maxShift = Math.max(0, track.scrollHeight - viewport.clientHeight);
        const delta = lastFrameRef.current ? now - lastFrameRef.current : 0;
        lastFrameRef.current = now;
        if (!draggingRef.current && !pausedRef.current && !prefersReducedMotion && now >= resumeAtRef.current) {
          progressRef.current = (progressRef.current + delta / duration) % 1;
        }
        const targetProgress = Math.max(0, Math.min(1, progressRef.current));
        const smoothing = prefersReducedMotion ? 1 : Math.min(1, delta / 220);
        visualProgressRef.current += (targetProgress - visualProgressRef.current) * smoothing;
        const progress = visualProgressRef.current;
        setOffset(maxShift * progress);
        const phase = Math.min(museumLandingCopy.length - 1, Math.floor(progress * museumLandingCopy.length));
        if (phase !== phaseRef.current) {
          phaseRef.current = phase;
          onProgress(progress);
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onProgress]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    event.preventDefault();
    draggingRef.current = false;
    const maxShift = Math.max(0, track.scrollHeight - viewport.clientHeight);
    progressRef.current = Math.max(0, Math.min(1, progressRef.current + event.deltaY / Math.max(1, maxShift)));
    const phase = Math.min(museumLandingCopy.length - 1, Math.floor(progressRef.current * museumLandingCopy.length));
    if (phase !== phaseRef.current) {
      phaseRef.current = phase;
      onProgress(progressRef.current);
    }
    resumeAtRef.current = performance.now() + 3200;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    resumeAtRef.current = performance.now() + 3200;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div className="museum-overview-visual">
      <div className="museum-landing-scroll" ref={viewportRef} onPointerDown={handlePointerDown} onWheel={handleWheel} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}>
        <div className="museum-landing-track" ref={trackRef} style={{ transform: `translate3d(0, -${offset}px, 0)` }}>
          {museumLandingParts.map((part, index) => (
              <Image key={part.src} unoptimized src={part.src} alt={index === 0 ? "EHU Museums landing page" : ""} width={1380} height={part.height} sizes="(max-width: 1100px) 100vw, 62vw" className="museum-landing-part" />
          ))}
        </div>
      </div>
      <div className="museum-interaction-hint" aria-label="EHU exhibition controls">
        <span className="museum-hint-item">
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2v16M6.5 5.5 10 2l3.5 3.5M6.5 14.5 10 18l3.5-3.5" /></svg>
          <span>Scroll to explore</span>
        </span>
        <button type="button" className="museum-hint-item museum-hint-toggle" onClick={togglePaused} aria-pressed={isPaused} aria-label={isPaused ? "Play EHU exhibition animation" : "Pause EHU exhibition animation"}>
          {isPaused ? (
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 4 8 6-8 6z" /></svg>
          ) : (
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6.5 4.5v11M13.5 4.5v11" /></svg>
          )}
          <span>{isPaused ? "Play animation" : "Pause animation"}</span>
        </button>
      </div>
    </div>
  );
}

const dashboardBase = [
  { name: "Checkout funnel", key: "checkout", status: "Live", delta: 12, value: 78 },
  { name: "Card activation", key: "activation", status: "Live", delta: 7, value: 64 },
  { name: "Premium upgrade", key: "premium", status: "Review", delta: -3, value: 42 },
  { name: "P2P transfers", key: "transfers", status: "Live", delta: 18, value: 87 },
  { name: "Cashback banner", key: "cashback", status: "Paused", delta: -8, value: 31 },
];

function StatistChallengeDashboard() {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [refresh, setRefresh] = useState(0);
  const rows = useMemo(() => dashboardBase.concat([
    { name: "Homepage modules", key: "homepage", status: "Draft", delta: 4, value: 53 },
    { name: "Search suggestions", key: "search", status: "Live", delta: 9, value: 71 },
  ]).map((row, index) => ({ ...row, value: Math.max(18, Math.min(96, row.value + ((refresh * 11 + index * 7) % 13) - 6)) })), [refresh]);
  const filterOptions: Record<string, string[]> = { Status: ["All", "Live", "Draft", "Paused"], Product: ["All products", "Mobile app", "Web app"], Author: ["Everyone", "Elena", "Growth team"] };

  return (
    <div className="statist-dashboard hippo-dashboard" aria-label="Interactive Hippo experiments preview">
      <header className="hippo-topbar"><div className="hippo-brand"><span className="hippo-grid">⠿</span><span className="hippo-mark">↗</span><strong>Hippo</strong></div><nav><button type="button" className="hippo-new">⌘ New experiment</button><button type="button" className="hippo-nav-active">Experiments</button><button type="button">Surfaces</button></nav><div className="hippo-actions"><button type="button" className="hippo-docs">Documentation</button><button type="button" aria-label="Notifications">●</button><button type="button" aria-label="Help">?</button><button type="button" className="hippo-user">E</button></div></header>
      <div className="hippo-shell"><main className="hippo-report"><div className="hippo-report-toolbar"><label className="hippo-search"><span>⌕</span><input aria-label="Search experiments" placeholder="Search by experiment name" /></label><div className="hippo-segmented"><button type="button" className={activeFilter === "All" ? "is-active" : ""} onClick={() => setActiveFilter("All")}>All</button><button type="button" className={activeFilter === "Paused" ? "is-active" : ""} onClick={() => setActiveFilter("Paused")}>Paused</button><button type="button" onClick={() => setRefresh((value) => value + 1)}>↻ Refresh</button></div></div><div className="hippo-table-head"><span>Experiment</span><span>Status</span><span>Surface</span><span>Lift</span></div>{rows.map((row, index) => <button type="button" className={`hippo-row ${activeFilter === row.status || activeFilter === "All" ? "" : "is-muted"}`} key={row.key} onClick={() => setActiveFilter(row.status)}><span className="hippo-row-name"><i className={`hippo-status status-${index % 4}`} />{row.name}<small>{row.key} / {index % 2 ? "Mobile app" : "Main surface"}</small></span><span className={`hippo-state state-${row.status.toLowerCase()}`}>{row.status}</span><span className="hippo-surface">{index % 3 === 0 ? "Home" : index % 3 === 1 ? "Cards" : "Payments"}</span><span className={row.delta > 0 ? "hippo-positive" : "hippo-negative"}>{row.delta > 0 ? "↗" : "↘"} {Math.abs(row.delta)}</span><span className="hippo-row-meter"><i style={{ width: `${row.value}%` }} /></span></button>)}</main><aside className="hippo-filters"><section className="hippo-presets"><h3>Presets</h3><p>Save the current filters for quick access.</p><button type="button" onClick={() => setActiveFilter("Saved")}>♥ Save as preset</button></section><section className="hippo-filter-card"><h3>Filters</h3>{Object.entries(filterOptions).map(([label, options]) => <div className="hippo-filter-wrap" key={label}><button type="button" className="hippo-filter" aria-expanded={openFilter === label} onClick={() => setOpenFilter((current) => current === label ? null : label)}><span>{label}</span><b>⌄</b></button>{openFilter === label && <div className="hippo-filter-menu">{options.map((option) => <button type="button" key={option} className={activeFilter === option ? "is-selected" : ""} onClick={() => { setActiveFilter(option); setOpenFilter(null); }}>{option}<span>{activeFilter === option ? "✓" : ""}</span></button>)}</div>}</div>)}<h3 className="hippo-extra-title">Additional</h3><button type="button" className="hippo-filter"><span>Metric threshold · 0.01</span><b>⌄</b></button><label className="hippo-toggle"><input type="checkbox" defaultChecked /><span />Multi-variant comparison</label><label className="hippo-toggle"><input type="checkbox" defaultChecked /><span />Passed QA checks</label></section></aside></div><div className="hippo-fade" aria-hidden="true" />
    </div>
  );
}

function NdaScreenVisual() {
  return (
    <div className="nda-screen-visual" role="img" aria-label="Private product screens shared in context only">
      <Image
        unoptimized
        src="/projects/tbank-private-screens.png"
        alt="Private product screens shared in context only"
        fill
        sizes="(max-width: 1024px) 100vw, 62vw"
        className="nda-screen-image"
      />
    </div>
  );
}

function renderHighlightedCopy(text: string, highlights: string[] = []): ReactNode {
  if (!highlights.length) return text;

  const orderedHighlights = [...highlights].sort((a, b) => b.length - a.length);
  const pieces: ReactNode[] = [];
  let cursor = 0;
  let pieceKey = 0;

  while (cursor < text.length) {
    const match = orderedHighlights
      .map((phrase) => ({ phrase, index: text.indexOf(phrase, cursor) }))
      .filter(({ index }) => index !== -1)
      .sort((a, b) => a.index - b.index)[0];

    if (!match) {
      pieces.push(text.slice(cursor));
      break;
    }

    if (match.index > cursor) pieces.push(text.slice(cursor, match.index));
    pieces.push(<strong className="project-copy-highlight" key={`highlight-${pieceKey++}`}>{match.phrase}</strong>);
    cursor = match.index + match.phrase.length;
  }

  return pieces;
}

export default function ProjectCaseTabs({ project }: { project: ProjectCaseData }) {
  const [localTab, setLocalTab] = useState<TabId>("overview");
  const [screenIndex, setScreenIndex] = useState(0);
  const [museumProgress, setMuseumProgress] = useState(0);
  const updateMuseumProgress = useCallback((value: number) => setMuseumProgress(value), []);
  const isMuseum = project.tone === "museum";
  const projectTabs = getProjectTabs(project);
  const activeTab = isMuseum ? "overview" : localTab;
  const activeTabIndex = projectTabs.findIndex(({ id }) => id === activeTab);
  const activeScreen = project.gallery[screenIndex] ?? project.gallery[0];

  const activateTab = useCallback((tab: TabId) => {
    const { scrollX, scrollY } = window;
    setLocalTab(tab);
    // Panel content changes must never move the page away from the clicked tabs.
    window.scrollTo({ left: scrollX, top: scrollY, behavior: "auto" });
    window.requestAnimationFrame(() => {
      window.scrollTo({ left: scrollX, top: scrollY, behavior: "auto" });
      window.requestAnimationFrame(() => window.scrollTo({ left: scrollX, top: scrollY, behavior: "auto" }));
    });
  }, []);

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    let nextIndex = activeTabIndex;
    if (event.key === "ArrowRight") nextIndex = (activeTabIndex + 1) % projectTabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (activeTabIndex - 1 + projectTabs.length) % projectTabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = projectTabs.length - 1;
    else return;

    event.preventDefault();
    const nextTab = projectTabs[nextIndex];
    activateTab(nextTab.id);
    document.getElementById(`${project.slug}-${nextTab.id}`)?.focus({ preventScroll: true });
  };

  const previewImage = activeTab === "overview"
    ? { src: project.overviewImage ?? project.cover, alt: project.overviewImageAlt ?? project.coverAlt, fit: project.tone === "statist" ? "cover" as const : "contain" as const }
    : activeTab === "challenge"
      ? project.gallery[0]
      : project.gallery[1] ?? project.gallery[0];

  const museumCopy = museumLandingCopy[Math.min(museumLandingCopy.length - 1, Math.floor(museumProgress * museumLandingCopy.length))];
  const copy: { label: string; title: string; body: string; highlights?: string[] } = project.tone === "museum" && activeTab === "overview"
    ? { label: museumCopy.kicker, title: museumCopy.title, body: museumCopy.body, highlights: museumCopy.highlights }
    : activeTab === "overview"
    ? {
        label: "Overview",
        title: project.overviewDetails ? "About T‑Bank" : project.eyebrow,
        body: project.overviewDetails?.companyDescription ?? project.result,
        highlights: project.overviewHighlights,
      }
      : activeTab === "challenge"
      ? project.challengeStory
        ? { label: project.slug === "zernote" ? "Mentoring" : "Internship at T‑Bank", title: project.challengeStory.title, body: project.challengeStory.body, highlights: project.challengeHighlights }
        : { label: "Challenge", title: "The problem behind the interface.", body: project.challenge, highlights: project.challengeHighlights }
      : activeTab === "direction"
        ? { label: project.slug === "zernote" ? "Concept" : "Direction", title: project.slug === "zernote" ? "From product story to investor conversations." : "From evidence to a clear product direction.", body: project.direction, highlights: project.directionHighlights }
      : {
          label: "Screens",
          title: project.screensCopy?.title ?? activeScreen.label,
          body: project.screensCopy?.body ?? `${screenIndex + 1} of ${project.gallery.length} selected project screens.`,
          highlights: project.screensCopy?.highlights,
        };

  const moveScreen = (step: number) => {
    setScreenIndex((current) => (current + step + project.gallery.length) % project.gallery.length);
  };

  return (
    <section className={`project-switcher ${isMuseum ? "project-switcher-museum" : ""}`} data-reveal>
      {!isMuseum && (
        <div className="project-tabs" role="tablist" aria-label={`${project.title} case sections`}>
          {projectTabs.map((tab) => (
            <button
              type="button"
              role="tab"
              id={`${project.slug}-${tab.id}`}
              aria-controls={`${project.slug}-panel`}
              aria-selected={activeTab === tab.id}
              tabIndex={activeTab === tab.id ? 0 : -1}
              key={tab.id}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => activateTab(tab.id)}
              onKeyDown={handleTabKeyDown}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <div
        className={`project-tab-panel project-tab-panel-${project.tone}-${activeTab}`}
        id={`${project.slug}-panel`}
        {...(!isMuseum && {
          role: "tabpanel",
          "aria-labelledby": `${project.slug}-${activeTab}`,
        })}
        tabIndex={isMuseum ? undefined : 0}
        key={`${project.slug}-${activeTab}`}
      >
        <div className={`project-facts project-facts-${project.tone} project-facts-${project.tone}-${activeTab} tab-copy-enter`}>
          <p className="case-status"><i aria-hidden="true" />{project.status}</p>
          <h3 key={`${project.slug}-${copy.title}`} className={project.tone === "museum" ? "museum-copy-transition" : undefined}>{copy.title}</h3>
          <p key={`${project.slug}-${copy.body}`} className={`project-tab-body ${copy.highlights?.length ? "project-tab-body-highlighted" : ""} ${project.tone === "museum" ? "museum-copy-transition" : ""}`}>
            {copy.highlights?.length ? renderHighlightedCopy(copy.body, copy.highlights) : copy.body}
          </p>

          {activeTab === "overview" && project.slug !== "zernote" && (
            <div className="case-metrics" aria-label={`${project.title} figures`}>
              {project.metrics.map((metric) => (
                <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>
              ))}
            </div>
          )}

          {activeTab === "overview" && project.toolkit && (
            <div className="zernote-toolkit project-internship-highlights" aria-label="Zernote tools">
              <p className="zernote-toolkit-label">Three tools. One connected workflow.</p>
              {project.toolkit.map((tool) => (
                <div key={tool.name}>
                  <span>{tool.name}</span>
                  <p>{tool.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "overview" && project.overviewDetails && (
            <div className="project-overview-details">
              <p className="project-internship"><strong>Internship at T‑Bank</strong><span>{project.overviewDetails.internship}</span></p>
              <div className="project-focus">
                <div className="project-focus-chips">
                  {project.overviewDetails.focus.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
              <a className="project-company-link" href={project.overviewDetails.companyUrl} target="_blank" rel="noreferrer">
                Learn about T‑Bank <span aria-hidden="true">↗</span>
              </a>
            </div>
          )}

          {activeTab === "challenge" && project.challengeStory && (
            <div className="project-tab-note project-internship-highlights">
              {project.challengeStory.highlights.map((highlight) => (
                <div key={highlight.label}>
                  <span>{highlight.label}</span>
                  <p className={highlight.highlights?.length ? "project-tab-body-highlighted" : undefined}>
                    {highlight.highlights?.length ? renderHighlightedCopy(highlight.text, highlight.highlights) : highlight.text}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "challenge" && !project.challengeStory && (
            <div className="project-tab-note"><span>Design question</span><p>What needs to become clearer before the interface can become simpler?</p></div>
          )}

          {activeTab === "direction" && (
            <>
              <div className="project-tab-note"><span>Goal</span><p>{project.result}</p></div>
              {project.directionLinks && (
                <nav className="project-direction-links" aria-label="Public Statist resources">
                  {project.directionLinks.map((link) => (
                    <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>
                      {link.label}<span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </nav>
              )}
            </>
          )}

          {activeTab === "screens" && project.gallery.length > 1 && !project.screensVisualImage && (
            <div className="screen-controls" aria-label="Screen navigation">
              <button type="button" onClick={() => moveScreen(-1)} aria-label="Previous screen"><span aria-hidden="true">←</span></button>
              <span aria-live="polite">{String(screenIndex + 1).padStart(2, "0")} / {String(project.gallery.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => moveScreen(1)} aria-label="Next screen"><span aria-hidden="true">→</span></button>
            </div>
          )}

        </div>

        <div className={`project-panel-image project-panel-image-${project.tone} project-panel-image-${activeTab} tab-visual-enter`}>
          {activeTab === "screens" && project.screensVisualImage ? (
            <div className="project-screens-visual">
              <Image
                unoptimized
                src={project.screensVisualImage}
                alt={project.screensVisualImageAlt ?? ""}
                fill
                sizes="(max-width: 1024px) 100vw, 62vw"
                className="project-screens-image"
              />
            </div>
          ) : activeTab === "screens" ? (
            <div className="screen-browser">
              <div className="screen-browser-stage" key={activeScreen.src}>
                {project.screensVisual === "nda" ? <NdaScreenVisual /> : (
                  <>
                    <Image
                      unoptimized
                      src={activeScreen.src}
                      alt={activeScreen.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 62vw"
                      className={activeScreen.fit === "contain" ? "fit-contain" : "fit-cover"}
                    />
                    <span className="screen-glint" aria-hidden="true" />
                  </>
                )}
              </div>
              {project.gallery.length > 1 && (
                <div className="screen-picker" aria-label="Choose a project screen">
                  {project.gallery.map((image, index) => (
                    <button
                      type="button"
                      aria-label={`Show ${image.label}`}
                      aria-pressed={screenIndex === index}
                      onClick={() => setScreenIndex(index)}
                      key={image.src}
                    >
                      <Image unoptimized src={image.src} alt="" fill sizes="88px" className={image.fit === "contain" ? "fit-contain" : "fit-cover"} />
                      <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : activeTab === "challenge" && project.challengeStory ? (
            <>
              <Image
                unoptimized
                src={project.challengeStory.image}
                alt={project.challengeStory.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 62vw"
                className="project-internship-main fit-cover"
              />
              {project.challengeStory.overlayImage && (
                <div className="project-internship-overlay-layer">
                  <Image
                    unoptimized
                    src={project.challengeStory.overlayImage}
                    alt={project.challengeStory.overlayAlt ?? ""}
                    width={2385}
                    height={1854}
                    className="project-internship-overlay"
                  />
                </div>
              )}
            </>
          ) : activeTab === "challenge" && project.tone === "statist" ? (
            <StatistChallengeDashboard />
          ) : activeTab === "direction" && project.tone === "statist" ? (
            <div className="statist-direction-visual">
              <Image
                unoptimized
                src="/projects/statist-direction.png"
                alt="Statist analytics visual with charts, a rising trend line and Statist wordmark"
                fill
                sizes="(max-width: 1024px) 100vw, 62vw"
                className="statist-direction-image"
              />
            </div>
          ) : activeTab === "direction" && project.directionVisual ? (
            <div className="project-direction-visual">
              <Image
                unoptimized
                src={project.directionVisual}
                alt={project.directionVisualAlt ?? ""}
                fill
                sizes="(max-width: 1024px) 100vw, 62vw"
                className="project-direction-image"
              />
            </div>
          ) : activeTab === "overview" && project.tone === "museum" ? (
            <MuseumLandingScroll onProgress={updateMuseumProgress} />
          ) : activeTab === "overview" && project.overviewVideo ? (
            <div className="project-overview-video">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label={project.coverAlt}
              >
                <source src={project.overviewVideo} type="video/webm" />
              </video>
            </div>
          ) : (
            <Image
              unoptimized
              src={previewImage.src}
              alt={previewImage.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 62vw"
              className={previewImage.fit === "contain" ? "fit-contain" : "fit-cover"}
            />
          )}
        </div>
      </div>
    </section>
  );
}
