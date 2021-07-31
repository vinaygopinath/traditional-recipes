
import validateRecipe from "../../models/Recipe.validator"
import validateIngredient from "../../models/Ingredient.validator"
import { Ingredient } from "../../models/Ingredient"
import { NodeFileUtils } from "./NodeFileUtils"
import { RecipeUtils } from "../RecipeUtils"
export class SchemaValidator {

  public static validateIngredients(ingredientFolder: string = "public/ingredients/") {
    NodeFileUtils.getAllJSONFilesInFolder(ingredientFolder)
      // Not using map + forEach here to avoid loading all files
      // into memory at once, potentially causing a memory issue
      .forEach(filePath => validateIngredient(NodeFileUtils.getJSONFromFile(filePath)))
  }


  public static validateRecipes(recipeFolder: string = "public/recipes/") {
    const ingredientCollection: { [key: string]: Ingredient, } = {}
    NodeFileUtils.getAllJSONFilesInFolder(recipeFolder)
      // Not using map + forEach here to avoid loading all files
      // into memory at once, potentially causing a memory issue
      .forEach(filePath => {
        const jsonData = NodeFileUtils.getJSONFromFile(filePath)
        this.expandIngredients(jsonData, ingredientCollection)

        validateRecipe(jsonData)
      })
  }

  private static expandIngredients(
    recipeJsonData: any,
    ingredientCollection: { [key: string]: Ingredient }
  ) {
    if (
      recipeJsonData
      && recipeJsonData.ingredients
      && Array.isArray(recipeJsonData.ingredients)
      && recipeJsonData.ingredients.every(
        (recipeIngredient: any) => recipeIngredient.hasOwnProperty('ingredient')
      )
    ) {
      const { ingredients: recipeIngredients } = recipeJsonData
      recipeJsonData.ingredients = recipeIngredients
        .map((recipeIngredient: { ingredient: string }, index: number) => {
          const ingredientId = RecipeUtils.getIngredientIdFromStringOrThrow(recipeIngredient.ingredient)
          let ingredient: Ingredient
          if (ingredientCollection[ingredientId]) {
            console.log(`Ingredient collection contains ${ingredientId}`)
            ingredient = ingredientCollection[ingredientId]
          } else {
            console.log(`Ingredient collection does not have ${ingredientId}. Fetching`)
            ingredient = this.getIngredientFromFile(ingredientId)
            console.log(`Fetched ingredient for ${ingredientId}`, JSON.stringify(ingredient, null, 2))
            ingredientCollection[ingredientId] = ingredient
          }

          return {
            ...recipeIngredient,
            ingredient: ingredient
          }
        })
    } else {
      throw Error(`Received unexpected recipe JSON. JSON is empty or missing "ingredients"`)
    }
  }

  private static getIngredientFromFile(ingredientId: string): Ingredient {
    const ingredientFilePath = [
      `${ingredientId}.json`,
      `${ingredientId}/${ingredientId}.json`
    ].find(relativeFilePath => NodeFileUtils.doesFileExist("public/ingredients/", relativeFilePath))

    if (!ingredientFilePath) {
      throw Error(`Could not find a JSON file for the ingredient ${ingredientId}`)
    }

    return NodeFileUtils.getJSONFromFile(`public/ingredients/${ingredientFilePath}`) as Ingredient
  }
}