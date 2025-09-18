import { getTranslations } from "next-intl/server";
import OrderDetails from "../_components/order-details";
import { Suspense } from "react";
import OrderDetailsSkeleton from "../_components/order-details-skeleton";

export default async function page({ params }: RouteProps) {
  const t = await getTranslations("profile-route");
  const { orderId } = await params;

  return (
    <div className="h-full rounded-md border border-zinc-200 bg-white">
      <h2 className="border-b border-zinc-200 p-4 text-lg font-medium">{t("order-details")}</h2>

      <div className="p-5">
        <Suspense fallback={<OrderDetailsSkeleton />}>
          <OrderDetails orderId={orderId} />
        </Suspense>
      </div>
    </div>
  );
}
