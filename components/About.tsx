import Image from "next/image";
import { Button } from "./ui/button";

export default function About() {
  return (
    <section className="w-full min-h-screen relative">
      <div className="main-wrapper mx-auto flex gap-20 items-center">
        <div className="aspect-3/4 relative">
          <Image
            src="/about.png"
            alt="About Image"
            width={800}
            height={1000}
            className="object-cover overflow-hidden max-w-[700px] h-[800px]"
          />
          <div className="absolute -z-10 bottom-21 -right-10 bg-primary w-2xl h-48" />
        </div>
        <div className="flex flex-col gap-10 max-w-2xl px-10">
          <div className="flex gap-3 items-center">
            <span className="w-26 h-0.5 bg-primary" />
            <h2 className="text-black font-poppins font-medium text-5xl">
              About Us
            </h2>
          </div>
          <div className="flex flex-col gap-8 capitalize">
            <p className="font-inter font-light text-lg text-black/70">
              Al-Jabbar carpets is a retail carpet business which dates back to
              its originating date being march 1994. From the start we have been
              dedicated to providing the best quality carpets.{" "}
            </p>
            <p className="font-inter font-light text-lg text-black/70">
              Al-Jabbar carpets we specializes in hand-made carpets which come
              from different countries such as Iran, Pakistan, Afghanistan and
              Kashmir, machine-made carpets and mosque rugs from Iran and Turkey
              and wall to wall carpets from Europe and the United States of
              America.
            </p>
          </div>
          <Button className="text-lg font-poppins font-normal uppercase w-fit">
            more about us
          </Button>
        </div>
      </div>
    </section>
  );
}
