"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { BiLoaderAlt, BiSearch } from "react-icons/bi";
import { LuSparkles } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Button } from "../ui";
import { useTranslations } from "next-intl";

interface Product {
  id: number;
  name: string;
  slug: string;
  images: Array<{ src: string; name: string }>;
  categories: Array<{ id: number; name: string; slug: string }>;
  sku: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("search");

  // Fetch search results
  const searchProducts = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setResults(data.products || []);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchProducts(searchQuery);
    }, 700);

    return () => clearTimeout(timer);
  }, [searchQuery, searchProducts]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Reset search when modal closes
  // useEffect(() => {
  //   if (!isOpen) {
  //     setSearchQuery("");
  //     setResults([]);
  //   }
  // }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center pt-[10vh]">
      {/* Blur Background Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="relative w-full max-w-2xl mx-4 animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-300">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-xl opacity-75" />

        <div className="relative bg-white shadow-2xl overflow-hidden border border-gray-100">
          {/* Search Header */}
          <div className="relative">
            {/* Decorative gradient bar */}
            {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-primary/70 to-primary" /> */}

            <div className="flex items-center gap-4 p-5">
              <div className="relative">
                <BiSearch className="size-6 text-primary" />
              </div>
              <input
                type="text"
                placeholder={t("title")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-lg font-poppins placeholder:text-gray-500 bg-transparent"
                autoFocus
              />
              {isLoading && (
                <BiLoaderAlt className="size-5 animate-spin text-primary" />
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="p-2 transition-all duration-200 hover:rotate-90 hover:cursor-pointer"
              >
                <RxCross1 className="size-5 lg:size-6 text-primary" />
              </Button>
            </div>
          </div>

          {/* Keyboard shortcut hint */}
          {/* <div className="px-5 pb-3 flex items-center gap-2 text-xs text-gray-400">
            <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-500 font-mono">
              ESC
            </kbd>
            <span>to close</span>
          </div> */}

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent" />

          {/* Search Results */}
          <div className="max-h-[50vh] overflow-y-auto">
            {!searchQuery ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <LuSparkles className="size-9 text-primary/60" />
                </div>
                <h3 className="font-poppins font-semibold text-gray-800 mb-2">
                  {t("headLine")}
                </h3>
                <p className="text-gray-500 text-sm">{t("subHeadLine")}</p>
              </div>
            ) : isLoading ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <BiLoaderAlt className="size-7 lg:size-8 animate-spin text-primary" />
                </div>
                <p className="text-gray-500">{t("searching")}</p>
              </div>
            ) : results.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <BiSearch className="size-9 text-gray-300" />
                </div>
                <h3 className="font-poppins font-semibold text-gray-800 mb-2">
                  No results found
                </h3>
                <p className="text-gray-500 text-sm">
                  No products found for "{searchQuery}"
                </p>
              </div>
            ) : (
              <div className="p-3">
                {results.map((product, index) => (
                  <Link
                    key={product.id}
                    href={`/${locale}/collections/${
                      product.categories[0]?.slug || "all"
                    }/${product.slug}`}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-4 p-3 transition-all duration-200 group",
                      "hover:bg-linear-to-r hover:from-primary/5 hover:to-transparent",
                      "border border-transparent hover:border-primary/10"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Product Image */}
                    <div className="relative w-16 h-16 shrink-0 bg-gray-100 overflow-hidden group-hover:shadow-lg transition-shadow">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0].src}
                          alt={product.images[0].name || product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="64px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BiSearch className="w-6 h-6 text-gray-300" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-poppins font-medium text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {product.categories.length > 0 && (
                          <span className="inline-flex items-center py-0.5 text-base font-normal text-black/60">
                            {product.categories[0].name}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Arrow */}
                    <IoIosArrowRoundForward className="size-5 lg:size-6 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Footer with results count */}
          {results.length > 0 && (
            <div className="px-5 py-4 border-t border-gray-100 bg-linear-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <p className="text-sm lg:text-base font-normal text-gray-600">
                  {t("founded1")}{" "}
                  <span className="font-semibold text-primary">
                    {results.length}
                  </span>{" "}
                  {t("founded2")}
                  {locale === "en" && results.length !== 1 ? "s" : ""}
                </p>
                <Link
                  href={`/${locale}/collections?search=${encodeURIComponent(
                    searchQuery
                  )}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-sm lg:text-base font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  {t("Cta")}
                  <IoIosArrowRoundForward className="sizze-5 lg:size-6" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
