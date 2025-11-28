import HeroSection from "@/components/HeroSection";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Home() {
  const t = useTranslations("home");

  return (
    <main className="">
      <HeroSection />
    </main>
  );
}
