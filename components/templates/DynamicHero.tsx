import Image from "next/image";
import DynamicBreadcrumb from "@/components/molecules/DynamicBreadcrumb";
import { parseTextWithLineBreaks } from "@/lib/textParser";

export default function DynamicHero({
  heading,
  subheading,
  image,
}: {
  heading: string;
  subheading?: string;
  image: string;
}) {
  return (
    <section className="w-full relative h-svh lg:h-[70vh] pt-10">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={image}
          alt="Hero Background"
          fill={true}
          className="object-cover"
          priority={true}
        />
      </div>
      <div className="bg-black/30 sm:bg-black/40 absolute -z-9 inset-0 w-full h-full" />
      <div className="h-full lg:h-full w-full md:px-12 lg:px-8 flex main-wrapper justify-start items-center mx-auto">
        <div className="flex max-w-180 flex-col gap-3">
          <DynamicBreadcrumb
            textColor="text-white"
            separatorColor="text-white"
            textSize="text-base md:text-xl lg:text-base"
            separatorSize="size-2 md:size-3"
            hoverText="hover:text-primary"
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-white font-poppins font-medium text-4xl md:text-6xl lg:text-5xl leading-tight">
              {parseTextWithLineBreaks(heading)}
            </h1>
            {subheading && (
              <div className="flex gap-5 font-inter font-normal text-white capitalize text-base md:text-lg lg:text-base">
                {subheading}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
