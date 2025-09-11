import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface DiscountSectionProps {
  cartItems?: Cart[];
  shipping: number;
}

export default function DiscountSection({ cartItems = [], shipping }: DiscountSectionProps) {
  const t = useTranslations("cart");

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0,
  );
  const finalTotal = shipping + totalPrice;
  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-medium">{t("summary")}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Price */}
        <div className="my-2 flex justify-between text-lg font-semibold text-[#A6A798]">
          <span>{t("price")}</span>
          <span>
            {totalPrice} {t("currency")}
          </span>
        </div>

        {/* Shipping */}
        <div className="my-2 flex justify-between text-lg font-semibold text-[#A6A798]">
          <span>{t("shipping")}</span>
          <span>
            {shipping.toFixed(1)} {t("currency")}
          </span>
        </div>

        {/* Total */}
        <div className="my-2 flex justify-between text-lg font-semibold text-[#A6A798]">
          <span>{t("total")}</span>
          <span>
            {finalTotal} {t("currency")}
          </span>
        </div>

        {/* Checkout Button */}
        <Link href={"/cart/checkout"} className="">
          <Button
            type="button"
            className="w-full bg-[#028b85] py-6 text-white hover:bg-[#028b85]"
            disabled={cartItems.length === 0}
          >
            {t("checkout")}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
