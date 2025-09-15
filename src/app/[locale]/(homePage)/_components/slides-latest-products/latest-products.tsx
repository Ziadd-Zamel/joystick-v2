import React from "react";
import HeadLine from "@/components/common/headline";
import { ProductCard } from "@/components/common/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HiMiniChevronLeft, HiMiniChevronRight } from "react-icons/hi2";
import { getLocaleAssets } from "@/lib/utils/index";

export default async function LatestProducts({ products }: { products: Product[] }) {
  // Translation
  const { t, direction } = await getLocaleAssets();

  return (
    <section className="box-container my-16">
      <HeadLine title={t("latest-products")} className="mb-" />

      <Carousel opts={{ align: "start", direction }} className="mx-auto w-[85%] select-none">
        <CarouselPrevious className="rtl:-start-10">
          <HiMiniChevronLeft className="rtl:rotate-180" />
        </CarouselPrevious>
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="rtl:start-auto rtl:-end-10">
          <HiMiniChevronRight className="rtl:rotate-180" />
        </CarouselNext>
      </Carousel>
    </section>
  );
}
