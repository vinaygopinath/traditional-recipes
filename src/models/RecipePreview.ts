import { Image } from "./Image";

export interface RecipePreview {
  id: string,
  title: string,
  subtitle: string | null,
  images: Image[],
  description: string
}