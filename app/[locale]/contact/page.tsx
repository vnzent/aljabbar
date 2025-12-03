import AppointmentSection from "@/components/AppointmentSection";
import Banner from "@/components/Banner";
import InfoSection from "@/components/InfoSection";
import DynamicHero from "@/components/DynamicHero";

export default function Contact() {
  return (
    <main className="space-y-30">
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
