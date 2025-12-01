import { uniqueSellingPoints } from "@/lib/data";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

export default function UniqueSellingPoints() {
  return (
    <section className="w-full mx-auto main-wrapper">
      <div className="flex flex-col items-center gap-20 h-full">
        <div className="flex flex-col gap-3 items-center">
          <p className="uppercase font-poppins text-xl font-base">
            Why Choose Us
          </p>
          <h2 className="font-poppins font-medium text-5xl">Why Choose Us</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {uniqueSellingPoints.map((item, index) => (
            <Card key={index} className="border border-primary/50 mx-auto px-10 py-10 gap-3">
              <CardTitle className="font-poppins font-semibold text-lg flex flex-col gap-3">
                {<item.icon className="size-7 text-primary" />}
                {item.point}
              </CardTitle>
              <CardDescription className="capitalize font-inter font-base text-base">
                {item.subpoint}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
