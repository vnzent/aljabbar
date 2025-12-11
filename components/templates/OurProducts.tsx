import Link from "next/link";
import ProductsList from "@/components/organisms/ProductsList";
import { Suspense } from "react";
import OurProductsSkeleton from "@/components/molecules/OurProductsSkeleton";
import SectionWrapper from "../organisms/SectionWrapper";
import TextHeading from "../atoms/TextHeading";
import { GoChevronRight } from "react-icons/go";

export function ViewAllLink({
  variant = "desktop",
}: {
  variant?: "mobile" | "desktop";
}) {
  return (
    <Link
      href="/collections"
      className={`${
        variant === "mobile"
          ? "flex md:hidden w-fit mt-6"
          : "hidden md:flex w-fit"
      } group uppercase gap-2 justify-center border-b hover:border-primary border-black items-center  font-inter text-base font-normal text-black relative`}
    >
      <span className="transition-colors duration-500 group-hover:text-primary">
        View All
      </span>
      <GoChevronRight className="text-lg group-hover:text-primary transition-colors duration-500" />
    </Link>
  );
}

export default async function OurProducts() {
  return (
    <section className=" w-full mx-auto main-wrapper">
      <SectionWrapper>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
          <TextHeading>Our Products</TextHeading>
          <ViewAllLink />
        </div>
        <Suspense fallback={<OurProductsSkeleton />}>
          <ProductsList />
        </Suspense>
      </SectionWrapper>
      <div className="flex justify-center md:hidden">
        <ViewAllLink variant="mobile" />
      </div>
    </section>
  );
}
