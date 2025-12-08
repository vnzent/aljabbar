"use client";

import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SearchModal from "@/components/molecules/SearchModal";
import CollectionsDropdown from "@/components/molecules/CollectionsDropdown";
import LanguageDropdown from "@/components/molecules/LanguageDropdown";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { IoCallOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import Image from "next/image";
import { navMenus, navSocialIcons } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "../ui";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const pathname = usePathname();

  // Check if we're on collections or product detail page
  const isCollectionPage = pathname?.includes("/collections");
  const shouldBeWhite = isScrolled || isCollectionPage;

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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          shouldBeWhite || isMobileMenuOpen ? "bg-white" : "bg-transparent"
        )}
      >
        <nav className="container mx-auto px-4 flex flex-col">
          {/* Top Bar - Hidden on mobile */}
          <div
            className={cn(
              "hidden lg:flex justify-between border-b py-3 transition-colors duration-300",
              shouldBeWhite
                ? "text-black border-black/60"
                : "text-white border-white"
            )}
          >
            <div className="flex gap-5 items-center">
              <div className="flex gap-2 items-center">
                <IoCallOutline className="size-5" />
                <span className="text-base font-poppins font-normal">
                  Call us today! (021) 7197770
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <AiOutlineMail className="size-5" />
                <span className="text-base font-poppins font-normal">
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
                    "transition-colors duration-300 hover:text-primary",
                    shouldBeWhite ? "text-black" : "text-white"
                  )}
                >
                  <social.icon className="size-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex justify-between items-center py-3 lg:pt-5">
            {/* Logo */}
            <Link href="/" className="z-50">
              <Image
                src={cn(
                  shouldBeWhite || isMobileMenuOpen
                    ? "/logo-black.png"
                    : "/logo-white.png"
                )}
                alt="Al-Jabbar - House of Carpets Logo"
                width={150}
                height={50}
                className="w-32 sm:w-40 md:w-45 lg:w-50 h-auto"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div
              className={cn(
                "hidden lg:flex gap-4 xl:gap-6 items-center transition-colors duration-300",
                shouldBeWhite ? "text-black" : "text-white"
              )}
            >
              <div className="flex gap-4 xl:gap-6">
                {navMenus.map((menu, index) => {
                  // Special handling for Collections menu
                  if (menu.name === "Collections") {
                    return (
                      <CollectionsDropdown
                        key={index}
                        shouldBeWhite={shouldBeWhite}
                      />
                    );
                  }

                  return (
                    <Link
                      key={index}
                      href={menu.href}
                      className={cn(
                        "uppercase font-poppins text-base xl:text-lg font-normal transition-colors duration-300 hover:text-primary",
                        shouldBeWhite ? "text-black" : "text-white"
                      )}
                    >
                      {menu.name}
                    </Link>
                  );
                })}
              </div>
              {/* Desktop Icon Buttons */}
              <div className="flex gap-5 items-center">
                <LanguageDropdown
                  shouldBeWhite={shouldBeWhite}
                  isMobileMenuOpen={isMobileMenuOpen}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className={cn(
                    "p-2 transition-all duration-300 hover:cursor-pointer",
                    shouldBeWhite
                      ? "text-black hover:text-primary"
                      : "text-white hover:text-primary"
                  )}
                  aria-label="Search"
                >
                  <BiSearch className="size-5 lg:size-6" />
                </Button>
              </div>
            </div>

            {/* Mobile Icons & Hamburger */}
            <div className="flex lg:hidden gap-2 items-center z-50">
              <LanguageDropdown
                shouldBeWhite={shouldBeWhite}
                isMobileMenuOpen={isMobileMenuOpen}
              />
              <Button
                variant="ghost"
                size="icon-lg"
                onClick={() => setIsSearchOpen(true)}
                className={cn(
                  "transition-all duration-300",
                  shouldBeWhite || isMobileMenuOpen
                    ? "text-black"
                    : "text-white"
                )}
                aria-label="Search"
              >
                <BiSearch className="size-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "p-2 rounded-lg transition-all duration-300",
                  shouldBeWhite ? "text-black" : "text-white"
                )}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <RxCross1 className="size-6 text-black" />
                ) : (
                  <RxHamburgerMenu className="size-6" />
                )}
              </Button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden fixed inset-0 border-t border-black/60 top-16 bg-white transition-all duration-300 h-dvh w-full overflow-hidden",
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="container mx-auto px-4 py-8">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-6 mb-8">
              {navMenus.map((menu, index) => {
                // Special handling for Collections menu in mobile
                if (menu.name === "Collections") {
                  return (
                    <div key={index} className="border-b border-gray-200 pb-4">
                      <CollectionsDropdown shouldBeWhite={true} />
                    </div>
                  );
                }

                return (
                  <Link
                    key={index}
                    href={menu.href}
                    className="uppercase font-poppins text-lg font-normal text-black hover:text-primary transition-colors border-b border-gray-200 pb-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {menu.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Contact Info */}
            <div className="flex flex-col gap-4 mb-8 pb-8 border-b border-gray-200">
              <div className="flex gap-3 items-center">
                <IoCallOutline className="size-6 text-primary" />
                <a
                  href="tel:02171977770"
                  className="text-base font-poppins font-normal text-black"
                >
                  (021) 7197770
                </a>
              </div>
              <div className="flex gap-3 items-center">
                <AiOutlineMail className="size-5 text-primary" />
                <a
                  href="mailto:sales@aljabbarcarpets.com"
                  className="text-base font-poppins font-normal text-black"
                >
                  sales@aljabbarcarpets.com
                </a>
              </div>
            </div>
            {/* Mobile Social Icons */}
            <div className="flex gap-5 items-center">
              {navSocialIcons.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="transition-colors duration-300 hover:text-primary text-black"
                >
                  <social.icon className="size-7" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
