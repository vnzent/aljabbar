import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          {/* Image skeleton */}
          <Skeleton className="h-[150px] md:h-[250px] lg:h-[300px] w-full rounded-none" />

          {/* Button skeleton */}
          <Skeleton className="h-3 md:h-5 w-full rounded-none" />

          {/* Category badge skeleton */}
          <Skeleton className="h-2 md:h-4 w-24 rounded-none" />
        </div>
      ))}
    </div>
  );
}
