import axios from "axios"
import { RecipePreview } from "../models/RecipePreview";
import { SupportedCountry } from "../models/SupportedCountry";
import { RecipeMap } from "./RecipeMap";

export class RecipeUtils {

  public static getRecipePreviewsForCountry(country: SupportedCountry): Promise<RecipePreview[]> {
    return Promise.all(
      RecipeMap[country].map(countryRecipePath => {
        // No /public prefix
        // /public/recipes/... is available at recipes/... in the browser
        return this.getRecipeJSONByLocalPath(`recipes/${country}/${countryRecipePath}`) as Promise<RecipePreview>
      })
    )
  }

  private static async getRecipeJSONByLocalPath(recipeFilePath: string): Promise<any> {
    try {
      const response = await axios.get(recipeFilePath)
      return Promise.resolve(response.data)
    } catch (error) {
      // TODO Handle failure to load JSON
      return Promise.reject(error)
    }
  }
}