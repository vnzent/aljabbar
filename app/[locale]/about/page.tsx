import IconLine from "@/components/atoms/IconLine";
import Gallery from "@/components/organisms/Gallery";
import Banner from "@/components/templates/Banner";
import AboutSection from "@/components/organisms/AboutSection";
import Faq from "@/components/organisms/Faq";
import DynamicHero from "@/components/templates/DynamicHero";
import OurCollections from "@/components/templates/OurCollections";
import VisionMision from "@/components/organisms/VisionMision";
import CounterSection from "@/components/organisms/CounterSection";
import Branches from "@/components/organisms/Branches";
import PageWrapper from "@/components/organisms/PageWrapper";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("aboutUs")
  return (
    <PageWrapper>
      <DynamicHero
        heading={t("title")}
        subheading={t("subTitle")}
        image="/about-us.jpeg"
      />
      {/* About us */}
      <AboutSection
        translationKey="aboutUs"
        isButton={false}
      />
      {/* Vision Mision */}
      <VisionMision />
      {/* Counter Section */}
      <CounterSection withHeading />
      {/* Logo Seperator */}
      <IconLine />
      {/* Collection */}
      <OurCollections />
      <Gallery />
      <Branches />
      <Faq />
      <Banner />
    </PageWrapper>
  );
}
