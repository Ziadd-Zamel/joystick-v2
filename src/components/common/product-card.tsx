"use client";

import { Link, useRouter } from "@/i18n/routing";
import Image from "next/image";
import { ClientImage } from "./client-image";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { truncatedText } from "@/lib/utils/index";

interface CardProps {
  product: Product;
}

export const ProductCard = ({ product }: CardProps) => {
  const router = useRouter();

  const handleAddToCart = (name: string | number | boolean, id: number) => {
    const productName = encodeURIComponent(name);
    router.push(`/store/${productName}/${id}`);
  };

  return (
    <Card className="my-4 flex h-full shrink-0 flex-col rounded-lg bg-white p-4 shadow-[0_0_15px_-5px_rgba(0,0,0,0.1)]">
      <CardContent className="relative h-full px-0">
        {/* Fav Button */}
        <div
          //   onClick={() => toggleFavorite(product.id)}
          className="absolute top-1 left-1 z-30 cursor-pointer"
        >
          <Image
            src={"/assets/icons/favuriteHeart.svg"}
            alt="Favorite Icon"
            width={48}
            height={48}
            className="transition duration-200 ease-in-out"
          />
        </div>

        {/* Product Image */}
        <div
          onClick={() => handleAddToCart(product.name, product.id)}
          className="relative flex aspect-square cursor-pointer items-center justify-center rounded-lg bg-[#F2FAFA]"
        >
          <Link href={`/products/${encodeURIComponent(product.name.split(" ")[0])}/${product.id}`}>
            <ClientImage
              src={product.main_image}
              alt={product.name}
              fill
              className="w-full object-contain"
            />
          </Link>
        </div>

        <div onClick={() => handleAddToCart(product.name, product.id)} className="cursor-pointer">
          <div className="mt-4 flex items-center justify-between">
            <h3 className="text-base font-medium text-zinc-800">
              {truncatedText(product.name, 20)}
            </h3>
            <p className="text-main text-base font-medium">{product.price}</p>
          </div>

          <div className="flex h-20 items-center justify-between gap-2">
            <p className="text-light-gray text-xs">
              {truncatedText(product.small_description, 50)}
            </p>

            <Button size={"icon"} className="relative">
              <Image
                src={"/assets/icons/add-to-cart-icon.svg"}
                alt="Add Icon"
                className="cursor-pointer"
                width={20}
                height={20}
                onClick={() => handleAddToCart(product.name, product.id)}
              />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
