import React from "react"
import { connect, ConnectedProps } from "react-redux"
import { RouteComponentProps } from "react-router-dom"
import { CountryProp } from "../../models/CountryProp"
import { RecipeActionCreators } from "../../store/recipe/RecipeActionCreators"
import { RootState } from "../../store/RootReducer"
import { CountryUtils } from "../../utils/CountryUtils"
import { RecipeUtils } from "../../utils/RecipeUtils"
import "./RecipePage.scss"

const mapState = (state: RootState) => ({
  recipe: state.recipe.recipe
})

const mapDispatch = {
  loadRecipe: RecipeActionCreators.loadRecipe
}

const connector = connect(mapState, mapDispatch)

type RecipePageProps = ConnectedProps<typeof connector>
& RouteComponentProps<CountryProp>
& RouteComponentProps<{ recipeId: string }>

class RecipePage extends React.PureComponent<RecipePageProps> {

  componentDidMount() {
    const countryName = CountryUtils.getCountryNameFromProp(this.props)
    const recipeId = this.props.match.params.recipeId
    if (
      CountryUtils.isKnownCountry(countryName)
    && RecipeUtils.hasRecipe(countryName, recipeId)
    ) {
      this.props.loadRecipe(countryName, recipeId)
    }
  }

  render() {
    if (!this.props.recipe) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <div>
        <div>Recipe title: {this.props.recipe.title}</div>
        <div>Recipe subtitle: {this.props.recipe.subtitle}</div>
        <div>Recipe ingredients: {this.props.recipe.ingredients.map(ingredient => ingredient.ingredient.name).join(', ')}</div>
      </div>
    )
  }
}

export default connector(RecipePage)