"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Product {
  id: number;
  name: string;
  slug: string;
  images: Array<{ src: string; name: string }>;
  categories: Array<{ id: number; name: string }>;
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
    }, 300);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      {/* Blur Background Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="relative w-full max-w-3xl mx-4 animate-in fade-in slide-in-from-top-4 duration-300">
        <Card className="shadow-2xl">
          <CardContent className="p-0">
            {/* Search Input */}
            <div className="flex items-center gap-3 p-4 border-b">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-lg"
                autoFocus
              />
              {isLoading && (
                <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
              )}
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 cursor-pointer" />
              </button>
            </div>

            {/* Search Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {!searchQuery ? (
                <div className="p-8 text-center text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Start typing to search products...</p>
                </div>
              ) : isLoading ? (
                <div className="p-8 text-center">
                  <Loader2 className="w-8 h-8 mx-auto animate-spin text-blue-500" />
                </div>
              ) : results.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>No products found for "{searchQuery}"</p>
                </div>
              ) : (
                <div className="p-4 space-y-2">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/${locale}/products/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      {/* Product Image */}
                      <div className="relative w-16 h-16 shrink-0 bg-gray-100 rounded overflow-hidden">
                        {product.images[0] ? (
                          <Image
                            src={product.images[0].src}
                            alt={product.images[0].name || product.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Search className="w-6 h-6 text-gray-300" />
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          {product.categories.length > 0 && (
                            <span className="text-xs text-gray-500">
                              {product.categories[0].name}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with results count */}
            {results.length > 0 && (
              <div className="px-4 py-3 border-t bg-gray-50 text-sm text-gray-600">
                Found {results.length} product{results.length !== 1 ? "s" : ""}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
