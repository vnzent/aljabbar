import { branches } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function Branches() {
  // Split branches: first 4 (Jakarta - Banten) on left, rest on right
  const leftBranches = branches.slice(0, 4);
  const rightBranches = branches.slice(4);

  return (
    <section className="w-full mx-auto main-wrapper">
      <div className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-3 md:gap-4 lg:gap-5 text-center">
          <p className="uppercase text-xl sm:text-2xl md:text-2xl lg:text-3xl font-poppins text-black">
            Branches
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-poppins font-medium text-black">
            AL-JABBAR Carpets
          </h2>
        </div>
        {/* Mobile: Single Accordion */}
        <div className="md:hidden">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {branches.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-200 px-4 bg-white hover:border-primary/50 transition-colors overflow-hidden"
              >
                <AccordionTrigger className="font-poppins font-medium text-base text-black hover:text-primary hover:no-underline cursor-pointer py-3">
                  {item.city}
                </AccordionTrigger>
                <AccordionContent className="font-inter text-sm text-black/70 pb-3">
                  <div className="space-y-4 pt-2">
                    {item.store.map((store, storeIndex) => (
                      <div
                        key={storeIndex}
                        className="pl-4 border-l-2 border-primary/20 py-2"
                      >
                        <p className="font-semibold text-black mb-1.5">
                          {store.name}
                        </p>
                        <Link
                          href="#"
                          className="text-sm leading-relaxed mb-2 underline underline-offset-3 cursor-pointer hover:text-primary"
                        >
                          {store.address}
                        </Link>
                        {"dial" in store && store.dial && (
                          <p className="text-sm font-medium text-primary">
                            {store.dial}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Desktop: Two Column Layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
          {/* Left Column */}
          <div className="flex-1">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-3 md:space-y-4"
            >
              {leftBranches.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-gray-200 px-4 md:px-5 lg:px-6 bg-white hover:border-primary/50 transition-colors overflow-hidden"
                >
                  <AccordionTrigger className="font-poppins font-medium text-base md:text-lg text-black hover:text-primary hover:no-underline cursor-pointer py-3 md:py-4">
                    {item.city}
                  </AccordionTrigger>
                  <AccordionContent className="font-inter text-sm md:text-base text-black/70 pb-3 md:pb-4">
                    <div className="space-y-4 pt-2">
                      {item.store.map((store, storeIndex) => (
                        <div
                          key={storeIndex}
                          className="pl-4 border-l-2 border-primary/20 py-2"
                        >
                          <p className="font-semibold text-black mb-1.5">
                            {store.name}
                          </p>
                          <Link
                            href="#"
                            className="text-sm leading-relaxed mb-2 underline underline-offset-3 cursor-pointer hover:text-primary"
                          >
                            {store.address}
                          </Link>
                          {"dial" in store && store.dial && (
                            <p className="text-sm font-medium text-primary">
                              {store.dial}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right Column */}
          <div className="flex-1">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-3 md:space-y-4"
            >
              {rightBranches.map((item, index) => (
                <AccordionItem
                  key={index + 4}
                  value={`item-${index + 4}`}
                  className="border border-gray-200 px-4 md:px-5 lg:px-6 bg-white hover:border-primary/50 transition-colors overflow-hidden"
                >
                  <AccordionTrigger className="font-poppins font-medium text-base md:text-lg text-black hover:text-primary hover:no-underline cursor-pointer py-3 md:py-4">
                    {item.city}
                  </AccordionTrigger>
                  <AccordionContent className="font-inter text-sm md:text-base text-black/70 pb-3 md:pb-4">
                    <div className="space-y-4 pt-2">
                      {item.store.map((store, storeIndex) => (
                        <div
                          key={storeIndex}
                          className="pl-4 border-l-2 border-primary/20 py-2"
                        >
                          <p className="font-semibold text-black mb-1.5">
                            {store.name}
                          </p>
                          <Link
                            href="#"
                            className="text-sm leading-relaxed mb-2 underline underline-offset-3 cursor-pointer hover:text-primary"
                          >
                            {store.address}
                          </Link>
                          {"dial" in store && store.dial && (
                            <p className="text-sm font-medium text-primary">
                              {store.dial}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
