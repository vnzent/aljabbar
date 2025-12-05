"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("title-asc");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sortParam = searchParams.get("orderby") || "title-asc";
    setSelectedSort(sortParam);
  }, [searchParams]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("orderby", value);

    // Reset to page 1 when sorting changes
    params.delete("page");

    const url = `${pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    router.push(url);
    setIsOpen(false);
  };

  const selectedLabel =
    sortOptions.find((opt) => opt.value === selectedSort)?.label ||
    "Sort by A - Z";

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between gap-3 px-4 py-2.5 min-w-[200px]",
          "border border-gray-300 bg-white",
          "hover:border-primary/50 hover:cursor-pointer transition-colors duration-200",
          "text-sm font-medium text-gray-700"
        )}
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg overflow-hidden z-50">
          <div className="">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={cn(
                  "w-full px-4 py-3 text-left text-sm transition-colors duration-150 cursor-pointer active:bg-primary/20",
                  "flex items-center justify-between gap-2",
                  selectedSort === option.value
                    ? "bg-primary/30 text-primary font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <span>{option.label}</span>
                {selectedSort === option.value && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
