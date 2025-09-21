import { getAllVideos } from "@/lib/actions/vidoes.actions";
import { getLocaleAssets } from "@/lib/utils/index";
import Link from "next/link";

export default async function VidoesLoader() {
  const { t } = await getLocaleAssets();
  const videos = await getAllVideos();

  return (
    <div>
      {videos.length === 0 ? (
        <div className="flex-center h-[40vh]">
          <p className="text-center text-lg font-medium text-gray-600">{t("no_videos_found")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {videos.map((video: Video) => (
            <div
              key={video.id}
              className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative aspect-video">
                <iframe
                  src={video.url}
                  title="YouTube video player"
                  className="h-full w-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              </div>
              <div className="flex flex-1 flex-col justify-between p-4">
                <h3 className="font-poppins text-lg font-semibold text-gray-800">{video.title}</h3>
                <Link
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-main hover:bg-main/80 mt-4 rounded-sm p-2 text-center text-sm text-white sm:text-base"
                >
                  مشاهدة الفيديو
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
