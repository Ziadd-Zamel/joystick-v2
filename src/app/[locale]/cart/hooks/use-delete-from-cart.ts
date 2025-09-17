"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { deleteFromCart } from "@/lib/actions/cart.actions";

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
