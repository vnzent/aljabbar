"use client";

import { useState, useRef } from "react";
import { whatsappContacts } from "@/lib/data";
import { FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";

export default function WhatsappButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const contacts = [
    { name: "Kemang", link: whatsappContacts.kemang },
    { name: "Kebayoran Baru", link: whatsappContacts.kebayoranBaru },
  ];

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 100);
  };

  return (
    <div
      className="fixed bottom-4 right-4 z-110 flex flex-col items-end gap-3"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Second Contact Button - Shows when expanded, appears above first button */}
      <div
        className={cn(
          "relative transition-all duration-300 origin-bottom",
          isExpanded
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        )}
      >
        <a
          href={contacts[0].link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat ${contacts[0].name} via WhatsApp`}
          className="group/item relative flex items-center justify-center"
        >
          {/* Tooltip */}
          <div className="absolute right-full mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-white text-black px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg">
              {contacts[0].name}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                <div className="w-0 h-0 border-l-8 border-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="bg-green-500 hover:bg-green-600 rounded-full p-2.5 md:p-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110">
            <FaWhatsapp size={28} className="text-white" />
          </div>
        </a>
      </div>

      {/* First Contact Button - Always visible at bottom */}
      <div className="relative">
        <a
          href={contacts[1].link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat ${contacts[1].name} via WhatsApp`}
          className="group/item relative flex items-center justify-center"
        >
          {/* Tooltip */}
          <div className="absolute right-full mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-white text-black px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg">
              {contacts[1].name}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                <div className="w-0 h-0 border-l-8 border-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
              </div>
            </div>
          </div>

          {/* Button */}
          <div
            className={cn(
              "bg-green-500 hover:bg-green-600 rounded-full p-2.5 md:p-3 transition-all duration-300 shadow-lg hover:shadow-xl",
              !isExpanded && "animate-bounce-slow"
            )}
          >
            <FaWhatsapp size={28} className="text-white" />
          </div>
        </a>
      </div>
    </div>
  );
}
