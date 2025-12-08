import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function OurServices() {
  return (
    <section className="w-full mx-auto main-wrapper">
      <div className="flex flex-col gap-16 md:gap-24 lg:gap-30 items-center">
        <div className="flex flex-col gap-3 md:gap-4 lg:gap-5 text-center">
          <h2 className="font-poppins font-medium text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-black">
            Our Services
          </h2>
          <p className="font-inter text-base md:text-lg text-black/60 capitalize max-w-xl px-4">
            Decades of serving customers with a diverse collection of rugs have
            built a strong foundation of trust and reliability.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-x-30 lg:gap-y-15 items-center">
          <div className="w-full">
            <Image
              src="/our-collection-1.jpg"
              alt="Service 1"
              width={800}
              height={500}
              className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 md:gap-5 w-full">
            <h3 className="font-poppins font-medium text-2xl md:text-3xl text-black">
              Carpet Installation
            </h3>
            <p className="font-poppins text-base md:text-lg text-black/60 text-justify max-w-2xl">
              This is the service we provide for shaft roll and wall to wall
              carpets. We measure it according to your place and install the
              carpet and there is no charge for this considering you have bought
              from Al-Jabbar Carpets.
            </p>
            <Button className="w-full sm:w-fit font-poppins text-base md:text-lg text-white uppercase">
              Order Now
            </Button>
          </div>
          <div className="w-full lg:order-4">
            <Image
              src="/our-collection-3.jpg"
              alt="Service 2"
              width={800}
              height={500}
              className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 md:gap-5 w-full lg:order-3">
            <h3 className="font-poppins font-medium text-2xl md:text-3xl text-black">
              Carpet Washing (Premium Care)
            </h3>
            <p className="font-poppins text-base md:text-lg text-black/60 text-justify max-w-xl">
              When we send the carpet for wash to laundry due to the chemicals
              used and no proper care given the carpet loses its beautiful
              natural color. At Al-Jabbar we have trained specialized people
              that wash the carpets. Understanding this issue Al-Jabbar provides
              the service of carpet washing
            </p>
            <Button className="w-full sm:w-fit font-poppins text-base md:text-lg text-white uppercase">
              Order Now
            </Button>
          </div>
          <div className="w-full lg:order-5">
            <Image
              src="/our-collection-2.jpg"
              alt="Service 3"
              width={800}
              height={500}
              className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 md:gap-5 w-full lg:order-6">
            <h3 className="font-poppins font-medium text-2xl md:text-3xl text-black">
              Carpet Repairing
            </h3>
            <p className="font-poppins text-base md:text-lg text-black/60 text-justify max-w-xl">
              At Al-Jabbar Carpets we also repair your carpets. Please contact
              us for further inquiry/information at our WhatsApp number.
            </p>
            <Button className="w-full sm:w-fit font-poppins text-base md:text-lg text-white uppercase">
              Order Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
