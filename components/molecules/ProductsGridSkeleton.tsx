import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          {/* Image skeleton */}
          <Skeleton className="h-[300px] w-full rounded-lg" />

          {/* Category badge skeleton */}
          <Skeleton className="h-5 w-24 rounded-full" />

          {/* Title skeleton */}
          <Skeleton className="h-6 w-3/4" />

          {/* Price skeleton */}
          <Skeleton className="h-7 w-32" />

          {/* Button skeleton */}
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
}
