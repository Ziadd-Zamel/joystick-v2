import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export default function RelatedProductsSkeleton() {
  return (
    <section className="mt-28 mb-12">
      {/* Title skeleton */}
      <Skeleton className="mb-8 h-8 w-48" />

      <Carousel opts={{ align: "start" }} className="w-full select-none">
        <CarouselContent>
          {/* Generate 4 skeleton items */}
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <div className="p-1">
                {/* Product card skeleton */}
                <div className="space-y-4 rounded-lg border p-4">
                  {/* Product image skeleton */}
                  <Skeleton className="aspect-square w-full rounded-md" />

                  {/* Product title skeleton */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>

                  {/* Product price skeleton */}
                  <Skeleton className="h-6 w-1/3" />

                  {/* Button skeleton */}
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
