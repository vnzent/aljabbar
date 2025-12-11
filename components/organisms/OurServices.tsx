import ServicesLayout from "../molecules/ServicesLayout";
import HeaderSection from "../molecules/HeaderSection";
import PageWrapper from "./PageWrapper";
import SectionWrapper from "./SectionWrapper";
import { useTranslations } from "next-intl";

export default function OurServices() {
  const t = useTranslations("ourServices");
  return (
    <section className="w-full mx-auto main-wrapper">
      <PageWrapper>
        <SectionWrapper>
          <HeaderSection
            isParagraph
            heading="Our Services"
            paragraph="Decades of serving customers with a diverse collection of rugs have built a strong foundation of trust and reliability."
          />
          <div className="grid grid-rows-1 gap-y-10 md:gap-y-11 lg:gap-y-15 items-center">
            <ServicesLayout
              heading="Carpet Installation"
              subHeading={t("subHeading1")}
              imgSrc="/our-collection-1.jpg"
            />
            <ServicesLayout
              heading="Carpet Washing (Premium Care)"
              subHeading={t("subHeading2")}
              variant="reverse"
              imgSrc="/our-collection-3.jpg"
            />
            <ServicesLayout
              heading="Carpet Repairing"
              subHeading={t("subHeading3")}
              imgSrc="/our-collection-2.jpg"
            />
          </div>
        </SectionWrapper>
      </PageWrapper>
    </section>
  );
}
