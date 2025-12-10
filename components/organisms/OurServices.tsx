import ServicesLayout from "../molecules/ServicesLayout";
import HeaderSection from "../molecules/HeaderSection";

export default function OurServices() {
  return (
    <section className="w-full mx-auto main-wrapper">
      <div className="flex flex-col gap-16 md:gap-24 lg:gap-30">
      <HeaderSection isParagraph heading="Our Services" paragraph="Decades of serving customers with a diverse collection of rugs have built a strong foundation of trust and reliability." />
        <div className="grid grid-rows-1 gap-y-8 md:gap-y-11 lg:gap-y-15 items-center">
          <ServicesLayout
            heading="Carpet Installation"
            subheading="This is the service we provide for shaft roll and wall to wall carpets. We measure it according to your place and install the carpet and there is no charge for this considering you have bought from Al-Jabbar Carpets."
            imgSrc="/our-collection-1.jpg"
          />
          <ServicesLayout
            heading="Carpet Washing (Premium Care)"
            subheading="When we send the carpet for wash to laundry due to the chemicals used and no proper care given the carpet loses its beautiful natural color. At Al-Jabbar we have trained specialized people that wash the carpets. Understanding this issue Al-Jabbar provides the service of carpet washing"
            variant="reverse"
            imgSrc="/our-collection-3.jpg"
          />
          <ServicesLayout
            heading="Carpet Repairing"
            subheading="At Al-Jabbar Carpets we also repair your carpets. Please contact us for further inquiry/information at our WhatsApp number."
            imgSrc="/our-collection-2.jpg"
          />
        </div>
      </div>
    </section>
  );
}
