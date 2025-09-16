"use client";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { addToCart } from "@/lib/actions/cart.actions";
import Image from "next/image";
import { useState } from "react";
import AuthDialog from "../layout/header/_components/auth-dialog";

type AddToCartButtonProps = {
  className?: string;
  productId: number;
  isLogedin?: boolean;
  quantity?: number;
  selectedColor?: string;
  requiresColor?: boolean;
};

export default function AddToCartButton({
  productId,
  className,
  isLogedin = false,
  quantity = 1,
  selectedColor,
  requiresColor = false,
}: AddToCartButtonProps) {
  // Translations
  const t = useTranslations();

  // State for auth dialog
  const [authOpen, setAuthOpen] = useState(false);

  // Mutations
  const addProductToCart = useMutation({
    mutationFn: ({
      productId,
      selectedColor,
      quantity,
    }: {
      productId: number;
      selectedColor?: string;
      quantity: number;
    }) => addToCart(productId, selectedColor, quantity),
    onSuccess: () => {
      toast.success(t("product-added"));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Check if color is required and selected
    if (requiresColor && (!selectedColor || selectedColor.trim() === "")) {
      toast.error(t("please-select-color-first"));
      return;
    }

    if (!isLogedin) {
      // Open auth dialog if user is not logged in
      setAuthOpen(true);
    } else {
      // Add to cart if user is logged in
      addProductToCart.mutate({
        productId,
        selectedColor,
        quantity,
      });
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className={cn(
          "flex items-center justify-center px-4 py-5 text-base sm:w-[200px] sm:py-7 sm:text-xl",
          className,
        )}
        disabled={addProductToCart.isPending}
      >
        {addProductToCart.isPending ? (
          <Loader2 size={32} className="animate-spin" />
        ) : (
          <>
            <Image
              src="/assets/icons/buttons.svg"
              alt="Buttons Icon"
              width={20}
              height={20}
              className="mr-2"
            />
            {t("add-to-cart")}
          </>
        )}
      </Button>

      {/* Auth Dialog - only render when needed */}
      {!isLogedin && <AuthDialog showTrigger={false} open={authOpen} onOpenChange={setAuthOpen} />}
    </>
  );
}
