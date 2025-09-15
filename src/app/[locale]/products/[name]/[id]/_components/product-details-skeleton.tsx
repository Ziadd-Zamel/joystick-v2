import { Skeleton } from "@/components/ui/skeleton";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

// Breadcrumb Skeleton
function BreadcrumbSkeleton() {
  return (
    <div className="box-container mx-auto my-8">
      <div className="w-fit rounded-full bg-[#EAFEF1] p-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-4 w-2" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-2" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}

// Product Gallery Skeleton
function ProductGallerySkeleton() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Mobile Layout */}
      <div className="block space-y-4 md:hidden">
        {/* Main Gallery */}
        <div className="relative rounded-lg bg-[#F2FAFA]">
          <div className="flex items-center justify-center py-16">
            <Skeleton className="h-[300px] w-[300px] rounded-lg" />
          </div>
          {/* Image counter skeleton */}
          <div className="absolute right-4 bottom-4">
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>
        </div>

        {/* Mobile thumbnails */}
        <div className="flex space-x-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-[60px] w-[60px] flex-shrink-0 rounded-md" />
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center space-x-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-2 w-2 rounded-full" />
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden gap-4 md:flex">
        {/* Thumbnail Navigation */}
        <div className="flex w-16 flex-shrink-0 flex-col justify-center space-y-2 lg:w-20">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="aspect-square w-full rounded-md" />
          ))}
        </div>

        {/* Main Gallery */}
        <div className="relative flex-1 rounded-lg bg-[#F2FAFA]">
          <div className="flex items-center justify-center py-16">
            <Skeleton className="h-[350px] w-[350px] rounded-lg" />
          </div>
          {/* Image counter skeleton */}
          <div className="absolute right-4 bottom-4">
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Add to Cart Skeleton
function AddToCartSkeleton() {
  return (
    <div className="space-y-4">
      {/* Quantity selector */}
      <div className="flex items-center space-x-4">
        <Skeleton className="h-4 w-16" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-8 w-12" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      {/* Add to cart button */}
      <Skeleton className="h-12 w-full" />

      {/* Additional buttons if any */}
      <Skeleton className="h-10 w-32" />
    </div>
  );
}

// Related Products Skeleton (reusing your existing one)
function RelatedProductsSkeleton() {
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

// Main ProductDetails Skeleton
export default function ProductDetailsSkeleton() {
  return (
    <div className="box-container mt-20">
      {/* Breadcrumb Skeleton */}
      <BreadcrumbSkeleton />

      {/* Main Product Section */}
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Product Gallery Skeleton */}
        <div>
          <ProductGallerySkeleton />
        </div>

        {/* Product Information Skeleton */}
        <div className="flex flex-col space-y-6">
          {/* Product title and favorite button */}
          <div className="relative flex w-full items-center justify-between">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>

          {/* Product description */}
          <div className="space-y-3">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-4/6" />
          </div>

          {/* Price */}
          <Skeleton className="h-9 w-32" />

          {/* Add to Cart Section */}
          <AddToCartSkeleton />
        </div>
      </div>

      {/* Divider */}
      <div className="mt-20 mb-10 h-px w-full bg-gray-200" />

      {/* Product Details Section */}
      <div className="space-y-6">
        {/* Section title */}
        <Skeleton className="h-8 w-48" />

        {/* Description paragraphs */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
      </div>

      {/* Related Products Skeleton */}
      <RelatedProductsSkeleton />
    </div>
  );
}
