"use client";

import React from "react";
import { TabsSkeleton } from "@/components/common/tabs-skeleton";
import { ProductCardSkeleton } from "@/components/common/product-card-skeleton";

export default function OurProductsSkeleton() {
  return (
    <div className="flex h-screen flex-col justify-center gap-10">
      <TabsSkeleton />
      <ProductCardSkeleton />
    </div>
  );
}
