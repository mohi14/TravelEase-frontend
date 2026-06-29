import { Link } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../ui/sidebar";
import Logo from "@/assets/icons/Logo";
import { NavMain } from "./Sidebar/NavMain";
import { NavUser } from "./Sidebar/NavUser";
import { getSidebarItems } from "@/utils/gerSIdebarItems";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined);


  const data = { navMain: getSidebarItems(userData?.data?.role) };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Link to="/" className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg">
                  <Logo />
                </div>

                <div className="grid flex-1 text-left leading-tight">
                  <h2 className="truncate text-xl font-bold">TravelEase</h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {userData && <NavUser user={userData?.data} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
