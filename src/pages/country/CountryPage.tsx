import { Box, List, ResponsiveContext } from "grommet"
import React from "react"
import { connect, ConnectedProps } from "react-redux"
import { Redirect, RouteComponentProps } from "react-router-dom"
import { RecipePreview } from "../../models/RecipePreview"
import { RecipeActionCreators } from "../../store/recipe/RecipeActionCreators"
import { RootState } from "../../store/RootReducer"
import { CountryUtils } from "../../utils/CountryUtils"
import RecipePreviewComponent from "./recipe-preview/RecipePreview"
import "./CountryPage.scss"
import { CountryProp } from "../../models/CountryProp"

const mapState = (state: RootState) => ({
  recipePreviews: state.recipe.recipePreviews,
})

const mapDispatch = {
  initialiseCountryPage: RecipeActionCreators.initialiseCountryPage
}

const connector = connect(mapState, mapDispatch)

type CountryPageProps = ConnectedProps<typeof connector> &
  RouteComponentProps<CountryProp>

class CountryPage extends React.PureComponent<CountryPageProps> {

  componentDidMount() {
    const countryName = this.getCountryName()
    if (CountryUtils.isKnownCountry(countryName)) {
      this.props.initialiseCountryPage(countryName)
    }
  }

  render() {
    if (CountryUtils.isKnownCountryInProp(this.props)) {
      return (
        <div>
          <h1>{CountryUtils.getCountryNameFromProp(this.props).toLocaleUpperCase()}</h1>
            {this.showRecipePreviews()}
        </div>
      )
    } else {
      return <Redirect to="/kenya" />
    }
  }

  getListVerticalPaddingForScreenSize(size: string): string {
    switch (size) {
      case "xsmall":
      case "small":
        return "xlarge"
      default:
        return "large"
    }
  }

  getCountryName(): string {
    return CountryUtils.getCountryNameFromProp(this.props)
  }

  onRecipePreviewClick(recipePreview: RecipePreview | undefined) {
    if (!recipePreview) {
      return
    }

    this.props.history.push(`${this.getCountryName()}/${recipePreview.id}`)
  }

  showRecipePreviews() {
    if (this.props.recipePreviews.length > 0) {
      // TODO (dev only): Creating multiple elements to visualize a longer list
      // Remove before release
      const recipePreviews = Array(10).fill(this.props.recipePreviews[0])
      return (
        <ResponsiveContext.Consumer>
          {(size) => (
            <Box className="recipe-previews">
            <List
            onClickItem={(event: { item?: RecipePreview; index?: number }) => this.onRecipePreviewClick(event.item)}
            pad={{vertical: this.getListVerticalPaddingForScreenSize(size)}}
            data={recipePreviews}
            primaryKey="id"
            children={(item: RecipePreview, index: number) => <RecipePreviewComponent recipePreview={item} />}
            />
            </Box>
          )}
        </ResponsiveContext.Consumer>
      )
    }
  }
}

export default connector(CountryPage)
