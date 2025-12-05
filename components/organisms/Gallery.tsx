"use client";

import { galleryLookBook } from "@/lib/data";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import GalleryLightbox from "@/components/organisms/GalleryLightbox";

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <section className="min-h-screen w-full mx-auto main-wrapper">
        <div className="flex flex-col gap-18">
          <div className="flex flex-col gap-3 items-center">
            <p className="uppercase font-poppins text-xl font-normal">
              Gallery
            </p>
            <h2 className="font-poppins font-medium text-5xl capitalize">
              Explore Our Lookbook
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryLookBook.map((product, index) => (
              <Card
                className="cursor-pointer group overflow-hidden"
                key={index}
                onClick={() => handleImageClick(index)}
              >
                <CardContent className="aspect-square flex flex-col p-0">
                  <div className="relative w-full h-[500px] overflow-hidden">
                    <Image
                      src={product.src}
                      alt={`Gallery ${index + 1}`}
                      width={800}
                      height={800}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <GalleryLightbox
        images={galleryLookBook}
        initialIndex={selectedIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
