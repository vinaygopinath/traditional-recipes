import { Ingredient } from "./Ingredient";

export interface RecipeIngredient {
  ingredient: Ingredient,
  quantity: string,
  note?: string
}