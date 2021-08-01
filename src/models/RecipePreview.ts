import { Image } from "./Image";

export interface RecipePreview {
  id: string,
  title: string,
  subtitle: string | null,
  images: Image[],
  ingredients: [{
    ingredient: string,
    quantity: string,
    note?: string
  }],
  harmfulIngredients: string[],
  description: string
}