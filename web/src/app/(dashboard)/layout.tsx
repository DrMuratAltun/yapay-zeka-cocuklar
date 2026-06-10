import type { ReactNode } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh">
      <DashboardSidebar />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
