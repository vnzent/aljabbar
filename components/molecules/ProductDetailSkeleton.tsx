export default function ProductDetailSkeleton() {
  return (
    <>
      <div className="container mx-auto px-4 pt-20 sm:pt-25 md:pt-30 pb-8 lg:pt-38 lg:pb-8">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 text-sm md:text-base">
          <div className="h-4 w-16 bg-gray-200 animate-pulse" />
          <span className="text-gray-300">/</span>
          <div className="h-4 w-24 bg-gray-200 animate-pulse" />
          <span className="text-gray-300">/</span>
          <div className="h-4 w-32 bg-gray-200 animate-pulse" />
          <span className="text-gray-300">/</span>
          <div className="h-4 w-40 bg-gray-200 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mt-6 md:mt-8">
          {/* Product Images */}
          <div className="space-y-3 md:space-y-4">
            {/* Main image skeleton */}
            <div className="relative aspect-square overflow-hidden bg-gray-200 animate-pulse" />
          </div>

          {/* Product Information */}
          <div className="space-y-5 md:space-y-6 flex flex-col justify-center">
            {/* Title & Categories */}
            <div>
              <div className="h-9 sm:h-10 md:h-11 lg:h-12 w-3/4 bg-gray-200 animate-pulse mb-3 md:mb-4" />
              <div className="flex flex-wrap gap-2">
                <div className="h-6 w-50 bg-gray-200  animate-pulse" />
              </div>
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200  animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-200  animate-pulse" />
              <div className="h-4 w-3/12 bg-gray-200  animate-pulse" />
            </div>

            {/* Contact Button - Hidden on mobile/tablet, shown on desktop */}
            <div className="hidden md:block">
              <div className="h-11 md:h-12 w-full sm:w-64 bg-gray-200  animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Contact Button Skeleton for Mobile/Tablet */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4">
        <div className="container mx-auto">
          <div className="h-11 w-full bg-gray-200 animate-pulse" />
        </div>
      </div>

      {/* Related Products Section Skeleton */}
      <div className="container mx-auto px-4 py-16">
        <div className="h-10 w-64 bg-gray-200 mb-8 animate-pulse" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-4/3 bg-gray-200 animate-pulse" />
              <div className="h-6 bg-gray-200 w-full animate-pulse" />
              <div className="h-4 bg-gray-200 w-3/4 animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Banner Skeleton */}
      <section className="w-full relative">
        <div className="bg-gray-300 animate-pulse min-h-80 sm:min-h-[400px] lg:min-h-[460px]">
          <div className="main-wrapper mx-auto py-12 sm:py-16 flex items-center justify-center xl:justify-start h-full">
            <div className="flex flex-col w-full max-w-lg sm:max-w-xl lg:max-w-[650px] gap-6 bg-white px-6 sm:px-12 lg:px-18 py-10 sm:py-16">
              <div className="h-7 sm:h-8 w-40 bg-gray-200 animate-pulse" />
              <div className="flex flex-col gap-3">
                <div className="h-9 sm:h-10 w-full bg-gray-200 animate-pulse" />
                <div className="h-9 sm:h-10 w-5/6 bg-gray-200 animate-pulse" />
                <div className="bg-gray-300 w-full h-0.5" />
                <div className="h-5 w-full bg-gray-200 animate-pulse" />
                <div className="h-5 w-full bg-gray-200 animate-pulse" />
                <div className="h-5 w-3/4 bg-gray-200 animate-pulse" />
              </div>
              <div className="h-11 w-full sm:w-48 bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
