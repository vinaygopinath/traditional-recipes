import { Box, Main, ResponsiveContext } from "grommet"
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
import HarmfulIngredientDetail from "./harmful-ingredient-detail/HarmfulIngredientDetail"
import RecipeBanner from "./recipe-banner/RecipeBanner"
import RecipeContent from "./recipe-content/RecipeContent"

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
    isTranslationReady: false,
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
    this.props.i18n.loadNamespaces(`recipe-${recipe.id}`, () => {
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

  getIngredientString(translationKey: string): string {
    return TextUtils.getIngredientString(this.props, translationKey)
  }

  showHarmfulIngredientDetails(size: string) {
    return this.props.recipe?.harmfulIngredients.map((harmfulIngredient, index) => {
      return (
        <HarmfulIngredientDetail harmfulIngredient={harmfulIngredient} key={index} size={size}/>
      )
    })
  }

  render() {
    const recipe = this.props.recipe
    if (!recipe || !this.state.isTranslationReady) {
      return <div>Loading...</div>
    }

    return (
      <ResponsiveContext.Consumer>
        {(size) => (
          <Main pad={{bottom: 'large'}}>
            <RecipeBanner
              size={size}
              recipe={recipe}
              getRecipeString={(translationKey) =>
                this.getRecipeString(translationKey)
              }
            />
            <RecipeContent recipe={recipe} size={size}/>
            <Box pad={{vertical: 'large'}}>
              {this.showHarmfulIngredientDetails(size)}
            </Box>
          </Main>
        )}
      </ResponsiveContext.Consumer>
    )
  }
}

export default connector(withTranslation(["ingredients", "harmful-ingredients", "recipe-page"])(RecipePage))
