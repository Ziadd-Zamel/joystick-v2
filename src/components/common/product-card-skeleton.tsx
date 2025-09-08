"use client";
import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <div className="my-4 flex h-fit shrink-0 flex-col rounded-lg bg-white p-4 shadow-[0_0_15px_-5px_rgba(0,0,0,0.1)]">
      {/* Image */}
      <Skeleton className="aspect-square w-full rounded-lg" />

      {/* Name + Price */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <Skeleton className="h-4 w-32 rounded" />
        <Skeleton className="h-4 w-16 rounded" />
      </div>

      {/* Small Description */}
      <Skeleton className="mt-2 h-4 w-full rounded" />

      {/* Add to Cart Button */}
      <div className="mt-2 flex justify-end">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
};
