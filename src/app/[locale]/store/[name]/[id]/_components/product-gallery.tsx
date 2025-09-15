/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { useEffect } from "react";
import { useLocale } from "next-intl";

interface ProductGalleryProps {
  images: string[];
  productName?: string;
}

export default function ProductGallery({ images, productName = "Product" }: ProductGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const locale = useLocale();

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleThumbnailClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="flex h-96 w-full items-center justify-center rounded-lg bg-gray-100">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Mobile Layout - Thumbnails at bottom */}
      <div className="block space-y-4 md:hidden">
        {/* Main Gallery */}
        <div className="group relative">
          <Carousel
            setApi={setApi}
            className="w-full rounded-lg bg-[#F2FAFA]"
            opts={{ direction: locale === "ar" ? "rtl" : "ltr" }}
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="flex items-center justify-center py-16">
                    <div className="relative flex items-center justify-center overflow-hidden rounded-lg">
                      <Image
                        src={image}
                        alt={`${productName} - Image ${index + 1}`}
                        className="h-[300px] w-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                        width={300}
                        height={300}
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 1 && (
              <>
                <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </>
            )}
          </Carousel>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute right-4 bottom-4 rounded-full bg-black/70 px-3 py-1 text-sm font-medium text-white">
              {current + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Mobile Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="w-full">
            <Carousel
              setApi={setThumbnailApi}
              opts={{
                containScroll: "keepSnaps",
                dragFree: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2">
                {images.map((image, index) => (
                  <CarouselItem key={index} className="basis-1/4 pl-2">
                    <button
                      onClick={() => handleThumbnailClick(index)}
                      className={cn(
                        "relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border-2 transition-all duration-200 hover:opacity-80",
                        current === index
                          ? "border-[#02A09B] opacity-100 shadow-md"
                          : "border-gray-200 opacity-70 hover:border-gray-300 hover:opacity-100",
                      )}
                    >
                      <Image
                        src={image}
                        alt={`${productName} thumbnail ${index + 1}`}
                        className="h-[60px] w-[60px] object-cover"
                        width={60}
                        height={60}
                      />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        )}

        {/* Dots Indicator for Mobile */}
        {images.length > 1 && (
          <div className="flex justify-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-200",
                  current === index ? "bg-[#02A09B]" : "bg-gray-300 hover:bg-gray-400",
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop/Tablet Layout - Thumbnails on the left */}
      <div className="hidden gap-4 md:flex">
        {/* Thumbnail Navigation - Left Side */}
        {images.length > 1 && (
          <div className="flex w-16 flex-shrink-0 flex-col justify-center lg:w-20">
            <Carousel
              setApi={setThumbnailApi}
              orientation="vertical"
              opts={{
                containScroll: "keepSnaps",
                dragFree: true,
                align: images.length <= 4 ? "center" : "start",
              }}
              className="w-full"
            >
              <CarouselContent
                className={`-mt-1 ${images.length <= 4 ? "h-auto justify-center" : "h-[400px] lg:h-[500px]"}`}
              >
                {images.map((image, index) => (
                  <CarouselItem key={index} className="basis-1/5 pt-5">
                    <button
                      onClick={() => handleThumbnailClick(index)}
                      className={cn(
                        "relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border-2 transition-all duration-200 hover:opacity-80",
                        current === index
                          ? "border-[#02A09B] opacity-100 shadow-md"
                          : "border-gray-200 opacity-70 hover:border-gray-300 hover:opacity-100",
                      )}
                    >
                      <Image
                        src={image}
                        alt={`${productName} thumbnail ${index + 1}`}
                        className="h-[60px] w-[60px] object-cover"
                        width={60}
                        height={60}
                      />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        )}

        {/* Main Gallery - Right Side */}
        <div className="group relative max-h-[600px] flex-1">
          <Carousel
            opts={{ direction: locale === "ar" ? "rtl" : "ltr" }}
            setApi={setApi}
            className="max-h-[600px] w-full bg-[#F2FAFA]"
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="flex items-center justify-center md:py-16 lg:py-10">
                    <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg py-10">
                      <Image
                        src={image}
                        alt={`${productName} - Image ${index + 1}`}
                        className="h-[350px] w-[350px] object-cover transition-transform duration-300 group-hover:scale-105"
                        width={350}
                        height={350}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute right-4 bottom-4 rounded-full bg-black/70 px-3 py-1 text-sm font-medium text-white">
              {current + 1} / {images.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
