import Image from "next/image";

export default function VisionMision() {

    return (
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
    );
}