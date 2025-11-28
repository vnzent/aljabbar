"use client";

import { useState } from "react";
import SearchModal from "./SearchModal";
import Link from "next/link";
import { Button } from "./ui/button";
import { BiSearch } from "react-icons/bi";
import { HiLanguage } from "react-icons/hi2";
import { IoCallOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import Image from "next/image";
import { navMenus, navSocialIcons } from "@/lib/data";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-transparent ">
        <nav className="container mx-auto px-4 flex flex-col">
          <div className="flex justify-between border-b text-white py-3">
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
                  className="hover:text-black transition-colors duration-300"
                >
                  <social.icon className="size-7" />
                </Link>
              ))}
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
              {navMenus.map((menu, index) => (
                <Link
                  key={index}
                  href={menu.href}
                  className="hover:text-black transition-colors duration-300 uppercase font-poppins text-lg font-normal"
                >
                  {menu.name}
                </Link>
              ))}
              {/* Search Button */}
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors "
                  asChild
                >
                  <span className="hidden sm:inline text-sm text-white hover:text-black cursor-pointer transition-colors duration-300">
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
                  <span className="hidden sm:inline text-sm text-white hover:text-black cursor-pointer transition-colors duration-300">
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
