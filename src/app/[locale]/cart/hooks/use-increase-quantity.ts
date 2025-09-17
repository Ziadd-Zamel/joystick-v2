import { useMutation } from "@tanstack/react-query";
import { increaseQuantity } from "@/lib/api-actions/cart.api";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function useIncreaseQuantity() {
  const t = useTranslations("cart");
  return useMutation({
    mutationFn: async ({ productId, cartId }: { productId: string; cartId: string }) => {
      return increaseQuantity(productId, cartId);
    },
    onSuccess: () => {
      toast.success(t("increaseSuccess"));
    },
    onError: () => {
      toast.error(t("increaseError"));
    },
  });
}
