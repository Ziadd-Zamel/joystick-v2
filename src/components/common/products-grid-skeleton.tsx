import { ProductCardSkeleton } from "./product-card-skeleton";

export function ProductsGridSkeleton() {
  return (
    <section className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </section>
  );
}
