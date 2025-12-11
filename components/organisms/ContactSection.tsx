import ContactForm from "@/components/organisms/ContactForm";
import ContactIntro from "@/components/organisms/ContactIntro";
import { useTranslations } from "next-intl";

export default function ContactSection() {
  const t = useTranslations("contactSection")
  return (
    <div className="main-wrapper mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
      <ContactIntro variant="contact" />
      <div className=" flex justify-center">
        <ContactForm />
      </div>
    </div>
  );
}
