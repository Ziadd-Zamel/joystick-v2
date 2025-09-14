import { useTranslations } from "next-intl";
import React, { Suspense } from "react";
import FavouriteProductsList from "./_components/favourite-products-list";
import FavouriteSkeleton from "./_components/favourite-skeleton";

export default function Page() {
  const t = useTranslations("profile-route");

  return (
    <div className="h-full rounded-md border border-zinc-200 bg-white">
      <h2 className="border-b border-zinc-200 p-4 text-lg font-medium">{t("favourites")}</h2>

      <div className="p-5">
        {/* Tabs instead of query params */}
        <Suspense fallback={<FavouriteSkeleton />}>
          <FavouriteProductsList />
        </Suspense>
      </div>
    </div>
  );
}
