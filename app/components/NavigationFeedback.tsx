import { navigationBootstrap } from "@/lib/navigation-bootstrap";

export default function NavigationFeedback() {
  return <>
    <script dangerouslySetInnerHTML={{ __html: navigationBootstrap }} />
    <div className="navigation-feedback" role="status" aria-live="polite" aria-atomic="true">
      <span className="navigation-progress" aria-hidden="true" />
      <span className="navigation-label">Loading page…</span>
    </div>
  </>;
}
