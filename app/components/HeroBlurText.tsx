import type { CSSProperties } from "react";

const text = "I’m Helen, a product designer with 3 years’ experience across B2C and B2B";

export default function HeroBlurText() {
  return <div aria-hidden="true"><p className="text-2xl mb-8">{text.split(" ").map((word, index) => <span key={index} className="hero-text-word" style={{ "--word-delay": `${index * 30}ms` } as CSSProperties}>{word}</span>)}</p></div>;
}
