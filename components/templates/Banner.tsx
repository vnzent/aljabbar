import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type BannerVariant = "visionMission" | "ctaBox";

interface BannerProps {
  variant?: BannerVariant;
}

export default function Banner({ variant = "ctaBox" }: BannerProps) {
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
        <div className="relative z-5 flex items-center justify-start min-h-230 main-wrapper mx-auto">
          <div className="flex flex-col w-[650px] gap-6 bg-white px-18 py-21">
            <p className="uppercase font-poppins text-2xl font-normal">
              Consultation
            </p>
            <div className="flex flex-col gap-3 max-w-lg">
              <h3 className="text-4xl font-poppins font-normal capitalize leading-tight">
                Need Assistance Choosing
                <br /> the Right Carpet?
              </h3>
              <span className="bg-[#D9D9D9] w-full h-0.5 max-w-lg" />
              <p className="text-base capitalize font-poppins font-normal">
                Our team is available 9 AM – 9 PM daily to guide you through
                styles, materials, and interior matching.
              </p>
            </div>
            <Button className="w-fit" asChild>
              <Link
                href="/"
                className="uppercase font-poppins text-white text-lg"
              >
                WHATSAPP NOW
              </Link>
            </Button>
          </div>
        </div>
      )}

      {variant === "visionMission" && (
        <div className="relative z-10 main-wrapper mx-auto flex items-center min-h-200">
          <div className="flex gap-10 items-start justify-between w-full">
            <div className="flex flex-col gap-7 flex-1">
              <h3 className="font-poppins text-4xl text-white font-medium">
                Vision
              </h3>
              <div className="flex flex-col gap-5">
                <span className="bg-white h-0.5 w-40" />
                <p className="font-poppins text-xl text-white capitalize">
                  To implement market development and be a global market leader
                  in carpets.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-7 flex-1">
              <h3 className="font-poppins text-4xl text-white font-medium">
                Mision
              </h3>
              <div className="flex flex-col gap-5">
                <span className="bg-white h-0.5 w-40" />
                <p className="font-poppins text-xl text-white capitalize">
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
