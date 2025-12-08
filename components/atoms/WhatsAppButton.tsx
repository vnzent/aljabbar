import { linkContact } from "@/lib/data";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  return (
    <a
      id="floating-wa"
      href={linkContact}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 opacity-100 right-4 z-110 group"
    >
      <div className="relative flex items-center justify-center">
        {/* Text Tooltip - muncul di kiri button */}
        <div className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-white text-black px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg">
            Contact us on WhatsApp
            {/* Arrow pointer */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
              <div className="w-0 h-0 border-l-8 border-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </div>
          </div>
        </div>

        {/* Button Icon */}
        <div className="relative animate-bounce-slow bg-green-500 hover:bg-green-600 rounded-full p-2.5 md:p-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110">
          <FaWhatsapp size={28} className="text-white animate-spin-slow" />
        </div>
      </div>
    </a>
  );
};
