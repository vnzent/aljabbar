import { fetchProducts, fetchProductCategories } from "@/lib/fetchProducts";
import { Suspense } from "react";
import ProductsGridSkeleton from "@/components/molecules/ProductsGridSkeleton";
import ProductCard from "@/components/molecules/ProductCard";
import PaginationClient from "@/components/organisms/PaginationClient";
import CollectionsClientWrapper from "@/components/organisms/CollectionsClientWrapper";
import DynamicBreadcrumb from "@/components/molecules/DynamicBreadcrumb";
import Banner from "@/components/templates/Banner";
import type { Category } from "@/lib/types";
import { useTranslations } from "next-intl";

// Allow partial pre-rendering for instant navigation
export const dynamic = "auto";
export const revalidate = 3600;

type SearchParams = Promise<{
  page?: string;
  search?: string;
  categories?: string;
  orderby?: string;
  per_page?: string;
}>;

// Helper to get category IDs from slugs - NOW SYNCHRONOUS
function getCategoryIdsFromSlugs(
  slugs: string[],
  categories: Category[]
): string {
  if (slugs.length === 0) return "";

  const matchedIds = categories
    .filter((cat) => slugs.includes(cat.slug))
    .map((cat) => cat.id);

  return matchedIds.join(",");
}

// Pisahkan component yang fetch data
async function ProductsGrid({
  page,
  search,
  categoryIds,
  orderby,
  perPage,
}: {
  page: string;
  search: string;
  categoryIds: string;
  categorySlugs: string[];
  orderby: string;
  perPage: string;
}) {
  const t = useTranslations("collections")
  const { products, pagination } = await fetchProducts({
    page: parseInt(page),
    perPage: parseInt(perPage),
    search,
    categories: categoryIds,
    orderby,
  });

  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-600">{t("noFound")}</h2>
        <p className="text-gray-500 mt-2">
          {t("adjustFilters")}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant="4-col" />
        ))}
      </div>

      {pagination.totalPages > 1 && (
        <PaginationClient
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </>
  );
}

// Main Component
export default async function Collections({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const {
    page = "1",
    search = "",
    categories = "",
    orderby = "",
    per_page = "12",
  } = await searchParams;

  // FETCH CATEGORIES ONLY ONCE
  const allCategories = (await fetchProductCategories()) || [];

  // Parse category slugs from query param
  const categorySlugs = categories
    ? categories.split(",").map((slug) => slug.trim())
    : [];

  // Convert slugs to IDs - NOW SYNCHRONOUS, NO EXTRA FETCH
  const categoryIds = getCategoryIdsFromSlugs(categorySlugs, allCategories);

  return (
    <>
      <div className="pt-10 sm:pt-15 lg:pt-20 pb-5 sm:pb-10 lg:pb-20">
        <div className="main-wrapper mx-auto py-8">
          <div className="py-3">
            <DynamicBreadcrumb
              textColor="text-black"
              separatorColor="text-black"
              textSize="text-base"
              separatorSize="size-2"
            />
          </div>
          <div className="flex gap-8">
            <CollectionsClientWrapper
              categorySlugs={categorySlugs}
              categories={allCategories}
            >
              <Suspense
                key={page + search + categories + orderby + per_page}
                fallback={<ProductsGridSkeleton />}
              >
                <ProductsGrid
                  page={page}
                  search={search}
                  categoryIds={categoryIds}
                  categorySlugs={categorySlugs}
                  orderby={orderby}
                  perPage={per_page}
                />
              </Suspense>
            </CollectionsClientWrapper>
          </div>
        </div>
      </div>
      <Banner />
    </>
  );
}
