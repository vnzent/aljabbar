"use client";

import { uniqueSellingPoints } from "@/lib/data";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import HeaderSection from "../molecules/HeaderSection";
import { useTranslations } from "next-intl";

export default function UniqueSellingPoints() {
  const t = useTranslations("uniqueSellingPoints");

  return (
    <section className="w-full mx-auto main-wrapper">
      <div className="flex flex-col items-center gap-16 lg:gap-20 h-full">
        <HeaderSection
          isSubHeading
          heading={t("heading")}
          subHeading={t("heading")}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {uniqueSellingPoints.map((item, index) => (
            <Card
              key={index}
              className="border border-primary/50 mx-auto px-6 sm:px-8 lg:px-10 py-8 sm:py-10 gap-3 w-full"
            >
              <CardTitle className="font-poppins font-semibold text-lg flex flex-col gap-3">
                {<item.icon className="size-7 text-primary" />}
                {t(`${item.translationKey}.title`)}
              </CardTitle>
              <CardDescription className="font-inter font-normal text-sm sm:text-base text-black/70">
                {t(`${item.translationKey}.description`)}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
