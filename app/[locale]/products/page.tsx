import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchProducts } from "@/lib/fetchProducts";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import ProductsGridSkeleton from "./loading";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchParams = Promise<{
  page?: string;
  search?: string;
}>;

// Pisahkan component yang fetch data
async function ProductsGrid({
  locale,
  page,
  search,
}: {
  locale: string;
  page: string;
  search: string;
}) {
  const { products, pagination } = await fetchProducts({
    page: parseInt(page),
    perPage: 12,
    search,
  });

  const createPageUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    params.set("page", pageNum.toString());
    if (search) params.set("search", search);
    return `?${params.toString()}`;
  };

  const getVisiblePages = () => {
    const totalPages = pagination.totalPages;
    const currentPage = pagination.currentPage;
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

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-600">No products found</h2>
        <p className="text-gray-500 mt-2">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            href={`/${locale}/products/${product.slug}`}
            key={product.id}
            className="group"
          >
            <Card className="hover:shadow-xl transition-shadow h-full">
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden">
                  {product.images && product.images[0] ? (
                    <Image
                      src={product.images[0].src}
                      alt={product.images[0].name || product.name}
                      fill
                      className="object-cover aspect-square group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>

                  {product.categories && product.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {product.categories.slice(0, 2).map((category) => (
                        <span
                          key={category.id}
                          className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
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
        ))}
      </div>

      {pagination.totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {pagination.currentPage > 1 ? (
                  <PaginationPrevious
                    href={createPageUrl(pagination.currentPage - 1)}
                  />
                ) : (
                  <PaginationPrevious
                    href="#"
                    className="pointer-events-none opacity-50"
                  />
                )}
              </PaginationItem>
              {visiblePages.map((pageNum, index) =>
                typeof pageNum === "string" ? (
                  <PaginationItem key={`${pageNum}-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href={createPageUrl(pageNum)}
                      isActive={pageNum === pagination.currentPage}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                {pagination.currentPage < pagination.totalPages ? (
                  <PaginationNext
                    href={createPageUrl(pagination.currentPage + 1)}
                  />
                ) : (
                  <PaginationNext
                    href="#"
                    className="pointer-events-none opacity-50"
                  />
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
}

// Main Component
export default async function Products({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: SearchParams;
}) {
  const { locale } = await params;
  const { page = "1", search = "" } = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Bungkus dengan Suspense + key untuk force re-render */}
      <Suspense key={page + search} fallback={<ProductsGridSkeleton />}>
        <ProductsGrid locale={locale} page={page} search={search} />
      </Suspense>
    </div>
  );
}
