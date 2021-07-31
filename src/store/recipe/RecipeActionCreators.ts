import { Recipe } from "../../models/Recipe";
import { RecipePreview } from "../../models/RecipePreview";
import { SupportedCountry } from "../../models/SupportedCountry";
import { InitialiseCountryPageAction, LoadRecipeAction, SetRecipeAction, SetRecipePreviewsAction } from "./RecipeActions";
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

  public static loadRecipe(country: SupportedCountry, recipeId: string): LoadRecipeAction {
    return {
      type: RecipeActionType.LOAD_RECIPE,
      payload: {
        country,
        recipeId
      }
    }
  }

  public static setRecipe(recipe: Recipe): SetRecipeAction {
    return {
      type: RecipeActionType.SET_RECIPE,
      payload: recipe
    }
  }
}