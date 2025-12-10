import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export default function AboutSection({
  paragraphs = [],
  isButton = true,
}: {
  paragraphs?: ReactNode[];
  isButton?: boolean;
}) {
  return (
    <section className="w-full relative py-8 md:py-0">
      <div className="main-wrapper mx-auto flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20 items-center justify-between">
        {/* Image Container */}
        <div className="relative shrink-0 w-full max-w-full aspect-4/3 lg:aspect-auto lg:max-w-[650px] xl:max-w-5/12">
          <Image
            src="/about.png"
            alt="About Image"
            width={800}
            height={1000}
            className="object-cover overflow-hidden w-full h-full"
          />
          <div className="hidden lg:block absolute -z-10 -bottom-4 xl:-bottom-8 -right-4 xl:-right-6 bg-primary w-64 xl:w-full h-32 xl:h-48" />
        </div>

        {/* Content Container */}
        <div className="flex flex-col gap-6 md:gap-8  w-full px-0">
          {/* Heading */}
          <div className="flex gap-3 justify-start items-center">
            <span className="w-8 sm:w-12 md:w-16 lg:w-20 h-0.5 bg-primary" />
            <h2 className="text-black font-poppins font-medium text-3xl sm:text-4xl lg:text-5xl whitespace-nowrap">
              About Us
            </h2>
          </div>

          {/* Paragraphs */}
          <div className="flex flex-col gap-4 md:gap-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="font-inter font-light text-sm sm:text-base text-black text-justify leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Button */}
          {isButton && (
            <div className="flex justify-center lg:justify-start mt-2">
              <Button className="text-sm sm:text-base lg:text-lg font-poppins font-normal uppercase w-full sm:w-auto px-8 sm:px-10 lg:px-12">
                more about us
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
