import { ProductCardSkeleton } from "@/components/common/product-card-skeleton";
import { Suspense } from "react";
import ProductsList from "./_components/products-list";
import ProductsScrollspyWrapper from "./_components/products-scrollspy-wrapper";
import { getAllCategories } from "@/lib/actions/category.action";

export default async function page() {
  const categories: Category[] = await getAllCategories();

  return (
    <section className="p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <ProductsScrollspyWrapper categories={categories}>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Suspense
              fallback={Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            >
              <ProductsList />
            </Suspense>
          </div>
        </ProductsScrollspyWrapper>
      </div>
    </section>
  );
}
