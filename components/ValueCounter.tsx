import { count } from "@/lib/data";
import { Card, CardContent, CardTitle } from "./ui/card";
import CountUp from "./CountUp";

export default function ValueCounter() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {count.map((item, index) => (
        <Card
          className="w-full bg-primary flex flex-col justify-between py-8 px-10 mx-auto gap-15"
          key={index}
        >
          <CardTitle>
            <span className="text-white font-poppins font-medium text-xl">
              {item.title}
            </span>
          </CardTitle>
          <CardContent className="flex flex-col gap-2">
            <CountUp
              from={0}
              to={
                typeof item.total === "number"
                  ? item.total
                  : parseFloat(item.total)
              }
              separator=","
              direction="up"
              duration={0.5}
              suffix={item.showPlus ? "+" : ""}
              className="count-up-text font-poppins font-medium text-4xl text-white"
            />
            <span className="font-inter text-xl text-white/80 font-normal">
              {item.subtitle}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
