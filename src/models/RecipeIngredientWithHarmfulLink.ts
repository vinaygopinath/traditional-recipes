import { RecipeIngredient } from "./RecipeIngredient";

export interface RecipeIngredientWithHarmfulLink extends RecipeIngredient {
  harmfulIngredientName: string
}