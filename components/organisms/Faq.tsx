import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";
import { parseTextWithParagraphs } from "@/lib/textParser";
import Link from "next/link";

export default function Faq() {
  return (
    <section className="w-full">
      <div className="main-wrapper mx-auto flex gap-20 items-center">
        <div className="flex flex-col gap-7 max-w-md">
          <h2 className="font-poppins font-semibold text-5xl text-black">
            FAQ
          </h2>
          <div className="flex flex-col gap-4">
            <p className="font-inter font-normal text-base text-black/60 capitalize leading-relaxed">
              We've gathered some of the most frequently asked questions so you
              can get answers faster.
            </p>
            <p className="text-black/60 font-inter text-base leading-relaxed">
              If you haven't found the answer, please{" "}
              <Link
                href="/contact"
                className="text-primary font-medium hover:underline underline-offset-2"
              >
                contact us
              </Link>{" "}
              directly.
            </p>
          </div>
        </div>
        <div className="flex-1 h-full">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-200 px-6 bg-white hover:border-primary/50 transition-colors overflow-hidden"
              >
                <AccordionTrigger className="font-poppins font-medium text-lg text-black hover:text-primary hover:no-underline cursor-pointer">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="font-inter text-base text-black/70 leading-relaxed pt-2 text-justify">
                  {parseTextWithParagraphs(item.answer)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
