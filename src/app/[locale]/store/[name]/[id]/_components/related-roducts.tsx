import { ProductCard } from "@/components/common/product-card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { getAllProducts } from "@/lib/actions/product.actions";
import { getLocale, getTranslations } from "next-intl/server";

export default async function RelatedProducts({ category }: { category: string }) {
  const allProducts = await getAllProducts(9999999);
  const t = await getTranslations();
  const locale = await getLocale();

  // Filter products by category
  const filteredProducts = allProducts?.data?.data.filter(
    (product) => product.category?.toLowerCase() === category.toLowerCase(),
  );

  // If no products found in the category, show all products as fallback
  const productsToShow = filteredProducts.length > 0 ? filteredProducts : allProducts?.data?.data;

  return (
    <section className="mt-28 mb-12">
      <h2 className="mb-8 text-2xl font-semibold">{t("related-products")}</h2>
      <Carousel
        opts={{ align: "start", direction: locale === "ar" ? "rtl" : "ltr" }}
        className="w-full select-none"
      >
        <CarouselContent>
          {productsToShow.map((product) => (
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
