import { fetchAboutJoyStick } from "@/lib/api/about.api";
import Image from "next/image";
import OurAdvantages from "../(homePage)/_components/our-advantages/our-advantages";
import BackgroundVideo from "./_components/background-video";

export async function generateMetadata() {
  const aboutJoyStick = await fetchAboutJoyStick();

  return {
    title: aboutJoyStick.title_ar || "عن JoyStick",
    description: aboutJoyStick.body_ar?.slice(0, 160) || "وصف افتراضي لصفحة عن JoyStick",
  };
}

export default async function Page() {
  const aboutJoyStick = await fetchAboutJoyStick();

  return (
    <section className="container mx-auto flex w-full flex-col items-center justify-center p-4 py-6 xl:max-w-[80%]">
      <div className="my-8 flex w-full flex-col gap-6 lg:flex-row">
        <div className="relative flex h-[30vh] w-full items-center justify-center lg:w-1/3">
          {aboutJoyStick.image && (
            <Image
              className="rounded-xl object-fill"
              alt="About Image"
              src={aboutJoyStick.image || "/assets/images/joystick.bg.jpg"}
              fill
              priority
            />
          )}
        </div>
        <div className="flex w-full flex-col space-y-6 p-4 lg:w-2/3">
          <h1 className="text-2xl font-bold md:text-3xl">
            {aboutJoyStick.title_ar || "Default Title"}
          </h1>
          <p className="text-md max-w-3xl font-normal text-[#3D3D3D] md:text-lg">
            {aboutJoyStick.body_ar || "Default description goes here."}
          </p>
        </div>
      </div>
      <OurAdvantages />
      <BackgroundVideo />
    </section>
  );
}
