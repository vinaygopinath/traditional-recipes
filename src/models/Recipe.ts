import { Credit } from "./Credit";
import { HarmfulIngredient } from "./HarmfulIngredient";
import { RecipeIngredient } from "./RecipeIngredient";
import { RecipePreview } from "./RecipePreview";

export interface Recipe extends RecipePreview {
  ingredients: RecipeIngredient[],
  harmfulIngredients: HarmfulIngredient[],
  credit: Credit[]
}