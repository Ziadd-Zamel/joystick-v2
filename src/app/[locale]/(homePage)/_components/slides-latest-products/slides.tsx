import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import { getHomeSlides } from "@/lib/api/home.api";
import { cn } from "@/lib/utils";
import { getLocaleAssets } from "@/lib/utils/index";
import { Link } from "@/i18n/routing";

export default async function Slides() {
  const { direction } = await getLocaleAssets();
  const slides = await getHomeSlides();

  if (!slides) return null;

  return (
    <section className="box-container my-10">
      <Carousel
        opts={{ direction }}
        className={cn("cursor-pointer select-none", {
          "mx-auto max-w-4xl": slides.length === 1,
          "w-full": slides.length > 1,
        })}
      >
        <CarouselContent>
          {slides.map((slide: Slide) => (
            <CarouselItem key={slide.id} className="basis-full lg:basis-1/2">
              <div className="p-1">
                <Link href={slide.url} target="_blank" className="relative block h-64 w-full">
                  <Image src={slide.img} alt="Slide" fill className="w-full rounded-2xl" />
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
