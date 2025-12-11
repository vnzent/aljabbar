import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { whatsappContacts } from "@/lib/data";
import { useTranslations } from "next-intl";

function BannerComponent() {
  const t = useTranslations("bannerCTA");
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
      <div className="relative z-5 flex items-center justify-center xl:justify-start min-h-85 sm:min-h-[450px] lg:min-h-[600px] main-wrapper mx-auto py-12 sm:py-16">
        <div className="flex flex-col w-full max-w-lg sm:max-w-xl lg:max-w-[600px] gap-3 bg-white px-6 sm:px-12 py-10 sm:py-12">
          <p className="uppercase font-poppins text-base sm:text-lg font-normal text-left">
            Consultation
          </p>
          <div className="flex flex-col gap-3 max-w-lg text-left">
            <h3 className="text-2xl sm:text-2xl lg:text-3xl font-poppins font-normal leading-tight">
              {t("heading1")}
              <br className="hidden sm:block" /> {t("heading2")}
            </h3>
            <span className="bg-[#D9D9D9] w-full h-0.5 max-w-lg" />
            <p className="text-sm sm:text-base font-poppins font-normal text-black/80">
              {t("subHeading")}
            </p>
          </div>
          <div className="flex justify-center sm:justify-start">
            <Button className="w-full sm:w-fit" asChild>
              <Link
                href={whatsappContacts.kemang}
                className="uppercase font-poppins text-white text-lg"
              >
                {t("Cta")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BannerComponent;
