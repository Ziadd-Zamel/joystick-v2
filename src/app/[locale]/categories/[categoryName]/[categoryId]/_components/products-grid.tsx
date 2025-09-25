"use client";
import NoDataAnimation from "@/components/common/no-data-animation";
import { PaginationComponent } from "@/components/common/pagination-comp";
import { ProductCard } from "@/components/common/product-card";
import { usePathname, useRouter } from "@/i18n/routing";

interface ProductsGridProps {
  products?: Product[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    limit: number;
  };
}

export default function ProductsGrid({
  products = [],
  pagination = { currentPage: 0, totalPages: 0, limit: 0 },
}: ProductsGridProps) {
  // Router
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    params.set("page", newPage.toString());
    params.set("limit", pagination.limit.toString());

    // Update URL with new parameters
    router.push(`${pathname}?${params.toString()}`);
  };

  if (products.length === 0) {
    return (
      <div className="flex-center min-h-screen w-full">
        <NoDataAnimation />
      </div>
    );
  }
  return (
    <section className="flex w-full flex-1 flex-col items-center justify-center">
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {pagination.totalPages > 1 && (
        <PaginationComponent
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
          maxVisiblePages={3}
        />
      )}
    </section>
  );
}
