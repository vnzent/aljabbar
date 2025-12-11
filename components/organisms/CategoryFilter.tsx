"use client";

import { Category } from "@/lib/types";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect, useMemo, useTransition } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface CategoryFilterProps {
  categories: Category[];
  activeCategorySlugs?: string[];
  onFilterChange?: () => void;
  mode?: "main" | "parent"; // main = /collections, parent = /collections/[category]
}

interface CategoryNode extends Category {
  children: CategoryNode[];
}

export default function CategoryFilter({
  categories,
  activeCategorySlugs = [],
  onFilterChange,
  mode = "main",
}: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const t = useTranslations("collections")
  const [isPending, startTransition] = useTransition();
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(activeCategorySlugs);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  // Build hierarchical structure
  const categoryTree = useMemo(() => {
    const categoryMap = new Map<number, CategoryNode>();
    const rootCategories: CategoryNode[] = [];

    // First pass: create nodes
    categories.forEach((cat) => {
      categoryMap.set(cat.id, { ...cat, children: [] });
    });

    // Second pass: build tree
    categories.forEach((cat) => {
      const node = categoryMap.get(cat.id)!;
      if (cat.parent && cat.parent !== 0) {
        const parentNode = categoryMap.get(cat.parent);
        if (parentNode) {
          parentNode.children.push(node);
        } else {
          rootCategories.push(node);
        }
      } else {
        rootCategories.push(node);
      }
    });

    return rootCategories;
  }, [categories]);

  // Sync state with props whenever they change
  useEffect(() => {
    setSelectedCategories(activeCategorySlugs);

    // Auto-expand all parent categories of selected items (recursive)
    const getAllParents = (categoryId: number): number[] => {
      const category = categories.find((cat) => cat.id === categoryId);
      if (!category || !category.parent || category.parent === 0) {
        return [];
      }
      // Recursively get all parents up the chain
      return [category.parent, ...getAllParents(category.parent)];
    };

    const selectedCategoryIds = categories
      .filter((cat) => activeCategorySlugs.includes(cat.slug))
      .map((cat) => cat.id);

    const allParentsToExpand: number[] = [];
    selectedCategoryIds.forEach((id) => {
      const parents = getAllParents(id);
      allParentsToExpand.push(...parents);
    });

    // Remove duplicates and set expanded categories
    setExpandedCategories((prev) => {
      const newExpanded = [...new Set([...prev, ...allParentsToExpand])];
      return newExpanded;
    });
  }, [activeCategorySlugs.join(","), categories]);

  const toggleExpand = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleCategoryToggle = (categorySlug: string) => {
    let newSelected: string[];

    if (selectedCategories.includes(categorySlug)) {
      newSelected = selectedCategories.filter((slug) => slug !== categorySlug);
    } else {
      newSelected = [...selectedCategories, categorySlug];
    }

    // Trigger callback immediately to show skeleton
    if (onFilterChange) {
      onFilterChange();
    }

    // Update local state immediately for optimistic UI
    setSelectedCategories(newSelected);

    // Build URL with query params
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page"); // Reset to page 1 when filter changes

    // Use different param name based on mode
    const paramName = mode === "parent" ? "subcategories" : "categories";

    if (newSelected.length === 0) {
      params.delete(paramName);
    } else {
      params.set(paramName, newSelected.join(","));
    }

    // Build target URL - preserve current pathname
    const targetUrl = `${pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    // Use startTransition to trigger Suspense immediately
    startTransition(() => {
      router.push(targetUrl);
    });
  };

  const clearFilters = () => {
    // Trigger callback immediately
    if (onFilterChange) {
      onFilterChange();
    }

    setSelectedCategories([]);

    const params = new URLSearchParams(searchParams.toString());
    const paramName = mode === "parent" ? "subcategories" : "categories";
    params.delete(paramName);
    params.delete("page");

    const targetUrl = `${pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    startTransition(() => {
      router.push(targetUrl);
    });
  };

  const renderCategory = (category: CategoryNode, level: number = 0) => {
    const hasChildren = category.children.length > 0;
    const isExpanded = expandedCategories.includes(category.id);
    const isSelected = selectedCategories.includes(category.slug);

    return (
      <div key={category.id} className="space-y-1">
        <div
          className="flex items-center  group"
          style={{ paddingLeft: `${level * 16}px` }}
        >
          {/* Expand/Collapse Button */}
          {hasChildren ? (
            <button
              onClick={() => toggleExpand(category.id)}
              className="shrink-0 p-0.5 hover:cursor-pointer"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-800" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-800" />
              )}
            </button>
          ) : (
            <div className="w-5" />
          )}

          {/* Checkbox and Label */}
          <label className="flex items-center gap-2 cursor-pointer flex-1 py-1">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleCategoryToggle(category.slug)}
              className="appearance-none w-4 h-4 border border-gray-800 cursor-pointer shrink-0 checked:bg-primary checked:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 relative"
            />
            <span
              className={`text-sm transition-colors ${
                isSelected
                  ? "text-primary font-medium"
                  : "text-gray-700 group-hover:text-primary"
              }`}
            >
              {category.name}
              {category.count !== undefined && category.count > 0 && (
                <span className="text-xs text-gray-400 ml-1">
                  ({category.count})
                </span>
              )}
            </span>
          </label>
        </div>

        {/* Render Children */}
        {hasChildren && isExpanded && (
          <div className="space-y-1">
            {category.children.map((child) => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white sticky top-20">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-poppins font-semibold text-lg text-black">
          {t("category")}
        </h3>
        {selectedCategories.length > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:underline hover:cursor-pointer"
          >
            {t("clear")}
          </button>
        )}
      </div>

      <div className="space-y-1 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
        {categoryTree.map((category) => renderCategory(category))}
      </div>
    </div>
  );
}
