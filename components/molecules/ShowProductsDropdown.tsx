"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const perPageOptions = [
  { value: 12, label: "Show 12 Products" },
  { value: 24, label: "Show 24 Products" },
  { value: 36, label: "Show 36 Products" },
  { value: 48, label: "Show 48 Products" },
];

export default function ShowProductsDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPerPage, setSelectedPerPage] = useState(12);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const perPageParam = searchParams.get("per_page");
    setSelectedPerPage(perPageParam ? parseInt(perPageParam) : 12);
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

  const handlePerPageChange = (value: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === 12) {
      params.delete("per_page");
    } else {
      params.set("per_page", value.toString());
    }

    // Reset to page 1 when per_page changes
    params.delete("page");

    const url = `${pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    router.push(url);
    setIsOpen(false);
  };

  const selectedLabel =
    perPageOptions.find((opt) => opt.value === selectedPerPage)?.label ||
    "Show 12 Products";

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
        <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 shadow-lg overflow-hidden z-9999">
          <div className="">
            {perPageOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handlePerPageChange(option.value)}
                className={cn(
                  "w-full px-5 py-3 text-left text-xs lg:text-sm transition-colors duration-150 cursor-pointer flex items-center justify-between gap-2",
                  selectedPerPage === option.value
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-gray-700 hover:bg-primary/5"
                )}
              >
                {option.label}
                {selectedPerPage === option.value && (
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
