import { Box, Grid, Image, ResponsiveContext } from "grommet"
import React from "react"
import { withTranslation, WithTranslation } from "react-i18next"
import { connect, ConnectedProps } from "react-redux"
import { RouteComponentProps } from "react-router-dom"
import Separator from "../../common-components/separator/Separator"
import { CountryProp } from "../../models/CountryProp"
import { Recipe } from "../../models/Recipe"
import { RecipeActionCreators } from "../../store/recipe/RecipeActionCreators"
import { RootState } from "../../store/RootReducer"
import { CountryUtils } from "../../utils/CountryUtils"
import { RecipeUtils } from "../../utils/RecipeUtils"
import { TextUtils } from "../../utils/TextUtils"
import "./RecipePage.scss"

const mapState = (state: RootState) => ({
  recipe: state.recipe.recipe,
})

const mapDispatch = {
  loadRecipe: RecipeActionCreators.loadRecipe,
}

const connector = connect(mapState, mapDispatch)

type RecipePageProps = ConnectedProps<typeof connector> &
  RouteComponentProps<CountryProp> &
  RouteComponentProps<{ recipeId: string }> &
  WithTranslation

type RecipeState = {
  isTranslationReady: boolean
}

class RecipePage extends React.PureComponent<RecipePageProps, RecipeState> {
  state: RecipeState = {
    isTranslationReady: false
  }

  componentDidMount() {
    const countryName = CountryUtils.getCountryNameFromProp(this.props)
    const recipeId = this.props.match.params.recipeId
    if (
      CountryUtils.isKnownCountry(countryName) &&
      RecipeUtils.hasRecipe(countryName, recipeId)
    ) {
      this.props.loadRecipe(countryName, recipeId)
    }
  }

  componentDidUpdate(props: RecipePageProps) {
    if (!this.state.isTranslationReady && this.props.recipe != null) {
      this.loadTranslationStrings()
    }
  }

  loadTranslationStrings() {
    const recipe = this.props.recipe as Recipe
    const ingredientFileNames = recipe.ingredients
      .map((ingredient) => ingredient.ingredient.id)
      .map((ingredientId) => `ingredient-${ingredientId}`)

    const filenames = [`recipe-${recipe.id}`, ...ingredientFileNames]
    this.props.i18n.loadNamespaces(filenames, () => {
      this.setState({
        isTranslationReady: true,
      })
    })
  }

  getRecipeString(translationKey: string): string {
    return TextUtils.getRecipeString(
      this.props,
      translationKey,
      this.props.recipe!.id
    )
  }

  getSubtitle(recipe: Recipe): string {
    if (recipe.subtitle) {
      return this.getRecipeString(recipe.subtitle)
    } else {
      return ""
    }
  }

  getBannerColumnsForSize(size: string): string[] {
    switch (size) {
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

  getBannerRowsForSize(size: string): string[] {
    switch (size) {
      case "xsmall":
      case "small":
        return ["auto", "auto"]
      default:
        return ["auto"]
    }
  }

  getBannerAreasForSize(
    size: string
    ): { name?: string; start?: number[]; end?: number[] }[] {
      switch (size) {
        case "xsmall":
        case "small":
          return [
            /**
             * Small screens have two full-width rows
             */
            { name: "image", start: [0, 0], end: [0, 0] },
            { name: "intro", start: [0, 1], end: [0, 1] }
          ]
        default:
          /**
           * Medium, large and xlarge screens use a single row + two columns
           */
          return [
            { name: "intro", start: [0, 0], end: [0, 0] },
            { name: "image", start: [1, 0], end: [1, 0] }
          ]
      }
    }

    getBannerAreaGapBySize(size: string) {
      switch (size) {
        case "xsmall":
        case "small":
          return "none"
        default:
          return "large"
      }
    }

  render() {
    const recipe = this.props.recipe
    if (!recipe || !this.state.isTranslationReady) {
      return <div>Loading...</div>
    }

    return (
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box>
            <Box className="banner" background="light-2">
              <Grid
                columns={this.getBannerColumnsForSize(size)}
                rows={this.getBannerRowsForSize(size)}
                areas={this.getBannerAreasForSize(size)}
                gap={this.getBannerAreaGapBySize(size)}>
                <Box gridArea="intro" className="intro">
                  <h1 className="title">{this.getRecipeString(recipe.title)}</h1>
                  <span className="subtitle">{this.getSubtitle(recipe)}</span>
                  <Separator pad="medium"/>
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
            <div>Recipe title: {this.getRecipeString(recipe.title)}</div>
            <div>
              Recipe ingredients:{" "}
              {recipe.ingredients
                .map((ingredient) => ingredient.ingredient.name)
                .join(", ")}
            </div>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    )
  }
}

export default connector(withTranslation()(RecipePage))
