"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import SearchModal from "./SearchModal";
import Link from "next/link";
import { Button } from "./ui/button";
import { BiSearch } from "react-icons/bi";
import { HiLanguage } from "react-icons/hi2";
import { IoCallOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineYoutube } from "react-icons/ai";
import Image from "next/image";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 bg-transparent ">
        <nav className="container mx-auto px-4 flex flex-col">
          <div className="flex justify-between border-b text-white py-3">
            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <IoCallOutline className="size-7" />
                <span className="text-lg">Call us today! (021) 7197770</span>
              </div>
              <div className="flex gap-3 items-center">
                <AiOutlineMail className="size-6" />
                <span className="text-lg">sales@aljabbarcarpets.com</span>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <Link
                href="facebook.com"
                className="hover:text-black transition-colors duration-300"
              >
                <BiLogoFacebook className="size-7" />
              </Link>
              <Link
                href="instagram.com"
                className="hover:text-black transition-colors duration-300"
              >
                <AiOutlineInstagram className="size-7" />
              </Link>
              <Link
                href="youtube.com"
                className="hover:text-black transition-colors duration-300"
              >
                <AiOutlineYoutube className="size-7" />
              </Link>
            </div>
          </div>
          <div className="flex justify-between items-center pt-3">
            {/* Logo */}
            <Link href="/" className="">
              <Image
                src="/logo-aljabbar.svg"
                alt="logo"
                width={150}
                height={50}
                className="w-50 h-full"
              />
            </Link>

            {/* Navigation Links */}
            <div className="flex gap-6 items-center text-white">
              <Link
                href="/collections"
                className="hover:text-black transition-colors duration-300"
              >
                COLLECTIONS
              </Link>
              <Link
                href="/about"
                className="hover:text-black transition-colors duration-300"
              >
                ABOUT US
              </Link>
              <Link
                href="/service"
                className="hover:text-black transition-colors duration-300"
              >
                SERVICE
              </Link>
              <Link
                href="/contact"
                className="hover:text-black transition-colors duration-300"
              >
                CONTACT
              </Link>
              {/* Search Button */}
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors "
              >
                <span className="hidden sm:inline text-sm text-white hover:text-black cursor-pointer transition-colors duration-300">
                  <HiLanguage className="size-5"/>
                </span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              >
                <span className="hidden sm:inline text-sm text-white hover:text-black cursor-pointer transition-colors duration-300">
                  <BiSearch className="size-5"/>
                </span>
              </Button>
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
