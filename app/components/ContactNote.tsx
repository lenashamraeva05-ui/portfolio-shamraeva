"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ContactDeliveryUnknownError, submitContactNote } from "@/lib/contact-note.mjs";

type Status = "idle" | "sending" | "sent" | "pending" | "error" | "unknown";

export default function ContactNote() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [slow, setSlow] = useState(false);
  const [error, setError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const honeyRef = useRef<HTMLInputElement>(null);
  const sendingRef = useRef(false);
  const mountedRef = useRef(false);
  useEffect(() => { mountedRef.current = true; return () => { mountedRef.current = false; }; }, []);

  useEffect(() => {
    if (status !== "sending") return;
    const timer = window.setTimeout(() => setSlow(true), 8000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sendingRef.current || !message.trim()) return;
    sendingRef.current = true;
    setSlow(false);
    setStatus("sending");
    setError("");
    try {
      const result = await submitContactNote({ message, email, honey: honeyRef.current?.value });
      if (!mountedRef.current) return;
      if (result.activationPending) setStatus("pending");
      else { setStatus("sent"); setMessage(""); setEmail(""); }
    } catch (cause) {
      if (!mountedRef.current) return;
      setError(cause instanceof Error ? cause.message : new ContactDeliveryUnknownError().message);
      setStatus(cause instanceof ContactDeliveryUnknownError ? "unknown" : "error");
    } finally { sendingRef.current = false; }
  };

  return (
    <div className="contact-note">
      <p className="contact-note-invite">A role, a thought on my portfolio, or a favourite design example. I&apos;d love to hear from you.</p>
      <p className="contact-note-updates">Thoughtful design newsletters and new-role updates are welcome, too.</p>
      <details onToggle={(event) => { if (event.currentTarget.open) textareaRef.current?.focus(); }}>
        <summary>Or leave a note here <span aria-hidden="true">+</span></summary>
        <form data-clarity-mask="true" onSubmit={handleSubmit} aria-busy={status === "sending"}>
          <label htmlFor="portfolio-note">Your message</label>
          <textarea ref={textareaRef} id="portfolio-note" name="message" value={message} onChange={(event) => { setMessage(event.target.value); if (status !== "sending") setStatus("idle"); }} placeholder="An opportunity, one thing I could improve, or a portfolio you love..." aria-describedby="portfolio-note-help" rows={4} maxLength={4000} disabled={status === "sending"} required />
          <label className="contact-email-label" htmlFor="portfolio-email">Your email <span>(optional, for a reply)</span></label>
          <input id="portfolio-email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); if (status !== "sending") setStatus("idle"); }} placeholder="you@example.com" disabled={status === "sending"} maxLength={254} />
          <input ref={honeyRef} type="text" name="_honey" tabIndex={-1} autoComplete="off" className="contact-honeypot" aria-hidden="true" />
          <div className="contact-note-actions">
            <p id="portfolio-note-help">Send your note to Helen without leaving this page. Delivered by <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noreferrer">FormSubmit</a>.</p>
            <button type="submit" disabled={!message.trim() || status === "sending"}>{status === "sending" ? "Sending..." : status === "unknown" ? "Send again" : "Send message"} <span aria-hidden="true">↗</span></button>
          </div>
          <div className="contact-note-status" role={status === "error" ? "alert" : "status"} aria-live="polite">
            {status === "sending" && slow && "Still waiting for confirmation. Your message may already have arrived. Please keep this page open; there is no need to send it again."}
            {status === "sent" && "Your message has been sent. Thank you for reaching out!"}
            {status === "pending" && "Your note was accepted. Email delivery is awaiting confirmation of the site's contact address."}
            {(status === "error" || status === "unknown") && error}
          </div>
        </form>
      </details>
    </div>
  );
}
