import { Credit } from "./Credit";
import { HarmfulIngredient } from "./HarmfulIngredient";
import { Image } from "./Image";
import { RecipeIngredient } from "./RecipeIngredient";
import { RecipeIngredientWithHarmfulLink } from "./RecipeIngredientWithHarmfulLink";

export interface Recipe {
  id: string,
  title: string,
  subtitle: string | null,
  images: Image[],
  description: string,
  steps: string[],
  ingredients: RecipeIngredient[],
  ingredientsWithHarmfulLink: RecipeIngredientWithHarmfulLink[],
  harmfulIngredients: HarmfulIngredient[],
  credit: Credit[]
}