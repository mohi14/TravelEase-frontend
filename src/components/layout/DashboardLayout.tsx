import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

import { Outlet } from "react-router";
import { AppSidebar } from "./AppSidebar";


export default function DashboardLayout() {
  return (
      <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
       <Outlet/>
      </main>
    </SidebarProvider>
  )
}
