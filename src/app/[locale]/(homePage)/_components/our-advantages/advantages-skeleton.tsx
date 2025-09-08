import { Skeleton } from "@/components/ui/skeleton";

const OurAdvantagesSkeleton = () => {
  return (
    <section className="container mx-auto">
      {/* Headline Skeleton */}
      <div className="my-6 flex flex-col items-center justify-center space-y-4 text-center">
        <Skeleton className="h-8 w-[250px] rounded-md" />
        <Skeleton className="h-4 w-[400px] max-w-lg rounded-md" />
      </div>

      {/* Advantages Grid Skeleton */}
      <div className="my-6 grid grid-cols-1 justify-items-center gap-6 py-6 sm:grid-cols-2 md:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <Skeleton className="h-[150px] w-[250px] rounded-md" />
            <Skeleton className="h-6 w-[200px] rounded-md" />
            <Skeleton className="h-4 w-[250px] max-w-xs rounded-md" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurAdvantagesSkeleton;
