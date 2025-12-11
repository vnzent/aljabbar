import AppointmentSection from "@/components/templates/AppointmentSection";
import Banner from "@/components/templates/Banner";
import InfoSection from "@/components/organisms/InfoSection";
import DynamicHero from "@/components/templates/DynamicHero";
import PageWrapper from "@/components/organisms/PageWrapper";

export default function Contact() {
  return (
    <PageWrapper>
      <DynamicHero
        heading={`Schedule Your Visit`}
        subheading="Choose a convenient date and time to visit our showroom or schedule a home visit. Our experts will guide you through our premium carpet collection."
        image="/contact.jpeg"
      />
      <AppointmentSection />
      <InfoSection />
      <Banner />
    </PageWrapper>
  );
}
