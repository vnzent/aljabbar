import Banner from "@/components/templates/Banner";
import ContactSection from "@/components/organisms/ContactSection";
import DynamicBreadcrumb from "@/components/molecules/DynamicBreadcrumb";
import DynamicHero from "@/components/templates/DynamicHero";
import IconLine from "@/components/atoms/IconLine";
import OurServices from "@/components/organisms/OurServices";
import PageWrapper from "@/components/organisms/PageWrapper";

export default function Service() {
  return (
    <PageWrapper>
      <DynamicHero
        heading={`Our Services`}
        subheading="A legacy of craftsmanship and refined interior taste."
        image="/service.jpeg"
      />
      <OurServices />
      <IconLine />
      <ContactSection />
      <Banner />
    </PageWrapper>
  );
}
