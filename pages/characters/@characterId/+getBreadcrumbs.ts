import { Breadcrumb } from "@/models";
import { getCharacter } from "@/utilities";
import type { PageContext } from "vike/types";

export function getBreadcrumbs(pageContext: PageContext) {
  const character = getCharacter(pageContext.routeParams?.characterId);

  const breadcrumbs: Breadcrumb[] = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Characters",
      url: "/characters"
    },
    {
      text: character.name,
    }
  ];
  
  return breadcrumbs;
}