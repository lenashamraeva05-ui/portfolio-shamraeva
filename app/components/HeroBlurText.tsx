"use client";

import BlurText from "../../components/BlurText";
import type { ComponentType } from "react";

const TypedBlurText = BlurText as unknown as ComponentType<{
  text: string;
  delay: number;
  animateBy: string;
  direction: string;
  onAnimationComplete: () => void;
  className: string;
}>;

export default function HeroBlurText() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <div aria-hidden="true">
      <TypedBlurText
        text="I’m Elena — an empathetic product designer with 4 years’ experience for B2C"
        delay={150}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
        className="text-2xl mb-8"
      />
    </div>
  );
}
