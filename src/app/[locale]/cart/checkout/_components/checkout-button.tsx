import { Button } from "@/components/ui/button";
import { checkout } from "@/lib/api-actions/cart.api";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function CheckoutButton({
  total,
  method,
  address = 1,
}: {
  total: number;
  method: string;
  address?: number;
}) {
  const t = useTranslations("cart");

  // Mutations
  const usePay = useMutation({
    mutationFn: ({ total, method, address }: { total: number; method: string; address: number }) =>
      checkout(address, total, method),
    onSuccess: () => {
      toast.success(t("payment-success"));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCheckout = () => {
    usePay.mutate({ total, method, address });
  };

  return (
    <Button
      type="button"
      className="mt-10 w-full bg-[#028b85] py-6 text-white hover:bg-[#028b85]"
      onClick={handleCheckout}
      disabled={usePay.isPending}
    >
      {usePay.isPending ? t("processing") : t("pay")}
    </Button>
  );
}
