import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import GlobalGradualBlur from "./components/GlobalGradualBlur";
import GitHubPagesPathRestore from "./components/GitHubPagesPathRestore";
import PortfolioAnalytics from "./components/PortfolioAnalytics";
import CursorEnhancement from "./components/CursorEnhancement";


const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#070908",
  colorScheme: "dark",
};

export function generateMetadata(): Metadata {
  const base = new URL("https://elena.shamraeva.co.uk");

  return {
    metadataBase: base,
    title: "Helen Shamraeva - Product Designer",
    description: "Product designer turning research, complex systems and business goals into clear digital products.",
    icons: {
      icon: "/elena-portrait-icon.png",
      shortcut: "/elena-portrait-icon.png",
      apple: "/elena-portrait-icon.png",
    },
    openGraph: {
      title: "Helen Shamraeva - Product Designer",
      description: "Product design where business goals and user needs meet.",
      type: "website",
      images: [{
        url: new URL("/og-portfolio.jpg", base),
        width: 1200,
        height: 632,
        alt: "Helen Shamraeva product design portfolio",
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Helen Shamraeva - Product Designer",
      description: "Product design where business goals and user needs meet.",
      images: [new URL("/og-portfolio.jpg", base)],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="font-sans">
      <body className={`${inter.variable} ${jakarta.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "Person", name: "Helen Shamraeva",
          url: "https://elena.shamraeva.co.uk", jobTitle: "Product Designer",
          description: "Product designer based in Eastbourne, UK, with experience in UX research, interface design, design systems and AI-assisted workflows.",
          knowsAbout: ["Product design", "UX research", "Figma", "Design systems", "Prototyping", "AI-assisted prototyping", "MCP workflows"],
          sameAs: ["https://www.linkedin.com/in/elena-shamraeva-a73464393"],
        }).replace(/</g, "\\u003c") }} />
        {children}
        <GitHubPagesPathRestore />
        <GlobalGradualBlur />
        <CursorEnhancement />
        <PortfolioAnalytics />
      </body>
    </html>
  );
}
