import HeadLine from "@/components/common/headline";
import { ProductCard } from "@/components/common/product-card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useTranslations } from "next-intl";
import React from "react";

export default function LatestProducts({ products }: { products: Product[] }) {
  // Translation
  const t = useTranslations();

  return (
    <section className="box-container my-16">
      <HeadLine title={t("latest-products")} className="mb-" />

      <Carousel opts={{ align: "start" }} className="w-full select-none">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
