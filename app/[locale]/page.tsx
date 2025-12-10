import AboutSection from "@/components/organisms/AboutSection";
import Banner from "@/components/templates/Banner";
import HeroSection from "@/components/organisms/HeroSection";
import IconLine from "@/components/atoms/IconLine";
import OurCollections from "@/components/templates/OurCollections";
import OurProducts from "@/components/templates/OurProducts";
import UniqueSellingPoints from "@/components/organisms/UniqueSellingPoints";
import ValueCounter from "@/components/atoms/ValueCounter";
import { Suspense } from "react";
import CounterSection from "@/components/organisms/CounterSection";

export default function Home() {
  return (
    <main className="space-y-16 md:space-y-24 lg:space-y-30">
      <HeroSection />
      <OurCollections id="collections" />
      <CounterSection withHeading={false} />
      {/* TODO: Gambarnya kecilin */}
      <AboutSection
        paragraphs={[
          <>
            Al-Jabbar carpets is a retail carpet business which dates back to
            its originating date being March 1994. From the start we have been
            dedicated to providing the best quality carpets.
          </>,
          <>
            Al-Jabbar carpets we specializes in Hand-Made Carpets which come
            from different countries such as Iran, Pakistan, Afghanistan and
            Kashmir, Machine-Made Carpets and Mosque Rugs from Iran and Turkey
            and wall to wall carpets from Europe and the United States of
            America.
          </>,
        ]}
      />
      <IconLine />
      <UniqueSellingPoints />
      <OurProducts />
      <Banner />
    </main>
  );
}
