"use client";
import { Skeleton } from "@/components/ui/skeleton";

export const TabsSkeleton = () => {
  return (
    <div className="flex gap-2 overflow-x-auto px-1 py-2">
      {[...Array(5)].map((_, idx) => (
        <Skeleton key={idx} className="h-10 w-24 rounded-md" />
      ))}
    </div>
  );
};
