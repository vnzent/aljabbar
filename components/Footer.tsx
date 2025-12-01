import { contactInfo, navMenus, navSocialIcons } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#282828] py-16">
      <div className="mx-auto main-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Logo & Description - 4 columns */}
          <div className="lg:col-span-4 flex flex-col gap-8 justify-between">
            <div className="flex flex-col gap-5">
              <Link href="/">
                <Image
                  src="/logo-aljabbar.svg"
                  alt="Al-Jabbar House of Carpets"
                  width={150}
                  height={50}
                  className="w-auto h-12"
                />
              </Link>
              <p className="font-poppins text-sm text-white/80 font-light leading-relaxed max-w-sm">
                Al-Jabbar carpets is a retail carpet business which dates back
                to its originating date being march 1994. From the start we have
                been dedicated to providing the best quality carpets.
              </p>
            </div>
            <div className="flex gap-4 items-center">
              {navSocialIcons.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/70 transition-colors duration-300"
                >
                  <social.icon className="size-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Company - 2 columns */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="font-poppins font-semibold text-base text-white mb-1">
              Company
            </h3>
            <div className="flex flex-col gap-3">
              {navMenus.map((menu, index) => (
                <Link
                  href={menu.href}
                  key={index}
                  className="font-poppins text-sm text-white/80 hover:text-white transition-colors capitalize"
                >
                  {menu.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info - 3 columns */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h3 className="font-poppins font-semibold text-base text-white mb-1">
              Contact Info
            </h3>
            <div className="flex flex-col gap-3">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 text-white/80"
                >
                  <item.icon className="size-5 shrink-0 mt-0.5" />
                  <span className="font-poppins text-sm leading-relaxed">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Visit Us - 3 columns */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h3 className="font-poppins font-semibold text-base text-white mb-1">
              Visit Us
            </h3>
            <div className="w-full h-48 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2058844425815!2d106.81361831476876!3d-6.267027795469316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f187bbe4da75%3A0xd945aa908862d0e1!2sAl-Jabbar%20House%20Of%20Carpets%20%26%20Gallery!5e0!3m2!1sen!2sid!4v1733059200000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Al-Jabbar Location"
              />
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center font-poppins text-sm text-white/60">
            © {new Date().getFullYear()} Al-Jabbar Carpets. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
