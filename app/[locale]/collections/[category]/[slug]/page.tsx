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
import type { Metadata } from "next";

// Generate dynamic metadata for product detail pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; category: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const product = await fetchProductBySlug(slug);

    if (!product) {
      return {
        title: "Product Not Found - Al-Jabbar House of Carpets",
        description: "The product you are looking for could not be found.",
      };
    }

    // Get featured image (first image)
    const featuredImage = product.images?.[0]?.src || "/thumbnails.webp";

    // Extract plain text from description
    const stripHtml = (html: string) => {
      return html.replace(/<[^>]*>/g, "").trim();
    };

    const description =
      stripHtml(
        product.short_description || product.description || ""
      ).substring(0, 160) ||
      `Discover ${product.name} at Al-Jabbar House of Carpets. Premium quality carpets for your home.`;

    return {
      title: `${product.name} - Al-Jabbar House of Carpets`,
      description: description,
      openGraph: {
        title: `${product.name} - Al-Jabbar House of Carpets`,
        description: description,
        images: featuredImage,
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.name} - Al-Jabbar House of Carpets`,
        description: description,
        images: featuredImage,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Product - Al-Jabbar House of Carpets",
      description: "Premium quality carpets for your home.",
    };
  }
}

async function ProductDetailContent({
  slug,
  category,
}: {
  slug: string;
  category: string;
}) {
  try {
    const product = await fetchProductBySlug(slug);

    if (!product) {
      notFound();
    }

    // Validate product has required fields
    if (!product.id || !product.name || !product.slug) {
      console.error("Product missing required fields:", product);
      notFound();
    }

    const t = await getTranslations("collections");
    const allCategories = await fetchProductCategories();

    // Ensure product has default values for optional fields
    const safeProduct = {
      ...product,
      images: product.images || [],
      categories: product.categories || [],
      description: product.description || "",
      short_description: product.short_description || "",
    };

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
                    src={safeProduct.images?.[0]?.src || "/placeholder.jpg"}
                    alt={safeProduct.name || "Product image"}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {safeProduct.images && safeProduct.images.length > 1 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-3 lg:gap-4">
                    {safeProduct.images.slice(1, 5).map((image, index) => (
                      <div
                        key={image.id || index}
                        className="relative aspect-square overflow-hidden  bg-gray-100 cursor-pointer hover:opacity-75 transition-opacity"
                      >
                        <Image
                          src={image.src}
                          alt={`${safeProduct.name} - ${index + 2}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 25vw, 15vw"
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
                    {safeProduct.name}
                  </h1>

                  {safeProduct.categories &&
                    safeProduct.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {safeProduct.categories.map((cat) => (
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
                {safeProduct.short_description || safeProduct.description ? (
                  <div
                    className="prose prose-sm md:prose-base lg:prose-lg max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html:
                        (safeProduct.short_description?.trim()
                          ? safeProduct.short_description
                          : safeProduct.description) || "",
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
          {safeProduct.categories && safeProduct.categories.length > 0 && (
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
                categoryId={safeProduct.categories[0].id}
                categorySlug={category}
                currentProductId={safeProduct.id}
              />
            </Suspense>
          )}

          <Banner />
        </PageWrapper>
        {/* Fixed Contact Button for Mobile/Tablet */}
        <FixedContactButton />
      </>
    );
  } catch (error) {
    console.error("Error rendering product detail:", error);
    notFound();
  }
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
