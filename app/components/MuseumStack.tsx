import Image from "next/image";

export default function MuseumStack() {
  return (
    <div className="museum-stack" aria-label="EHU virtual exhibition interface preview">
      <div className="museum-stack-haze" aria-hidden="true" />
      <div className="museum-stack-page museum-stack-page-back" aria-hidden="true">
        <Image
          unoptimized
          src="/projects/ehu-museums-flow.webp"
          alt=""
          fill
          sizes="(max-width: 760px) 68vw, 38vw"
          className="museum-stack-image"
        />
      </div>
      <div className="museum-stack-page museum-stack-page-left" aria-hidden="true">
        <Image
          unoptimized
          src="/projects/ehu-museums-overview.webp"
          alt=""
          fill
          sizes="(max-width: 760px) 66vw, 34vw"
          className="museum-stack-image"
        />
      </div>
      <div className="museum-stack-page museum-stack-page-main">
        <Image
          unoptimized
          src="/projects/ehu-museums-flow.webp"
          alt="EHU Online Museum virtual exhibition screens"
          fill
          sizes="(max-width: 760px) 88vw, 52vw"
          className="museum-stack-image"
        />
        <span className="museum-stack-sheen" aria-hidden="true" />
      </div>
      <div className="museum-stack-note museum-stack-note-top" aria-hidden="true">
        <span>Virtual exhibition</span>
        <b>An impossible<br />dream?</b>
      </div>
      <div className="museum-stack-note museum-stack-note-bottom" aria-hidden="true">
        <i />
        <span>BY / EN / LT</span>
      </div>
    </div>
  );
}
