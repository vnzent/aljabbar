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
import { FiChevronDown } from "react-icons/fi";
import Image from "next/image";
import { navMenus, navSocialIcons, collectionCategories } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "../ui";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCollectionsOpen, setIsMobileCollectionsOpen] = useState(false);
  const navRef = useRef(null);
  const pathname = usePathname();

  // Check if we're on collections or product detail page
  const isCollectionPage = pathname?.includes("/collections");
  const shouldBeWhite = isScrolled || isCollectionPage;

  // Check if menu is active
  const isMenuActive = (href: string) => {
    // Remove locale prefix for comparison
    const cleanPathname = pathname?.replace(/^\/(en|id)/, "") || "/";
    const cleanHref = href.replace(/^\/(en|id)/, "");

    if (cleanHref === "/") return cleanPathname === "/";
    return cleanPathname.startsWith(cleanHref);
  };

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
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out",
          shouldBeWhite || isMobileMenuOpen ? "bg-white" : "bg-transparent"
        )}
      >
        <nav className="main-wrapper mx-auto flex flex-col transition-all duration-500 ease-in-out">
          {/* Top Bar - Hidden on mobile and when scrolled */}
          <div
            className={cn(
              "hidden lg:flex justify-between border-b transition-all duration-500 ease-in-out overflow-hidden",
              shouldBeWhite
                ? "text-black border-black/20"
                : "text-white border-white/60",
              isScrolled
                ? "max-h-0 opacity-0 py-0"
                : "max-h-20 opacity-100 py-1"
            )}
          >
            <div className="flex gap-5 items-center">
              <div className="flex gap-1 items-center">
                <IoCallOutline className="size-3" />
                <span className="text-xs font-poppins font-normal">
                  Call us today! (021) 7197770
                </span>
              </div>
              <div className="flex gap-1 items-center">
                <AiOutlineMail className="size-3" />
                <span className="text-sm font-poppins font-normal">
                  sales@aljabbarcarpets.com
                </span>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              {navSocialIcons.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className={cn(
                    "transition-colors duration-300 hover:text-primary",
                    shouldBeWhite ? "text-black" : "text-white"
                  )}
                >
                  <social.icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex justify-between items-center py-3 md:pt-3">
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
                className="w-36  lg:w-40 h-auto"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div
              className={cn(
                "hidden lg:flex gap-4 xl:gap-6 items-center transition-colors duration-300",
                shouldBeWhite ? "text-black" : "text-white"
              )}
            >
              <div className="flex  items-center gap-4 xl:gap-6">
                {navMenus.map((menu, index) => {
                  // Special handling for Collections menu
                  if (menu.name === "Collections") {
                    return (
                      <CollectionsDropdown
                        key={index}
                        shouldBeWhite={shouldBeWhite}
                        isScrolled={isScrolled}
                      />
                    );
                  }

                  const isActive = isMenuActive(menu.href);

                  return (
                    <Link
                      key={index}
                      href={menu.href}
                      className={cn(
                        "uppercase font-poppins text-sm  font-normal transition-colors duration-300 hover:text-primary",
                        // If not scrolled and active -> white
                        // If not scrolled and not active -> gray-200
                        // If scrolled (shouldBeWhite true) -> black
                        // If active -> primary color
                        shouldBeWhite && isActive
                          ? "text-primary hover:text-black"
                          : !shouldBeWhite && isActive
                          ? "text-white hover:text-white"
                          : !shouldBeWhite && !isScrolled && !isActive
                          ? "text-gray-200 hover:text-white"
                          : shouldBeWhite && !isActive
                          ? "text-black hover:text-primary"
                          : isActive
                          ? "text-primary"
                          : ""
                      )}
                    >
                      {menu.name}
                    </Link>
                  );
                })}
              </div>
              {/* Desktop Icon Buttons */}
              <div className="flex gap-5 items-center">
                {/* <LanguageDropdown
                  shouldBeWhite={shouldBeWhite}
                  isMobileMenuOpen={isMobileMenuOpen}
                /> */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className={cn(
                    "p-2 transition-all duration-300 hover:cursor-pointer",
                    shouldBeWhite
                      ? "text-black hover:text-primary"
                      : "text-white hover:text-white"
                  )}
                  aria-label="Search"
                >
                  <BiSearch className="size-4 lg:size-5" />
                </Button>
              </div>
            </div>

            {/* Mobile Icons & Hamburger */}
            <div className="flex lg:hidden items-center z-50">
              {/* <LanguageDropdown
                shouldBeWhite={shouldBeWhite}
                isMobileMenuOpen={isMobileMenuOpen}
              /> */}
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
                <BiSearch className="size-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "rounded-lg transition-all duration-300",
                  shouldBeWhite ? "text-black" : "text-white"
                )}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <RxCross1 className="size-5 text-black" />
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
            "lg:hidden fixed inset-0 border-t border-gray-200 top-16 bg-white transition-all duration-300 h-dvh w-full overflow-y-auto",
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="container mx-auto p-4">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-6 mb-8">
              {navMenus.map((menu, index) => {
                const isLast = index === navMenus.length - 1;
                // Special handling for Collections menu in mobile
                if (menu.name === "Collections") {
                  return (
                    <div
                      key={index}
                      className={cn(!isLast && "border-b border-gray-200")}
                    >
                      <button
                        onClick={() =>
                          setIsMobileCollectionsOpen(!isMobileCollectionsOpen)
                        }
                        className={cn(
                          "w-full pb-4 flex items-center justify-between uppercase font-poppins text-lg font-normal text-black hover:text-primary transition-colors",
                          isMobileCollectionsOpen && "border-b border-gray-200"
                        )}
                      >
                        <span>Collections</span>
                        <FiChevronDown
                          className={cn(
                            "size-5 transition-transform duration-200",
                            isMobileCollectionsOpen && "rotate-180"
                          )}
                        />
                      </button>

                      {/* Collections Submenu */}
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-300",
                          isMobileCollectionsOpen ? "max-h-[500px]" : "max-h-0"
                        )}
                      >
                        <div className="flex flex-col pl-3">
                          {collectionCategories.map((category) => (
                            <Link
                              key={category.slug}
                              href={`/collections/${category.slug}`}
                              className="flex flex-col py-4 border-b border-gray-100"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileCollectionsOpen(false);
                              }}
                            >
                              <span className="text-sm font-poppins font-base text-gray-900 hover:text-primary transition-colors uppercase">
                                {category.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                const isActive = isMenuActive(menu.href);

                return (
                  <Link
                    key={index}
                    href={menu.href}
                    className={cn(
                      "uppercase font-poppins text-base font-normal hover:text-primary transition-colors pb-4",
                      "border-b border-gray-200",
                      isActive ? "text-primary" : "text-black"
                    )}
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
                <IoCallOutline className="size-5  text-black" />
                <a
                  href="tel:02171977770"
                  className="text-sm font-poppins font-normal text-black"
                >
                  (021) 7197770
                </a>
              </div>
              <div className="flex gap-3 items-center">
                <AiOutlineMail className="size-5 text-black" />
                <a
                  href="mailto:sales@aljabbarcarpets.com"
                  className="text-sm font-poppins font-normal text-black"
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
                  <social.icon className="size-5" />
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
