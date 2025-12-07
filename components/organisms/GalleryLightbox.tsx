"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { RxCross1 } from "react-icons/rx";
import {
  MdArrowBack,
  MdArrowBackIos,
  MdArrowForward,
  MdArrowForwardIos,
} from "react-icons/md";

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
      <div className="absolute top-3 lg:top-5 left-0 right-0 h-16 bg-linear-to-b from-black/50 to-transparent z-110 flex items-center justify-between px-6">
        {/* Counter */}
        <div className="text-white/90 font-poppins text-sm tracking-wider">
          <span className="text-primary font-semibold text-lg lg:text-xl">
            {currentIndex + 1}
          </span>
          <span className="mx-2 text-white/50">/</span>
          <span className="text-white/70 text-base lg:text-lg">
            {images.length}
          </span>
        </div>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="size-10 rounded-full bg-primary flex items-center justify-center transition-all duration-200 group cursor-pointer hover:scale-110"
          aria-label="Close"
        >
          <RxCross1 className="size-5 md:size-6 text-white cursor-pointer" />
        </Button>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          handlePrevious();
        }}
        className={cn(
          "absolute left-4 md:left-8 z-110 size-8 md:size-12 rounded-full",
          "bg-primary backdrop-blur-sm",
          "flex items-center justify-center transition-all duration-200",
          "group hover:scale-110 cursor-pointer"
        )}
        aria-label="Previous"
      >
        <MdArrowBack className="size-5 md:size-6 text-white" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className={cn(
          "absolute right-4 md:right-8 z-110 size-8 md:size-12 rounded-full",
          "bg-primary backdrop-blur-sm",
          "flex items-center justify-center transition-all duration-200",
          "group hover:scale-110 cursor-pointer"
        )}
        aria-label="Next"
      >
        <MdArrowForward className="size-5 md:size-6 text-white" />
      </Button>

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
        <div className="h-full flex items-center justify-center gap-5 px-4 overflow-x-auto scrollbar-hide">
          {images.map((image, index) => (
            <Button
              variant="ghost"
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={cn(
                "relative w-14 h-14 rounded-none overflow-hidden shrink-0 transition-all duration-200 cursor-pointer",
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
            </Button>
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
