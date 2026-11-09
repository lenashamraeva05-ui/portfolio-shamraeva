"use client";

import { useRef, useState, type FormEvent } from "react";
import { contactNoteHref } from "@/lib/contact-note.mjs";

export default function ContactNote() {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const href = contactNoteHref(message);
    if (href) window.location.href = href;
  };

  return (
    <div className="contact-note">
      <p className="contact-note-invite">A role, a thought on my portfolio, or a favourite design example. I&apos;d love to hear from you.</p>
      <p className="contact-note-updates">Thoughtful design newsletters and new-role updates are welcome, too.</p>
      <details onToggle={(event) => { if (event.currentTarget.open) textareaRef.current?.focus(); }}>
        <summary>Or leave a note here <span aria-hidden="true">+</span></summary>
        <form onSubmit={handleSubmit}>
          <label htmlFor="portfolio-note">Your message</label>
          <textarea
            ref={textareaRef}
            id="portfolio-note"
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="An opportunity, one thing I could improve, or a portfolio you love..."
            aria-describedby="portfolio-note-help"
            rows={4}
            maxLength={2000}
            required
          />
          <div className="contact-note-actions">
            <p id="portfolio-note-help">Opens your email app with your note ready to send.</p>
            <button type="submit" disabled={!message.trim()}>Continue in email <span aria-hidden="true">↗</span></button>
          </div>
        </form>
      </details>
    </div>
  );
}
