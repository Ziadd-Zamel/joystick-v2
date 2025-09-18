import { Skeleton } from "@/components/ui/skeleton";

export default function OrderDetailsSkeleton() {
  return (
    <>
      {/* Total payment heading */}
      <div className="mb-2 text-center">
        <Skeleton className="mx-auto h-4 w-32" />
      </div>
      <div className="mb-10 text-center">
        <Skeleton className="mx-auto h-8 w-48" />
      </div>

      {/* Grid layout */}
      <section className="grid gap-5 md:grid-cols-2">
        {/* Products cards */}
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-4 rounded-md border p-3 md:flex-row"
            >
              {/* Product image skeleton */}
              <Skeleton className="hidden h-20 w-32 rounded-lg md:block" />

              {/* Product details */}
              <div className="w-full flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <div className="mt-4 flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order details */}
        <div className="space-y-2 font-medium">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2 rounded-sm border p-4">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
