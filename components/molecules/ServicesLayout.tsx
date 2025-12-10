import Image from "next/image";
import { Button } from "../ui";
import { cn } from "@/lib/utils";

interface ServicesLayoutProps {
  variant?: "normal" | "reverse";
  heading?: string;
  subheading?: string;
  imgSrc?: string;
}

export default function ServicesLayout({
  variant = "normal",
  heading,
  subheading,
  imgSrc = "/placeholder.jpg",
}:ServicesLayoutProps ) {

    return (
      <div className={cn("flex gap-x-20 items-center", variant === "reverse" ? "flex-row-reverse" : "flex-row")}>
        <div className="w-full">
          <Image
            src={imgSrc}
            alt="Service 1"
            width={800}
            height={500}
            className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 md:gap-5 w-full">
          <h3 className="font-poppins font-medium text-2xl md:text-3xl text-black">
            {heading}
          </h3>
          <p className="font-poppins font-normal text-sm md:text-base text-text max-w-xl text-center lg:text-justify">
            {subheading}
          </p>
          <Button className="w-full mt-2 sm:w-fit font-poppins text-base md:text-lg text-white uppercase">
            Order Now
          </Button>
        </div>
      </div>
    );
}