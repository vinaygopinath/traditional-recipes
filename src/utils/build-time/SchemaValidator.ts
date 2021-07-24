
import validateRecipe from "../../models/Recipe.validator"
import validateIngredient from "../../models/Ingredient.validator"
import { Ingredient } from "../../models/Ingredient"
import { NodeFileUtils } from "./NodeFileUtils"
export class SchemaValidator {

  private static INGREDIENT_NAME_REGEX = /{{ingredient_([a-z_]*)}}/

  public static validateIngredients(ingredientFolder: string = "src/ingredients/") {
    NodeFileUtils.getAllFilesInFolder(ingredientFolder)
      .filter(filePath => filePath.endsWith(".json"))
      // Not using map + forEach here to avoid loading all files
      // into memory at once, potentially causing a memory issue
      .forEach(filePath => validateIngredient(NodeFileUtils.getJSONFromFile(filePath)))
  }


  public static validateRecipes(recipeFolder: string = "src/recipes/") {
    const ingredientCollection: { [key: string]: Ingredient, } = {}
    NodeFileUtils.getAllFilesInFolder(recipeFolder)
      .filter(filePath => filePath.endsWith(".json"))
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
          const ingredientName = this.getIngredientNameFromStringOrThrow(recipeIngredient.ingredient)
          let ingredient: Ingredient
          if (ingredientCollection[ingredientName]) {
            console.log(`Ingredient collection contains ${ingredientName}`)
            ingredient = ingredientCollection[ingredientName]
          } else {
            console.log(`Ingredient collection does not have ${ingredientName}. Fetching`)
            ingredient = this.getIngredientFromFile(ingredientName)
            console.log(`Fetched ingredient for ${ingredientName}`, JSON.stringify(ingredient, null, 2))
            ingredientCollection[ingredientName] = ingredient
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

  private static getIngredientFromFile(ingredientName: string): Ingredient {
    const ingredientFilePath = [
      `${ingredientName}.json`,
      `${ingredientName}/${ingredientName}.json`
    ].find(relativeFilePath => NodeFileUtils.doesFileExist("src/ingredients/", relativeFilePath))

    if (!ingredientFilePath) {
      throw Error(`Could not find a JSON file for the ingredient ${ingredientName}`)
    }

    return NodeFileUtils.getJSONFromFile(`src/ingredients/${ingredientFilePath}`) as Ingredient
  }

  private static getIngredientNameFromStringOrThrow(ingredientString: string): string {
    const matches = ingredientString.match(this.INGREDIENT_NAME_REGEX)
    if (!matches) {
      throw Error(`Ingredient string ${ingredientString} did not contain any ingredient names`)
    }

    if (matches.length != 2) {
      throw Error(`Unexpected number of ingredient name matches for string ${ingredientString}. Found ${matches.length} matches`)
    }

    return matches[1]
  }
}