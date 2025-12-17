"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import SectionWrapper from "./SectionWrapper";
import { Link } from "@/i18n/navigation";

export default function AboutSection({
  paragraphs,
  isButton = true,
  translationKey = "homeAbout",
}: {
  paragraphs?: ReactNode[];
  isButton?: boolean;
  translationKey?: string;
}) {
  const t = useTranslations(translationKey);

  // Use custom paragraphs if provided, otherwise use translations
  const displayParagraphs =
    paragraphs ||
    (() => {
      const paragraphsFromTranslations = [];
      let index = 1;
      while (t.has(`paragraph${index}`)) {
        paragraphsFromTranslations.push(t(`paragraph${index}`));
        index++;
      }
      return paragraphsFromTranslations;
    })();
  return (
    <section className="w-full relative ">
      <div className="main-wrapper mx-auto flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20 items-center justify-between">
        {/* Image Container */}
        <div className="relative shrink-0 w-full max-w-full aspect-4/3 lg:aspect-auto lg:max-w-[650px] xl:max-w-5/12">
          <Image
            src="/about.webp"
            alt="About Image"
            width={800}
            height={1000}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 650px, 42vw"
            className="object-cover overflow-hidden w-full h-full"
          />
          <div className="hidden lg:block absolute -z-10 -bottom-4 xl:-bottom-8 -right-4 xl:-right-6 bg-primary w-64 xl:w-full h-32 xl:h-48" />
        </div>

        {/* Content Container */}
        <SectionWrapper>
          {/* Heading */}
          <div className="flex gap-3 justify-start items-center">
            <h2 className="text-black font-poppins font-medium text-3xl sm:text-4xl lg:text-5xl">
              {t("heading")}
            </h2>
          </div>

          {/* Paragraphs */}
          <div className="space-y-4">
            {displayParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className="font-inter font-normal text-sm sm:text-base text-text text-justify "
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Button */}
          {isButton && (
            <div className="flex justify-center lg:justify-start mt-2">
              <Button className="w-full sm:w-fit" asChild>
                {/* Prefill WhatsApp message */}
                <Link href={"/about"}> {t("button")}</Link>
              </Button>
            </div>
          )}
        </SectionWrapper>
      </div>
    </section>
  );
}
