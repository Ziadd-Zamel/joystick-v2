import React from "react";
import ProductDetails from "./_components/product-details";
import { getProductById } from "@/lib/api/product";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <div className="flex-center h-screen">
      <ProductDetails product={product} />
    </div>
  );
}
