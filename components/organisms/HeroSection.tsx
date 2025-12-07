import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/hero-bg.png"
          alt="Hero Background"
          fill={true}
          className="object-cover"
          loading="eager"
        />
      </div>
      <div className="bg-black/30 sm:bg-black/20 absolute -z-9 inset-0 w-full h-full" />
      <div className="h-full w-full flex flex-col main-wrapper mx-auto justify-end items-start gap-10 pb-24 md:pb-35 lg:pb-45">
        <div className="flex flex-col gap-8 max-w-3xl lg:max-w-4xl">
          <div className="flex flex-col gap-3">
            <p className="text-white font-open-sans font-normal text-base sm:text-lg lg:text-2xl uppercase tracking-[0.2em]">
              Al-Jabbar House of Carpets
            </p>
            <h1 className="text-white font-poppins font-medium text-4xl sm:text-5xl lg:text-[70px] leading-snug sm:leading-tight">
              Elevate Your Space <br />
              With Premium Carpets
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 font-poppins w-full sm:w-auto">
            <Button className="text-base w-full sm:w-auto">
              <Link href="/collections">SHOP NOW</Link>
            </Button>
            <Button
              variant="secondary"
              className="text-base w-full sm:w-auto"
              asChild
            >
              <Link href="#collections">VIEW COLLECTIONS</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
