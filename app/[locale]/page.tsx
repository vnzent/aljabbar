import AboutSection from "@/components/organisms/AboutSection";
import Banner from "@/components/templates/Banner";
import HeroSection from "@/components/organisms/HeroSection";
import IconLine from "@/components/atoms/IconLine";
import OurCollections from "@/components/templates/OurCollections";
import OurProducts from "@/components/templates/OurProducts";
import OurProductsSkeleton from "@/components/molecules/OurProductsSkeleton";
import UniqueSellingPoints from "@/components/organisms/UniqueSellingPoints";
import ValueCounter from "@/components/atoms/ValueCounter";
import { useTranslations } from "next-intl";
import { Suspense } from "react";

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
