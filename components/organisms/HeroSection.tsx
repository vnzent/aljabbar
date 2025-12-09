import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("hero");

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
      <div className="h-full w-full flex flex-col main-wrapper mx-auto justify-end items-start md:justify-center lg:justify-end gap-10 pb-24 md:pb-0 lg:pb-45 md:px-12 lg:px-8">
        <div className="flex flex-col gap-8 max-w-3xl lg:max-w-4xl">
          <div className="flex flex-col gap-3">
            <p className="text-white font-open-sans font-normal text-base sm:text-lg lg:text-2xl uppercase tracking-[0.2em]">
              {t("tagline")}
            </p>
            <h1 className="text-white font-poppins font-medium text-4xl sm:text-5xl lg:text-[65px] leading-snug sm:leading-tight">
              {t("headlineLine1")} <br />
              {t("headlineLine2")}
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 font-poppins w-full sm:w-auto">
            <Button className="text-base w-full sm:w-auto hover:border-white active:border-primary">
              <Link href="/collections">{t("primaryCta")}</Link>
            </Button>
            <Button
              variant="secondary"
              className="text-base w-full sm:w-auto"
              asChild
            >
              <Link href="#collections">{t("secondaryCta")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
