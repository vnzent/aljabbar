import Image from "next/image";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";

export default function About() {
  return (
    <main className="space-y-30">
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
      {/* About us */}
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
              <h2 className="text-black font-poppins font-medium text-4xl">
                About Us
              </h2>
            </div>
            <div className="flex flex-col gap-8 capitalize">
              <p className="font-inter font-light text-base text-black/70">
                Al-Jabbar carpets is a retail carpet business which dates back
                to its originating date being{" "}
                <span className="font-bold">march 1994</span>. From the start we
                have been dedicated to providing the best quality carpets.
              </p>
              <p className="font-inter font-light text-base text-black/70">
                Al-Jabbar carpets we specializes in{" "}
                <span className="font-bold">hand-made carpets</span> which come
                from different countries such as Iran, Pakistan, Afghanistan and
                Kashmir, machine-made carpets and mosque rugs from Iran and
                Turkey and wall to wall carpets from Europe and the United
                States of America.
              </p>
              <p className="font-inter font-light text-base text-black/70">
                Our collection can be viewed in any of our showrooms but also,
                we offer the service of bringing the carpets directly to your
                house without any charge and match the carpets with your
                interior.
              </p>
              <p className="font-inter font-light text-base text-black/70">
                We have a complete collection ranging from traditional rugs to
                modern rugs we have it all. We have been dedicated to not only
                providing the best quality carpets from day one but also truly
                focus on customer service and we assure you the experience you
                get in our showrooms will be one of a kind.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Vision Mision */}
      <section className="w-full relative ">
        <div className="bg-black/50 absolute inset-0">
          <div className="absolute -z-10 h-full overflow-hidden w-full">
            <Image
              src="/banner.jpg"
              alt="Banner"
              width={1280}
              height={700}
              className="w-full object-cover h-full "
            />
          </div>
        </div>
        <div className="relative z-10 main-wrapper mx-auto flex items-center min-h-200">
          <div className="flex gap-10 items-start justify-between w-full">
            <div className="flex flex-col gap-7 flex-1">
              <h3 className="font-poppins text-4xl text-white font-medium">
                Vision
              </h3>
              <div className="flex flex-col gap-5">
                <span className="bg-white h-0.5 w-40" />
                <p className="font-poppins text-xl text-white capitalize">
                  To implement market development and be a global market leader
                  in carpets.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-7 flex-1">
              <h3 className="font-poppins text-4xl text-white font-medium">
                Mision
              </h3>
              <div className="flex flex-col gap-5">
                <span className="bg-white h-0.5 w-40" />
                <p className="font-poppins text-xl text-white capitalize">
                  To infuse Al-Jabbar carpets to be incorporated in our
                  customers lifestyle, whether their home, office or place of
                  worship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
