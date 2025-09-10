import { useTranslations } from "next-intl";
import React, { Suspense } from "react";
import FavouritProductsList from "./_components/favourit-products-list";

export default function Page() {
  const t = useTranslations("profile-route");

  return (
    <div className="h-full rounded-md border border-zinc-200 bg-white">
      <h2 className="border-b border-zinc-200 p-4 text-lg font-medium">{t("favourites")}</h2>

      <div className="p-5">
        {/* Tabs instead of query params */}
        <Suspense fallback={"Loading"}>
          <FavouritProductsList />
        </Suspense>
      </div>
    </div>
  );
}
