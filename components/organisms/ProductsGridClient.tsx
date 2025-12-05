"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import ProductsGridSkeleton from "@/components/molecules/ProductsGridSkeleton";

interface ProductsGridClientProps {
  children: React.ReactNode;
}

export default function ProductsGridClient({
  children,
}: ProductsGridClientProps) {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [shouldShowContent, setShouldShowContent] = useState(true);
  const prevParamsRef = useRef("");

  const categories = searchParams.get("categories") || "";
  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";
  const currentParams = `${categories}-${page}-${search}`;

  // Detect param changes immediately
  useEffect(() => {
    if (
      prevParamsRef.current !== "" &&
      prevParamsRef.current !== currentParams
    ) {
      // Params changed - show skeleton immediately
      setIsLoading(true);
      setShouldShowContent(false);

      // Reset after a short delay to allow server component to catch up
      const timer = setTimeout(() => {
        setIsLoading(false);
        setShouldShowContent(true);
      }, 300);

      return () => clearTimeout(timer);
    }

    prevParamsRef.current = currentParams;
  }, [currentParams]);

  if (isLoading || !shouldShowContent) {
    return <ProductsGridSkeleton />;
  }

  return <>{children}</>;
}
