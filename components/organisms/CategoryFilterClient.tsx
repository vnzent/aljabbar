"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import CategoryFilter from "@/components/organisms/CategoryFilter";
import CategoryFilterSkeleton from "@/components/molecules/CategoryFilterSkeleton";

interface CategoryFilterClientProps {
  categories: any[];
  activeCategorySlugs: string[];
  onFilterChange: () => void;
  mode?: "main" | "parent";
}

export default function CategoryFilterClient({
  categories,
  activeCategorySlugs,
  onFilterChange,
  mode = "main",
}: CategoryFilterClientProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <CategoryFilterSkeleton />;
  }

  return (
    <CategoryFilter
      categories={categories}
      activeCategorySlugs={activeCategorySlugs}
      onFilterChange={onFilterChange}
      mode={mode}
    />
  );
}
