import { Box, ResponsiveContext } from "grommet"
import React from "react"
import { withTranslation, WithTranslation } from "react-i18next"
import { connect, ConnectedProps } from "react-redux"
import { RouteComponentProps } from "react-router-dom"
import { CountryProp } from "../../models/CountryProp"
import { Recipe } from "../../models/Recipe"
import { RecipeActionCreators } from "../../store/recipe/RecipeActionCreators"
import { RootState } from "../../store/RootReducer"
import { CountryUtils } from "../../utils/CountryUtils"
import { RecipeUtils } from "../../utils/RecipeUtils"
import { TextUtils } from "../../utils/TextUtils"
import RecipeBanner from "./recipe-banner/RecipeBanner"

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

  render() {
    const recipe = this.props.recipe
    if (!recipe || !this.state.isTranslationReady) {
      return <div>Loading...</div>
    }

    return (
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box>
            <RecipeBanner size={size} recipe={recipe} getRecipeString={translationKey => this.getRecipeString(translationKey)} />
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
