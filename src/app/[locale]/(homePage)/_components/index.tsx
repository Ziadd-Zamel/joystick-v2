import React, { Suspense } from "react";
import HeroSection from "./hero-section";
import OurAdvantages from "./our-advantages/our-advantages";
import OurAdvantagesSkeleton from "./our-advantages/advantages-skeleton";
import SlidesAndLatestProducts from "./slides-latest-products";
import OurProductsSection from "./our-products";
import Testimonials from "./customers-reviews";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<OurAdvantagesSkeleton />}>
        <OurAdvantages />
      </Suspense>
      <SlidesAndLatestProducts />
      <OurProductsSection />
      <Testimonials />
    </>
  );
}
