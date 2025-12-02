import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="w-full relative ">
      <div className="absolute -z-10 h-full overflow-hidden w-full">
        <Image
          src="/banner.jpg"
          alt="Banner"
          width={1280}
          height={700}
          className="w-full object-cover  h-full "
        />
      </div>
      <div className="flex items-center justify-start min-h-230 main-wrapper mx-auto">
        <div className="flex flex-col w-[650px] gap-6 bg-white px-18 py-21">
          <p className="uppercase font-poppins text-2xl font-base">
            Consultation
          </p>
          <div className="flex flex-col gap-3 max-w-lg">
            <h3 className="text-4xl font-poppins font-base capitalize leading-tight">
              Need Assistance Choosing
              <br /> the Right Carpet?
            </h3>
            <span className="bg-[#D9D9D9] w-full h-0.5 max-w-lg" />
            <p className="text-base capitalize font-poppins font-base">
              Our team is available 9 AM – 9 PM daily to guide you through
              styles, materials, and interior matching.
            </p>
          </div>
          <Button className="w-fit" asChild>
            <Link href="/" className="uppercase font-poppins text-white text-lg">WHATSAPP NOW</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
