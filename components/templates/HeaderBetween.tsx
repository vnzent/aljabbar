import { parseTextWithLineBreaks } from "@/lib/textParser";
import TextHeading from "../atoms/TextHeading";

export default function HeaderBetween({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) {
  return (
    <div className="flex flex-col gap-1 md:gap-15 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
      <TextHeading>{heading}</TextHeading>
      <p className="font-inter font-normal text-sm sm:text-base text-text max-w-2xl sm:max-w-sm lg:max-w-md text-center md:text-justify">
        {parseTextWithLineBreaks(subheading)}
      </p>
    </div>
  );
}
