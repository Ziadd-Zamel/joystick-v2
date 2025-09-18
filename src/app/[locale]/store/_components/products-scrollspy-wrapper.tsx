"use client";

import { Button } from "@/components/ui/button";
import { Scrollspy } from "@/components/ui/scrollspy";
import { useRef } from "react";

import { ProductCard } from "@/components/common/product-card";
import { ProductCardSkeleton } from "@/components/common/product-card-skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getPaginatedOrderdProducts } from "@/lib/actions/product.actions";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight } from "react-icons/hi2";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ProductsScrollspyWrapper({ categories }: { categories: Category[] }) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const locale = useLocale();

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: getPaginatedOrderdProducts,
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
        <div className="container mx-auto grid grid-cols-1 px-20">
          <Scrollspy offset={25} targetRef={parentRef} smooth={false} className="">
            <Carousel
              opts={{ align: "start", direction: locale === "ar" ? "rtl" : "ltr" }}
              className="w-full select-none"
            >
              <CarouselPrevious className="border-none !bg-transparent text-2xl shadow-sm rtl:-start-12">
                <HiOutlineChevronDoubleLeft className="rtl:rotate-180" />
              </CarouselPrevious>
              <CarouselContent>
                {categories.map((category) => (
                  <CarouselItem key={category.id} className="basis-auto">
                    <Button
                      key={category.id}
                      variant="outline"
                      data-scrollspy-anchor={category.name.replaceAll(" ", "-")}
                      className="data-[active=true]:!bg-main data-[active=true]:!text-white"
                    >
                      {category.name}
                    </Button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext className="border-none !bg-transparent text-2xl shadow-sm rtl:start-auto rtl:-end-12">
                <HiOutlineChevronDoubleRight className="rtl:rotate-180" />
              </CarouselNext>
            </Carousel>
          </Scrollspy>
        </div>
      </div>

      {/* Scrollable area */}
      <div
        ref={parentRef}
        id="scrollTarget"
        className="-me-5 h-screen w-full grow overflow-y-auto p-5 pe-10 pt-14"
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
          loader={Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
          scrollThreshold="200px"
          scrollableTarget="scrollTarget"
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {allProducts.map((product) => (
            <div key={product.id} id={product.category.replaceAll(" ", "-")}>
              <ProductCard product={product} />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}

/* 

"use client";

import { Button } from "@/components/ui/button";
import { Scrollspy } from "@/components/ui/scrollspy";
import { useRef, useState } from "react";

import { ProductCard } from "@/components/common/product-card";
import { ProductCardSkeleton } from "@/components/common/product-card-skeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPaginatedProducts } from "@/lib/actions/product.actions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight } from "react-icons/hi2";
import { useLocale } from "next-intl";
import type { CarouselApi } from "@/components/ui/carousel";

export default function ProductsScrollspyWrapper({ categories }: { categories: Category[] }) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const locale = useLocale();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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
 
      <div className="border-main fixed start-0 end-0 top-0 z-40 border-b bg-white pt-24 pb-5">
        <div className="container mx-auto grid grid-cols-1 px-20">
          <Scrollspy
            offset={25}
            targetRef={parentRef}
            className=""
            onUpdate={(activeId) => {
              setActiveCategory(activeId);
              const index = categories.findIndex((c) => c.name.replaceAll(" ", "-") === activeId);
              if (index !== -1 && carouselApi) {
                carouselApi.scrollTo(index); // 👈 auto scroll carousel to active tab
              }
            }}
          >
            <Carousel
              opts={{ align: "start", direction: locale === "ar" ? "rtl" : "ltr" }}
              className="w-full select-none"
              setApi={setCarouselApi}
            >
              <CarouselPrevious className="border-none !bg-transparent text-2xl shadow-sm rtl:-start-12">
                <HiOutlineChevronDoubleLeft className="rtl:rotate-180" />
              </CarouselPrevious>
              <CarouselContent>
                {categories.map((category) => (
                  <CarouselItem key={category.id} className="basis-auto">
                    <Button
                      key={category.id}
                      variant="outline"
                      data-scrollspy-anchor={category.name.replaceAll(" ", "-")}
                      className={`data-[active=true]:!bg-main data-[active=true]:!text-white`}
                    >
                      {category.name}
                    </Button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext className="border-none !bg-transparent text-2xl shadow-sm rtl:start-auto rtl:-end-12">
                <HiOutlineChevronDoubleRight className="rtl:rotate-180" />
              </CarouselNext>
            </Carousel>
          </Scrollspy>
        </div>
      </div>

     
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
          loader={Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
          scrollThreshold="200px"
          scrollableTarget="scrollTarget"
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {allProducts.map((product) => (
            <div key={product.id} id={product.category.replaceAll(" ", "-")}>
              <ProductCard product={product} />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}



*/
