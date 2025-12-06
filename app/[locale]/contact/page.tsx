import AppointmentSection from "@/components/templates/AppointmentSection";
import Banner from "@/components/templates/Banner";
import InfoSection from "@/components/organisms/InfoSection";
import DynamicHero from "@/components/templates/DynamicHero";

export default function Contact() {
  return (
    <main className="space-y-16 md:space-y-24 lg:space-y-30">
      <DynamicHero
        heading={`Crafting Comfort &\nElegance Since 1998`}
        subheading="A legacy of craftsmanship and refined interior taste."
        image="/hero-bg.png"
      />
      <AppointmentSection />
      <InfoSection />
      <Banner />
    </main>
  );
}
