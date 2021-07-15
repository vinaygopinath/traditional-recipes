import { HarmfulIngredient } from "./HarmfulIngredient";
import { Ingredient } from "./Ingredient";

export interface Recipe {
  title: string,
  subtitle: string | null,
  imageUrls: string[],
  description: string,
  ingredients: Ingredient[],
  harmfulIngredients: HarmfulIngredient[]
}