"use client";

import Image from "next/image";
import { useCallback, useMemo, useState, type CSSProperties, type KeyboardEvent } from "react";

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
  challenge: string;
  direction: string;
  result: string;
  metrics: { value: string; label: string }[];
  gallery: ProjectImage[];
  tone: "statist" | "museum" | "zernote";
  publicUrl?: string;
};

type TabId = "overview" | "challenge" | "direction" | "screens";

const tabs: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "Challenge" },
  { id: "direction", label: "Direction" },
  { id: "screens", label: "Screens" },
];

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

function StatistDirectionBoard() {
  return (
    <div className="statist-direction-board" aria-label="Statist product direction map">
      <div className="direction-board-top"><span>Direction map · 03</span><b>Signal → decision</b></div>
      <div className="direction-board-line" aria-hidden="true" />
      <div className="direction-board-steps">
        {[{ label: "Collect", copy: "Events arrive with context", icon: "01" }, { label: "Interpret", copy: "Patterns become a shared language", icon: "02" }, { label: "Act", copy: "Teams ship the next best move", icon: "03" }].map((step, index) => (
          <article key={step.label} style={{ "--direction-delay": `${index * 90}ms` } as CSSProperties}><span>{step.icon}</span><i aria-hidden="true">{index === 0 ? "⌁" : index === 1 ? "◌" : "↗"}</i><h4>{step.label}</h4><p>{step.copy}</p></article>
        ))}
      </div>
      <div className="direction-board-footer"><span><i /> Shared taxonomy</span><span><i /> Decision-ready views</span><b>v2.4 / approved</b></div>
    </div>
  );
}

export default function ProjectCaseTabs({ project }: { project: ProjectCaseData }) {
  const [localTab, setLocalTab] = useState<TabId>("overview");
  const [screenIndex, setScreenIndex] = useState(0);
  const activeTab = localTab;
  const activeTabIndex = tabs.findIndex(({ id }) => id === activeTab);
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
    if (event.key === "ArrowRight") nextIndex = (activeTabIndex + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (activeTabIndex - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    activateTab(nextTab.id);
    document.getElementById(`${project.slug}-${nextTab.id}`)?.focus({ preventScroll: true });
  };

  const previewImage = activeTab === "overview"
    ? { src: project.cover, alt: project.coverAlt, fit: project.tone === "statist" ? "cover" as const : "contain" as const }
    : activeTab === "challenge"
      ? project.gallery[0]
      : project.gallery[1] ?? project.gallery[0];

  const copy = activeTab === "overview"
    ? { label: "Overview", title: project.eyebrow, body: project.result }
    : activeTab === "challenge"
      ? { label: "Challenge", title: "The problem behind the interface.", body: project.challenge }
      : activeTab === "direction"
        ? { label: "Direction", title: "From evidence to a clear product direction.", body: project.direction }
        : { label: "Screens", title: activeScreen.label, body: `${screenIndex + 1} of ${project.gallery.length} selected project screens.` };

  const moveScreen = (step: number) => {
    setScreenIndex((current) => (current + step + project.gallery.length) % project.gallery.length);
  };

  return (
    <section className="project-switcher" data-reveal>
      <div className="project-tabs" role="tablist" aria-label={`${project.title} case sections`}>
        {tabs.map((tab) => (
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

      <div
        className="project-tab-panel"
        id={`${project.slug}-panel`}
        role="tabpanel"
        aria-labelledby={`${project.slug}-${activeTab}`}
        tabIndex={0}
        key={`${project.slug}-${activeTab}`}
      >
        <div className="project-facts tab-copy-enter">
          <p className="case-status"><i aria-hidden="true" />{project.status}</p>
          <span className="project-tab-kicker">{copy.label}</span>
          <h3>{copy.title}</h3>
          <p className="project-tab-body">{copy.body}</p>

          {activeTab === "overview" && (
            <div className="case-metrics" aria-label={`${project.title} figures`}>
              {project.metrics.map((metric) => (
                <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>
              ))}
            </div>
          )}

          {activeTab === "challenge" && (
            <div className="project-tab-note"><span>Design question</span><p>What needs to become clearer before the interface can become simpler?</p></div>
          )}

          {activeTab === "direction" && (
            <div className="project-tab-note"><span>Outcome</span><p>{project.result}</p></div>
          )}

          {activeTab === "screens" && project.gallery.length > 1 && (
            <div className="screen-controls" aria-label="Screen navigation">
              <button type="button" onClick={() => moveScreen(-1)} aria-label="Previous screen"><span aria-hidden="true">←</span></button>
              <span aria-live="polite">{String(screenIndex + 1).padStart(2, "0")} / {String(project.gallery.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => moveScreen(1)} aria-label="Next screen"><span aria-hidden="true">→</span></button>
            </div>
          )}

          {project.publicUrl && activeTab === "overview" && (
            <a className="public-link" href={project.publicUrl} target="_blank" rel="noreferrer">View public product context <span aria-hidden="true">↗</span></a>
          )}
        </div>

        <div className={`project-panel-image project-panel-image-${project.tone} project-panel-image-${activeTab} tab-visual-enter`}>
          {activeTab === "screens" ? (
            <div className="screen-browser">
              <div className="screen-browser-stage" key={activeScreen.src}>
                <Image
                  unoptimized
                  src={activeScreen.src}
                  alt={activeScreen.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 62vw"
                  className={activeScreen.fit === "contain" ? "fit-contain" : "fit-cover"}
                />
                <span className="screen-glint" aria-hidden="true" />
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
          ) : activeTab === "challenge" && project.tone === "statist" ? (
            <StatistChallengeDashboard />
          ) : activeTab === "direction" && project.tone === "statist" ? (
            <StatistDirectionBoard />
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
