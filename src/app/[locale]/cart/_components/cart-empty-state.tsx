"use client";

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
        <Button asChild>
          <Link href="/store" aria-label={t("button")}>
            {t("button")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
