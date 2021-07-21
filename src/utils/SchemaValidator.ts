import fs from "fs"
import path from "path"
import validateRecipe from "../models/Recipe.validator"
import validateIngredient from "../models/Ingredient.validator"
import { Ingredient } from "../models/Ingredient"
export class SchemaValidator {

  private static INGREDIENT_NAME_REGEX = /{{ingredient_([a-z_]*)}}/

  public static validateIngredients(ingredientFolder: string = "src/ingredients/") {
    this.getAllFilesInFolder(ingredientFolder)
      .filter(filePath => filePath.endsWith(".json"))
      // Not using map + forEach here to avoid loading all files
      // into memory at once, potentially causing a memory issue
      .forEach(filePath => validateIngredient(this.getJSONFromFile(filePath)))
  }


  public static validateRecipes(recipeFolder: string = "src/recipes/") {
    const ingredientCollection: { [key: string]: Ingredient, } = {}
    this.getAllFilesInFolder(recipeFolder)
      .filter(filePath => filePath.endsWith(".json"))
      // Not using map + forEach here to avoid loading all files
      // into memory at once, potentially causing a memory issue
      .forEach(filePath => {
        const jsonData = this.getJSONFromFile(filePath)
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
    ].find(relativeFilePath => this.doesFileExist("src/ingredients/", relativeFilePath))

    if (!ingredientFilePath) {
      throw Error(`Could not find a JSON file for the ingredient ${ingredientName}`)
    }

    return this.getJSONFromFile(`src/ingredients/${ingredientFilePath}`) as Ingredient
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

  private static doesFileExist(currentDir: string, relativeFilePath: string): boolean {
    const filePath = path.join(currentDir, relativeFilePath);
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile()
  }

  // Reference: https://stackoverflow.com/a/28289589
  // CC-BY-SA 3.0
  private static getAllFilesInFolder(currentDir: string): string[] {
    let filesAndFolders: string[] = []
    try {
      filesAndFolders = fs.readdirSync(currentDir)
    } catch (e: any) {
      console.error(e)
      throw Error(`Failed to read the directory ${currentDir}`)
    }

    return filesAndFolders.map(fileOrFolder => {
      const filePath = path.join(currentDir, fileOrFolder);
      const stat = fs.statSync(filePath)
      if (stat.isFile()) {
        return filePath
      } else {
        return this.getAllFilesInFolder(filePath)
      }
    }).flat(10)
  }

  private static getJSONFromFile(filePath: string): any {
    let fileContents: string | null = null
    try {
      fileContents = fs.readFileSync(filePath, 'utf8')
    } catch (e: any) {
      console.error(e)
      throw Error(`Failed to read contents of file ${filePath}`)
    }

    let jsonData: any | null = null
    try {
      jsonData = JSON.parse(fileContents)
    } catch (e: any) {
      console.error(e)
      console.error(`File contents\n`, JSON.stringify(fileContents, null, 2))
      throw Error(`Failed to parse the contents of file ${filePath}`)
    }

    return jsonData
  }
}