import React, { Suspense } from "react";
import HeroSection from "./hero-section";
import OurAdvantages from "./our advantages/our-advantages";
import OurAdvantagesSkeleton from "./our advantages/advantages-skeleton";
import SlidesAndLatestProducts from "./slides and latest products";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<OurAdvantagesSkeleton />}>
        <OurAdvantages />
      </Suspense>

      <SlidesAndLatestProducts />
    </>
  );
}
