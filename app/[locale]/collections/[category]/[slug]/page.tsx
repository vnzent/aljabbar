import {
  fetchProductBySlug,
  fetchProductCategories,
} from "@/lib/fetchProducts";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import DynamicBreadcrumb from "@/components/molecules/DynamicBreadcrumb";
import Banner from "@/components/templates/Banner";
import RelatedProducts from "@/components/organisms/RelatedProducts";
import ProductDetailSkeleton from "@/components/molecules/ProductDetailSkeleton";
import FixedContactButton from "@/components/molecules/FixedContactButton";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/organisms/PageWrapper";
import { getTranslations } from "next-intl/server";

async function ProductDetailContent({
  slug,
  category,
}: {
  slug: string;
  category: string;
}) {
  const product = await fetchProductBySlug(slug);
  const t = await getTranslations("collections");
  const allCategories = await fetchProductCategories();

  if (!product) {
    notFound();
  }

  // Determine parent categories (hand-made, machine-made, mosque)
  const parentCategorySlugs = [
    "hand-made-carpets",
    "machine-made-carpets",
    "mosque-carpets",
  ];

  // Helper to get category link
  const getCategoryLink = (catSlug: string) => {
    // Check if it's a parent category
    if (parentCategorySlugs.includes(catSlug)) {
      return `/collections/${catSlug}`;
    }
    // Otherwise use query param for child/regular categories
    return `/collections?categories=${catSlug}`;
  };

  return (
    <>
      <PageWrapper className="pt-20 sm:pt-25 md:pt-30 lg:pt-32">
        <div className="main-wrapper mx-auto ">
          <DynamicBreadcrumb
            textColor="text-black"
            separatorColor="text-black"
            textSize="text-sm md:text-base"
            separatorSize="size-2"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mt-4 md:mt-6">
            {/* Product Images */}
            <div className="space-y-3 md:space-y-4">
              <div className="relative aspect-square overflow-hidden  bg-gray-100">
                <Image
                  src={product.images[0]?.src || "/placeholder.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {product.images.length > 1 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-3 lg:gap-4">
                  {product.images.slice(1, 5).map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden  bg-gray-100 cursor-pointer hover:opacity-75 transition-opacity"
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

            {/* Product Information */}
            <div className="space-y-3 md:space-y-6 flex flex-col justify-center">
              {/* Title & Categories */}
              <div className="space-y-1 md:space-y-3">
                <h1 className="font-poppins font-semibold text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-black">
                  {product.name}
                </h1>

                {product.categories && product.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={getCategoryLink(cat.slug)}
                        className="text-base md:text-lg font-normal text-text hover:text-primary underline underline-offset-2 transition-colors duration-500 cursor-pointer"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className="h-px w-full bg-gray-200"></div>

              {/* Short Description: prefer short_description, fallback to description, else show '-' */}
              {product.short_description || product.description ? (
                <div
                  className="prose prose-sm md:prose-base lg:prose-lg max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html:
                      (product.short_description?.trim()
                        ? product.short_description
                        : product.description) || "",
                  }}
                />
              ) : (
                <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none text-gray-700">
                  -
                </div>
              )}

              {/* Contact Button */}
              <div className=" hidden md:block">
                <Button className="w-full sm:w-fit text-base md:text-lg">
                  {t("detailPage.Cta")}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {product.categories && product.categories.length > 0 && (
          <Suspense
            fallback={
              <div className="main-wrapper mx-auto py-16">
                <div className="h-10 w-64 bg-gray-200 rounded mb-8 animate-pulse" />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-4">
                      <div className="aspect-4/3 bg-gray-200 rounded animate-pulse" />
                      <div className="h-6 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 bg-gray-200 w-3/4 animate-pulse" />
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
      </PageWrapper>
      {/* Fixed Contact Button for Mobile/Tablet */}
      <FixedContactButton />
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
