"use client";

import Image from "next/image";
import HeaderBetween from "@/components/templates/HeaderBetween";
import Link from "next/link";
import { collectionCategories } from "@/lib/data";
import { useTranslations } from "next-intl";

interface OurCollectionsProps {
  id?: string;
}

export default function OurCollections({ id }: OurCollectionsProps) {
  const t = useTranslations("collectionCategories");

  return (
    <section className="w-full" id={id}>
      <div className="flex flex-col gap-10 main-wrapper mx-auto">
        <HeaderBetween
          heading="heading"
          subheading="subHeading"
          translationKey="collectionHome"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {collectionCategories.map((item, index) => {
            const isLastOdd =
              index === collectionCategories.length - 1 &&
              collectionCategories.length % 2 !== 0;
            return (
              <div
                className={`flex flex-col gap-3 ${
                  isLastOdd
                    ? "md:col-span-2 md:max-w-md md:mx-auto lg:col-span-1 lg:max-w-none"
                    : ""
                }`}
                key={index}
              >
                <Link
                  href={`/collections/${item.slug}`}
                  className="group/link flex flex-col gap-3"
                >
                  <div className="aspect-4/3 relative overflow-hidden">
                    <Image
                      src={item.src}
                      alt={t(item.translationKey)}
                      width={800}
                      height={600}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover/link:scale-110"
                    />
                  </div>

                  <span className="font-poppins font-normal text-lg text-black underline underline-offset-2 transition-colors duration-300 group-hover/link:text-primary w-fit">
                    {t(item.translationKey)}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
