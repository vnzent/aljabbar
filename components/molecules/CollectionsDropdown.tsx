"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { set } from "date-fns";

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
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Main Collections Link with Dropdown Toggle */}
      <div className="flex items-center gap-1 group">
        <Link
          href="/collections"
          className={cn(
            "uppercase font-poppins text-lg font-normal transition-colors duration-300 group-hover:text-primary",
            shouldBeWhite ? "text-black" : "text-white"
          )}
        >
          Collections
        </Link>
        <button
          className={cn(
            "p-1 rounded-md transition-all duration-300 group-hover:text-primary",
            shouldBeWhite
              ? "text-black group-hover:bg-gray-100"
              : "text-white group-hover:bg-white/10",
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
            "absolute top-full left-0 mt-2 w-72 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200",
            "bg-white border border-gray-100"
          )}
        >
          <div className="">
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
        </div>
      )}
    </div>
  );
}
