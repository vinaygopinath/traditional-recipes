import { Recipe } from "../../models/Recipe";
import { RecipePreview } from "../../models/RecipePreview";
import { SupportedCountry } from "../../models/SupportedCountry";

export interface RecipeState {
  country: SupportedCountry | null
  recipePreviews: RecipePreview[]
  recipe: Recipe | null
}