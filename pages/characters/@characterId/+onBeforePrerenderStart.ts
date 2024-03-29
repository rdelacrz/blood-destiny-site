// https://vike.dev/onBeforePrerenderStart
import { characterList } from "@/utilities";

export async function onBeforePrerenderStart() {
  return characterList.map((_, index) => "/characters/" + index);
}