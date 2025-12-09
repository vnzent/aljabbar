"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { collectionCategories } from "@/lib/data";
import { Button } from "../ui";

interface CollectionsDropdownProps {
  shouldBeWhite: boolean;
}

export default function CollectionsDropdown({
  shouldBeWhite,
}: CollectionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Check if we're on collections page
  const isCollectionsActive = pathname?.includes("/collections");

  useEffect(() => {
    return () => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
      timeOutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeOutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Collections Link with Dropdown Toggle */}
      <div className="flex items-center gap-1 group">
        <Link
          href="/collections"
          className={cn(
            "uppercase font-poppins text-sm lg:text-base font-normal transition-colors duration-300 group-hover:text-primary",
            isCollectionsActive
              ? "text-primary"
              : shouldBeWhite
              ? "text-black"
              : "text-white"
          )}
        >
          Collections
        </Link>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "pl-1 transition-all duration-300 group-hover:text-primary cursor-pointer",
            isCollectionsActive
              ? "text-primary"
              : shouldBeWhite
              ? "text-black"
              : "text-white",
            isOpen && "rotate-180"
          )}
          aria-label="Toggle collections menu"
        >
          <FiChevronDown className="size-4" />
        </Button>
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
                  "border-l-4 border-transparent hover:border-primary"
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
