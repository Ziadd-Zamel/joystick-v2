"use client";

import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { RiShoppingBasketFill } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { addToCart } from "@/lib/actions/cart.actions";

type AddToCartButtonProps = {
  className?: string;
  productId: number;
};

export default function AddToCartButton({ productId, className }: AddToCartButtonProps) {
  // Translations
  const t = useTranslations();

  // Mutations
  const addProductToCart = useMutation({
    mutationFn: (productId: number) => addToCart(productId),
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
        // Handle add to cart logic here
        addProductToCart.mutate(productId);
      }}
      className={cn("bg-light-blue flex items-center gap-2 hover:bg-blue-700", className)}
    >
      {addProductToCart.isPending ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <>
          <RiShoppingBasketFill className="text-main-yellow text-xl" />
          {t("add-to-cart")}
        </>
      )}
    </Button>
  );
}
