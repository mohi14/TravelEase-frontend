import type { ISidebarItem } from "@/types";
import { lazy } from "react";
import {
  BarChart3,
  Route,
  Layers
} from "lucide-react";

const Analytics = lazy(() => import("@/pages/About"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Analytics",
    icon: BarChart3,
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Tour Management",
    icon: Route,
    items: [
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        component: Analytics,
      },
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component: Analytics,
      },
      {
        title: "Habi Jabi",
        url: "/admin/habijabi",
        component: Analytics,
      },
    ],
  },
  {
    title: "Division Management",
    icon: Layers,
    items: [
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        component: Analytics,
      },
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component: Analytics,
      },
      {
        title: "Habi Jabi",
        url: "/admin/habijabi",
        component: Analytics,
      },
    ],
  },
];