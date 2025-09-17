import { getHeroImage } from "@/lib/actions/home.actions";
import Image from "next/image";

export default async function HeroSection() {
  const payload = await getHeroImage();

  return (
    <section className="box-container 2xl:max-h-[] relative mx-auto h-screen max-h-[280px] w-full overflow-hidden rounded-3xl p-4 py-6 sm:max-h-[500px] lg:max-h-[650px]">
      <Image
        src={payload.img || "/assets/Images/hero-bg.svg"}
        alt="Joystick background"
        width={700}
        height={0}
        className="h-full w-full rounded-3xl"
        priority
      />
    </section>
  );
}
