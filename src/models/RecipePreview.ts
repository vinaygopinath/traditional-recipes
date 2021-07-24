import { Image } from "./Image";

export interface RecipePreview {
  title: string,
  subtitle: string | null,
  images: Image[],
  description: string
}