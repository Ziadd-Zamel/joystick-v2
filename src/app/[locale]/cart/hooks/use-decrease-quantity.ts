"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { decreaseQuantity } from "@/lib/actions/cart.actions";

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
