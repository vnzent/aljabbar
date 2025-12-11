import ContactForm from "@/components/organisms/ContactForm";
import { useTranslations } from "next-intl";

export default function ContactSection() {
  const t = useTranslations("contactSection")
  return (
    <div className="main-wrapper mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12">
      <div className="flex flex-col lg:col-span-8 justify-around gap-8 md:gap-10 items-start md:items-center lg:items-start">
        <div className="flex flex-col gap-5 md:gap-6 lg:gap-8">
          <h2 className="font-poppins font-medium text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-black text-center lg:text-left ">
            {t("title")}
          </h2>
          <p className="font-poppins font-normal text-sm md:text-base text-black max-w-xl text-center lg:text-justify">
            {t("subTitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 md:gap-x-10 md:gap-y-8 w-full max-w-2xl mx-auto lg:mx-0 lg:max-w-none md:pl-12 lg:pl-0">
          <div className="flex flex-col gap-1.5 md:gap-2 text-center sm:text-left lg:text-left">
            <h3 className="font-poppins text-lg md:text-xl text-black">
              Email
            </h3>
            <p className="font-poppins text-sm md:text-base font-normal text-black/70">
              sales@aljabbarcarpets.com
            </p>
          </div>
          <div className="flex flex-col gap-1.5 md:gap-2 text-center sm:text-left lg:text-left">
            <h3 className="font-poppins text-lg md:text-xl text-black">
              {t("phone")}
            </h3>
            <p className="font-poppins text-sm md:text-base font-normal text-black/70">
              021-7197770
              <br />
              +6281-319-849-981
            </p>
          </div>
        </div>
      </div>
      <div className="lg:col-span-4 flex justify-center">
        <ContactForm />
      </div>
    </div>
  );
}
