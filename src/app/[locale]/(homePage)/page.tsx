import { Suspense } from "react";
import Testimonials from "./_components/customers-reviews";
import HeroSection from "./_components/hero-section";
import OurAdvantagesSkeleton from "./_components/our-advantages/advantages-skeleton";
import OurAdvantages from "./_components/our-advantages/our-advantages";
import SlidesAndLatestProducts from "./_components/slides-latest-products";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<OurAdvantagesSkeleton />}>
        <OurAdvantages />
      </Suspense>
      <SlidesAndLatestProducts />
      {/* <OurProductsSection /> */}
      <Testimonials />
    </>
  );
}
