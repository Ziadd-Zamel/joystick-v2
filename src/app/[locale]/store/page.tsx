import { getAllCategories } from "@/lib/actions/category.actions";
import ProductsScrollspyWrapper from "./_components/products-scrollspy-wrapper";

export default async function page() {
  const categories: Category[] = await getAllCategories(9999);

  return (
    <section className="sm:p-6 md:p-8">
      <div className="container mx-auto">
        <ProductsScrollspyWrapper categories={categories} />
      </div>
    </section>
  );
}
