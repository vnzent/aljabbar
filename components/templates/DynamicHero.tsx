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
    <section className="w-full relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={image}
          alt="Hero Background"
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="bg-black/30 sm:bg-black/20 absolute -z-9 inset-0 w-full h-full"></div>
      <div className="h-200 w-full pb-45 flex main-wrapper justify-start items-end mx-auto">
        <div className="flex flex-col gap-5">
          <DynamicBreadcrumb
            textColor="text-white"
            separatorColor="text-white"
            textSize="text-xl"
            separatorSize="size-3"
            hoverText="hover:text-primary"
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-white font-poppins font-medium text-5xl leading-tight text-[70px]">
              {parseTextWithLineBreaks(heading)}
            </h1>
            {subheading && (
              <div className="flex gap-5 font-inter font-normal text-white capitalize text-lg">
                {subheading}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
