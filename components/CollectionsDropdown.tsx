"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollectionsDropdownProps {
  shouldBeWhite: boolean;
}

const collectionCategories = [
  {
    name: "Hand-made Carpets",
    slug: "hand-made-carpets",
    description: "Authentic handwoven masterpieces",
  },
  {
    name: "Machine-made Carpets",
    slug: "machine-made-carpets",
    description: "Modern precision and style",
  },
  {
    name: "Mosque Carpets",
    slug: "mosque-carpets",
    description: "Sacred spaces, elegant designs",
  },
];

export default function CollectionsDropdown({
  shouldBeWhite,
}: CollectionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Main Collections Link with Dropdown Toggle */}
      <div className="flex items-center gap-1">
        <Link
          href="/collections"
          className={cn(
            "uppercase font-poppins text-lg font-normal transition-colors duration-300",
            shouldBeWhite
              ? "text-black hover:text-primary"
              : "text-white hover:text-black"
          )}
        >
          Collections
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "p-1 rounded-md transition-all duration-300",
            shouldBeWhite
              ? "text-black hover:text-primary hover:bg-gray-100"
              : "text-white hover:text-black hover:bg-white/10",
            isOpen && "rotate-180"
          )}
          aria-label="Toggle collections menu"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            "absolute top-full left-0 mt-2 w-72 rounded-lg shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200",
            "bg-white border border-gray-100"
          )}
        >
          <div className="py-2">
            {collectionCategories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/collections/${category.slug}`}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-4 py-3 transition-all duration-200",
                  "hover:bg-linear-to-r hover:from-primary/5 hover:to-primary/10",
                  "border-l-4 border-transparent hover:border-primary",
                  index !== collectionCategories.length - 1 &&
                    "border-b border-gray-100"
                )}
              >
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {category.name}
                  </span>
                  <span className="text-xs text-gray-500 mt-0.5">
                    {category.description}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Footer */}
          <div className="border-t border-gray-200 bg-gray-50">
            <Link
              href="/collections"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-center text-sm font-semibold text-primary hover:text-primary/80 hover:bg-gray-100 transition-colors"
            >
              View All Collections →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
