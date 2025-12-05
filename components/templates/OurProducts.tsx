import Link from "next/link";
import ProductsList from "@/components/organisms/ProductsList";
import { Suspense } from "react";
import OurProductsSkeleton from "@/components/molecules/OurProductsSkeleton";

export default async function OurProducts() {
  return (
    <section className="min-h-screen w-full mx-auto main-wrapper">
      <div className="flex flex-col gap-18">
        <div className="flex justify-between items-center">
          <h2 className="font-poppins font-medium text-5xl capitalize">
            Our Products
          </h2>
          <Link
            href="/collections"
            className="group uppercase font-inter text-lg font-normal text-black relative"
          >
            <span className="transition-colors duration-500 group-hover:text-primary">
              View All
            </span>
            <span className="absolute left-0 bottom-0 w-0 h-px bg-primary transition-all duration-500 group-hover:w-full" />
          </Link>
        </div>
        <Suspense fallback={<OurProductsSkeleton />}>
          <ProductsList />
        </Suspense>
      </div>
    </section>
  );
}
