import { getAllCategories } from "@/lib/api/categories.api";
import { getAllProducts } from "@/lib/api/products.api";
import React from "react";
import TabsContentComponent from "./tabs-content";

export default async function OurProductsContent() {
  // Data
  const categories = await getAllCategories();
  const products = await getAllProducts();

  return <TabsContentComponent categories={categories} products={products} />;
}
