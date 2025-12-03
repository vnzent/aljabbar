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

export default function About() {
  return (
    <main className="space-y-30">
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
      <section className="w-full">
        <div className="flex flex-col gap-10 main-wrapper mx-auto">
          <HeaderBetween
            heading="Numbers That Tell Our Story"
            subheading={`Decades of serving customers with a diverse collection of\nrugs have built a strong foundation of trust and reliability.`}
          />
          <ValueCounter />
        </div>
      </section>
      {/* Logo Seperator */}
      <IconLine />
      {/* Collection */}
      <OurCollections />
      <Gallery />
      <Faq />
      <Banner />
    </main>
  );
}
