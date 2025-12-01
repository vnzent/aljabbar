import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import Image from "next/image";

export default function Service() {

    return (
        <section className="w-full relative">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <Image
              src="/hero-bg.png"
              alt="Hero Background"
              fill={true}
              className="object-cover"
            />
          </div>
          <div className="bg-black/30 sm:bg-black/20 absolute -z-9 inset-0 w-full h-full"></div>
          <div className="h-200 w-full pb-45 flex main-wrapper justify-start items-end mx-auto">
            <div className="flex flex-col gap-5">
              <DynamicBreadcrumb />
              <div className="flex flex-col gap-3">
                <h1 className="text-white font-poppins font-medium text-5xl leading-tight text-[70px]">
                  Crafting Comfort &<br /> Elegance Since 1998
                </h1>
                <div className="flex gap-5 font-inter font-normal text-white capitalize text-lg">
                  A legacy of craftsmanship and refined interior taste.
                </div>
              </div>
            </div>
          </div>
        </section>
      );
}