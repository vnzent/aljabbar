"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "../ui/button";

export default function FixedContactButton() {
  const [isVisible, setIsVisible] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Observer untuk footer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Jika footer terlihat, sembunyikan button
          setIsVisible(!entry.isIntersecting);
        });
      },
      {
        threshold: 0,
        rootMargin: "0px",
      }
    );

    // Cari footer element
    const footer = document.querySelector("footer");
    if (footer && observerRef.current) {
      observerRef.current.observe(footer);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="container mx-auto">
        <Button className="w-full text-base md:text-lg">
          Contact Us for This Product
        </Button>
      </div>
    </div>
  );
}
