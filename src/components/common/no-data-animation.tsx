"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function NoDataAnimation() {
  return (
    <div className="h-62 w-48">
      <DotLottieReact
        src="/assets/animations/empty.lottie"
        loop
        autoplay
        width={150}
        height={150}
      />
    </div>
  );
}
