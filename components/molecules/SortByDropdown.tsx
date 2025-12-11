"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Dropdown from "./Dropdown";

interface SortOption {
  value: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { value: "title-asc", label: "Sort by A - Z" },
  { value: "title-desc", label: "Sort by Z - A" },
  { value: "latest", label: "Sort by Latest" },
  { value: "oldest", label: "Sort by Oldest" },
];

export default function SortByDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [selectedSort, setSelectedSort] = useState("title-asc");

  useEffect(() => {
    const sortParam = searchParams.get("orderby") || "title-asc";
    setSelectedSort(sortParam);
  }, [searchParams]);

  // Dropdown handles outside clicks itself

  const handleSortChange = (value: string | number) => {
    const str = String(value);
    const params = new URLSearchParams(searchParams.toString());

    params.set("orderby", str);

    // Reset to page 1 when sorting changes
    params.delete("page");

    const url = `${pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    router.push(url);
    setSelectedSort(str);
  };

  return (
    <Dropdown
      options={sortOptions}
      selectedValue={selectedSort}
      onSelect={handleSortChange}
      align="right"
    />
  );
}
