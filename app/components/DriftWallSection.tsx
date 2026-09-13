"use client";

import DriftWall from "../../components/DriftWall";

const items = [
  { image: "/projects/other-nft.png", title: "NFT" },
  { image: "/projects/other-mascot.png", title: "Mascot" },
  { image: "/projects/other-inventory.png", title: "Inventory" },
  { image: "/projects/other-flowers.png", title: "Flowers" },
  { image: "/projects/other-uservers.png", title: "UServers" },
  { image: "/projects/other-engine.png", title: "Engine" },
  { image: "/projects/other-ehu-hub.png", title: "EHU" },
  { image: "/projects/other-greenpath.png", title: "Greenpath" },
  { image: "/projects/other-userflow-map.png", title: "Flowmap" },
  { image: "/projects/other-userflow.png", title: "Userflow" },
  { image: "/projects/other-yandex.png", title: "Yandex" },
  { image: "/projects/other-platform.png", title: "Platform" },
  { image: "/projects/other-idea.png", title: "Idea" },
  { image: "/projects/other-auth.png", title: "Auth" },
  { image: "/projects/other-stud-hub.png", title: "Studhub" },
  { image: "/projects/other-student-hub.png", title: "Hub" },
  { image: "/projects/other-quest.png", title: "Quest" },
  { image: "/projects/other-illustrations.png", title: "Illustrations" },
  { image: "/projects/other-zernote-social.png", title: "Zernote" },
  { image: "/projects/other-ehu-ceo.png", title: "CEO" },
  { image: "/projects/other-banners.png", title: "Banners" },
  { image: "/projects/other-ehu-mastering.png", title: "Mastering" },
  { image: "/projects/other-header.png", title: "Header" },
  { image: "/projects/other-career.png", title: "Career" },
  { image: "/projects/other-branding.png", title: "Branding" },
  { image: "/projects/other-tbank.png", title: "T-Bank" },
  { image: "/projects/other-drawing.png", title: "Drawing" },
  { image: "/projects/other-hippo.png", title: "Hippo" },
  { image: "/projects/other-job-tree.png", title: "Job tree" },
];

export default function DriftWallSection() {
  return (
    <div className="drift-wall-section" aria-label="Other projects gallery">
      <DriftWall
        items={items}
        columns={6}
        tileWidth={200}
        tileHeight={132}
        gap={18}
        tilt={16}
        turn={-14}
        perspective={1200}
        depth={120}
        speed={24}
        direction="up"
        variance={0.45}
        parallax={0.6}
        lift={64}
        fade={0.6}
        dim={0.55}
        overlayColor="#060010"
      />
    </div>
  );
}
