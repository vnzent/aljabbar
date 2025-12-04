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
            <span>/</span>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <span>/</span>
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image skeleton */}
          <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />

          {/* Product info skeleton */}
          <div className="space-y-6">
            <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-12 w-40 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Related products skeleton */}
        <div className="mt-16">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
