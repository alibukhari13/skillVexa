"use client";

import { usePathname } from "next/navigation";

// Renders the public-site chrome (Header/Footer) everywhere except the
// admin area, which has its own top bar and sidebar.
export default function PublicOnly({ children }) {
  const pathname = usePathname() || "";
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return null;
  return children;
}
