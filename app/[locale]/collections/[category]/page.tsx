import { fetchProducts, fetchProductCategories } from "@/lib/fetchProducts";
import { Suspense } from "react";
import ProductsGridSkeleton from "@/components/molecules/ProductsGridSkeleton";
import ProductCard from "@/components/molecules/ProductCard";
import PaginationClient from "@/components/organisms/PaginationClient";
import CollectionsClientWrapper from "@/components/organisms/CollectionsClientWrapper";
import Banner from "@/components/templates/Banner";
import type { Category } from "@/lib/types";
import ProductWrapper from "@/components/organisms/ProductWrapper";
import { getTranslations } from "next-intl/server";

// Allow dynamic rendering for search params but cache category data
export const dynamic = "auto";
export const dynamicParams = true;
export const revalidate = 3600; // Revalidate every hour

// Generate static params for the 3 parent categories
export async function generateStaticParams() {
  return [
    { category: "hand-made-carpets" },
    { category: "machine-made-carpets" },
    { category: "mosque-carpets" },
  ];
}

type SearchParams = Promise<{
  page?: string;
  search?: string;
  subcategories?: string;
  orderby?: string;
  per_page?: string;
}>;

// Helper to get category IDs - synchronous
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

// Get parent category and its children
async function getParentAndChildren(parentSlug: string): Promise<{
  parent: Category | null;
  children: Category[];
  allDescendantIds: number[];
}> {
  const allCategories = (await fetchProductCategories()) || [];

  // Find parent category
  const parent = allCategories.find((cat) => cat.slug === parentSlug) || null;

  if (!parent) {
    return { parent: null, children: [], allDescendantIds: [] };
  }

  // Get direct children
  const children = allCategories.filter((cat) => cat.parent === parent.id);

  // Get all descendant IDs (parent + all children)
  const allDescendantIds = [parent.id, ...children.map((c) => c.id)];

  return { parent, children, allDescendantIds };
}

// Products Grid Component
async function ProductsGrid({
  page,
  search,
  categoryIds,
  categorySlugs,
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
  const t = await getTranslations("collections");
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
        <p className="text-gray-500 mt-2">{t("adjustFilters")}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
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
export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: SearchParams;
}) {
  const t = await getTranslations("collections");
  const { category: parentCategorySlug } = await params;
  const {
    page = "1",
    search = "",
    subcategories = "",
    orderby = "",
    per_page = "12",
  } = await searchParams;

  // Get parent category and its children
  const { parent, children, allDescendantIds } = await getParentAndChildren(
    parentCategorySlug
  );

  // If parent not found, redirect or show error
  if (!parent) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {t("categoryPage.noFound")}
        </h1>
        <p className="text-gray-600 mt-2">
          {t("categoryPage.descriptionNoFound")}
        </p>
      </div>
    );
  }

  // Parse selected subcategory slugs from query param
  const selectedSubcategorySlugs = subcategories
    ? subcategories.split(",").map((slug) => slug.trim())
    : [];

  // Determine which category IDs to use for filtering
  let categoryIdsToFilter: string;

  if (selectedSubcategorySlugs.length > 0) {
    // Filter by selected subcategories only
    categoryIdsToFilter = getCategoryIdsFromSlugs(
      selectedSubcategorySlugs,
      children
    );
  } else {
    // Show all products from parent and all its children
    categoryIdsToFilter = allDescendantIds.join(",");
  }

  return (
    <>
      <ProductWrapper>
        <CollectionsClientWrapper
          categorySlugs={selectedSubcategorySlugs}
          categories={children}
          mode="parent"
        >
          <Suspense
            key={`${page}-${subcategories}-${orderby}-${per_page}`}
            fallback={<ProductsGridSkeleton />}
          >
            <ProductsGrid
              page={page}
              search={search}
              categoryIds={categoryIdsToFilter}
              categorySlugs={selectedSubcategorySlugs}
              orderby={orderby}
              perPage={per_page}
            />
          </Suspense>
        </CollectionsClientWrapper>
      </ProductWrapper>
      <Suspense fallback={null}>
        <Banner />
      </Suspense>
    </>
  );
}
