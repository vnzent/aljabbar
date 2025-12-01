"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { navMenus } from "@/lib/data";
import { MdArrowForwardIos } from "react-icons/md";

export default function DynamicBreadcrumb() {
  const pathname = usePathname();

  // Remove locale from pathname (e.g., /en/about -> /about)
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");

  // Split path into segments
  const pathSegments = pathWithoutLocale
    .split("/")
    .filter((segment) => segment);

  // Get page name from navMenus data or format from slug
  const getPageName = (segment: string) => {
    const menuItem = navMenus.find((menu) => menu.href.includes(segment));
    if (menuItem) {
      return menuItem.name;
    }
    // Fallback: format slug to readable name
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Generate breadcrumb items
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const name = getPageName(segment);
    return { name, href, isLast: index === pathSegments.length - 1 };
  });

  // Don't show breadcrumb on home page
  if (pathSegments.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href="/"
              className="text-white transition-colors uppercase font-poppins text-2xl"
            >
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-white flex items-center">
          <MdArrowForwardIos className="size-6" />
        </BreadcrumbSeparator>

        {breadcrumbItems.map((item, index) => (
          <div key={item.href} className="flex items-center gap-2">
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage className="text-white uppercase font-poppins text-2xl">
                  {item.name}
                </BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link
                      href={item.href}
                      className="text-white/80 hover:text-white transition-colors uppercase font-poppins text-2xl"
                    >
                      {item.name}
                    </Link>
                  </BreadcrumbLink>
                </>
              )}
            </BreadcrumbItem>
            {!item.isLast && (
              <BreadcrumbSeparator className="text-white text-2xl flex items-center">
                <MdArrowForwardIos className="size-6" />
              </BreadcrumbSeparator>
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
