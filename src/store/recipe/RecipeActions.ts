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

export type RecipeActions = InitialiseCountryPageAction | SetRecipePreviewsAction