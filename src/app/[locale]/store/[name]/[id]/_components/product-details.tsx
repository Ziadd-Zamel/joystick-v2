import AddToFavoriteButton from "@/components/common/add-to-favorite-btn";
import ProductGallery from "./product-gallery";
import { isUserLoggedin } from "@/lib/utils/server-cookies";
import AddToCart from "./add-to-cart";
import ProfileBreadCrumbs from "@/app/[locale]/profile/_components/profile-breadcrumb";
import { getTranslations } from "next-intl/server";
import RelatedProducts from "./related-roducts";
import { Suspense } from "react";
import RelatedProductsSkeleton from "./related-products-skeleton";
import { getProductById } from "@/lib/api/product";

export default async function ProductDetails({ id }: { id: string }) {
  const product: Product = await getProductById(id);
  const isLogedin = await isUserLoggedin();
  const t = await getTranslations();
  return (
    <div className="box-container mt-20">
      <ProfileBreadCrumbs />
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Product Gallery */}
        <div>
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Product Information */}
        <div className="flex flex-col space-y-6">
          <div className="relative flex w-full items-center justify-between">
            <h1 className="max-w-[80%] text-lg font-bold text-gray-900 sm:text-2xl">
              {product.name}
            </h1>
            <div className="absolute end-9 top-0">
              <AddToFavoriteButton
                className="start-0 size-8 shadow-lg"
                isFav={Boolean(product.is_favorite)}
                productId={product.id}
              />
            </div>
          </div>
          <div className="mt-3 space-y-5">
            <p className="text-base leading-relaxed text-gray-700 sm:text-xl">
              {product.small_description}
            </p>
            <span className="text-primary text-base font-medium sm:text-3xl">{product.price}</span>
          </div>

          {/* Add to Cart Component */}
          <AddToCart product={product} isLogedin={isLogedin} />
        </div>
      </div>
      <div className="mt-20 mb-10 h-px w-full bg-gray-200" />
      <div>
        <h2 className="text-2xl font-semibold">{t("product-details")}</h2>
        <p className="mt-8 text-lg font-medium">{product.description}</p>
      </div>
      <Suspense fallback={<RelatedProductsSkeleton />}>
        <RelatedProducts category={product.category} />
      </Suspense>
    </div>
  );
}
