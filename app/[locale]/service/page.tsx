import Banner from "@/components/templates/Banner";
import ContactSection from "@/components/organisms/ContactSection";
import DynamicBreadcrumb from "@/components/molecules/DynamicBreadcrumb";
import DynamicHero from "@/components/templates/DynamicHero";
import IconLine from "@/components/atoms/IconLine";
import OurServices from "@/components/organisms/OurServices";
import Image from "next/image";

export default function Service() {
  return (
    <main className="space-y-16 md:space-y-24 lg:space-y-30">
      <DynamicHero
        heading={`Crafting Comfort &\nElegance Since 1998`}
        subheading="A legacy of craftsmanship and refined interior taste."
        image="/hero-bg.png"
      />
      <OurServices />
      <IconLine />
      <ContactSection />
      <Banner />
    </main>
  );
}
