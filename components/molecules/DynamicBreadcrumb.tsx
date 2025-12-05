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
import { cn } from "@/lib/utils";

interface DynamicBreadcrumbProps {
  textColor?: string;
  separatorColor?: string;
  textSize?: string;
  separatorSize?: string;
  hoverText?: string;
}

export default function DynamicBreadcrumb({
  textColor = "",
  separatorColor = "",
  textSize = "",
  separatorSize = "",
  hoverText = "hover:",
}: DynamicBreadcrumbProps) {
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

  // Generate breadcrumb items with proper category linking
  const breadcrumbItems = pathSegments.map((segment, index) => {
    // Check if this is a category segment (second segment in /collections/[category]/[slug])
    const isCollectionsPath = pathSegments[0] === "collections";
    const isCategorySegment = isCollectionsPath && index === 1;

    // Parent categories that use direct path
    const parentCategorySlugs = [
      "hand-made-carpets",
      "machine-made-carpets",
      "mosque-carpets",
    ];

    // For category segments, determine the link type
    let href: string;
    if (isCategorySegment) {
      // Check if it's a parent category
      if (parentCategorySlugs.includes(segment)) {
        href = `/collections/${segment}`;
      } else {
        // Use query param for child/regular categories
        href = `/collections?categories=${segment}`;
      }
    } else {
      href = "/" + pathSegments.slice(0, index + 1).join("/");
    }

    const name = getPageName(segment);
    return { name, href, isLast: index === pathSegments.length - 1 };
  });

  // Don't show breadcrumb on home page
  if (pathSegments.length === 0) return null;

  return (
    <Breadcrumb className="">
      <BreadcrumbList className="flex items-center">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href="/"
              className={cn(
                textColor,
                textSize,
                hoverText,
                "opacity-60 hover:opacity-100 transition-colors font-poppins"
              )}
            >
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator
          className={cn(separatorColor, "flex items-center")}
        >
          <MdArrowForwardIos className={separatorSize} />
        </BreadcrumbSeparator>

        {breadcrumbItems.map((item, index) => (
          <div key={item.href} className="flex items-center gap-2">
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage
                  className={cn(textColor, textSize, hoverText, "capitalize font-poppins")}
                >
                  {item.name}
                </BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        textColor,
                        textSize,
                        hoverText,
                        "opacity-60 hover:opacity-100 transition-colors font-poppins"
                      )}
                    >
                      {item.name}
                    </Link>
                  </BreadcrumbLink>
                </>
              )}
            </BreadcrumbItem>
            {!item.isLast && (
              <BreadcrumbSeparator
                className={cn(separatorColor, "text-xl flex items-center")}
              >
                <MdArrowForwardIos className={separatorSize} />
              </BreadcrumbSeparator>
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
