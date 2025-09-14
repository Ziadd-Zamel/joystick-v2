"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function CartAnimation() {
  return (
    <div className="h-[300px] w-[300px]">
      <DotLottieReact
        src="/assets/animations/shopping-cart.lottie"
        loop
        autoplay
        width={200}
        height={250}
      />
    </div>
  );
}
