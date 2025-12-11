"use client";
import TextHeading from "../atoms/TextHeading";
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
    <div className="flex flex-col gap-1 md:gap-2 items-center text-center">
      {isSubHeading && (
        <p className="uppercase font-poppins text-sm md:text-base text-primary tracking-[0.3em]">
          {displaySubHeading}
        </p>
      )}
      <TextHeading>{displayHeading}</TextHeading>
      {isParagraph && (
        <p className="font-inter text-center font-normal text-sm md:text-lg text-text max-w-2xl mx-auto px-4">
          {displayParagraph}
        </p>
      )}
    </div>
  );
}
