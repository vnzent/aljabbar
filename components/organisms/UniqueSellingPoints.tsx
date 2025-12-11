import { uniqueSellingPoints } from "@/lib/data";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import HeaderSection from "../molecules/HeaderSection";
import SectionWrapper from "./SectionWrapper";

export default function UniqueSellingPoints() {
  return (
    <section className="w-full mx-auto main-wrapper">
      <SectionWrapper>
        <HeaderSection
          isSubHeading
          heading="Why Choose Us"
          subHeading="Why Choose Us"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uniqueSellingPoints.map((item, index) => (
            <Card
              key={index}
              className="border group hover:bg-primary/80 border-primary/50 mx-auto px-6 sm:px-8 lg:px-10 py-8 sm:py-10 gap-1 w-full transition-colors duration-300"
            >
              <CardTitle className="font-poppins text-lg flex flex-col gap-6 group-hover:text-white">
                {
                  <item.icon className="size-7 text-primary group-hover:text-white" />
                }
                {item.point}
              </CardTitle>
              <CardDescription className="font-inter font-light text-sm sm:text-base text-text group-hover:text-white">
                {item.subpoint}
              </CardDescription>
            </Card>
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
