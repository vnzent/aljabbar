import { collections } from "@/lib/data";
import Image from "next/image";

export default function OurCollections() {
  return (
    <section className="w-full min-h-screen py-30">
      <div className="flex flex-col gap-10 px-8 max-w-[1575px] mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="font-poppins text-[38px] font-medium text-black">
            Our Collections
          </h2>
          <p className="font-inter font-normal text-base text-black/60 capitalize">
            Decades of serving customers with a diverse collection of
            <br /> rugs have built a strong foundation of trust and reliability.
          </p>
        </div>
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
