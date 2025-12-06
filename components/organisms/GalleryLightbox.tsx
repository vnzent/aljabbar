"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 300);
  }, [images.length, isAnimating]);

  const handlePrevious = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 300);
  }, [images.length, isAnimating]);

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
  }, [handleNext, handlePrevious, isOpen, onClose]);

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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 bg-black/95 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-linear-to-b from-black/50 to-transparent z-110 flex items-center justify-between px-6">
        {/* Counter */}
        <div className="text-white/90 font-poppins text-sm tracking-wider">
          <span className="text-white font-semibold text-lg">
            {currentIndex + 1}
          </span>
          <span className="mx-2 text-white/50">/</span>
          <span className="text-white/70">{images.length}</span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 group"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrevious();
        }}
        className={cn(
          "absolute left-4 md:left-8 z-110 w-12 h-12 rounded-full",
          "bg-white/10 hover:bg-white/20 backdrop-blur-sm",
          "flex items-center justify-center transition-all duration-200",
          "group hover:scale-110"
        )}
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className={cn(
          "absolute right-4 md:right-8 z-110 w-12 h-12 rounded-full",
          "bg-white/10 hover:bg-white/20 backdrop-blur-sm",
          "flex items-center justify-center transition-all duration-200",
          "group hover:scale-110"
        )}
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
      </button>

      {/* Image Container */}
      <div
        className="relative w-full h-full flex items-center justify-center px-16 md:px-24 py-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={cn(
            "relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center",
            "transition-opacity duration-300",
            isAnimating ? "opacity-50" : "opacity-100"
          )}
        >
          <Image
            src={images[currentIndex].src}
            alt={`Gallery image ${currentIndex + 1}`}
            width={1920}
            height={1080}
            className="max-w-full max-h-[80vh] w-auto h-auto object-contain"
            priority
          />
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-black/70 to-transparent z-110">
        <div className="h-full flex items-center justify-center gap-2 px-4 overflow-x-auto scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={cn(
                "relative w-14 h-14 rounded-lg overflow-hidden shrink-0 transition-all duration-200",
                index === currentIndex
                  ? "ring-2 ring-white ring-offset-2 ring-offset-black/50 scale-110"
                  : "opacity-50 hover:opacity-80"
              )}
            >
              <Image
                src={image.src}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="56px"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard Hint */}
      {/* <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-110 hidden md:flex items-center gap-4 text-white/40 text-xs">
        <span className="flex items-center gap-1.5">
          <kbd className="px-2 py-1 bg-white/10 rounded text-white/60">←</kbd>
          <kbd className="px-2 py-1 bg-white/10 rounded text-white/60">→</kbd>
          <span>Navigate</span>
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-2 py-1 bg-white/10 rounded text-white/60">ESC</kbd>
          <span>Close</span>
        </span>
      </div> */}
    </div>
  );
}
