import { getLocaleAssets } from "@/lib/utils/index";
import { Suspense } from "react";
import VidoesLoader from "./_components/videos-loader";
import { Skeleton } from "@/components/ui/skeleton";

export default async function VideoGallery() {
  const { t } = await getLocaleAssets();

  return (
    <section className="p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-poppins mb-6 text-2xl font-bold text-gray-800 sm:mb-8 sm:text-3xl md:text-4xl">
          {t("explanatory_videos")}
        </h1>

        <Suspense
          fallback={
            <div className="grid h-[40vh] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300"
                >
                  <div className="relative aspect-video">
                    <Skeleton className="h-full w-full rounded-lg" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <Skeleton className="h-6 w-full rounded-md" />
                    <Skeleton className="mt-4 h-8 w-32 rounded-sm" />
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <VidoesLoader />
        </Suspense>
      </div>
    </section>
  );
}
