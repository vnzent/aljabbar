"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import ProductsGridSkeleton from "@/components/molecules/ProductsGridSkeleton";
import CategoryFilterClient from "@/components/organisms/CategoryFilterClient";
import SortByDropdown from "@/components/molecules/SortByDropdown";
import ShowProductsDropdown from "@/components/molecules/ShowProductsDropdown";

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

  return (
    <FilterContext.Provider value={{ handleFilterChange }}>
      {/* Sidebar Filter */}
      <aside className="hidden lg:block w-64 shrink-0">
        <CategoryFilterClient
          categories={categories}
          activeCategorySlugs={categorySlugs}
          onFilterChange={handleFilterChange}
          mode={mode}
        />
      </aside>

      {/* Products Grid */}
      <div className="flex-1">
        {/* Header with Dropdowns */}
        <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-poppins font-bold text-3xl text-black">
              {categorySlugs.length > 0 ? `Filtered Products` : "All Products"}
            </h1>
            <p className="text-gray-600 mt-2">
              {categorySlugs.length > 0
                ? `Showing ${categorySlugs.length} selected ${
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

        {/* Show skeleton immediately when filtering */}
        {isFiltering ? <ProductsGridSkeleton /> : children}
      </div>
    </FilterContext.Provider>
  );
}
