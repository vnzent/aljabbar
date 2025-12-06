import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type BannerVariant = "visionMission" | "ctaBox";

interface BannerProps {
  variant?: BannerVariant;
}

function BannerComponent({ variant = "ctaBox" }: BannerProps) {
  return (
    <section className="w-full relative">
      <div className="bg-black/30 absolute inset-0">
        <div className="absolute -z-10 h-full overflow-hidden w-full">
          <Image
            src="/banner.jpg"
            alt="Banner"
            width={1280}
            height={700}
            className="w-full object-cover h-full"
          />
        </div>
      </div>

      {variant === "ctaBox" && (
        <div className="relative z-5 flex items-center justify-center xl:justify-start min-h-80 sm:min-h-[400px] lg:min-h-[460px] main-wrapper mx-auto py-12 sm:py-16">
          <div className="flex flex-col w-full max-w-lg sm:max-w-xl lg:max-w-[650px] gap-6 bg-white px-6 sm:px-12 lg:px-18 py-10 sm:py-16">
            <p className="uppercase font-poppins text-lg sm:text-2xl font-normal text-center sm:text-left">
              Consultation
            </p>
            <div className="flex flex-col gap-3 max-w-lg text-center sm:text-left">
              <h3 className="text-3xl sm:text-4xl font-poppins font-normal capitalize leading-tight">
                Need Assistance Choosing
                <br className="hidden sm:block" /> the Right Carpet?
              </h3>
              <span className="bg-[#D9D9D9] w-full h-0.5 max-w-lg" />
              <p className="text-base sm:text-lg capitalize font-poppins font-normal text-black/80">
                Our team is available 9 AM – 9 PM daily to guide you through
                styles, materials, and interior matching.
              </p>
            </div>
            <div className="flex justify-center sm:justify-start">
              <Button className="w-full sm:w-fit" asChild>
                <Link
                  href="/"
                  className="uppercase font-poppins text-white text-lg"
                >
                  WHATSAPP NOW
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {variant === "visionMission" && (
        <div className="relative z-10 main-wrapper mx-auto flex items-center min-h-80 sm:min-h-[420px] lg:min-h-200 py-16">
          <div className="flex flex-col lg:flex-row gap-10 items-start justify-between w-full text-center lg:text-left">
            <div className="flex flex-col gap-7 flex-1 w-full">
              <h3 className="font-poppins text-3xl sm:text-4xl text-white font-medium">
                Vision
              </h3>
              <div className="flex flex-col gap-5">
                <span className="bg-white h-0.5 w-24 sm:w-40 mx-auto lg:mx-0" />
                <p className="font-poppins text-base sm:text-xl text-white capitalize">
                  To implement market development and be a global market leader
                  in carpets.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-7 flex-1 w-full">
              <h3 className="font-poppins text-3xl sm:text-4xl text-white font-medium">
                Mision
              </h3>
              <div className="flex flex-col gap-5">
                <span className="bg-white h-0.5 w-24 sm:w-40 mx-auto lg:mx-0" />
                <p className="font-poppins text-base sm:text-xl text-white capitalize">
                  To infuse Al-Jabbar carpets to be incorporated in our
                  customers lifestyle, whether their home, office or place of
                  worship.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default BannerComponent;
