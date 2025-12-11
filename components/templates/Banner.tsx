import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { whatsappContacts } from "@/lib/data";

function BannerComponent() {
  const _prefillMessage = encodeURIComponent(
    "Hello, I would like to consult about carpets. Can I get assistance?"
  );
  let kemangHref = whatsappContacts.kemang;
  if (/text=[^&]*/.test(kemangHref)) {
    kemangHref = kemangHref.replace(/text=[^&]*/g, `text=${_prefillMessage}`);
  } else if (kemangHref.includes("?")) {
    kemangHref = `${kemangHref}&text=${_prefillMessage}`;
  } else {
    kemangHref = `${kemangHref}?text=${_prefillMessage}`;
  }
  return (
    <section className="w-full relative">
      <div className="bg-black/30 absolute inset-0">
        <div className="absolute -z-10 h-full overflow-hidden w-full">
          <Image
            src="/banner2.jpg"
            alt="Banner"
            width={1280}
            height={700}
            className="w-full object-cover h-full"
          />
        </div>
      </div>
      <div className="relative z-5 flex items-center justify-center xl:justify-start min-h-85 sm:min-h-[450px] lg:min-h-[600px] main-wrapper mx-auto py-28 sm:py-36">
        <div className="flex flex-col w-full max-w-lg sm:max-w-xl lg:max-w-[600px] gap-3 bg-white px-6 sm:px-12 py-10 sm:py-12">
          <p className="uppercase text-primary font-poppins tracking-widest text-base sm:text-lg font-normal text-left">
            Consultation
          </p>
          <div className="flex flex-col gap-3 max-w-lg text-left">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-poppins font-medium leading-tight">
              Need Assistance Choosing
              <br className="hidden sm:block" /> the Right Carpet?
            </h3>
            <span className="bg-[#D9D9D9] w-full h-px max-w-lg" />
            <p className="text-sm sm:text-base font-poppins font-normal text-black/80">
              Our team is available 9 AM – 9 PM daily to guide you through
              styles, materials, and interior matching.
            </p>
          </div>
          <div className="flex mt-4 justify-center sm:justify-start">
            <Button className="w-full sm:w-fit" asChild>
              {/* Prefill WhatsApp message */}
              <Link href={kemangHref}>WHATSAPP NOW</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BannerComponent;
