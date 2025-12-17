import { navSocialIcons } from "@/lib/data";
import Link from "next/link";
import type { ReactNode } from "react";
import TextHeading from "../atoms/TextHeading";
import { IoCallOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from "next-intl";

function ContactItem({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col md:gap-2 text-center sm:text-left lg:text-left">
      <h3 className="font-poppins text-lg text-black">{title}</h3>
      <div className="font-poppins text-base md:text-sm font-normal text-text">
        {children}
      </div>
    </div>
  );
}

interface ContactIntroProps {
  variant?: "info" | "contact";
}

export default function ContactIntro({
  variant = "contact",
}: ContactIntroProps) {
  const headerGap =
    variant === "info" ? "gap-3 md:gap-4 lg:gap-5" : "gap-5 md:gap-6 lg:gap-8";

  const t = useTranslations("contactSection");
  const tC = useTranslations("contactPage");
  const gridClasses =
    variant === "info"
      ? "grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-x-16 md:gap-y-8 w-full max-w-2xl mx-auto lg:mx-0 lg:max-w-none md:pl-12 lg:pl-0"
      : "grid grid-cols-1 sm:grid-cols-2 gap-y-6 md:gap-x-10 md:gap-y-8 w-full max-w-2xl mx-auto lg:mx-0 lg:max-w-none md:pl-12 lg:pl-0";

  return (
    <div className="flex flex-col gap-8 md:gap-10 lg:gap-18 items-start justify-center md:items-start ">
      <div
        className={`flex items-center md:items-start text-center md:text-start flex-col ${headerGap}`}
      >
        <TextHeading>{t("title")}</TextHeading>
        <p className="font-poppins font-normal text-sm md:text-base text-text max-w-xl text-center lg:text-justify">
          {t("subTitle")}
        </p>
      </div>

      <div className={gridClasses}>
        <ContactItem title="Email">
          <Link
            href="mailto:sales@aljabbarcarpets.com"
            className="hover:text-primary duration-300"
          >
            <p className="underline">sales@aljabbarcarpets.com</p>
          </Link>
        </ContactItem>

        <ContactItem title={t("phone")}>
          <div className="flex gap-2 justify-center md:flex-col md:gap-1">
            <a
              href="tel:0217197770"
              className="flex hover:text-primary duration-300 items-center gap-2"
            >
              <IoCallOutline className="size-4 text-primary" />
              <span>021-7197770</span>
            </a>

            <a
              href="https://wa.me/6281319849981"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-primary duration-300"
            >
              <FaWhatsapp className="size-4 text-green-600" />
              <span>+6281-319-849-981</span>
            </a>
          </div>
        </ContactItem>

        {variant === "info" && (
          <>
            <ContactItem title={tC("map.open.header")}>
              {tC("map.open.detail")}
            </ContactItem>

            <ContactItem title={tC("map.find")}>
              <div className="flex mt-2 gap-3 md:gap-4 items-center justify-center sm:justify-start lg:justify-start">
                {navSocialIcons.map((icon, index) => (
                  <Link
                    href={icon.href}
                    className="text-black hover:text-primary transition-colors"
                    aria-label={icon.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                  >
                    {<icon.icon className="size-5" />}
                  </Link>
                ))}
              </div>
            </ContactItem>
          </>
        )}
      </div>
    </div>
  );
}
