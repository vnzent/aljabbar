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
      <AboutSection />
      <IconLine />
      <UniqueSellingPoints />
      <OurProducts />
      <Banner />
    </main>
  );
}
