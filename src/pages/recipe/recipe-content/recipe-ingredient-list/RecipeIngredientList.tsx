import { Box } from "grommet"
import React from "react"
import { withTranslation, WithTranslation } from "react-i18next"
import { Recipe } from "../../../../models/Recipe"
import HarmfulIngredient from "./harmful-ingredient/HarmfulIngredient"
import RecipeIngredient from "./recipe-ingredient/RecipeIngredient"
import "./RecipeIngredientList.scss"
type RecipeIngredientListProps = {
  recipe: Recipe
  size: string
} & WithTranslation

class RecipeIngredientList extends React.PureComponent<RecipeIngredientListProps> {
  getContentColumnsForSize(): string[] {
    switch (this.props.size) {
      case "xsmall":
      case "small":
        // Phone screens have a single full-width column
        return ["full"]
      default:
        // Tablet and desktop screens have two columns
        // image in the first, and intro in the second
        return ["1/2", "1/2"]
    }
  }

  getContentRowsForSize(): string[] {
    switch (this.props.size) {
      case "xsmall":
      case "small":
        return ["auto", "auto"]
      default:
        return ["auto"]
    }
  }

  getContentAreasForSize(): {
    name?: string
    start?: number[]
    end?: number[]
  }[] {
    switch (this.props.size) {
      case "xsmall":
      case "small":
        return [
          /**
           * Small screens have two full-width rows
           */
          { name: "ingredients", start: [0, 0], end: [0, 0] },
          { name: "steps", start: [0, 1], end: [0, 1] },
        ]
      default:
        /**
         * Medium, large and xlarge screens use a single row + two columns
         */
        return [
          { name: "ingredients", start: [0, 0], end: [0, 0] },
          { name: "steps", start: [1, 0], end: [1, 0] },
        ]
    }
  }

  getContentAreaGapBySize() {
    switch (this.props.size) {
      case "xsmall":
      case "small":
        return "none"
      default:
        return "large"
    }
  }

  showRecipeIngredients() {
    return this.props.recipe.ingredients.map((ingredient) => {
      return (
        <RecipeIngredient
          recipeIngredient={ingredient}
          key={ingredient.ingredient.id}
          recipeId={this.props.recipe.id}
        />
      )
    })
  }

  showHarmfulIngredients() {
    return this.props.recipe.harmfulIngredients.map((harmfulIngredient) => {
      return (
        <HarmfulIngredient
          harmfulIngredient={harmfulIngredient}
          recipeId={this.props.recipe.id}
          key={harmfulIngredient.id}
        />
      )
    })
  }

  getHarmfulIngredientTitle() {
    const harmfulIngredientsCount = this.props.recipe.harmfulIngredients.length
    if (harmfulIngredientsCount === 0) {
      return ""
    } else if (harmfulIngredientsCount === 1) {
      return this.props.t('recipe_page_special_ingredient')
    } else {
      return this.props.t('recipe_page_special_ingredients')
    }
  }

  render() {
    return (<Box gridArea="ingredients">
      {this.showRecipeIngredients()}
      <h4 className="special-ingredient-title">{this.getHarmfulIngredientTitle()}</h4>
      {this.showHarmfulIngredients()}
      </Box>
    )
  }
}

export default withTranslation(['recipe-page'])(RecipeIngredientList)
