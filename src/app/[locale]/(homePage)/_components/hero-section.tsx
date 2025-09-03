import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="box-container relative mx-auto w-full p-4 py-6">
      <Image
        src={"/assets/Images/hero-bg.svg"}
        alt="Joy stick background"
        width={700}
        height={0}
        className="w-full object-cover"
        priority
      />
    </section>
  );
}
