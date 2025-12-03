"use client";

import { useRef, useState, useEffect } from "react";
import SearchModal from "./SearchModal";
import Link from "next/link";
import { Button } from "./ui/button";
import { BiSearch } from "react-icons/bi";
import { HiLanguage } from "react-icons/hi2";
import { IoCallOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import Image from "next/image";
import { navMenus, navSocialIcons } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          isScrolled ? "bg-white shadow-md py-3" : "bg-transparent"
        )}
      >
        <nav className="container mx-auto px-4 flex flex-col">
          {/* Top Bar */}
          <div
            className={cn(
              "flex justify-between border-b py-3 transition-colors duration-300",
              isScrolled
                ? "text-black border-black/30 hover:text-primary"
                : "text-white border-white/20"
            )}
          >
            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <IoCallOutline className="size-7" />
                <span className="text-lg font-poppins font-normal">
                  Call us today! (021) 7197770
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <AiOutlineMail className="size-6" />
                <span className="text-lg font-poppins font-normal">
                  sales@aljabbarcarpets.com
                </span>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              {navSocialIcons.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className={cn(
                    "transition-colors duration-300",
                    isScrolled
                      ? "text-black hover:text-primary"
                      : "text-white hover:text-black"
                  )}
                >
                  <social.icon className="size-7" />
                </Link>
              ))}
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex justify-between items-center pt-5 pb-3">
            {/* Logo */}
            <Link href="/" className="">
              <Image
                src={cn(isScrolled ? "/logo-black.svg" : "/logo-white.svg")}
                alt="logo"
                width={150}
                height={50}
                className="w-50 h-full"
              />
            </Link>

            {/* Navigation Links */}
            <div
              className={cn(
                "flex gap-6 items-center hover:text-black transition-colors duration-300",
                isScrolled ? "text-black hover:text-primary" : "text-white"
              )}
            >
              {navMenus.map((menu, index) => (
                <Link
                  key={index}
                  href={menu.href}
                  className={cn(
                    "uppercase font-poppins text-lg font-normal transition-colors duration-300",
                    isScrolled
                      ? "text-black hover:text-primary"
                      : "text-white hover:text-black"
                  )}
                >
                  {menu.name}
                </Link>
              ))}
              {/* Icon Buttons */}
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                  asChild
                >
                  <span
                    className={cn(
                      "hidden sm:inline text-sm cursor-pointer transition-colors duration-300",
                      isScrolled
                        ? "text-black hover:text-primary"
                        : "text-white hover:text-black"
                    )}
                  >
                    <HiLanguage className="size-5" />
                  </span>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                  asChild
                >
                  <span
                    className={cn(
                      "hidden sm:inline text-sm cursor-pointer transition-colors duration-300",
                      isScrolled
                        ? "text-black hover:text-primary"
                        : "text-white hover:text-black"
                    )}
                  >
                    <BiSearch className="size-5" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
