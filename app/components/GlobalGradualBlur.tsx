import type { CSSProperties } from "react";

// Static decorative layers render on the server; no component hydration is needed.
const layers = Array.from({ length: 5 }, (_, index) => {
  const i = index + 1;
  const progress = i / 5;
  const curve = progress * progress * (3 - 2 * progress);
  const blur = Math.pow(2, curve * 4) * .125;
  const stops = [`transparent ${(i - 1) * 20}%`, `black ${i * 20}%`];
  if ((i + 1) * 20 <= 100) stops.push(`black ${(i + 1) * 20}%`);
  if ((i + 2) * 20 <= 100) stops.push(`transparent ${(i + 2) * 20}%`);
  const mask = `linear-gradient(to bottom, ${stops.join(", ")})`;
  return { position: "absolute", inset: 0, maskImage: mask, WebkitMaskImage: mask, backdropFilter: `blur(${blur.toFixed(3)}rem)`, WebkitBackdropFilter: `blur(${blur.toFixed(3)}rem)` } as CSSProperties;
});

export default function GlobalGradualBlur() {
  return <div className="global-gradual-blur" aria-hidden="true">{layers.map((style,index) => <div key={index} style={style} />)}</div>;
}
