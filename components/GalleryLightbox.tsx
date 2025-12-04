"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface GalleryLightboxProps {
  images: { src: string }[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function GalleryLightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
}: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length); // Loop to start
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length); // Loop to end
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 bg-black/80 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button */}
      <Button
      variant="ghost"
        onClick={onClose}
        className="absolute top-4 right-4 z-110 text-white cursor-pointer"
        aria-label="Close"
      >
        <X className="w-8 h-8" />
      </Button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-110 text-white font-poppins text-lg">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous Button */}
      <Button
        onClick={(e) => {
          e.stopPropagation();
          handlePrevious();
        }}
        className="absolute left-4 z-110 text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/10 rounded-full"
        aria-label="Previous"
      >
        <ChevronLeft className="w-10 h-10" />
      </Button>

      {/* Image Container */}
      <div
        className="relative max-w-7xl max-h-[90vh] w-full mx-4 shrink-0 flex justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex].src}
          alt={`Gallery image ${currentIndex + 1}`}
          width={1920}
          height={1080}
          className="w-[1000px] h-[800px] object-cover"
          priority
        />
      </div>

      {/* Next Button */}
      <Button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-4 z-110 text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/10 rounded-full"
        aria-label="Next"
      >
        <ChevronRight className="w-10 h-10" />
      </Button>
    </div>
  );
}
