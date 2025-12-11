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
  isScrolled: boolean;
}

export default function CollectionsDropdown({
  shouldBeWhite,
  isScrolled,
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
            "uppercase font-poppins text-sm  font-normal transition-colors duration-300 group-hover:text-primary",
            shouldBeWhite && isCollectionsActive
              ? "text-primary group-hover:text-black"
              : !isScrolled && !isCollectionsActive
              ? "text-gray-200 group-hover:text-white"
              : shouldBeWhite && !isCollectionsActive
              ? "text-black"
              : isCollectionsActive
              ? "text-primary"
              : ""
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
            shouldBeWhite && isCollectionsActive
              ? "text-primary group-hover:text-black"
              : !isScrolled && !isCollectionsActive
              ? "text-gray-300 group-hover:text-white"
              : shouldBeWhite && !isCollectionsActive
              ? "text-black"
              : isCollectionsActive
              ? "text-primary"
              : "",
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
            "absolute top-full left-0 mt-2 w-72 shadow z-50 animate-in fade-in slide-in-from-top-2 duration-200",
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
                  "block px-3 py-4 transition-all duration-200",
                  "hover:bg-linear-to-r hover:from-primary/5 hover:to-primary/10"
                )}
              >
                <div className="flex">
                  <span className="text-sm font-poppins font-base text-text group-hover:text-primary uppercase transition-colors">
                    {category.name}
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
