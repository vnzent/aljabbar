import About from "@/components/About";
import HeroSection from "@/components/HeroSection";
import IconLine from "@/components/IconLine";
import OurCollections from "@/components/OurCollections";
import UniqueSellingPoints from "@/components/UniqueSellingPoints";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Home() {
  const t = useTranslations("home");

  return (
    <main className="">
      <HeroSection />
      <OurCollections />
      <About />
      <IconLine />
      <UniqueSellingPoints />
    </main>
  );
}
