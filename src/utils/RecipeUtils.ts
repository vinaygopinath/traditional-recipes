import axios from "axios"
import { HarmfulIngredient } from "../models/HarmfulIngredient";
import { Ingredient } from "../models/Ingredient";
import { Recipe } from "../models/Recipe";
import { RecipeIngredient } from "../models/RecipeIngredient";
import { RecipeIngredientWithHarmfulLink } from "../models/RecipeIngredientWithHarmfulLink";
import { RecipePreview } from "../models/RecipePreview";
import { SupportedCountry } from "../models/SupportedCountry";
import { RecipeMap } from "./RecipeMap";

export class RecipeUtils {

  private static INGREDIENT_ID_REGEX = /{{ingredient_([a-z_]*)}}/
  private static HARMFUL_INGREDIENT_ID_REGEX = /{{harmful_ingredient_([a-z_]*)}}/

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
    const harmfulIngredients = await this.fetchHarmfulIngredients(recipePreview)
    const recipeIngredientsWithHarmfulLink = await this.fetchIngredientsWithHarmfulLink(recipePreview)

    return Promise.resolve({
      ...recipePreview,
      ingredients: recipeIngredients,
      ingredientsWithHarmfulLink: recipeIngredientsWithHarmfulLink,
      harmfulIngredients: harmfulIngredients
    } as Recipe)
  }

  public static getIngredientIdFromStringOrThrow(ingredientString: string): string {
    const matches = ingredientString.match(this.INGREDIENT_ID_REGEX)
    if (!matches) {
      throw Error(`Ingredient string ${ingredientString} did not contain any ingredient names`)
    }

    if (matches.length !== 2) {
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
        const ingredientId = RecipeUtils.getIngredientIdFromStringOrThrow(ingredientJSON.ingredient)
        const ingredient: Ingredient = await this.getJSONByLocalPath(`/ingredients/${ingredientId}/${ingredientId}.json`)
        const recipeIngredient: RecipeIngredient = {
          ingredient: ingredient,
          quantity: ingredientJSON.quantity,
          note: ingredientJSON.note
        }
        return Promise.resolve(recipeIngredient)
      })
    )
  }

  private static async fetchHarmfulIngredients(
    recipePreview: RecipePreview,
  ): Promise<HarmfulIngredient[]> {
    return Promise.all(
      recipePreview.harmfulIngredients.map(async harmfulIngredientString => {
        const harmfulIngredientId = RecipeUtils.getHarmfulIngredientIdFromStringOrThrow(harmfulIngredientString)
        const harmfulIngredient = await this.getJSONByLocalPath(`/harmful-ingredients/${harmfulIngredientId}/${harmfulIngredientId}.json`)

        return Promise.resolve(harmfulIngredient)
      })
    )
  }

  private static async fetchIngredientsWithHarmfulLink(
    recipePreview: RecipePreview
  ): Promise<RecipeIngredientWithHarmfulLink[]> {
    return Promise.all(
      recipePreview.ingredientsWithHarmfulLink.map(async ingredientJSON => {
        const ingredientId = RecipeUtils.getIngredientIdFromStringOrThrow(ingredientJSON.ingredient)
        const ingredient: Ingredient = await this.getJSONByLocalPath(`/ingredients/${ingredientId}/${ingredientId}.json`)

        const recipeIngredientWithHarmfulLink: RecipeIngredientWithHarmfulLink = {
          ingredient: ingredient,
          quantity: ingredientJSON.quantity,
          note: ingredientJSON.note,
          harmfulIngredientName: ingredientJSON.harmfulIngredientName
        }

        return Promise.resolve(recipeIngredientWithHarmfulLink)
      })
    )
  }

  public static getHarmfulIngredientIdFromStringOrThrow(harmfulIngredientString: string): string {
    const matches = harmfulIngredientString.match(this.HARMFUL_INGREDIENT_ID_REGEX)
    if (!matches) {
      throw Error(`Harmful ingredient string ${harmfulIngredientString} did not contain any ingredient names`)
    }

    if (matches.length !== 2) {
      throw Error(`Unexpected number of harmful ingredient name matches for string ${harmfulIngredientString}. Found ${matches.length} matches`)
    }

    return matches[1]
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