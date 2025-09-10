import { getHome } from "@/lib/api/advantages.api";
import React from "react";
import Slides from "./slides";
import LatestProducts from "./latest-products";

export default async function SlidesAndLatestProducts() {
  const payload = await getHome();
  return (
    <>
      <Slides />
      <LatestProducts products={payload?.data?.products} />
    </>
  );
}
