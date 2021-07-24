import { SupportedCountry } from "../../models/SupportedCountry";
import { NodeFileUtils } from "./NodeFileUtils";

export class RecipeMapGenerator {

  public static generateRecipeMap() {
    const recipeMap = Object.values(SupportedCountry)
      .reduce(
        (recipeMap, supportedCountry) => {
          recipeMap[supportedCountry] = this.generateRecipeListForCountry(supportedCountry)
          return recipeMap
        },
        // Empty initial map of supported country and list of country recipe file paths
        {} as { [key: string]: string[] }
      )

    NodeFileUtils.writeFile(
      'src/utils/RecipeMap.ts',
      `export const RecipeMap: { [key: string]: string[] } = ${JSON.stringify(recipeMap, null, 2)}`
    )
  }

  private static generateRecipeListForCountry(supportedCountry: SupportedCountry): string[] {
    const countryRecipePath = this.getCountryRecipePath(supportedCountry)

    return NodeFileUtils.getAllJSONFilesInFolder(countryRecipePath)
      .map(countryFilePath => countryFilePath.replace(countryRecipePath, ""))
  }

  private static getCountryRecipePath(supportedCountry: SupportedCountry): string {
    return `public/recipes/${supportedCountry}/`
  }
}