import { galleryLookBook } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";

export default function Gallery() {
  return (
    <section className="min-h-screen w-full mx-auto main-wrapper">
      <div className="flex flex-col gap-18">
        <div className="flex flex-col gap-3 items-center">
          <p className="uppercase font-poppins text-xl font-base">
            Gallery
          </p>
          <h2 className="font-poppins font-medium text-5xl capitalize">Explore Our Lookbook</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryLookBook.map((product, index) => (
            <Card className="" key={index}>
              <CardContent className="aspect-square flex flex-col">
                <Image
                  src={product.src}
                  alt={`Gallery ${index + 1}`}
                  width={800}
                  height={800}
                  className="object-cover overflow-hidden w-[800px] h-[500px]"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
