import IconLine from "@/components/IconLine";
import Gallery from "@/components/Gallery";
import Banner from "@/components/Banner";
import AboutSection from "@/components/AboutSection";
import Faq from "@/components/Faq";
import DynamicHero from "@/components/DynamicHero";
import HeaderBetween from "@/components/HeaderBetween";
import ValueCounter from "@/components/ValueCounter";
import OurCollections from "@/components/OurCollections";
import VisionMision from "@/components/VisionMision";
import { aboutParagraphs } from "@/lib/data";
import { parseTextWithBold } from "@/lib/textParser";
import CounterSection from "@/components/CounterSection";
import Branches from "@/components/Branches";

export default function About() {
  return (
    <main className="flex flex-col gap-30">
      <DynamicHero
        heading={`Crafting Comfort &\nElegance Since 1998`}
        subheading="A legacy of craftsmanship and refined interior taste."
        image="/hero-bg.png"
      />
      {/* About us */}
      <AboutSection paragraphs={aboutParagraphs.map((paragraph) => parseTextWithBold(paragraph))} isButton={false} />
      {/* Vision Mision */}
      <VisionMision />
      {/* Counter Section */}
      <CounterSection />
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
