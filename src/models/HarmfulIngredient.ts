import { Ingredient } from "./Ingredient";

export interface HarmfulIngredient extends Ingredient {
  knownEffects: string[],
  barbs: string[]
}