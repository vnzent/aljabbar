import About from "@/components/About";
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
      <ValueCounter />
      <About />
      <IconLine />
      <UniqueSellingPoints />
      <OurProducts />
      <Banner />
    </main>
  );
}
