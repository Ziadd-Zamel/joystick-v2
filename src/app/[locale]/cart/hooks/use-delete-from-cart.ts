"use client";
import { useMutation } from "@tanstack/react-query";
import { deleteFromCart } from "@/lib/api-actions/cart.api";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function useDeleteCart() {
  const t = useTranslations("cart");
  return useMutation({
    mutationFn: async (peoductId: string) => {
      return deleteFromCart(peoductId);
    },
    onSuccess: () => {
      toast.success(t("deleteSuccess"));
    },
    onError: () => {
      toast.error(t("deleteError"));
    },
  });
}
