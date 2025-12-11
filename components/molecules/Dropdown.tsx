"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = {
  value: string | number;
  label: string;
};

interface DropdownProps {
  options: Option[];
  selectedValue: string | number;
  onSelect: (value: string | number) => void;
  buttonLabel?: string;
  align?: "left" | "right";
  buttonClassName?: string;
  listWidthClass?: string; // e.g. 'w-64' or 'w-full'
  showCheck?: boolean;
}

export default function Dropdown({
  options,
  selectedValue,
  onSelect,
  buttonLabel,
  align = "left",
  buttonClassName,
  listWidthClass = "w-full",
  showCheck = true,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    buttonLabel ||
    options.find((o) => o.value === selectedValue)?.label ||
    (options[0]?.label ?? "Select");

  return (
    <div
      ref={dropdownRef}
      className="relative flex-1 md:flex-none md:inline-block"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between gap-3 px-2 md:px-2 py-1.5 md:py-2 w-full md:max-w-[200px]",
          "border border-gray-300 bg-white",
          "hover:border-primary/50 hover:cursor-pointer transition-colors duration-200",
          "text-sm font-normal text-gray-700",
          buttonClassName
        )}
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute mt-2 w-full bg-white border border-gray-200 shadow-lg overflow-hidden z-9999",
            align === "right" ? "right-0" : "left-0",
            listWidthClass
          )}
        >
          <div>
            {options.map((option) => (
              <button
                key={String(option.value)}
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full md:w-max px-2 md:px-3 py-3 text-left text-xs lg:text-sm transition-colors duration-150 cursor-pointer flex items-center justify-between gap-2",
                  selectedValue === option.value
                    ? "bg-primary/5 text-primary font-medium"
                    : "text-gray-700 hover:bg-primary/5"
                )}
              >
                <span>{option.label}</span>
                {showCheck && selectedValue === option.value && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
