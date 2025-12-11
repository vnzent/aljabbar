import { parseTextWithLineBreaks } from "@/lib/textParser";
import TextHeading from "../atoms/TextHeading";
import { useTranslations } from "next-intl";

export default function HeaderBetween({
  heading,
  subheading,
  translationKey,
}: {
  heading?: string;
  subheading?: string;
  translationKey?: string;
}) {
  const t = translationKey ? useTranslations(translationKey) : null;

  // Use translation if translationKey is provided, otherwise use direct text
  const displayHeading = translationKey && heading ? t?.(heading) : heading;
  const displaySubheading =
    translationKey && subheading ? t?.(subheading) : subheading;

  return (
    <div className="flex flex-col gap-1 md:gap-15 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
      <TextHeading>{displayHeading}</TextHeading>
      <p className="font-inter font-normal text-sm sm:text-base text-text max-w-2xl sm:max-w-sm lg:max-w-md text-center md:text-justify">
        {displaySubheading}
      </p>
    </div>
  );
}
