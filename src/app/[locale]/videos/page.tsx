import { getLocaleAssets } from "@/lib/utils/index";
import { Suspense } from "react";
import VidoesLoader from "./_components/videos-loader";

export default async function VideoGallery() {
  const { t } = await getLocaleAssets();

  return (
    <section className="p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-poppins mb-6 text-2xl font-bold text-gray-800 sm:mb-8 sm:text-3xl md:text-4xl">
          {t("explanatory_videos")}
        </h1>

        <Suspense fallback={<div className="flex-center h-[40vh]">{t("loading")}...</div>}>
          <VidoesLoader />
        </Suspense>
      </div>
    </section>
  );
}
