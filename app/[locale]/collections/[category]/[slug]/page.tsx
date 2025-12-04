import { fetchProductBySlug } from "@/lib/fetchProducts";
import Image from "next/image";
import { notFound } from "next/navigation";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import Banner from "@/components/Banner";
import RelatedProducts from "@/components/RelatedProducts";
import { Suspense } from "react";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";
import { Button } from "@/components/ui/button";

async function ProductDetailContent({
  slug,
  category,
}: {
  slug: string;
  category: string;
}) {
  const product = await fetchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <div className="pt-32 pb-10">
        <div className="container mx-auto px-4">
          <DynamicBreadcrumb />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.images[0]?.src || "/placeholder.jpg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1, 5).map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer hover:opacity-75 transition-opacity"
                  >
                    <Image
                      src={image.src}
                      alt={`${product.name} - ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6 flex flex-col justify-center">
            <div>
              <h1 className="font-poppins font-semibold text-4xl text-black mb-4">
                {product.name}
              </h1>
              {product.categories && product.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.categories.map((category) => (
                    <span
                      key={category.id}
                      className="inline-block px-4 py-2 text-sm font-medium text-primary/80 bg-primary/10 rounded-full"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {product.short_description && (
              <div
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}

            {product.description && (
              <div className="border-t pt-6">
                <h2 className="font-poppins font-semibold text-2xl text-black mb-4">
                  Description
                </h2>
                <div
                  className="prose max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}

            <div className="border-t pt-6">
              <Button className="w-fit text-lg">
                Contact Us for This Product
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {product.categories && product.categories.length > 0 && (
        <Suspense
          fallback={
            <div className="container mx-auto px-4 py-16">
              <div className="h-10 w-64 bg-gray-200 rounded mb-8 animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <div className="aspect-4/3 bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          }
        >
          <RelatedProducts
            categoryId={product.categories[0].id}
            categorySlug={category}
            currentProductId={product.id}
          />
        </Suspense>
      )}

      <Banner />
    </>
  );
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string; category: string }>;
}) {
  const { slug, category } = await params;

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetailContent slug={slug} category={category} />
    </Suspense>
  );
}
