import { SidebarProvider, SidebarTrigger, SidebarInset } from "../ui/sidebar";

import { Outlet } from "react-router";
import { AppSidebar } from "./AppSidebar";
import { Separator } from "../ui/separator";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
