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

const mapState = (state: RootState) => ({
  recipePreviews: state.recipe.recipePreviews,
})

const mapDispatch = {
  initialiseCountryPage: RecipeActionCreators.initialiseCountryPage,
}

const connector = connect(mapState, mapDispatch)

interface RouterProps {
  country: string
}

type CountryPageProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouterProps>

class CountryPage extends React.PureComponent<CountryPageProps> {
  componentDidMount() {
    const countryName = this.props.match.params.country
    if (CountryUtils.isKnownCountry(countryName)) {
      this.props.initialiseCountryPage(countryName)
    }
  }

  render() {
    const countryName = this.props.match.params.country
    if (CountryUtils.isKnownCountry(countryName)) {
      return (
        <div>
          <h1>{this.props.match.params.country.toLocaleUpperCase()}</h1>
          {/* <Grid gap="medium" columns={{ count: 1, size: '40%' }} style={{paddingLeft: '20%', paddingRight: '30%'}}> */}
            {this.showRecipePreviews()}
          {/* </Grid> */}
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
            pad={{vertical: this.getListVerticalPaddingForScreenSize(size)}}
            data={recipePreviews}
            primaryKey="internalName"
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
