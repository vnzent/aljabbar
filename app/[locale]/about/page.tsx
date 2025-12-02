import Image from "next/image";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { collections, count } from "@/lib/data";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import CountUp from "@/components/CountUp";
import IconLine from "@/components/IconLine";
import Gallery from "@/components/Gallery";
import Banner from "@/components/Banner";
import AboutSection from "@/components/AboutSection";
import Faq from "@/components/Faq";
import DynamicHero from "@/components/DynamicHero";
import HeaderBetween from "@/components/HeaderBetween";
import ValueCounter from "@/components/ValueCounter";
import OurCollections from "@/components/OurCollections";

export default function About() {
  return (
    <main className="space-y-30">
      <DynamicHero
        heading={`Crafting Comfort &\nElegance Since 1998`}
        subheading="A legacy of craftsmanship and refined interior taste."
        image="/hero-bg.png"
      />
      {/* About us */}
      <AboutSection
        paragraphs={[
          <>
            Al-Jabbar carpets is a retail carpet business which dates back to
            its originating date being{" "}
            <span className="font-semibold">March 1994</span>. From the start we
            have been dedicated to providing the best quality carpets.
          </>,
          <>
            Al-Jabbar carpets we specializes in{" "}
            <span className="font-semibold">hand-made carpets</span> which come
            from different countries such as Iran, Pakistan, Afghanistan and
            Kashmir, machine-made carpets and mosque rugs from Iran and Turkey
            and wall to wall carpets from Europe and the United States of
            America.
          </>,
          <>
            Our collection can be viewed in any of our showrooms but also, we
            offer the service of bringing the carpets directly to your house
            without any charge and match the carpets with your interior.
          </>,
          <>
            We have a complete collection ranging from traditional rugs to
            modern rugs we have it all. We have been dedicated to not only
            providing the best quality carpets from day one but also truly focus
            on customer service and we assure you the experience you get in our
            showrooms will be one of a kind.
          </>,
        ]}
        isButton={false}
      />
      {/* Vision Mision */}
      <section className="w-full relative">
        <div className="bg-black/50 absolute inset-0">
          <div className="absolute -z-10 h-full overflow-hidden w-full">
            <Image
              src="/banner.jpg"
              alt="Banner"
              width={1280}
              height={700}
              className="w-full object-cover h-full "
            />
          </div>
        </div>
      </section>
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
