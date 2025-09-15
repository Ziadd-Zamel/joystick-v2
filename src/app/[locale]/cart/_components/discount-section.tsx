"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { applyCoupon } from "@/lib/actions/coupon.actions";
import Image from "next/image";
import CheckoutButton from "../checkout/_components/checkout-button";

interface DiscountSectionProps {
  cartItems?: Cart[];
  shipping: number;
  showCouponInput?: boolean;
  address?: number;
}

export default function DiscountSection({
  cartItems = [],
  shipping,
  showCouponInput = false,
  address,
}: DiscountSectionProps) {
  // Translations
  const t = useTranslations("cart");

  // State management
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"cashOnDelivery" | "paymob">(
    "cashOnDelivery",
  );

  // Calculate total price of all items in cart
  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0,
  );

  // Mutation
  const couponMutation = useMutation({
    mutationFn: applyCoupon,
    onSuccess: (data) => {
      // Handle successful
      if (data.success && data.data) {
        setAppliedDiscount(Number(data.data));
        setIsCouponApplied(true);
        toast.success(t("coupon-applied"));
      }
    },
    onError: (error: Error) => {
      // Handle error
      toast.error(error.message);
    },
  });

  // Calculate final total: shipping + items total - any applied discount
  const finalTotal = shipping + totalPrice - appliedDiscount;

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    couponMutation.mutate({
      code: couponCode,
      total_price: totalPrice,
    });
  };

  const handleRemoveCoupon = () => {
    setAppliedDiscount(0);
    setIsCouponApplied(false);
    setCouponCode("");
    toast.success(t("coupon-removed"));
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader>
        {!showCouponInput && <CardTitle className="text-2xl font-medium">{t("summary")}</CardTitle>}

        {/* Coupon input section*/}
        {showCouponInput && (
          <div className="space-y-4">
            {/*title */}
            <div className="text-lg font-medium text-gray-800">{t("discount-code")}</div>

            <div className="flex gap-2">
              {/* Coupon code input field */}
              <Input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder={t("enter-discount-code")}
                className="flex-1"
                disabled={isCouponApplied}
              />

              {!isCouponApplied ? (
                // Apply coupon button
                <Button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="h-12 bg-[#028b85] px-6 text-white hover:bg-[#026b65]"
                  disabled={!couponCode.trim() || couponMutation.isPending} // Disable if no code or loading
                >
                  {couponMutation.isPending ? t("applying") : t("apply")}
                </Button>
              ) : (
                // Remove coupon button
                <Button
                  type="button"
                  onClick={handleRemoveCoupon}
                  variant="outline"
                  className="h-12 px-6"
                >
                  {t("remove")}
                </Button>
              )}
            </div>

            {/* Success message when coupon is applied */}
            {isCouponApplied && (
              <div className="text-sm font-medium text-[#028b85]">
                ✓ {t("coupon-applied-successfully")}
              </div>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent>
        {/* Subtotal (Price before shipping and discounts) */}
        <div className="my-3 flex justify-between text-lg font-medium text-[#8A8B7A]">
          <span>{t("price")}</span>
          <span>
            {totalPrice} {t("currency")}
          </span>
        </div>

        {/* Shipping cost display */}
        <div className="my-3 flex justify-between text-lg font-medium text-[#8A8B7A]">
          <span>{t("shipping")}</span>
          <span>
            {shipping.toFixed(1)} {t("currency")}
          </span>
        </div>

        {/* Discount amount*/}
        {appliedDiscount > 0 && (
          <div className="my-3 flex justify-between text-lg font-medium text-[#028b85]">
            <span>{t("discount")}</span>
            <span>
              -{appliedDiscount} {t("currency")}
            </span>
          </div>
        )}

        {/* Final total calculation display */}
        <div className="my-3 flex justify-between text-lg font-medium text-[#8A8B7A]">
          <span>{t("total")}</span>
          <span>
            {finalTotal} {t("currency")}
          </span>
        </div>

        {/* Payment Method Selection */}
        <div className="mt-10 space-y-3">
          <div className="text-lg font-medium text-gray-800">{t("payment-method")}</div>

          {/* Cash on Delivery Option */}
          <div
            className={`flex cursor-pointer items-center justify-between rounded-lg border-1 p-4 transition-colors ${
              selectedPaymentMethod === "cashOnDelivery"
                ? "border-[#028b85]"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedPaymentMethod("cashOnDelivery")}
          >
            <div className="flex items-center gap-4">
              <Image
                src={"/assets/icons/cash-on-delivery.svg"}
                alt="Cash on delivry"
                width={30}
                height={30}
              />
              <span className="text-base font-medium">{t("cash-on-delivery")}</span>
            </div>
          </div>

          {/* PayMob Bank Transfer Option */}
          {/* <div
            className={`flex cursor-pointer items-center justify-between rounded-lg border-2 p-4 transition-colors ${
              selectedPaymentMethod === "paymob"
                ? "border-[#028b85] bg-[#028b85]/5"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedPaymentMethod("paymob")}
          >
            <div className="flex items-center gap-3">
              <span className="text-base font-medium">{t("bank-transfer") || "تحويل بنكي"}</span>
            </div>
          </div> */}
        </div>

        {/* Checkout button */}
        {!showCouponInput && (
          <Link href={"/cart/checkout"}>
            <Button
              type="button"
              className="mt-6 w-full bg-[#028b85] py-6 text-white hover:bg-[#028b85]"
              disabled={cartItems.length === 0}
            >
              {t("checkout")}
            </Button>
          </Link>
        )}
        {showCouponInput && (
          <CheckoutButton
            address={address || 0}
            method={selectedPaymentMethod}
            total={finalTotal}
          />
        )}
      </CardContent>
    </Card>
  );
}
