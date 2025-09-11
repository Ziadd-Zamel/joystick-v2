import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import MutationQuantitySelector from "./mutation-quantity-selector";
import DeleteCartItem from "./cart-delete";
import { useTranslations } from "next-intl";

export default function CartItemCard({ item }: { item: Cart }) {
  const t = useTranslations();
  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="flex min-h-[144px] flex-col gap-4 sm:flex-row sm:gap-5">
        {/* Image */}
        <div className="flex-center relative aspect-square w-full rounded-lg bg-[#F2FAFA] sm:h-36 sm:w-36">
          <Image
            src={item.product.main_image}
            alt={item.product.name || "product-image"}
            width={120}
            height={120}
            className="h-28 w-28 object-cover sm:h-24 sm:w-24"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col sm:h-36">
          {/* Title + Delete */}
          <div className="flex w-full items-start justify-between gap-2">
            <h2 className="line-clamp-1 flex-1 text-base font-semibold sm:text-lg">
              {item.product.name}
            </h2>
            <DeleteCartItem productId={item.id.toString()} />
          </div>

          {/* Description */}
          <p className="mt-1 line-clamp-2 text-sm text-[#737791] sm:mt-0">
            {item.product.small_description}
          </p>

          {/* Price + Quantity */}
          <div className="mt-3 flex w-full items-center justify-between sm:mt-auto">
            <span className="line-clamp-1 text-base font-semibold sm:text-lg">
              {item.product.price}
            </span>
            <MutationQuantitySelector
              cartId={item.id}
              productId={item.product.id.toString()}
              quantity={Number(item.quantity)}
              availableQuantity={Number(item.product.quantity)}
              availableText={t("available-quantity")}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
