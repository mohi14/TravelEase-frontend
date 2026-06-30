import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import type { ISidebarItem } from "@/types";
import { Link } from "react-router";

interface IProps {
  items: ISidebarItem[];
}

export function NavMain({ items }: IProps) {
  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item) => {
          // Check if there is exactly one sub-item and its title matches the parent title
          const isSingleMatchingItem =
            item.items?.length === 1 && item.items[0].title === item.title;

          // If it matches, render a simple clickable menu item (No dropdown)
          if (isSingleMatchingItem) {
            const singleItem = item.items[0];
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton render={ <Link to={singleItem.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>} tooltip={item.title}>
                 
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          // Otherwise, render the standard collapsible dropdown
          return (
            <Collapsible
              key={item.title}
              defaultOpen={item?.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                {/* Note: I added asChild here to prevent hydration errors from nested buttons */}
                <CollapsibleTrigger render={ <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>}>
                 
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        {/* Note: Added asChild here as well so the <a> tag renders correctly */}
                        <SidebarMenuSubButton render={<Link to={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>}>
                          
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}