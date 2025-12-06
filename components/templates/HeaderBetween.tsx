import { parseTextWithLineBreaks } from "@/lib/textParser";

export default function HeaderBetween({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
      <h2 className="font-poppins text-3xl sm:text-4xl font-medium text-black">
        {heading}
      </h2>
      <p className="font-inter font-normal text-sm sm:text-base text-black/60 capitalize max-w-2xl">
        {parseTextWithLineBreaks(subheading)}
      </p>
    </div>
  );
}
