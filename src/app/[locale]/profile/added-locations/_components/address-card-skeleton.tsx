import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function AddressCardSkeleton() {
  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8">
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="flex min-h-[100px] w-full flex-row rounded-xl border border-[#E4E7E9] px-6 py-4"
          >
            <div className="w-full space-y-5">
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-1/4 rounded" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <Skeleton className="h-3 w-2/3 rounded" />
              <Skeleton className="h-3 w-1/2 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
