import TextHeading from "../atoms/TextHeading";

interface HeaderSectionProps {
  heading?: string;
  subHeading?: string;
  paragraph?: string;
  isSubHeading?: boolean;
  isParagraph?: boolean;
}

export default function HeaderSection({
  heading = "",
  subHeading = "",
  paragraph = "",
  isSubHeading = false,
  isParagraph = false,
}: HeaderSectionProps) {
  return (
    <div className="flex flex-col gap-1 md:gap-2 items-center text-center">
      {isSubHeading && (
        <p className="uppercase font-poppins text-sm md:text-base text-primary tracking-[0.3em]">
          {subHeading}
        </p>
      )}
      <TextHeading>{heading}</TextHeading>
      {isParagraph && (
        <p className="font-inter text-center font-normal text-sm md:text-lg text-text max-w-2xl mx-auto px-4">
          {paragraph}
        </p>
      )}
    </div>
  );
}
