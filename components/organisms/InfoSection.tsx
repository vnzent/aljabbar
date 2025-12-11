import Map from "@/components/organisms/Map";
import ContactIntro from "./ContactIntro";

export default function InfoSection() {
  return (
    <div className="main-wrapper mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-start">
      <ContactIntro variant="info" />
      <div className="w-full h-full min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[600px]">
        <Map />
      </div>
    </div>
  );
}
