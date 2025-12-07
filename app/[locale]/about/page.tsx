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

export default function About() {
  return (
    <main className="flex flex-col gap-16 md:gap-24 lg:gap-30">
      <DynamicHero
        heading={`Crafting Comfort &\nElegance Since 1998`}
        subheading="A legacy of craftsmanship and refined interior taste."
        image="/hero-bg.png"
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
    </main>
  );
}
