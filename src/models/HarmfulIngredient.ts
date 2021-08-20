import { Ingredient } from "./Ingredient";
import { KnownEffect } from "./KnownEffect";

export interface HarmfulIngredient extends Ingredient {
  isBannedInEU: boolean,
  description: string,
  knownEffects: KnownEffect[],
  barbs: string[]
}