import { ourProducts } from "@/lib/data";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import Image from "next/image";

export default function OurProducts() {
  return (
    <section className="min-h-screen w-full mx-auto main-wrapper">
      <div className="flex flex-col gap-18">
        <div className="flex justify-between items-center">
          <h2 className="font-poppins font-medium text-5xl capitalize">
            Our Products
          </h2>
          <Link href="/" className="uppercase font-inter text-lg font-normal">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ourProducts.map((product, index) => (
            <Card className="" key={index}>
              <CardContent className="aspect-square flex flex-col gap-3">
                <Image
                  src={product.src}
                  alt={product.name}
                  width={800}
                  height={500}
                  className="object-cover overflow-hidden w-[800px] h-[400px]"
                />
                <div className="">
                    <p className="font-poppins font-normal text-lg text-black">{product.name}</p>
                    <p className="font-poppins font-normal text-base text-black/60">{product.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
