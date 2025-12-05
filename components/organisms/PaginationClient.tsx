"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useFilterContext } from "@/components/organisms/CollectionsClientWrapper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationClientProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationClient({
  currentPage,
  totalPages,
}: PaginationClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { handleFilterChange } = useFilterContext();

  const handlePageChange = (pageNum: number) => {
    // Trigger skeleton immediately
    handleFilterChange();

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNum.toString());
    const url = `/collections?${params.toString()}`;

    startTransition(() => {
      router.push(url);
    });
  };

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis-start");
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis-end");
    }

    pages.push(totalPages);

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="mt-12 flex justify-center">
      <Pagination>
        <PaginationContent className="gap-2">
          {/* Previous Button */}
          <PaginationItem>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className={cn(
                "group flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200",
                "border border-gray-200 hover:border-primary/50",
                "hover:bg-linear-to-r hover:from-primary/5 hover:to-primary/10",
                currentPage <= 1 &&
                  "opacity-50 cursor-not-allowed hover:border-gray-200 hover:bg-transparent"
              )}
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span className="hidden sm:inline">Previous</span>
            </button>
          </PaginationItem>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {visiblePages.map((pageNum, index) =>
              typeof pageNum === "string" ? (
                <PaginationItem key={`${pageNum}-${index}`}>
                  <PaginationEllipsis className="text-gray-400" />
                </PaginationItem>
              ) : (
                <PaginationItem key={pageNum}>
                  <button
                    onClick={() => handlePageChange(pageNum)}
                    className={cn(
                      "min-w-10 h-10 rounded-lg font-medium transition-all duration-200",
                      "hover:bg-linear-to-r hover:from-primary/10 hover:to-primary/20",
                      "hover:scale-105 active:scale-95",
                      pageNum === currentPage
                        ? "bg-linear-to-br from-primary to-primary/80 text-white shadow-lg shadow-primary/30 scale-105"
                        : "border border-gray-200 hover:border-primary/50 text-gray-700"
                    )}
                  >
                    {pageNum}
                  </button>
                </PaginationItem>
              )
            )}
          </div>

          {/* Next Button */}
          <PaginationItem>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className={cn(
                "group flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200",
                "border border-gray-200 hover:border-primary/50",
                "hover:bg-linear-to-r hover:from-primary/5 hover:to-primary/10",
                currentPage >= totalPages &&
                  "opacity-50 cursor-not-allowed hover:border-gray-200 hover:bg-transparent"
              )}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
