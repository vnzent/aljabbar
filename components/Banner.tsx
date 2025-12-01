import Image from "next/image";

export default function Banner() {
  return (
    <div className="w-full relative ">
      <div className="absolute -z-10 h-full overflow-hidden w-full">
        <Image
          src="/banner.jpg"
          alt="Banner"
          width={1280}
          height={700}
          className="w-full object-cover  h-full "
        />
      </div>
      <div className="max-w-7xl flex items-center justify-start min-h-300 mx-auto">
        <div className="flex flex-col w-[650px] gap-5 bg-white px-15 py-25">
          <p className="uppercase font-poppins text-2xl font-medium">
            Interior
          </p>
          <div className="flex flex-col gap-3 max-w-lg">
            <h3 className="text-4xl font-poppins font-medium capitalize leading-tight">
              Custom Carpets For Your <br />
              Unique Space
            </h3>
            <span className="bg-[#D9D9D9] w-full h-0.5 max-w-lg" />
            <p className="text-base capitalize font-poppins font-base">
              Choose your size, color, and material—crafted just for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
