import { Breadcrumb } from "@/models";
import type { PageContext } from "vike/types";

export function getBreadcrumbs(pageContext: PageContext) {
  const breadcrumbs: Breadcrumb[] = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Updates",
    },
  ];
  
  return breadcrumbs;
}