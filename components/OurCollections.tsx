import { collections } from "@/lib/data";
import Image from "next/image";
import HeaderBetween from "./HeaderBetween";

export default function OurCollections() {
  return (
    <section className="w-full">
      <div className="flex flex-col gap-10 main-wrapper mx-auto">
        <HeaderBetween
          heading="Our Collections"
          subheading={` Decades of serving customers with a diverse collection of \nrugs have built a strong foundation of trust and reliability.`}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {collections.map((item, index) => (
            <div className="group flex flex-col gap-3" key={index}>
              <div className="aspect-4/3 relative">
                <Image
                  src={item.src}
                  alt={item.name}
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="font-poppins font-normal text-lg">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
