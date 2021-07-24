import { RecipePreview } from "../../models/RecipePreview";
import { SupportedCountry } from "../../models/SupportedCountry";
import { InitialiseCountryPageAction, SetRecipePreviewsAction } from "./RecipeActions";
import { RecipeActionType } from "./RecipeActionType";

export class RecipeActionCreators {

  public static initialiseCountryPage(country: SupportedCountry): InitialiseCountryPageAction {
    return {
      type: RecipeActionType.INITIALISE_COUNTRY_PAGE,
      payload: country
    }
  }

  public static setRecipePreviews(recipePreviews: RecipePreview[]): SetRecipePreviewsAction {
    return {
      type: RecipeActionType.SET_RECIPE_PREVIEWS,
      payload: recipePreviews
    }
  }
}