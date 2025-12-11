"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Dropdown from "./Dropdown";

const perPageOptions = [
  { value: 12, label: "Show 12 Products" },
  { value: 24, label: "Show 24 Products" },
  { value: 36, label: "Show 36 Products" },
  { value: 48, label: "Show 48 Products" },
];

export default function ShowProductsDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [selectedPerPage, setSelectedPerPage] = useState(12);

  useEffect(() => {
    const perPageParam = searchParams.get("per_page");
    setSelectedPerPage(perPageParam ? parseInt(perPageParam) : 12);
  }, [searchParams]);

  // Dropdown component handles outside clicks itself

  const handlePerPageChange = (value: string | number) => {
    const numeric = typeof value === "string" ? parseInt(value, 10) : value;
    const params = new URLSearchParams(searchParams.toString());

    if (numeric === 12) {
      params.delete("per_page");
    } else {
      params.set("per_page", numeric.toString());
    }

    // Reset to page 1 when per_page changes
    params.delete("page");

    const url = `${pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    router.push(url);
  };

  return (
    <Dropdown
      options={perPageOptions}
      selectedValue={selectedPerPage}
      onSelect={handlePerPageChange}
      listWidthClass="w-full"
    />
  );
}
