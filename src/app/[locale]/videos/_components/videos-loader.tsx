import { getAllVideos } from "@/lib/api/videos.api";
import { getLocaleAssets } from "@/lib/utils/index";
import VideoCard from "./video-card";

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
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
