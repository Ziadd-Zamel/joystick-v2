"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function CartEmptyState() {
  const t = useTranslations("cart");

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      {/* Animation Container */}
      <div className="mb-6">
        <DotLottieReact
          src="/assets/animations/empty.lottie"
          loop
          autoplay
          width={200}
          height={250}
        />
      </div>

      {/* Text Content */}
      <div className="max-w-md text-center">
        <h2 className="mb-2 text-2xl font-semibold text-gray-800">{t("title")}</h2>
        <p className="mb-8 text-gray-500">{t("description")}</p>

        {/* Action Button */}
        <Link href="/products" aria-label={t("button")}>
          <Button className="rounded-lg bg-[#02A09B] px-8 py-3 font-medium text-white shadow-sm transition-colors duration-200 hover:bg-[#02A09B]/80 hover:shadow-md">
            {t("button")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
