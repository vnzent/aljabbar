import { fetchProducts, fetchProductCategories } from "@/lib/fetchProducts";
import { Suspense } from "react";
import ProductsGridSkeleton from "@/components/ProductsGridSkeleton";
import ProductCard from "@/components/ProductCard";
import PaginationClient from "@/components/PaginationClient";
import CollectionsClientWrapper from "@/components/CollectionsClientWrapper";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import Banner from "@/components/Banner";
import type { Category } from "@/lib/types";

// Allow partial pre-rendering for instant navigation
export const dynamic = "auto";
export const revalidate = 3600;

type SearchParams = Promise<{
  page?: string;
  search?: string;
  categories?: string;
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

  console.log("getCategoryIdsFromSlugs - input slugs:", slugs);
  console.log("getCategoryIdsFromSlugs - matched IDs:", matchedIds);

  return matchedIds.join(",");
}

// Pisahkan component yang fetch data
async function ProductsGrid({
  page,
  search,
  categoryIds,
  categorySlugs,
}: {
  page: string;
  search: string;
  categoryIds: string;
  categorySlugs: string[];
}) {
  const { products, pagination } = await fetchProducts({
    page: parseInt(page),
    perPage: 12,
    search,
    categories: categoryIds,
  });

  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-600">No products found</h2>
        <p className="text-gray-500 mt-2">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
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
  const { page = "1", search = "", categories = "" } = await searchParams;

  // FETCH CATEGORIES ONLY ONCE
  const allCategories = (await fetchProductCategories()) || [];

  // Parse category slugs from query param
  const categorySlugs = categories
    ? categories.split(",").map((slug) => slug.trim())
    : [];

  // Convert slugs to IDs - NOW SYNCHRONOUS, NO EXTRA FETCH
  const categoryIds = getCategoryIdsFromSlugs(categorySlugs, allCategories);

  console.log("Collections Page - categorySlugs:", categorySlugs);
  console.log("Collections Page - categoryIds:", categoryIds);

  return (
    <>
      <div className="pt-32 pb-10">
        <div className="container mx-auto px-4">
          <DynamicBreadcrumb />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <CollectionsClientWrapper
            categorySlugs={categorySlugs}
            categories={allCategories}
          >
            <Suspense
              key={page + search + categories}
              fallback={<ProductsGridSkeleton />}
            >
              <ProductsGrid
                page={page}
                search={search}
                categoryIds={categoryIds}
                categorySlugs={categorySlugs}
              />
            </Suspense>
          </CollectionsClientWrapper>
        </div>
      </div>

      <Banner />
    </>
  );
}
