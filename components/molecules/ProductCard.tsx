"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  variant?: "3-col" | "4-col"; // 3-col for homepage, 4-col for collection pages
}

export default function ProductCard({
  product,
  variant = "3-col",
}: ProductCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const slug = product.categories?.[0]?.slug || "uncategorized";

  // Ensure product has required data
  if (!product || !product.slug) {
    return null;
  }

  const handleCategoryClick = (
    e: React.MouseEvent,
    clickedCategorySlug: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // Get current selected categories from search params
    const currentCategoriesParam = searchParams.get("categories") || "";
    const currentCategories = currentCategoriesParam
      ? currentCategoriesParam.split(",").map((s) => s.trim())
      : [];

    // Add clicked category if not already in selection
    let newCategories: string[];
    if (currentCategories.includes(clickedCategorySlug)) {
      // Category already selected, just navigate there (no change)
      newCategories = currentCategories;
    } else {
      // Add to selection
      newCategories = [...currentCategories, clickedCategorySlug];
    }

    // Build URL with query params
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page"); // Reset to page 1

    if (newCategories.length > 0) {
      params.set("categories", newCategories.join(","));
    } else {
      params.delete("categories");
    }

    const targetUrl = `/collections${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    startTransition(() => {
      router.push(targetUrl);
    });
  };

  return (
    <Link href={`/collections/${slug}/${product.slug}`}>
      <Card className="group overflow-hidden border-0 transition-all duration-300 cursor-pointer">
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
            <Image
              src={product.images[0]?.src || "/placeholder.jpg"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Content Container */}
          <div className="py-3 space-y-0.5 md:space-y-0">
            <h3
              className={cn(
                "font-poppins font-normal text-black line-clamp-1",
                variant === "3-col"
                  ? "text-xs md:text-base lg:text-lg"
                  : "text-xs md:text-sm "
              )}
            >
              {product.name}
            </h3>

            {product.categories && product.categories.length > 0 && (
              <div className="flex flex-wrap gap-1 md:gap-2">
                {product.categories.slice(0, 2).map((category) => (
                  <span
                    key={category.id}
                    onClick={(e) => handleCategoryClick(e, category.slug)}
                    className={cn(
                      "inline-block  text-gray-700 hover:text-primary underline underline-offset-2 transition-all duration-300 cursor-pointer",
                      variant === "3-col"
                        ? "text-[11px] md:text-sm lg:text-sm leading-tight md:leading-loose"
                        : "text-[11px] md:text-xs leading-tight"
                    )}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
