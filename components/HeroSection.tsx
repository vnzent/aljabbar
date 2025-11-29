import Image from "next/image";
import { Button } from "./ui/button";

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
      <div className="h-full w-full pb-45 flex max-w-[1575px] justify-start items-end px-8 mx-auto">
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
          <div className="flex gap-5 font-poppins font-normal">
            <Button className="text-base">SHOP NOW</Button>
            <Button variant="secondary" className="text-base">VIEW COLLECTIONS</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
