import { count } from "@/lib/data";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import CountUp from "@/components/atoms/CountUp";

export default function ValueCounter() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {count.map((item, index) => (
        <Card
          className="w-full bg-primary flex flex-col justify-between p-6 mx-auto gap-15"
          key={index}
        >
          <CardTitle>
            <span className="text-white font-poppins font-medium text-lg sm:text-xl">
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
              className="count-up-text font-poppins font-medium text-2xl sm:text-3xl lg:text-4xl text-white"
            />
            <span className="font-inter text-base font-normal text-gray-50 ">
              {item.subtitle}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
