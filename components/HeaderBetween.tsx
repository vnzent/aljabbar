import { parseTextWithLineBreaks } from "@/lib/textParser";

export default function HeaderBetween({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="font-poppins text-4xl font-medium text-black">
        {heading}
      </h2>
      <p className="font-inter font-normal text-base text-black/60 capitalize">
        {parseTextWithLineBreaks(subheading)}
      </p>
    </div>
  );
}
