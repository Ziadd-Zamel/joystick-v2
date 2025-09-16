import { ProductCard } from "@/components/common/product-card";
import { getAllProducts } from "@/lib/actions/product.action";

export default async function ProductsList() {
  const products: Product[] = await getAllProducts();

  return (
    <>
      {products.map((product) => (
        <div key={product.id} id={product.category.replaceAll(" ", "-")}>
          <ProductCard product={product} />
        </div>
      ))}
    </>
  );
}
