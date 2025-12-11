import { parseTextWithLineBreaks } from "@/lib/textParser";
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
    <div className="flex flex-col gap-4 md:gap-15 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
      <h2 className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-medium text-black">
        {displayHeading}
      </h2>
      <p className="font-inter font-normal text-sm sm:text-base text-text max-w-2xl sm:max-w-sm lg:max-w-md text-justify">
        {displaySubheading}
      </p>
    </div>
  );
}
