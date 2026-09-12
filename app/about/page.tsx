import type { CSSProperties } from "react";
import PortfolioHeader from "../components/PortfolioHeader";
import DarkVeil from "../../components/DarkVeil";
import Lanyard from "../../components/Lanyard";
import InfiniteMenu from "../../components/InfiniteMenu";

const outsideWorkItems = [
  { image: "/outside-work-item-1.png", link: "https://google.com/", title: "Item 1", description: "This is pretty cool, right?" },
  { image: "/outside-work-item-2.png", link: "https://google.com/", title: "Item 2", description: "This is pretty cool, right?" },
  { image: "/outside-work-item-3.png", link: "https://google.com/", title: "Item 3", description: "This is pretty cool, right?" },
  { image: "/outside-work-item-4.png", link: "https://google.com/", title: "Item 4", description: "This is pretty cool, right?" },
];

export default function AboutPage() {
  return (
    <main className="inner-page about-page about-editorial" id="main-content" tabIndex={-1}>
      <PortfolioHeader />

      <section className="about-opening" id="about" data-scroll-panel>
        <div className="about-opening-veil" aria-hidden="true">
          <DarkVeil hueShift={200} />
        </div>
        <div className="about-opening-lanyard" data-reveal aria-label="Interactive Elena Shamraeva profile card">
          <Lanyard
            position={[0, 0, 20]}
            gravity={[0, -40, 0]}
            frontImage="/product-designer-card.png"
            imageFit="cover"
            showLanyardLogo={false}
          />
        </div>
        <div className="about-opening-statement" data-reveal style={{ "--delay": "60ms" } as CSSProperties}>
          <h1>I’m a team player</h1>
          <p>
            At work, I wear many hats: <strong>designer, researcher, interviewer</strong>, and more. At home, I’m a
            <strong> wife, homemaker, mother of two four-legged companions, and friend</strong>. My family inspires me to
            balance these roles and create a life of love and purpose.
          </p>
        </div>
      </section>

      <section className="about-outside-work" aria-labelledby="outside-work-title">
        <div className="about-outside-work-heading" data-reveal>
          <h2 id="outside-work-title">Outside work</h2>
          <p>Places, rhythms and small moments that stay behind the scenes.</p>
        </div>
        <div className="about-infinite-menu" data-reveal style={{ "--delay": "100ms" } as CSSProperties}>
          <InfiniteMenu items={outsideWorkItems} backgroundColor="#0e0f10" />
        </div>
      </section>
    </main>
  );
}
