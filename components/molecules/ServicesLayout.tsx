import Image from "next/image";
import { Button } from "../ui";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { whatsappContacts } from "@/lib/data";

interface ServicesLayoutProps {
  variant?: "normal" | "reverse";
  heading?: string;
  subHeading?: string;
  imgSrc?: string;
}

export default function ServicesLayout({
  variant = "normal",
  heading,
  subHeading,
  imgSrc = "/placeholder.jpg",
}: ServicesLayoutProps) {
  const _prefill = encodeURIComponent(
    heading
      ? `Hello, I would like to ask about the service: ${heading}`
      : "Hello, I would like to ask about your services."
  );
  let orderLink = whatsappContacts.kemang;
  if (/text=[^&]*/.test(orderLink)) {
    orderLink = orderLink.replace(/text=[^&]*/g, `text=${_prefill}`);
  } else if (orderLink.includes("?")) {
    orderLink = `${orderLink}&text=${_prefill}`;
  } else {
    orderLink = `${orderLink}?text=${_prefill}`;
  }
  return (
    <div
      className={cn(
        // Stack on small screens, side-by-side on md+
        "flex flex-col items-center gap-y-6 md:gap-x-20 md:flex-row",
        variant === "reverse" ? "md:flex-row-reverse" : "md:flex-row"
      )}
    >
      <div className="w-full">
        <Image
          src={imgSrc}
          alt="Service 1"
          width={800}
          height={500}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="w-full h-[200px] sm:h-[300px] md:h-[450px] lg:h-[500px] overflow-hidden object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 md:gap-4 w-full">
        <h3 className="font-poppins font-medium text-2xl md:text-3xl text-black">
          {heading}
        </h3>
        <p className="font-poppins font-normal text-sm md:text-base text-text max-w-xl text-start">
          {subHeading}
        </p>
        <Button className="w-full mt-4 uppercase sm:w-fit" asChild>
          <Link href={orderLink}>Order Now</Link>
        </Button>
      </div>
    </div>
  );
}
