// https://vike.dev/onBeforePrerenderStart
import { fullCharacterList } from "@/utilities";

export async function onBeforePrerenderStart() {
  return fullCharacterList.map(character => "/characters/" + character.id);
}