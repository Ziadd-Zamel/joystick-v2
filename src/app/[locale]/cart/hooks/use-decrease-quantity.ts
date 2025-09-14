"use client";
import { useMutation } from "@tanstack/react-query";
import { decreaseQuantity } from "@/lib/actions/cart.actions";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function useDecreaseQuantity() {
  const t = useTranslations("cart");
  return useMutation({
    mutationFn: async ({ productId, cartId }: { productId: string; cartId: string }) => {
      return decreaseQuantity(productId, cartId);
    },
    onSuccess: () => {
      toast.success(t("decreaseSuccess"));
    },
    onError: () => {
      toast.error(t("decreaseError"));
    },
  });
}
