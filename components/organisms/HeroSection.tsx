import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="h-screen w-full relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/hero-bg.png"
          alt="Hero Background"
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="bg-black/30 sm:bg-black/20 absolute -z-9 inset-0 w-full h-full"></div>
      <div className="h-full w-full pb-45 flex main-wrapper justify-start items-end mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <p className="text-white font-open-sans font-normal text-2xl uppercase">
              Al-Jabbar HousE of Carpets
            </p>
            <h1 className="text-white font-poppins font-medium text-5xl leading-tight text-[70px]">
              Elevate Your Space <br />
              With Premium Carpets
            </h1>
          </div>
          <div className="flex gap-5 font-poppins">
            <Button className="text-base">SHOP NOW</Button>
            <Button variant="secondary" className="text-base">
              VIEW COLLECTIONS
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
