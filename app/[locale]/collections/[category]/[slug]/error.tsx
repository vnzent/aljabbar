"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/organisms/PageWrapper";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Product detail error:", error);
  }, [error]);

  return (
    <PageWrapper className="pt-20 sm:pt-25 md:pt-30 lg:pt-32">
      <div className="main-wrapper mx-auto min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-2">
            <h1 className="font-poppins font-bold text-3xl md:text-4xl text-black">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              We encountered an error while loading this product. Please try
              again.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => reset()} variant="default">
              Try Again
            </Button>
            <Button
              onClick={() => (window.location.href = "/collections")}
              variant="outline"
            >
              Back to Collections
            </Button>
          </div>

          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 p-4 bg-red-50 rounded-lg text-left">
              <p className="text-sm font-mono text-red-800 break-all">
                {error.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
