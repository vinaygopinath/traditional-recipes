import { Box, Grid, Image } from "grommet"
import React from "react"
import { Recipe } from "../../../models/Recipe"
import Separator from "../../../common-components/separator/Separator"
import "./RecipeBanner.scss"

type RecipeBannerProps = {
  recipe: Recipe
  size: string
  getRecipeString: (translationKey: string) => string
}

export default class RecipeBanner extends React.PureComponent<RecipeBannerProps> {
  getBannerColumnsForSize(): string[] {
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

  getBannerRowsForSize(): string[] {
    switch (this.props.size) {
      case "xsmall":
      case "small":
        return ["auto", "auto"]
      default:
        return ["auto"]
    }
  }

  getBannerAreasForSize(): {
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
          { name: "image", start: [0, 0], end: [0, 0] },
          { name: "intro", start: [0, 1], end: [0, 1] },
        ]
      default:
        /**
         * Medium, large and xlarge screens use a single row + two columns
         */
        return [
          { name: "intro", start: [0, 0], end: [0, 0] },
          { name: "image", start: [1, 0], end: [1, 0] },
        ]
    }
  }

  getBannerAreaGapBySize() {
    switch (this.props.size) {
      case "xsmall":
      case "small":
        return "none"
      default:
        return "large"
    }
  }

  getRecipeString(translationKey: string) {
    return this.props.getRecipeString(translationKey)
  }

  getSubtitle(recipe: Recipe): string {
    if (recipe.subtitle) {
      return this.getRecipeString(recipe.subtitle)
    } else {
      return ""
    }
  }

  render() {
    const recipe = this.props.recipe
    return (
        <Box className="banner" background="light-2">
          <Grid
            columns={this.getBannerColumnsForSize()}
            rows={this.getBannerRowsForSize()}
            areas={this.getBannerAreasForSize()}
            gap={this.getBannerAreaGapBySize()}
          >
            <Box gridArea="intro" className="intro">
              <h1 className="title">{this.getRecipeString(recipe.title)}</h1>
              <span className="subtitle">{this.getSubtitle(recipe)}</span>
              <Separator pad="medium" />
              <p className="description max-width-90">
                {this.getRecipeString(recipe.description)}
              </p>
            </Box>
            <Image
              gridArea="image"
              className="image"
              src={recipe.images[0].url}
              fit="cover"
            />
          </Grid>
        </Box>
    )
  }
}
