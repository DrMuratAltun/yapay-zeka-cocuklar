"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import type { ReactNode } from "react";

const DASHBOARD_REGEX = /^\/(ogrenci|ogretmen|okul|admin|bolumler)(\/|$)/;

export default function RouteShell({ children, footer }: { children: ReactNode; footer: ReactNode }) {
  const pathname = usePathname();
  const isDashboard = DASHBOARD_REGEX.test(pathname ?? "");

  if (isDashboard) {
    return <div className="flex-1">{children}</div>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      {footer}
    </>
  );
}
