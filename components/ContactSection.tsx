import { contacts, navSocialIcons } from "@/lib/data";
import { parseTextWithLineBreaks } from "@/lib/textParser";
import Link from "next/link";
import ContactForm from "./ContactForm";

export default function ContactSection() {

    return (
        <div className="main-wrapper mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
        <div className="flex flex-col gap-30 col-span-8">
          <div className="flex flex-col gap-8">
            <h2 className="font-poppins font-medium text-5xl text-black">
              We’d Love to Hear <br />
              From You
            </h2>
            <p className="font-poppins font-base text-base text-black max-w-xl text-justify">
              We are glad to invite you to our carpet showroom, or please leave
              a message in this form and we also have a whatsapp contact to
              connect with us anytime
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 ">
            {contacts.map((item, index) => (
              <div className="flex flex-col gap-1" key={index}>
                <h3 className="font-poppins text-xl font-base text-black">
                  {item.title}
                </h3>
                <p className="font-poppins text-base font-base text-black max-w-70">
                  {parseTextWithLineBreaks(item.subtitle)}
                </p>
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <p className="font-poppins text-xl font-base text-black">
                Find us on
              </p>
              <div className="flex gap-4 items-center">
                {navSocialIcons.map((icon, index) => (
                  <Link href={icon.href} className="text-black" key={index}>
                    {<icon.icon className="size-5" />}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <ContactForm />
        </div>
      </div>
    )
}