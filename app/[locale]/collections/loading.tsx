import ProductsGridSkeleton from "@/components/molecules/ProductsGridSkeleton";
import CategoryFilterSkeleton from "@/components/molecules/CategoryFilterSkeleton";

export default function Loading() {
  return (
    <>
      <div className="pt-10 sm:pt-15 lg:pt-20 pb-5 sm:pb-10 lg:pb-20">
        <div className="mx-auto main-wrapper py-8">
          <div className="py-3">
            {/* Breadcrumb skeleton */}
            <div className="flex items-center gap-2 text-base">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              <span className="text-gray-300">/</span>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="flex gap-8">
            {/* Sidebar skeleton */}
            <aside className="hidden lg:block w-64 shrink-0">
              <CategoryFilterSkeleton />
            </aside>

            {/* Products skeleton */}
            <div className="flex-1">
              {/* Header with Title and Dropdowns Skeleton */}
              <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="h-9 w-48 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-5 w-64 bg-gray-200 rounded animate-pulse" />
                </div>

                {/* Dropdowns Skeleton */}
                <div className="flex items-center gap-3">
                  <div className="h-8 w-45 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 w-45 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>

              <ProductsGridSkeleton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
