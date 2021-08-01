import { Box, Grid } from "grommet"
import React from "react"
import { Recipe } from "../../../models/Recipe"
import RecipeIngredientList from "../recipe-ingredient-list/RecipeIngredientList"
import StepList from "../step-list/StepList"
import "./RecipeContent.scss"

type RecipeContentProps = {
  recipe: Recipe
  size: string
}

class RecipeContent extends React.PureComponent<RecipeContentProps> {
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
          { name: "ingredient-list", start: [0, 0], end: [0, 0] },
          { name: "step-list", start: [0, 1], end: [0, 1] },
        ]
      default:
        /**
         * Medium, large and xlarge screens use a single row + two columns
         */
        return [
          { name: "ingredient-list", start: [0, 0], end: [0, 0] },
          { name: "step-list", start: [1, 0], end: [1, 0] },
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

  render() {
    return (
      <Box className="content">
        <Grid
          columns={this.getContentColumnsForSize()}
          rows={this.getContentRowsForSize()}
          areas={this.getContentAreasForSize()}
          gap={this.getContentAreaGapBySize()}
        >
          <Box gridArea="ingredient-list">
            <RecipeIngredientList
              recipe={this.props.recipe}
              size={this.props.size}
            />
          </Box>
          <Box gridArea="step-list">
            <StepList recipe={this.props.recipe} />
          </Box>
        </Grid>
      </Box>
    )
  }
}

export default RecipeContent
