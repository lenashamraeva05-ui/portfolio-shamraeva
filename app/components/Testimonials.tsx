"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

const testimonials = [
  { quote: "Elena brings clarity to messy product problems. She listens carefully, asks the right questions and turns ambiguity into a direction the whole team can move with.", name: "Product partner", role: "Product & strategy", color: "#e7c84a", image: "/elena-portrait-blue-v1.webp", position: "50% 34%" },
  { quote: "Thoughtful, dependable and detail-focused. Elena makes complex systems feel simple without losing the nuance that makes them useful.", name: "Design collaborator", role: "UX/UI & research", color: "#9ec8ff", image: "/elena-portrait-blue-v1.webp", position: "76% 38%" },
  { quote: "Working with Elena felt like having a calm product compass in the room. Every decision was grounded in evidence and connected back to the user.", name: "Startup teammate", role: "Discovery & MVP", color: "#c89cf2", image: "/elena-portrait-blue-v1.webp", position: "68% 42%" },
  { quote: "She combines strong visual taste with sharp product thinking. The result is work that is both beautiful and genuinely easier to use.", name: "Cross-functional partner", role: "Product delivery", color: "#8dd8b5", image: "/elena-portrait-blue-v1.webp", position: "35% 46%" },
] as const;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const testimonial = testimonials[active];

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % testimonials.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <div className="testimonials-inner">
        <header className="testimonials-heading" data-reveal>
          <h2 id="testimonials-title">Trusted by homeowners<br />across the country.</h2>
        </header>
        <div className="testimonials-showcase" data-reveal style={{ "--delay": "100ms" } as CSSProperties}>
          <div className="testimonial-people">
            <div className="testimonial-avatars" role="group" aria-label="Choose a recommendation">
            {testimonials.map((item, index) => (
              <button
                type="button"
                aria-label={`Show recommendation ${index + 1}`}
                aria-pressed={active === index}
                className={`testimonial-avatar-button ${active === index ? "is-active" : ""}`}
                  style={{ "--avatar-color": item.color } as CSSProperties}
                onClick={() => setActive(index)}
                key={item.name}
              >
                <span className="testimonial-avatar-frame"><Image unoptimized src={item.image} alt="" fill sizes="(max-width: 680px) 72px, 112px" className="testimonial-avatar-image" style={{ objectPosition: item.position }} /></span>
              </button>
            ))}
            </div>
            <a className="testimonial-feedback" href="mailto:lena.shamraeva.05@gmail.com?subject=Leave%20feedback"><span>Leave feedback</span><b aria-hidden="true">↗</b></a>
          </div>
          <div className="testimonial-copy" key={active} aria-live="polite">
            <blockquote>“{testimonial.quote}”</blockquote>
            <div className="testimonial-attribution"><strong>{testimonial.name}</strong><span>{testimonial.role}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
