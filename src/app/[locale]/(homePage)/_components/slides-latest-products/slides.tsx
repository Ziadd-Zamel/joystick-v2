import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export default function Slides({ data }: { data: [] }) {
  return (
    <section className="box-container my-10">
      <Carousel className="w-full cursor-grab select-none">
        <CarouselContent>
          {Array.from({ length: 2 }).map((_, index) => (
            <CarouselItem key={index} className="basis-full lg:basis-1/2">
              <div className="p-1">
                <Card className="rounded-2xl bg-gradient-to-r from-[#073433] to-[#029F9A]">
                  <CardContent className="flex flex-col items-center justify-between gap-8 sm:flex-row">
                    <div className="space-y-6">
                      <h3 className="text-custom-orange text-2xl font-semibold">
                        Get maintenance at your location
                      </h3>
                      <p className="text-sm text-zinc-300">
                        It is a long established fact that a reader will be distracted by the
                        readable content of a page when looking at its layout.
                      </p>
                    </div>

                    <Image
                      src={"/assets/Images/controller.png"}
                      alt=""
                      width={250}
                      height={0}
                      className="lg:w-44 xl:w-62"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
