import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function CartItemSkeleton() {
  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="flex min-h-[144px] flex-col gap-4 sm:flex-row sm:gap-5">
        {/* Image skeleton */}
        <div className="flex-center relative aspect-square w-full rounded-lg bg-[#F2FAFA] sm:h-36 sm:w-36">
          <Skeleton className="h-28 w-28 sm:h-24 sm:w-24" />
        </div>

        {/* Content skeleton */}
        <div className="flex flex-1 flex-col sm:h-36">
          {/* Title + Delete button skeleton */}
          <div className="flex w-full items-start justify-between gap-2">
            <Skeleton className="h-5 max-w-[200px] flex-1 sm:h-6" />
            <Skeleton className="h-6 w-6 rounded" />
          </div>

          {/* Description skeleton */}
          <div className="mt-1 space-y-1 sm:mt-2">
            <Skeleton className="h-4 w-full max-w-[300px]" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Price + Quantity selector skeleton */}
          <div className="mt-3 flex w-full items-center justify-between sm:mt-auto">
            <Skeleton className="h-5 w-20 sm:h-6" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DiscountSectionSkeleton() {
  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader>
        <Skeleton className="h-6 w-24" />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Price breakdown skeleton */}
        <div className="space-y-3">
          {/* Subtotal */}
          <div className="flex justify-between">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>

          {/* Shipping */}
          <div className="flex justify-between">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>

          {/* Total */}
          <div className="flex justify-between">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>

        {/* Payment method skeleton */}
        <div className="mt-6 space-y-3">
          <Skeleton className="h-5 w-32" />
          <div className="space-y-2">
            <Skeleton className="h-14 w-full rounded-lg" />
          </div>
        </div>

        {/* Checkout button skeleton */}
        <Skeleton className="mt-6 h-12 w-full rounded" />
      </CardContent>
    </Card>
  );
}

export default function CartPageSkeleton() {
  return (
    <div className="box-container flex flex-col items-start justify-between gap-5 py-20 lg:flex-row">
      {/* Cart items section */}
      <div className="w-full space-y-4 lg:w-[60%]">
        {/* Render 3 skeleton items to simulate loading */}
        {Array.from({ length: 3 }).map((_, index) => (
          <CartItemSkeleton key={index} />
        ))}
      </div>

      {/* Discount section */}
      <div className="h-full w-full lg:w-[35%]">
        <DiscountSectionSkeleton />
      </div>
    </div>
  );
}
