import AddToFavoriteButton from "@/components/common/add-to-favorite-btn";
import ProductGallery from "./product-gallery";
import { isUserLoggedin } from "@/lib/utils/server-cookies";
import AddToCart from "./add-to-cart";

export default async function ProductDetails({ product }: { product: Product }) {
  const isLogedin = await isUserLoggedin();
  return (
    <div className="box-container p-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Product Gallery */}
        <div>
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Product Information */}
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <div className="bg-black">
              <AddToFavoriteButton isFav={Boolean(product.is_favorite)} productId={product.id} />
            </div>
          </div>
          <div className="mt-10 space-y-8">
            <p className="text-xl leading-relaxed text-gray-700">{product.description}</p>
            <span className="text-primary text-3xl font-medium">{product.price}</span>
          </div>

          {/* Add to Cart Component */}
          <AddToCart product={product} isLogedin={isLogedin} />
        </div>
      </div>
    </div>
  );
}
