import AboutSection from "@/components/AboutSection";
import Banner from "@/components/Banner";
import HeroSection from "@/components/HeroSection";
import IconLine from "@/components/IconLine";
import OurCollections from "@/components/OurCollections";
import OurProducts from "@/components/OurProducts";
import UniqueSellingPoints from "@/components/UniqueSellingPoints";
import ValueCounter from "@/components/ValueCounter";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Home() {
  const t = useTranslations("home");

  return (
    <main className="space-y-30">
      <HeroSection />
      <OurCollections />
      <section className="main-wrapper mx-auto">
        <ValueCounter />
      </section>
      <AboutSection
        paragraphs={[
          <>
            Al-Jabbar carpets is a retail carpet business which dates back to
            its originating date being march 1994. From the start we have been
            dedicated to providing the best quality carpets.
          </>,
          <>
            Al-Jabbar carpets we specializes in hand-made carpets which come
            from different countries such as Iran, Pakistan, Afghanistan and
            Kashmir, machine-made carpets and mosque rugs from Iran and Turkey
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
