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
        <div className="relative shrink-0 w-full max-w-full sm:max-w-[90%] md:max-w-[520px] lg:max-w-[650px] xl:max-w-[700px]">
          <Image
            src="/about.png"
            alt="About Image"
            width={800}
            height={1000}
            className="object-cover overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl w-full h-[350px] sm:h-[420px] md:h-[500px] lg:h-[700px] xl:h-[800px]"
          />
          <div className="hidden lg:block absolute -z-10 -bottom-8 xl:-bottom-12 -right-6 xl:-right-10 bg-primary w-64 xl:w-2xl h-32 xl:h-48 rounded-lg" />
        </div>

        {/* Content Container */}
        <div className="flex flex-col gap-6 md:gap-8 max-w-2xl w-full px-0 md:px-4 lg:px-10 text-center lg:text-left">
          {/* Heading */}
          <div className="flex flex-col sm:flex-row lg:flex-row gap-3 items-center justify-center lg:justify-start">
            <span className="w-12 sm:w-16 md:w-20 lg:w-24 h-0.5 bg-primary" />
            <h2 className="text-black font-poppins font-medium text-3xl sm:text-4xl lg:text-5xl whitespace-nowrap">
              About Us
            </h2>
          </div>

          {/* Paragraphs */}
          <div className="flex flex-col gap-4 md:gap-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="font-inter font-light text-sm sm:text-base lg:text-lg text-black/70 capitalize text-justify leading-relaxed"
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
