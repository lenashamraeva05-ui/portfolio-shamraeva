import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import GlobalGradualBlur from "./components/GlobalGradualBlur";
import GitHubPagesPathRestore from "./components/GitHubPagesPathRestore";
import TargetCursor from "@/components/TargetCursor";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    title: "Elena Shamraeva — Product Designer",
    description: "Product designer turning research, complex systems and business goals into clear digital products.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "Elena Shamraeva — Product Designer",
      description: "Product design where business goals and user needs meet.",
      type: "website",
      images: [{ url: new URL("/og-v2.png", base), width: 1200, height: 630, alt: "Elena Shamraeva product design portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Elena Shamraeva — Product Designer",
      description: "Product design where business goals and user needs meet.",
      images: [new URL("/og-v2.png", base)],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${inter.variable} ${jakarta.variable}`}>
        {children}
        <GitHubPagesPathRestore />
        <GlobalGradualBlur />
        <TargetCursor
          targetSelector="a, button, [role='button'], [tabindex='0'], .cursor-target"
          spinDuration={2}
          hideDefaultCursor={true}
          parallaxOn={true}
          cursorColor="#ffffff"
          cursorColorOnTarget="#ffffff"
        />
      </body>
    </html>
  );
}
