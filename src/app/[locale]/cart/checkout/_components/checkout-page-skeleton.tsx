import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Address section skeleton
function AddressSectionSkeleton() {
  return (
    <div className="w-full">
      {/* Header skeleton */}
      <div className="mb-5 flex items-center justify-between">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-4 w-12" />
      </div>

      <Card className="bg-white shadow-sm">
        <CardContent>
          <div className="space-y-4">
            {/* Address items skeleton */}
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-start justify-between rounded-lg border p-4"
              >
                <Skeleton className="mt-1 h-4 w-4 rounded-full" />
                <div className="flex flex-col items-end space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// User info form skeleton
function UserInfoFormSkeleton() {
  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="flex w-full flex-col items-center justify-center sm:px-5">
        <div className="mt-8 w-full space-y-8">
          {/* First Row - First Name and Last Name */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Second Row - Title and Phone */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Discount section skeleton (reuse from cart)
function DiscountSectionSkeleton() {
  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="space-y-4">
        {/* Coupon input section skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-28" />
          <div className="flex gap-2">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-20" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Price breakdown skeleton */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>

        {/* Payment method skeleton */}
        <div className="mt-10 space-y-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-14 w-full rounded-lg" />
        </div>

        {/* Checkout button skeleton */}
        <Skeleton className="mt-6 h-12 w-full rounded" />
      </CardContent>
    </Card>
  );
}

// Main checkout page skeleton
export default function CheckoutPageSkeleton() {
  return (
    <div className="box-container flex flex-col items-start justify-between gap-5 py-20 lg:flex-row">
      {/* Left side - Address and User Info */}
      <div className="w-full space-y-4 lg:w-[60%]">
        <AddressSectionSkeleton />
        <UserInfoFormSkeleton />
      </div>

      {/* Right side - Discount Section */}
      <div className="mt-[55px] h-full w-full lg:w-[35%]">
        <DiscountSectionSkeleton />
      </div>
    </div>
  );
}
