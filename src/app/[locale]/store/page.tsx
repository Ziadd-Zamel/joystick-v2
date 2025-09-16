import ProductsList from "./_components/products-list";
import ProductsScrollspyWrapper from "./_components/products-scrollspy-wrapper";
import { getAllCategories } from "@/lib/actions/category.action";

export default async function page() {
  const categories: Category[] = await getAllCategories();

  return (
    <section className="p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <ProductsScrollspyWrapper categories={categories}>
          <ProductsList />
        </ProductsScrollspyWrapper>
      </div>
    </section>
  );
}
