"use client";

import { Button } from "@/components/ui/button";
import { Scrollspy } from "@/components/ui/scrollspy";
import { useRef } from "react";

import { ProductCard } from "@/components/common/product-card";
import { ProductCardSkeleton } from "@/components/common/product-card-skeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPaginatedProducts } from "@/lib/actions/product.action";

export default function ProductsScrollspyWrapper({ categories }: { categories: Category[] }) {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: getPaginatedProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const isLastPage = lastPage.data.meta.current_page >= lastPage.data.meta.last_page;
      return isLastPage ? undefined : lastPage.data.meta.current_page + 1;
    },
  });

  const allProducts = data?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <>
      {/* Header with categories */}
      <div className="border-main fixed start-0 end-0 top-0 z-40 border-b bg-white pt-24 pb-5">
        <div className="container mx-auto">
          <Scrollspy
            offset={25}
            targetRef={parentRef}
            smooth={false}
            className="flex flex-wrap justify-center gap-2"
          >
            {categories?.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                data-scrollspy-anchor={category.name.replaceAll(" ", "-")}
                className="data-[active=true]:!bg-main data-[active=true]:!text-white"
              >
                {category.name}
              </Button>
            ))}
          </Scrollspy>
        </div>
      </div>

      {/* Scrollable area */}
      <div
        ref={parentRef}
        id="scrollTarget"
        className="-me-5 h-screen w-full grow overflow-y-auto p-5 pe-10 pt-24"
      >
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
          scrollThreshold="200px"
          scrollableTarget="scrollTarget"
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allProducts.map((product) => (
              <div key={product.id} id={product.category.replaceAll(" ", "-")}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}
