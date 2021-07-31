import { Recipe } from "../../models/Recipe";
import { RecipePreview } from "../../models/RecipePreview";
import { SupportedCountry } from "../../models/SupportedCountry";
import { RecipeActionType } from "./RecipeActionType";

export interface InitialiseCountryPageAction {
  type: RecipeActionType.INITIALISE_COUNTRY_PAGE
  payload: SupportedCountry
}

export interface SetRecipePreviewsAction {
  type: RecipeActionType.SET_RECIPE_PREVIEWS,
  payload: RecipePreview[]
}

export interface LoadRecipeAction {
  type: RecipeActionType.LOAD_RECIPE,
  payload: {
    recipeId: string,
    country: SupportedCountry
  }
}

export interface SetRecipeAction {
  type: RecipeActionType.SET_RECIPE,
  payload: Recipe
}

export type RecipeActions = InitialiseCountryPageAction | SetRecipePreviewsAction | LoadRecipeAction | SetRecipeAction