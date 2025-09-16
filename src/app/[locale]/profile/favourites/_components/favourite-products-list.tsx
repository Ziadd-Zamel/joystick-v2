import AddToFavoriteButton from "@/components/common/add-to-favorite-btn";
import { Link } from "@/i18n/routing";
import { getUserFavourites } from "@/lib/actions/profile.actions";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

type ProductColor = {
  id: number;
  name: string;
  hex_code: string;
};

type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  product_code: string;
  description: string;
  small_description: string;
  price: string;
  quantity: string;
  main_image: string;
  images: string[];
  product_colors: ProductColor[];
  status: "active" | "inactive";
  is_favorite: 0 | 1;
  tags: string[];
  created_at: string;
  updated_at: string;
};

export default async function FavouriteProductsList() {
  const t = await getTranslations("profile-route");

  const payload = await getUserFavourites();
  const products: Product[] = payload.data.data;

  if (!products.length)
    return (
      <p className="mt-10 text-center text-lg font-medium text-red-600">
        No Favourites products found
      </p>
    );

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col items-center gap-4 rounded-md p-3 shadow-md md:flex-row"
        >
          <div className="relative aspect-video h-40 overflow-hidden rounded-lg bg-white shadow md:aspect-square md:w-1/5">
            <Image
              src={product.main_image}
              alt={product.name}
              fill
              loading="lazy"
              sizes="34vw"
              className="object-cover"
            />
          </div>

          <div className="flex-1 space-y-2">
            <p className="font-semibold">{product.name}</p>
            <p className="max-w-3/4 text-sm text-wrap text-zinc-700">
              {" "}
              {product.small_description}
            </p>
            <p className="text-main mt-4 text-lg font-medium">
              {t("format-currency", { value: product.price })}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-2 self-stretch py-3">
            {/* Remove from cart button */}
            <div className="relative w-9">
              <AddToFavoriteButton
                productId={product.id}
                isFav={Boolean(product.is_favorite)}
                className="static"
              />
            </div>

            {/* Add to cart button */}

            <Link
              href={`/store/${encodeURIComponent(product.name.split(" ")[0])}/${product.id}`}
              className="bg-main flex shrink-0 items-center justify-center rounded-lg p-1 py-2"
            >
              <Image
                alt="add Icon"
                width={25}
                height={25}
                loading="lazy"
                src={"/assets/icons/add-to-cart-icon.svg"}
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
