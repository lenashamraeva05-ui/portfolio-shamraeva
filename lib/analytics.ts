export const CLARITY_PROJECT_ID = "zbzw8aajuk";
const CONSENT_KEY = "portfolio-analytics-consent-v1";
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export type AnalyticsConsent = "granted" | "denied";
type Clarity = ((...args: unknown[]) => void) & { q?: unknown[][] };
declare global { interface Window { clarity?: Clarity; } }

export function readConsent(storage: Pick<Storage, "getItem"> = localStorage): AnalyticsConsent | null {
  try {
    const saved = JSON.parse(storage.getItem(CONSENT_KEY) ?? "null");
    return saved && Date.now() - saved.at >= 0 && Date.now() - saved.at < MAX_AGE && ["granted", "denied"].includes(saved.value) ? saved.value : null;
  } catch { return null; }
}
export function saveConsent(value: AnalyticsConsent, storage: Pick<Storage, "setItem"> = localStorage) {
  try { storage.setItem(CONSENT_KEY, JSON.stringify({ value, at: Date.now() })); } catch { /* Consent still applies for this page when storage is unavailable. */ }
}

export function installClarity(consent: AnalyticsConsent | null, win: Window & typeof globalThis = window, doc: Document = document) {
  if (consent !== "granted") return () => {};
  // Browser prerenders are preparation, not visits. Start only upon activation.
  if ((doc as Document & { prerendering?: boolean }).prerendering) {
    let cleanup = () => {};
    const activate = () => { cleanup = installClarity(consent, win, doc); };
    doc.addEventListener("prerenderingchange", activate, { once: true });
    return () => { doc.removeEventListener("prerenderingchange", activate); cleanup(); };
  }
  // Never send local development or preview visits to the production dashboard.
  if (!["elena.shamraeva.co.uk", "www.elena.shamraeva.co.uk"].includes(win.location.hostname)) return () => {};
  if (!win.clarity) {
    const queue: Clarity = (...args: unknown[]) => { (queue.q ??= []).push(args); };
    win.clarity = queue;
  }
  // Queue consent before downloading the vendor script. Advertising stays disabled.
  win.clarity("consentv2", { analytics_Storage: "granted", ad_Storage: "denied" });
  if (!doc.getElementById("portfolio-clarity")) {
    const script = doc.createElement("script");
    script.id = "portfolio-clarity";
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
    doc.head.appendChild(script);
  }
  const track = (name: string) => win.clarity?.("event", name);
  const tabEvent = (target: EventTarget | null) => {
    if (!(target instanceof win.Element)) return;
    const tab = target.closest<HTMLElement>('[role="tab"]');
    if (tab?.id) track(`tab_${tab.id.replace(/[^a-zA-Z0-9_-]/g, "_")}`);
  };
  const onClick = (event: MouseEvent) => {
    tabEvent(event.target);
    if (!(event.target instanceof win.Element)) return;
    const link = event.target.closest<HTMLAnchorElement>("a");
    if (!link) return;
    if (link.protocol === "mailto:") track("contact_email");
    else if (link.protocol === "tel:") track("contact_phone");
    else if (link.hostname === "calendly.com") track("book_call");
    else if (link.pathname.endsWith("/resume.pdf")) track("download_resume");
  };
  const onKeyUp = (event: KeyboardEvent) => {
    if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) tabEvent(doc.activeElement);
  };
  const milestones = new Set<number>();
  let scrollFrame = 0;
  const recordScroll = () => {
    scrollFrame = 0;
    const height = doc.documentElement.scrollHeight;
    if (height <= win.innerHeight) return;
    const percent = ((win.scrollY + win.innerHeight) / height) * 100;
    for (const mark of [25, 50, 75, 90, 100]) {
      if (percent >= mark - 0.5 && !milestones.has(mark)) { milestones.add(mark); track(`scroll_${mark}`); }
    }
  };
  const onScroll = () => { if (!scrollFrame) scrollFrame = win.requestAnimationFrame(recordScroll); };
  const observer = new win.IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const section = entry.target as HTMLElement;
      const name = section.dataset.analyticsSection ?? section.id;
      if (name) track(`view_${name}`);
      observer.unobserve(section);
    }
  }, { threshold: 0.2 });
  doc.querySelectorAll("[data-analytics-section], #work, #contact").forEach(section => observer.observe(section));
  doc.addEventListener("click", onClick);
  doc.addEventListener("keyup", onKeyUp);
  win.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  return () => {
    doc.removeEventListener("click", onClick);
    doc.removeEventListener("keyup", onKeyUp);
    win.removeEventListener("scroll", onScroll);
    observer.disconnect();
    if (scrollFrame) win.cancelAnimationFrame(scrollFrame);
  };
}
