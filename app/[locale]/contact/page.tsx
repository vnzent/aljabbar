import Banner from "@/components/Banner";
import ContactForm from "@/components/ContactForm";
import ContactSection from "@/components/ContactSection";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import DynamicHero from "@/components/DynamicHero";
import { contacts, navSocialIcons } from "@/lib/data";
import { parseTextWithLineBreaks } from "@/lib/textParser";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  return (
    <main className="space-y-30">
      <DynamicHero
        heading={`Crafting Comfort &\nElegance Since 1998`}
        subheading="A legacy of craftsmanship and refined interior taste."
        image="/hero-bg.png"
      />
      <ContactSection />
      <Banner />
    </main>
  );
}
