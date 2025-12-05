import ProductsGridSkeleton from "@/components/molecules/ProductsGridSkeleton";
import CategoryFilterSkeleton from "@/components/molecules/CategoryFilterSkeleton";

export default function Loading() {
  return (
    <>
      <div className="pt-32 pb-10">
        <div className="container mx-auto px-4">
          {/* Breadcrumb skeleton */}
          <div className="flex items-center gap-2 text-sm">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            <span>/</span>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar skeleton */}
          <aside className="hidden lg:block w-64 shrink-0">
            <CategoryFilterSkeleton />
          </aside>

          {/* Products skeleton */}
          <div className="flex-1">
            <div className="mb-6">
              <div className="h-9 w-48 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-5 w-64 bg-gray-200 rounded animate-pulse" />
            </div>
            <ProductsGridSkeleton />
          </div>
        </div>
      </div>
    </>
  );
}
