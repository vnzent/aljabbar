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
    <section className="w-full relative">
      <div className="main-wrapper mx-auto flex gap-20 items-center justify-between">
        <div className="relative shrink-0">
          <Image
            src="/about.png"
            alt="About Image"
            width={800}
            height={1000}
            className="object-cover overflow-hidden max-w-[700px] h-[800px]"
          />
          <div className="absolute -z-10 -bottom-12 -right-10 bg-primary w-2xl h-48" />
        </div>
        <div className="flex flex-col gap-10 max-w-2xl px-10">
          <div className="flex gap-3 items-center">
            <span className="w-26 h-0.5 bg-primary" />
            <h2 className="text-black font-poppins font-medium text-5xl">
              About Us
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="font-inter font-light text-lg text-black/70 capitalize text-justify"
              >
                {paragraph}
              </p>
            ))}
          </div>
          {isButton && (
            <Button className="text-lg font-poppins font-normal uppercase w-fit">
              more about us
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
