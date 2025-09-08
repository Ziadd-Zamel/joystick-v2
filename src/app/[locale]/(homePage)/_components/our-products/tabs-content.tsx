import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsContents,
} from "@/components/animate-ui/radix/tabs";
import { ProductCard } from "@/components/common/product-card";
import NoDataAnimation from "@/components/common/no-data-animation";
import { HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight } from "react-icons/hi";
import { getLocaleAssets } from "@/lib/utils/index";

interface Props {
  categories: Category[];
  products: Product[];
}

export default async function TabsContentComponent({ categories, products }: Props) {
  // Translation
  const { t, direction } = await getLocaleAssets();

  return (
    <Tabs dir={direction} defaultValue={categories[0]?.name}>
      <TabsList className="mx-auto w-full max-w-[280px] bg-transparent sm:max-w-lg md:max-w-xl">
        <Carousel opts={{ align: "start", direction }} className="w-full select-none">
          <CarouselPrevious className="border-none !bg-transparent text-2xl shadow-sm rtl:-start-12">
            <HiOutlineChevronDoubleLeft className="rtl:rotate-180" />
          </CarouselPrevious>
          <CarouselContent>
            {categories.map((c: Category) => (
              <CarouselItem key={c.id} className="basis-auto">
                <div className="p-1">
                  <TabsTrigger value={c.name} className="data-[state=active]:text-main">
                    {c.name}
                  </TabsTrigger>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="border-none !bg-transparent text-2xl shadow-sm rtl:start-auto rtl:-end-12">
            <HiOutlineChevronDoubleRight className="rtl:rotate-180" />
          </CarouselNext>
        </Carousel>
      </TabsList>

      <TabsContents>
        {categories.map((c: Category) => {
          const productsInCategory = products.filter((p: Product) => p.category === c.name);

          return (
            <TabsContent key={c.id} value={c.name}>
              {productsInCategory.length === 0 ? (
                <div className="flex-center h-[400px] flex-col">
                  {/* <Image src={"/assets/Images/log.png"} alt="" width={100} height={0} /> */}
                  <NoDataAnimation />
                  <p className="text-center text-gray-500">
                    {t("no-products-found-in-category") ?? "No products found"}
                  </p>
                </div>
              ) : (
                <Carousel opts={{ align: "start", direction }} className="w-full select-none">
                  <CarouselContent className="mr-2 -ml-1">
                    {productsInCategory.map((p: Product) => (
                      <CarouselItem
                        key={p.id}
                        className="gap- basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                      >
                        <ProductCard product={p} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              )}
            </TabsContent>
          );
        })}
      </TabsContents>
    </Tabs>
  );
}
