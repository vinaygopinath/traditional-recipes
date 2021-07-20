import { Credit } from "./Credit";
import { HarmfulIngredient } from "./HarmfulIngredient";
import { Image } from "./Image";
import { Ingredient } from "./Ingredient";

export interface Recipe {
  title: string,
  subtitle: string | null,
  images: Image[],
  description: string,
  ingredients: Ingredient[],
  harmfulIngredients: HarmfulIngredient[],
  credit: Credit[]
}