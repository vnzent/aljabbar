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
    <div className="flex flex-col gap-3 items-center text-center">
      {isSubHeading && (
        <p className="uppercase font-poppins text-base sm:text-xl font-normal tracking-[0.3em]">
          {subHeading}
        </p>
      )}
      <h2 className="font-poppins font-medium text-3xl sm:text-4xl lg:text-5xl">
        {heading}
      </h2>
      {isParagraph && (
        <p className="font-inter text-base md:text-lg text-text max-w-2xl mx-auto px-4">
          {paragraph}
        </p>
      )}
    </div>
  );
}
