"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { MdOutlineCheck } from "react-icons/md";
import { cn } from "@/lib/utils";
import { FiChevronDown } from "react-icons/fi";
import { Button } from "../ui";

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
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Language Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "flex justify-start gap-1.5 items-center transition-all duration-300 hover:cursor-pointer w-full",
          shouldBeWhite
            ? "text-black hover:text-primary"
            : "text-white hover:text-primary"
        )}
        aria-label="Select language"
      >
        <span className="text-xl">{currentLanguage.flag}</span>
        <span className="text-lg font-medium uppercase hidden sm:inline">
          {currentLanguage.code}
        </span>
          <FiChevronDown
            className={cn(
              "size-5 transition-transform duration-200 cursor-pointer",
              isOpen && "rotate-180"
            )}
          />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-0 lg:top-full right-0 pt-2 z-50">
          <div
            className={cn(
              "w-45 bg-white shadow-2xl border border-gray-100 overflow-hidden",
              "animate-in fade-in slide-in-from-top-2 duration-200"
            )}
          >
            <div className="">
              {languages.map((language) => (
                <Button
                  variant="ghost"
                  key={language.code}
                  onClick={() => switchLocale(language.code)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-6 text-left transition-all duration-200 rounded-none",
                    "hover:bg-primary/10 active:bg-primary/20 hover:cursor-pointer",
                    locale === language.code
                      ? "bg-primary/30 text-primary"
                      : "text-gray-700"
                  )}
                >
                  <span className="text-xl">{language.flag}</span>
                  <span className="flex-1 font-medium">{language.name}</span>
                  {locale === language.code && (
                    <MdOutlineCheck className="size-4 lg:size-5 text-primary" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
