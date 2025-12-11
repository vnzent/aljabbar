"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import ProductsGridSkeleton from "@/components/molecules/ProductsGridSkeleton";
import CategoryFilterClient from "@/components/organisms/CategoryFilterClient";
import SortByDropdown from "@/components/molecules/SortByDropdown";
import ShowProductsDropdown from "@/components/molecules/ShowProductsDropdown";
import { X, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { useLocale, useTranslations } from "next-intl";

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
  const t = useTranslations("collections");
  const locale = useLocale();
  const [isFiltering, setIsFiltering] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [hiddenSlugs, setHiddenSlugs] = useState<string[]>([]);

  // Watch for all params changes based on mode
  const currentCategories = searchParams.get("categories") || "";
  const currentSubcategories = searchParams.get("subcategories") || "";
  const currentPage = searchParams.get("page") || "1";
  const currentSearch = searchParams.get("search") || "";

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileFilterOpen]);

  useEffect(() => {
    // Reset filtering state and hidden slugs when new data arrives
    setIsFiltering(false);
    setHiddenSlugs([]);
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
    // Immediately hide the tag
    setHiddenSlugs((prev) => [...prev, slugToRemove]);

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

    // Trigger filtering after navigation
    setTimeout(() => handleFilterChange(), 0);
  };

  // Clear all categories
  const clearAllCategories = () => {
    // Immediately hide all tags
    setHiddenSlugs(categorySlugs);

    const params = new URLSearchParams(searchParams.toString());
    const paramName = mode === "parent" ? "subcategories" : "categories";
    params.delete(paramName);
    params.delete("page");

    const targetUrl = `${pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    router.push(targetUrl);

    // Trigger filtering after navigation
    setTimeout(() => handleFilterChange(), 0);
  };

  // Check if there are categories to show in filter
  const hasCategories = categories.length > 0;
  const selectedCategories = getSelectedCategoryNames().filter(
    ({ slug }) => !hiddenSlugs.includes(slug)
  );

  return (
    <FilterContext.Provider value={{ handleFilterChange }}>
      {/* Mobile Filter Sidebar Overlay */}
      {hasCategories && (
        <>
          {/* Backdrop */}
          <div
            className={cn(
              "lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
              isMobileFilterOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            )}
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Sidebar */}
          <aside
            className={cn(
              "lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-white z-50 transition-transform duration-300 overflow-y-auto",
              isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="font-poppins font-semibold text-xl text-black">
                Filters
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-black"
              >
                <X className="size-6" />
              </Button>
            </div>
            <div className="p-4">
              <CategoryFilterClient
                categories={categories}
                activeCategorySlugs={categorySlugs}
                onFilterChange={() => {
                  handleFilterChange();
                  setIsMobileFilterOpen(false);
                }}
                mode={mode}
              />
            </div>
          </aside>
        </>
      )}

      {/* Desktop Sidebar Filter */}
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

      {/* Products Grid */}
      <div className={hasCategories ? "flex-1" : "w-full"}>
        {/* Title Section - Not Sticky */}
        <div className="grid z-10 bg-white grid-cols-1 md:grid-cols-2 relative md:sticky md:top-16">
          <div className="mb-6">
            <h1 className="font-poppins font-bold text-3xl text-black">
              {categorySlugs.length > 0
                ? t("filteredProducts")
                : t("allProducts")}
            </h1>
            <p className="text-gray-600 mt-2">
              {categorySlugs.length > 0
                ? `${t("showing")} ${categorySlugs.length} ${
                    locale === "en" ? "selected" : "kategori"
                  } ${
                    locale === "en"
                      ? categorySlugs.length === 1
                        ? "category"
                        : "categories"
                      : "terpilih"
                  }`
                : t("subTitle")}
            </p>
          </div>

          {/* Sticky Dropdowns Bar */}
          <div
            className={cn(
              "mb-6 hidden md:flex items-center justify-end gap-3 transition-all duration-300",
              isHeaderSticky && "sticky z-50 bg-white -mx-4 px-4 py-3"
            )}
          >
            <ShowProductsDropdown />
            <SortByDropdown />
          </div>
        </div>
        <div
          className={cn(
            "mb-6 flex md:hidden sticky top-14 z-10 items-center justify-end gap-3 transition-all duration-300 bg-white -mx-4 px-4 py-3"
          )}
        >
          <ShowProductsDropdown />
          <SortByDropdown />
        </div>

        {/* Selected Categories Tags */}
        {selectedCategories.length > 0 && (
          <div className="mb-6 p-4 bg-gray-50 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">
                {t("activeFilters")} ({selectedCategories.length})
              </span>
              <button
                onClick={clearAllCategories}
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {t("clear")}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map(({ slug, name }) => (
                <span
                  key={slug}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm",
                    "bg-primary/10 text-primary border border-primary/20",
                    "transition-all duration-200 hover:bg-primary/20"
                  )}
                >
                  <span className="max-w-[150px] truncate">{name}</span>
                  <button
                    onClick={() => removeCategory(slug)}
                    className="p-0.5 rounded-full hover:bg-primary/20 transition-colors cursor-pointer z-1 relative"
                    aria-label={`Remove ${name} filter`}
                  >
                    <X className="w-3.5 h-3.5 pointer-events-none" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Show skeleton immediately when filtering */}
        {isFiltering ? <ProductsGridSkeleton /> : children}
      </div>

      {/* Fixed Filter Button for Mobile/Tablet */}
      {hasCategories && (
        <Button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden fixed bottom-6 left-6 z-30 shadow-lg flex items-center gap-2 px-4 py-6"
        >
          <Filter className="size-5" />
          <span className="font-medium">Filters</span>
          {categorySlugs.length > 0 && (
            <span className="bg-white text-primary size-6 flex items-center justify-center text-xs font-bold">
              {categorySlugs.length}
            </span>
          )}
        </Button>
      )}
    </FilterContext.Provider>
  );
}
