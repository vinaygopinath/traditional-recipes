import { Credit } from "./Credit";
import { HarmfulIngredient } from "./HarmfulIngredient";
import { Image } from "./Image";
import { RecipeIngredient } from "./RecipeIngredient";

export interface Recipe {
  id: string,
  title: string,
  subtitle: string | null,
  images: Image[],
  description: string,
  steps: string[],
  ingredients: RecipeIngredient[],
  harmfulIngredients: HarmfulIngredient[],
  credit: Credit[]
}