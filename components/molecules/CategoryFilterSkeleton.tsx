import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryFilterSkeleton() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-px w-full" />
      </div>

      {/* Filter items */}
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>

      {/* Nested items */}
      <div className="space-y-2 pl-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>

      {/* Clear filter button */}
      <Skeleton className="h-9 w-full rounded-md" />
    </div>
  );
}
