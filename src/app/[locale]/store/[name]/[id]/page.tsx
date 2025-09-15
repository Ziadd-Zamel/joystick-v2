import React, { Suspense } from "react";
import ProductDetails from "./_components/product-details";
import ProductDetailsSkeleton from "./_components/product-details-skeleton";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: Props) {
  const { id } = await params;

  return (
    <div className="min-h-screen">
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails id={id} />
      </Suspense>
    </div>
  );
}
