import Link from "next/link";
import ProductsList from "./ProductsList";
import { Suspense } from "react";
import OurProductsSkeleton from "./OurProductsSkeleton";

export default async function OurProducts() {
  return (
    <section className="min-h-screen w-full mx-auto main-wrapper">
      <div className="flex flex-col gap-18">
        <div className="flex justify-between items-center">
          <h2 className="font-poppins font-medium text-5xl capitalize">
            Our Products
          </h2>
          <Link href="/" className="uppercase font-inter text-lg font-normal">
            View All
          </Link>
        </div>
        <Suspense fallback={<OurProductsSkeleton />}>
          <ProductsList />
        </Suspense>
      </div>
    </section>
  );
}
