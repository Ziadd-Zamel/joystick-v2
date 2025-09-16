"use client";

import { useRouter } from "@/i18n/routing";
import Image from "next/image";
import { ClientImage } from "./client-image";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { truncatedText } from "@/lib/utils/index";
import AddToFavoriteButton from "./add-to-favorite-btn";
import { TbScanEye } from "react-icons/tb";

interface CardProps {
  product: Product;
}

export const ProductCard = ({ product }: CardProps) => {
  // Navigation
  const router = useRouter();

  const navigateToProductDetails = () => {
    router.push(`/store/${encodeURIComponent(product.name.split(" ")[0])}/${product.id}`);
  };

  return (
    <Card className="my-4 flex h-fit shrink-0 cursor-grab flex-col rounded-lg bg-white p-4 shadow-[0_0_15px_-5px_rgba(0,0,0,0.1)]">
      <CardContent className="relative h-full px-0">
        {/* Fav Button */}
        <AddToFavoriteButton productId={product.id} isFav={Boolean(product.is_favorite)} />

        {/* Product Image */}
        <div className="group relative flex aspect-square cursor-pointer items-center justify-center rounded-lg bg-[#F2FAFA]">
          <ClientImage
            src={product.main_image}
            alt={product.name}
            fill
            sizes={"100%"}
            className="relative z-10 w-full object-contain"
          />

          {/* Ovelayer and Viwe Product Button */}
          <div className="flex-center absolute inset-0 z-20 w-full cursor-grab rounded-xl bg-black/30 opacity-0 duration-300 group-hover:opacity-100">
            <Button
              className="flex-center circle size-10 cursor-pointer duration-200 hover:scale-[1.08]"
              onClick={navigateToProductDetails}
            >
              <TbScanEye className="size-8" />
            </Button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          {/* Product Name */}
          <h3
            onClick={navigateToProductDetails}
            className="cursor-pointer text-base font-medium text-zinc-800 hover:underline"
          >
            {truncatedText(product.name, 20)}
          </h3>

          {/* Product Price */}
          <p className="text-main text-base font-medium">{product.price}</p>
        </div>

        <div className="flex h-20 items-center justify-between gap-2">
          {/* Product Description */}
          <p className="text-light-gray text-xs">{truncatedText(product.small_description, 50)}</p>

          {/*  Add To Cart Button */}
          <Button onClick={navigateToProductDetails} size={"icon"} className="relative shadow">
            <Image
              src={"/assets/icons/add-to-cart-icon.svg"}
              alt="Add Icon"
              className="cursor-pointer"
              width={20}
              height={20}
              loading="lazy"
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
