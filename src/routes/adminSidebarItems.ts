import type { ISidebarItem } from "@/types";
// import { lazy } from "react";
import { BarChart3, Route, Layers } from "lucide-react";
import Analytics from "@/pages/Admin/Analytics";
import AddTourType from "@/pages/Admin/AddTourType";
import AddTour from "@/pages/Admin/AddTour";
import AddDivision from "@/pages/Admin/AddDivision";

// const Analytics = lazy(() => import("@/pages/About"));

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
        title: "Tour Type",
        url: "/admin/tour-type",
        component: AddTourType,
      },
      {
        title: "Tour",
        url: "/admin/tour",
        component: AddTour,
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
        title: "Division",
        url: "/admin/division",
        component: AddDivision,
      },
      {
        title: "Habi Jabi",
        url: "/admin/habijabi",
        component: Analytics,
      },
    ],
  },
];
