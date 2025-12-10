import { uniqueSellingPoints } from "@/lib/data";
import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import HeaderSection from "../molecules/HeaderSection";

export default function UniqueSellingPoints() {
  return (
    <section className="w-full mx-auto main-wrapper">
      <div className="flex flex-col items-center gap-16 lg:gap-20 h-full">
        <HeaderSection isSubHeading heading="Why Choose Us" subHeading="Why Choose Us" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {uniqueSellingPoints.map((item, index) => (
            <Card
              key={index}
              className="border border-primary/50 mx-auto px-6 sm:px-8 lg:px-10 py-8 sm:py-10 gap-3 w-full"
            >
              <CardTitle className="font-poppins font-semibold text-lg flex flex-col gap-3">
                {<item.icon className="size-7 text-primary" />}
                {item.point}
              </CardTitle>
              <CardDescription className="font-inter font-normal text-sm sm:text-base text-black/70">
                {item.subpoint}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
