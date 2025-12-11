import IconLine from "@/components/atoms/IconLine";
import Gallery from "@/components/organisms/Gallery";
import Banner from "@/components/templates/Banner";
import AboutSection from "@/components/organisms/AboutSection";
import Faq from "@/components/organisms/Faq";
import DynamicHero from "@/components/templates/DynamicHero";
import OurCollections from "@/components/templates/OurCollections";
import VisionMision from "@/components/organisms/VisionMision";
import { aboutParagraphs } from "@/lib/data";
import { parseTextWithBold } from "@/lib/textParser";
import CounterSection from "@/components/organisms/CounterSection";
import Branches from "@/components/organisms/Branches";
import PageWrapper from "@/components/organisms/PageWrapper";

export default function About() {
  return (
    <PageWrapper>
      <DynamicHero
        heading={`About Al-Jabbar Carpets`}
        subheading="Al-Jabbar Carpets has been established since 1994 as a trusted curator of premium carpets sourced directly from their countries of origin."
        image="/about-us.jpeg"
      />
      {/* About us */}
      <AboutSection
        paragraphs={aboutParagraphs.map((paragraph) =>
          parseTextWithBold(paragraph)
        )}
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
