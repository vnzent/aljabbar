"use client";

import { useTranslations } from "next-intl";

interface HeaderSectionProps {
  heading?: string;
  subHeading?: string;
  paragraph?: string;
  isSubHeading?: boolean;
  isParagraph?: boolean;
  translationKey?: string;
}

export default function HeaderSection({
  heading = "",
  subHeading = "",
  paragraph = "",
  isSubHeading = false,
  isParagraph = false,
  translationKey,
}: HeaderSectionProps) {
  const t = translationKey ? useTranslations(translationKey) : null;

  // Use translation if translationKey is provided, otherwise use direct text
  const displayHeading = translationKey && heading ? t?.(heading) : heading;
  const displaySubHeading =
    translationKey && subHeading ? t?.(subHeading) : subHeading;
  const displayParagraph =
    translationKey && paragraph ? t?.(paragraph) : paragraph;

  return (
    <div className="flex flex-col gap-3 items-center text-center">
      {isSubHeading && (
        <p className="uppercase font-poppins text-base sm:text-xl font-normal tracking-[0.3em]">
          {displaySubHeading}
        </p>
      )}
      <h2 className="font-poppins font-medium text-3xl sm:text-4xl lg:text-5xl">
        {displayHeading}
      </h2>
      {isParagraph && (
        <p className="font-inter text-base md:text-lg text-text max-w-2xl mx-auto px-4">
          {displayParagraph}
        </p>
      )}
    </div>
  );
}
