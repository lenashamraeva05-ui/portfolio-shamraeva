import Image from "next/image";
import type { CSSProperties } from "react";
import PortfolioHeader from "../components/PortfolioHeader";
import Lanyard from "../../components/Lanyard";
import InfiniteMenu from "../../components/InfiniteMenu";

const outsideWorkItems = [
  { image: "https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=600&h=600&fit=crop&sat=-100&auto=format", link: "https://google.com/", title: "Item 1", description: "This is pretty cool, right?" },
  { image: "https://images.unsplash.com/photo-1781499455083-6ccc3beb20cd?q=80&w=600&h=600&fit=crop&sat=-100&auto=format", link: "https://google.com/", title: "Item 2", description: "This is pretty cool, right?" },
  { image: "https://images.unsplash.com/photo-1776394254711-4a0d7345269a?q=80&w=600&h=600&fit=crop&sat=-100&auto=format", link: "https://google.com/", title: "Item 3", description: "This is pretty cool, right?" },
  { image: "https://images.unsplash.com/photo-1781242629922-6f39cc3671cd?q=80&w=600&h=600&fit=crop&sat=-100&auto=format", link: "https://google.com/", title: "Item 4", description: "This is pretty cool, right?" },
];

export default function AboutPage() {
  return (
    <main className="inner-page about-page about-editorial" id="main-content" tabIndex={-1}>
      <PortfolioHeader />

      <section className="about-opening" id="about" data-scroll-panel>
        <div className="about-opening-art" aria-hidden="true">
          <Image unoptimized src="/portfolio-folder-bg.png" alt="" fill priority sizes="100vw" />
        </div>
        <div className="about-opening-lanyard" data-reveal aria-label="Interactive Elena Shamraeva profile card">
          <Lanyard
            position={[0, 0, 20]}
            gravity={[0, -40, 0]}
            frontImage="/elena-portrait-blue-v1.png"
            imageFit="cover"
            showLanyardLogo={false}
          />
        </div>
        <div className="about-opening-statement" data-reveal style={{ "--delay": "60ms" } as CSSProperties}>
          <p>
            A product designer who turns <strong>research</strong>, complex systems and business goals into
            <strong> clear digital products</strong>. I care about the logic behind a decision, the system around the screen
            and the detail that makes an experience easier.
          </p>
        </div>
      </section>

      <section className="about-outside-work" aria-labelledby="outside-work-title">
        <div className="about-outside-work-heading" data-reveal>
          <p className="about-section-kicker">Обо мне / личное</p>
          <h2 id="outside-work-title">Вне работы</h2>
          <p>Места, ритмы и маленькие моменты, которые остаются за кадром.</p>
        </div>
        <div className="about-infinite-menu" data-reveal style={{ "--delay": "100ms" } as CSSProperties}>
          <InfiniteMenu items={outsideWorkItems} backgroundColor="#0e0f10" />
        </div>
      </section>
    </main>
  );
}
