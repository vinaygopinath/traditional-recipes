import { Image } from "./Image";

export interface RecipePreview {
  internalName: string,
  title: string,
  subtitle: string | null,
  images: Image[],
  description: string
}