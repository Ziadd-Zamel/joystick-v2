import { getVideo } from "@/lib/api/about.api";

const BackgroundVideo = async () => {
  const video = await getVideo();

  return (
    <div className="my-8 flex aspect-video w-full max-w-screen-md items-center justify-center rounded-lg">
      {video?.video ? (
        <video
          controls
          className="h-full w-full rounded-lg object-contain"
          aria-label="Video content"
        >
          <source src={video.video} type="video/mp4" />
          <source src={video.video} type="video/webm" />
          <track kind="captions" src="path/to/captions.vtt" srcLang="en" label="English" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p className="text-red-500">Video source is unavailable.</p>
      )}
    </div>
  );
};

export default BackgroundVideo;
