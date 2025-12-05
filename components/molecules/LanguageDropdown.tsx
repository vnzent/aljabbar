"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ChevronDown, Check } from "lucide-react";
import { HiLanguage } from "react-icons/hi2";
import { cn } from "@/lib/utils";

interface LanguageDropdownProps {
  shouldBeWhite: boolean;
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "id", name: "Indonesia", flag: "🇮🇩" },
];

export default function LanguageDropdown({
  shouldBeWhite,
}: LanguageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Language Toggle Button */}
      <button
        className={cn(
          "flex items-center gap-1.5 p-2 rounded-lg transition-all duration-300 hover:cursor-pointer",
          shouldBeWhite
            ? "text-black hover:bg-gray-100 hover:text-primary"
            : "text-white hover:bg-white/10 hover:text-primary"
        )}
        aria-label="Select language"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium uppercase hidden sm:inline">
          {currentLanguage.code}
        </span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 pt-2 z-50">
          <div
            className={cn(
              "w-44 bg-white shadow-2xl border border-gray-100 overflow-hidden",
              "animate-in fade-in slide-in-from-top-2 duration-200"
            )}
          >
            <div className="">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => switchLocale(language.code)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200",
                    "hover:bg-primary/10 active:bg-primary/20 hover:cursor-pointer",
                    locale === language.code
                      ? "bg-primary/30 text-primary"
                      : "text-gray-700"
                  )}
                >
                  <span className="text-xl">{language.flag}</span>
                  <span className="flex-1 font-medium">{language.name}</span>
                  {locale === language.code && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
