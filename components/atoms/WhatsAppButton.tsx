"use client";

import { useState } from "react";
import { whatsappContacts } from "@/lib/data";
import { FaWhatsapp } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { cn } from "@/lib/utils";

export default function WhatsappButton() {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    { name: "Kebayoran Baru", link: whatsappContacts.kebayoranBaru },
    { name: "Kemang", link: whatsappContacts.kemang },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-110 flex flex-col items-end gap-3">
      {/* WhatsApp Contact Buttons - Show when open */}
      <div
        className={cn(
          "flex flex-col items-end gap-3 transition-all duration-300 origin-bottom",
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        {contacts.map((contact, index) => (
          <a
            key={contact.name}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/item relative flex items-center justify-center transform transition-all duration-300"
            style={{
              transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isOpen ? 1 : 0,
            }}
          >
            {/* Tooltip */}
            <div className="absolute right-full mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-white text-black px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg">
                {contact.name}
                {/* Arrow pointer */}
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
        ))}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center"
      >
        {/* Tooltip - Only show when closed */}
        {!isOpen && (
          <div className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-white text-black px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg">
              Contact us on WhatsApp
              {/* Arrow pointer */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                <div className="w-0 h-0 border-l-8 border-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
              </div>
            </div>
          </div>
        )}

        {/* Button Icon */}
        <div
          className={cn(
            "relative rounded-full p-2.5 md:p-3 shadow-lg hover:shadow-xl cursor-pointer",
            "transition-all duration-300 ease-in-out",
            isOpen
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600 animate-bounce-slow hover:scale-110"
          )}
        >
          <div className="relative w-7 h-7 flex items-center justify-center">
            <RxCross1
              size={28}
              className={cn(
                "text-white absolute inset-0 transition-all duration-300",
                isOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 rotate-90 scale-0"
              )}
            />
            <FaWhatsapp
              size={28}
              className={cn(
                "text-white absolute inset-0 transition-all duration-300",
                isOpen
                  ? "opacity-0 -rotate-90 scale-0"
                  : "opacity-100 rotate-0 scale-100"
              )}
            />
          </div>
        </div>
      </button>
    </div>
  );
}
