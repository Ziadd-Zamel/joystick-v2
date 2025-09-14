import { Link } from "@/i18n/routing";

export default function VideoCard({ video }: { video: Video }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg">
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
  );
}
