import { navSocialIcons } from "@/lib/data";
import Link from "next/link";
import ContactForm from "@/components/organisms/ContactForm";

export default function ContactSection() {
  return (
    <div className="main-wrapper mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12">
      <div className="flex flex-col lg:col-span-8 justify-around gap-8 md:gap-10">
        <div className="flex flex-col gap-5 md:gap-6 lg:gap-8">
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
          <div className="flex flex-col gap-1">
            <h3 className="font-poppins text-lg md:text-xl font-normal text-black">
              Email
            </h3>
            <p className="font-poppins text-sm md:text-base font-normal text-black max-w-70">
              sales@aljabbarcarpets.com
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-poppins text-lg md:text-xl font-normal text-black">
              Phone
            </h3>
            <p className="font-poppins text-sm md:text-base font-normal text-black max-w-70">
              021-7197770
              <br />
              +6281-319-849-981
            </p>
          </div>
        </div>
      </div>
      <div className="lg:col-span-4">
        <ContactForm />
      </div>
    </div>
  );
}
