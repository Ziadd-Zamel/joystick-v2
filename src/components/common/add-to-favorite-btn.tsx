"use client";

import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { addToCart } from "@/lib/actions/cart.actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Image from "next/image";

type Props = {
  productId: number;
  isFav: boolean;
  className?: string;
};

export default function AddToFavoriteButton({ productId, className, isFav = false }: Props) {
  // Translations
  const t = useTranslations();

  // Mutations
  const addProductToCart = useMutation({
    mutationFn: (id: number) => addToCart(id),
    onSuccess: () => {
      toast.success(t("product-added"));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        addProductToCart.mutate(productId);
      }}
      className={cn(
        "flex-center center absolute top-2 left-2 z-30 cursor-pointer bg-white p-1.5 hover:scale-[1.05] hover:bg-white",
        className,
      )}
    >
      {addProductToCart.isPending ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <>
          <Image
            src={isFav ? "/assets/icons/heart-fill.svg" : "/assets/icons/heart-line.svg"}
            alt="Favorite Icon"
            width={24}
            height={24}
            loading="lazy"
            className="transition duration-200 ease-in-out"
          />
        </>
      )}
    </Button>
  );
}
