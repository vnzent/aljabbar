import { navSocialIcons } from "@/lib/data";
import Link from "next/link";
import Map from "@/components/organisms/Map";

export default function InfoSection() {
  return (
    <div className="main-wrapper mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-5">
          <h2 className="font-poppins font-medium text-5xl text-black">
            We’d Love to Hear <br />
            From You
          </h2>
          <p className="font-poppins font-normal text-base text-black max-w-xl text-justify">
            We are glad to invite you to our carpet showroom, or please leave a
            message in this form and we also have a whatsapp contact to connect
            with us anytime
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          <div className="flex flex-col gap-2">
            <h3 className="font-poppins text-xl text-black">Email</h3>
            <p className="font-poppins text-base font-normal text-black/70 max-w-70">
              sales@aljabbarcarpets.com
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-poppins text-xl text-black">Phone number</h3>
            <p className="font-poppins text-base font-normal text-black/70 max-w-70">
              021-7197770
              <br />
              +6281-319-849-981
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-poppins text-xl text-black">We are open</h3>
            <p className="font-poppins text-base font-normal text-black/70 max-w-70">
              Monday – Friday 9 AM – 9 PM
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-poppins text-xl text-black">Find us on</h3>
            <div className="flex gap-4 items-center">
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
      <div className="w-full h-full min-h-[500px] lg:min-h-[600px]">
        <Map />
      </div>
    </div>
  );
}
