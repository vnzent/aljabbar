import { useTranslations } from "next-intl";
import Image from "next/image";
import VisionMissionItem from "./VisionMissionItem";

export default function VisionMision() {
  const t = useTranslations("visionMision");
  return (
    <section className="w-full relative ">
      <div className="bg-black/50 absolute inset-0">
        <div className="absolute -z-10 h-full overflow-hidden w-full">
          <Image
            src="/banner2.webp"
            alt="Banner"
            width={1280}
            height={700}
            className="w-full object-cover h-full "
          />
        </div>
      </div>
      <div className="relative z-10 main-wrapper mx-auto flex items-center justify-center  py-28 md:py-36 lg:py-48">
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-20 md:w-full lg:w-[70vw]  text-center md:text-left">
          <VisionMissionItem
            title={t("visionName")}
            description={t("vision")}
          />
          <VisionMissionItem
            title={t("misionName")}
            description={t("mision")}
          />
        </div>
      </div>
    </section>
  );
}
