import React from "react";
import Slides from "./slides";
import LatestProducts from "./latest-products";
import { getHome } from "@/lib/actions/home.actions";

export default async function SlidesAndLatestProducts() {
  const payload = await getHome();

  return (
    <>
      <Slides />
      <LatestProducts products={payload?.data?.products} />
    </>
  );
}
