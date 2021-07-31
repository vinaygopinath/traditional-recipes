import axios from "axios"
import { Ingredient } from "../models/Ingredient";
import { Recipe } from "../models/Recipe";
import { RecipeIngredient } from "../models/RecipeIngredient";
import { RecipePreview } from "../models/RecipePreview";
import { SupportedCountry } from "../models/SupportedCountry";
import { RecipeMap } from "./RecipeMap";

export class RecipeUtils {

  private static INGREDIENT_NAME_REGEX = /{{ingredient_([a-z_]*)}}/

  public static getRecipePreviewsForCountry(country: SupportedCountry): Promise<RecipePreview[]> {
    return Promise.all(
      RecipeMap[country].map(countryRecipePath => {
        // No /public prefix
        // /public/recipes/... is available at recipes/... in the browser
        return this.getJSONByLocalPath(`recipes/${country}/${countryRecipePath}`) as Promise<RecipePreview>
      })
    )
  }

  public static async fetchRecipe(
    country: SupportedCountry,
    recipeId: string
  ): Promise<Recipe> {
    const recipePreview = await this.getJSONByLocalPath(
      `/recipes/${country}/${recipeId}/${recipeId}.json`
    )
    const recipeIngredients = await this.fetchIngredients(recipePreview)

    return Promise.resolve({
      ...recipePreview,
      ingredients: recipeIngredients
    } as Recipe)
  }

  public static getIngredientNameFromStringOrThrow(ingredientString: string): string {
    const matches = ingredientString.match(this.INGREDIENT_NAME_REGEX)
    if (!matches) {
      throw Error(`Ingredient string ${ingredientString} did not contain any ingredient names`)
    }

    if (matches.length != 2) {
      throw Error(`Unexpected number of ingredient name matches for string ${ingredientString}. Found ${matches.length} matches`)
    }

    return matches[1]
  }

  public static hasRecipe(country: SupportedCountry, recipeId: string): boolean {
    return RecipeMap[country].includes(`${recipeId}/${recipeId}.json`)
  }

  private static async fetchIngredients(
    recipePreview: RecipePreview,
  ): Promise<RecipeIngredient[]> {
    return Promise.all(
      recipePreview.ingredients.map(async ingredientJSON => {
        const ingredientName = RecipeUtils.getIngredientNameFromStringOrThrow(ingredientJSON.ingredient)
        const ingredient: Ingredient = await this.getJSONByLocalPath(`/ingredients/${ingredientName}/${ingredientName}.json`)
        const recipeIngredient: RecipeIngredient = {
          ingredient: ingredient,
          quantity: ingredientJSON.quantity,
          note: ingredientJSON.note
        }
        return Promise.resolve(recipeIngredient)
      })
    )
  }

  private static async getJSONByLocalPath(filePath: string): Promise<any> {
    try {
      const response = await axios.get(filePath)
      return Promise.resolve(response.data)
    } catch (error) {
      // TODO Handle failure to load JSON
      return Promise.reject(error)
    }
  }
}