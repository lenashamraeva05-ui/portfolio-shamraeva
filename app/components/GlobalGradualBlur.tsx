"use client";

import GradualBlur from "../../components/GradualBlur";

export default function GlobalGradualBlur() {
  return (
    <div className="global-gradual-blur" aria-hidden="true">
      <GradualBlur
        target="parent"
        position="bottom"
        height="6rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential={true}
        opacity={1}
      />
    </div>
  );
}
