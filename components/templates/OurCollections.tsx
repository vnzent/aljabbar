import Image from "next/image";
import HeaderBetween from "@/components/templates/HeaderBetween";
import Link from "next/link";
import { collectionCategories } from "@/lib/data";

interface OurCollectionsProps {
  id?: string;
}

export default function OurCollections({id}: OurCollectionsProps) {
  return (
    <section className="w-full" id={id}>
      <div className="flex flex-col gap-10 main-wrapper mx-auto">
        <HeaderBetween
          heading="Our Collections"
          subheading={` Decades of serving customers with a diverse collection of \nrugs have built a strong foundation of trust and reliability.`}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {collectionCategories.map((item, index) => (
            <div className="group flex flex-col gap-3" key={index}>
              <div className="aspect-4/3 relative">
                <Image
                  src={item.src}
                  alt={item.name}
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
              <Link
                href={`/collections/${item.slug}`}
                className="font-poppins font-normal text-lg text-black underline underline-offset-2 transition-colors duration-500 hover:text-primary w-fit"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
