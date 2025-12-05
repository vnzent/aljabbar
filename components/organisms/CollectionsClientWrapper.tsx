"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import ProductsGridSkeleton from "@/components/molecules/ProductsGridSkeleton";
import CategoryFilterClient from "@/components/organisms/CategoryFilterClient";
import SortByDropdown from "@/components/molecules/SortByDropdown";
import ShowProductsDropdown from "@/components/molecules/ShowProductsDropdown";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// Create context for filter state
const FilterContext = createContext<{
  handleFilterChange: () => void;
} | null>(null);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error(
      "useFilterContext must be used within CollectionsClientWrapper"
    );
  }
  return context;
};

interface CollectionsClientWrapperProps {
  categorySlugs: string[];
  categories: any[];
  children: React.ReactNode;
  mode?: "main" | "parent"; // main = /collections, parent = /collections/[category]
}

export default function CollectionsClientWrapper({
  categorySlugs,
  categories,
  children,
  mode = "main",
}: CollectionsClientWrapperProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isFiltering, setIsFiltering] = useState(false);

  // Watch for all params changes based on mode
  const currentCategories = searchParams.get("categories") || "";
  const currentSubcategories = searchParams.get("subcategories") || "";
  const currentPage = searchParams.get("page") || "1";
  const currentSearch = searchParams.get("search") || "";

  useEffect(() => {
    // Reset filtering state when new data arrives
    setIsFiltering(false);
  }, [
    currentCategories,
    currentSubcategories,
    currentPage,
    currentSearch,
    pathname,
  ]);

  const handleFilterChange = () => {
    // Immediately show skeleton when filter changes
    setIsFiltering(true);
  };

  // Get category names from slugs
  const getSelectedCategoryNames = () => {
    return categorySlugs.map((slug) => {
      const category = categories.find((cat) => cat.slug === slug);
      return category ? { slug, name: category.name } : { slug, name: slug };
    });
  };

  // Remove a single category
  const removeCategory = (slugToRemove: string) => {
    handleFilterChange();

    const newSlugs = categorySlugs.filter((slug) => slug !== slugToRemove);
    const params = new URLSearchParams(searchParams.toString());
    const paramName = mode === "parent" ? "subcategories" : "categories";

    params.delete("page");

    if (newSlugs.length === 0) {
      params.delete(paramName);
    } else {
      params.set(paramName, newSlugs.join(","));
    }

    const targetUrl = `${pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    router.push(targetUrl);
  };

  // Clear all categories
  const clearAllCategories = () => {
    handleFilterChange();

    const params = new URLSearchParams(searchParams.toString());
    const paramName = mode === "parent" ? "subcategories" : "categories";
    params.delete(paramName);
    params.delete("page");

    const targetUrl = `${pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    router.push(targetUrl);
  };

  // Check if there are categories to show in filter
  const hasCategories = categories.length > 0;
  const selectedCategories = getSelectedCategoryNames();

  return (
    <FilterContext.Provider value={{ handleFilterChange }}>
      {/* Sidebar Filter - only show if there are categories */}
      {hasCategories && (
        <aside className="hidden lg:block w-64 shrink-0">
          <CategoryFilterClient
            categories={categories}
            activeCategorySlugs={categorySlugs}
            onFilterChange={handleFilterChange}
            mode={mode}
          />
        </aside>
      )}

      {/* Products Grid - full width when no categories */}
      <div className={hasCategories ? "flex-1" : "w-full"}>
        {/* Header with Dropdowns */}
        <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-poppins font-bold text-3xl text-black">
              {categorySlugs.length > 0 ? `Filtered Products` : "All Products"}
            </h1>
            <p className="text-gray-600 mt-2">
              {categorySlugs.length > 0
                ? `Showing products from ${categorySlugs.length} selected ${
                    categorySlugs.length === 1 ? "category" : "categories"
                  }`
                : "Browse our complete collection"}
            </p>
          </div>

          {/* Dropdowns */}
          <div className="flex items-center gap-3">
            <ShowProductsDropdown />
            <SortByDropdown />
          </div>
        </div>

        {/* Selected Categories Tags */}
        {selectedCategories.length > 0 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">
                Active Filters ({selectedCategories.length})
              </span>
              <button
                onClick={clearAllCategories}
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors hover:cursor-pointer"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map(({ slug, name }) => (
                <span
                  key={slug}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm",
                    "bg-primary/10 text-primary border border-primary/20",
                    "transition-all duration-200 hover:bg-primary/20"
                  )}
                >
                  <span className="max-w-[150px] truncate">{name}</span>
                  <button
                    onClick={() => removeCategory(slug)}
                    className="p-0.5 rounded-full hover:bg-primary/20 transition-colors"
                    aria-label={`Remove ${name} filter`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Show skeleton immediately when filtering */}
        {isFiltering ? <ProductsGridSkeleton /> : children}
      </div>
    </FilterContext.Provider>
  );
}
