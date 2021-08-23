import { Ingredient } from "./Ingredient";
import { KnownEffect } from "./KnownEffect";
import { Image } from "./Image";

export interface HarmfulIngredient {
  id: string,
  name: string,
  image?: Image,
  isBannedInEU: boolean,
  description: string,
  knownEffects: KnownEffect[],
  barbs: string[]
}