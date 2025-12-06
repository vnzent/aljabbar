import { navSocialIcons } from "@/lib/data";
import Link from "next/link";
import Map from "@/components/organisms/Map";

export default function InfoSection() {
  return (
    <div className="main-wrapper mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-start">
      <div className="flex flex-col gap-8 md:gap-10 lg:gap-12">
        <div className="flex flex-col gap-3 md:gap-4 lg:gap-5">
          <h2 className="font-poppins font-medium text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-black">
            We'd Love to Hear <br />
            From You
          </h2>
          <p className="font-poppins font-normal text-sm md:text-base text-black max-w-xl text-justify">
            We are glad to invite you to our carpet showroom, or please leave a
            message in this form and we also have a whatsapp contact to connect
            with us anytime
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          <div className="flex flex-col gap-1.5 md:gap-2">
            <h3 className="font-poppins text-lg md:text-xl text-black">
              Email
            </h3>
            <p className="font-poppins text-sm md:text-base font-normal text-black/70 max-w-70">
              sales@aljabbarcarpets.com
            </p>
          </div>
          <div className="flex flex-col gap-1.5 md:gap-2">
            <h3 className="font-poppins text-lg md:text-xl text-black">
              Phone number
            </h3>
            <p className="font-poppins text-sm md:text-base font-normal text-black/70 max-w-70">
              021-7197770
              <br />
              +6281-319-849-981
            </p>
          </div>
          <div className="flex flex-col gap-1.5 md:gap-2">
            <h3 className="font-poppins text-lg md:text-xl text-black">
              We are open
            </h3>
            <p className="font-poppins text-sm md:text-base font-normal text-black/70 max-w-70">
              Monday – Friday 9 AM – 9 PM
            </p>
          </div>
          <div className="flex flex-col gap-1.5 md:gap-2">
            <h3 className="font-poppins text-lg md:text-xl text-black">
              Find us on
            </h3>
            <div className="flex gap-3 md:gap-4 items-center">
              {navSocialIcons.map((icon, index) => (
                <Link
                  href={icon.href}
                  className="text-black hover:text-primary transition-colors"
                  key={index}
                >
                  {<icon.icon className="size-6" />}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[600px]">
        <Map />
      </div>
    </div>
  );
}
