import AppointmentSection from "@/components/templates/AppointmentSection";
import Banner from "@/components/templates/Banner";
import InfoSection from "@/components/organisms/InfoSection";
import DynamicHero from "@/components/templates/DynamicHero";
import PageWrapper from "@/components/organisms/PageWrapper";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("contactPage")
  return (
    <PageWrapper>
      <DynamicHero
        heading={t("title")}
        subheading={t("subTitle")}
        image="/contact.jpeg"
      />
      <AppointmentSection />
      <InfoSection />
      <Banner />
    </PageWrapper>
  );
}
