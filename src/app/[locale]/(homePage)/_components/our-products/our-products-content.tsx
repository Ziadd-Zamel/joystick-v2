import { getAllProducts } from "@/lib/actions/product.action";
import TabsContentComponent from "./tabs-content";
import { getAllCategories } from "@/lib/actions/category.action";

export default async function OurProductsContent() {
  // Data
  const categories = await getAllCategories(999999);
  const products = await getAllProducts(9999999);

  return <TabsContentComponent categories={categories} products={products?.data?.data} />;
}
