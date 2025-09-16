"use client";

import { ProductCard } from "@/components/common/product-card";
import { ProductCardSkeleton } from "@/components/common/product-card-skeleton";
import { getAllProducts } from "@/lib/actions/product.action";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ProductsList() {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const isLastPage = lastPage.data.meta.current_page >= lastPage.data.meta.last_page;
      return isLastPage ? undefined : lastPage.data.meta.current_page + 1;
    },
  });

  const allProducts = data?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <>
      {isLoading && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      <InfiniteScroll
        dataLength={allProducts.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        }
        scrollableTarget="scrollableDiv2"
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allProducts.map((product) => (
            <div key={product.id} id={product.category.replaceAll(" ", "-")}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
