import { navSocialIcons } from "@/lib/data";
import Link from "next/link";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <div className="main-wrapper mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
      <div className="flex flex-col col-span-8 justify-around">
        <div className="flex flex-col gap-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 ">
          <div className="flex flex-col gap-1">
            <h3 className="font-poppins text-xl font-normal text-black">
              Email
            </h3>
            <p className="font-poppins text-base font-normal text-black max-w-70">
              sales@aljabbarcarpets.com
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-poppins text-xl font-normal text-black">
              Phone
            </h3>
            <p className="font-poppins text-base font-normal text-black max-w-70">
              021-7197770
              <br />
              +6281-319-849-981
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-4">
        <ContactForm />
      </div>
    </div>
  );
}
