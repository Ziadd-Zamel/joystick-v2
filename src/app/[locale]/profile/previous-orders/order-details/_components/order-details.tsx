import { Link } from "@/i18n/routing";
import { getOrderById } from "@/lib/actions/orders.actions";
import { getTranslations } from "next-intl/server";

export default async function OrderDetails({ orderId }: { orderId: string | undefined }) {
  const t = await getTranslations("profile-route");

  const orderDetails = await getOrderById(orderId!);

  return (
    <>
      <p className="mb-2 text-center text-sm font-medium text-zinc-600">{t("total-payment")}</p>

      <h3 className="mb-10 text-center text-2xl font-medium">
        {t("format-currency", { value: orderDetails.data.total })}
      </h3>
      {/* Tabs instead of query params */}
      <section className="grid gap-5 md:grid-cols-2">
        {/* Products cards */}
        <div className="space-y-4">
          {orderDetails.data.order_detalis.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center gap-4 rounded-md border p-3 md:flex-row"
            >
              {/* <div className="relative aspect-video h-40 overflow-hidden rounded-lg bg-white shadow md:aspect-square md:w-1/5">
						<Image
							src={product.main_image}
							alt={product.product_name}
							fill
							loading="lazy"
							sizes="34vw"
							className="object-cover"
						/>
					</div> */}

              <div className="flex-1 space-y-2">
                <div
                  // href={`/store/${encodeURIComponent(product.product_name.split(" ")[0])}/${product.id}`}
                  className="font-semibold underline-offset-2"
                >
                  {product.product_name}
                </div>

                <div className="text-main mt-4 flex items-center justify-between font-medium">
                  <p>
                    {t("format-currency", { value: product.price })}{" "}
                    <span className="text-xs text-zinc-600">x{product.quantity}</span>
                  </p>

                  <p>{t("format-currency", { value: product.total })}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order details */}
        <div className="space-y-2 font-medium">
          <div className="rounded-sm border p-4">
            <p className="text-sm text-zinc-500">{t("order-number")}</p>
            <p>{orderDetails.data.order_number}</p>
          </div>

          <div className="rounded-sm border p-4">
            <p className="text-sm text-zinc-500">{t("address")}</p>
            <p>
              {orderDetails.data.address_id
                ? orderDetails.data.address_id.grand_address
                : t("no-address-provided")}
            </p>
          </div>

          <div className="rounded-sm border p-4">
            <p className="text-sm text-zinc-500">{t("payment-method")}</p>
            <p>{orderDetails.data.payment_method}</p>
          </div>

          <div className="rounded-sm border p-4">
            <p className="text-sm text-zinc-500">{t("payment-time")}</p>
            <p>
              {orderDetails.data.status === "Completed"
                ? orderDetails.data.updated_at
                : orderDetails.data.status}{" "}
            </p>
          </div>

          <div className="rounded-sm border p-4">
            <p className="text-sm text-zinc-500">{t("order-status")}</p>
            <p>{orderDetails.data.status}</p>
          </div>
        </div>
      </section>
    </>
  );
}
