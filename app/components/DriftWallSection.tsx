"use client";

import DriftWall from "../../components/DriftWall";

const items = [
  { image: "/projects/other-nft.webp", title: "NFT" },
  { image: "/projects/other-mascot.webp", title: "Mascot" },
  { image: "/projects/other-inventory.webp", title: "Inventory" },
  { image: "/projects/other-flowers.webp", title: "Flowers" },
  { image: "/projects/other-uservers.webp", title: "UServers" },
  { image: "/projects/other-engine.webp", title: "Engine" },
  { image: "/projects/other-ehu-hub.webp", title: "EHU" },
  { image: "/projects/other-greenpath.webp", title: "Greenpath" },
  { image: "/projects/other-userflow-map.webp", title: "Flowmap" },
  { image: "/projects/other-userflow.webp", title: "Userflow" },
  { image: "/projects/other-yandex.webp", title: "Yandex" },
  { image: "/projects/other-platform.webp", title: "Platform" },
  { image: "/projects/other-idea.webp", title: "Idea" },
  { image: "/projects/other-auth.webp", title: "Auth" },
  { image: "/projects/other-stud-hub.webp", title: "Studhub" },
  { image: "/projects/other-student-hub.webp", title: "Hub" },
  { image: "/projects/other-quest.webp", title: "Quest" },
  { image: "/projects/other-illustrations.webp", title: "Illustrations" },
  { image: "/projects/other-zernote-social.webp", title: "Zernote" },
  { image: "/projects/other-ehu-ceo.webp", title: "CEO" },
  { image: "/projects/other-banners.webp", title: "Banners" },
  { image: "/projects/other-ehu-mastering.webp", title: "Mastering" },
  { image: "/projects/other-header.webp", title: "Header" },
  { image: "/projects/other-career.webp", title: "Career" },
  { image: "/projects/other-branding.webp", title: "Branding" },
  { image: "/projects/other-tbank.webp", title: "T-Bank" },
  { image: "/projects/other-drawing.webp", title: "Drawing" },
  { image: "/projects/other-hippo.webp", title: "Hippo" },
  { image: "/projects/other-job-tree.webp", title: "Job tree" },
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
