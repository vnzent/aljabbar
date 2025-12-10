import { parseTextWithLineBreaks } from "@/lib/textParser";

export default function HeaderBetween({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) {
  return (
    <div className="flex flex-col gap-4 md:gap-15 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
      <h2 className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-medium text-black">
        {heading}
      </h2>
      <p className="font-inter font-normal text-sm sm:text-base text-text max-w-2xl sm:max-w-sm lg:max-w-md text-justify">
        {parseTextWithLineBreaks(subheading)}
      </p>
    </div>
  );
}
