import Banner from "@/components/Banner";
import ContactSection from "@/components/ContactSection";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import DynamicHero from "@/components/DynamicHero";
import IconLine from "@/components/IconLine";
import OurServices from "@/components/OurServices";
import Image from "next/image";

export default function Service() {
  return (
    <main className="space-y-30">
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
