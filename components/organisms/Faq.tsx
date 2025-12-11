"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";
import { parseTextWithParagraphs } from "@/lib/textParser";
import { useTranslations } from "next-intl";

export default function Faq() {
  const t = useTranslations("faqs");
  return (
    <section className="w-full">
      <div className="main-wrapper mx-auto flex flex-col lg:flex-row gap-10 md:gap-12 lg:gap-20 items-center">
        <div className="flex flex-col gap-5 md:gap-6 lg:gap-7 w-full lg:max-w-md">
          <h2 className="font-poppins font-semibold text-center lg:text-left text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-black">
            FAQ
          </h2>
          <div className="flex flex-col gap-3 md:gap-4 text-center lg:text-left">
            <p className="font-inter font-normal text-sm md:text-base text-text leading-relaxed">
              {t("subTitle")}
            </p>
            <p className="text-text font-inter text-sm md:text-base leading-relaxed">
              {parseTextWithParagraphs(t("miniText"))}
            </p>
          </div>
        </div>
        <div className="flex-1 h-full w-full">
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-3 md:space-y-4"
          >
            {faqs.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-200 px-4 md:px-5 lg:px-6 bg-white hover:border-primary/50 transition-colors overflow-hidden"
              >
                <AccordionTrigger className="font-poppins font-medium text-base md:text-lg text-black hover:text-primary hover:no-underline cursor-pointer py-3 md:py-4">
                  {t(`${item.translationKey}.question`)}
                </AccordionTrigger>
                <AccordionContent className="font-inter text-sm md:text-base text-black/70 leading-relaxed pt-2 text-justify">
                  <div className="[&_a]:pointer-events-auto [&_a]:cursor-pointer [&_a]:relative [&_a]:z-9999">
                    {parseTextWithParagraphs(
                      t(`${item.translationKey}.answer`)
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
