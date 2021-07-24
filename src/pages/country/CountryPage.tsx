import React from "react"
import { connect, ConnectedProps } from "react-redux"
import { Redirect, RouteComponentProps } from "react-router-dom"
import { RecipeActionCreators } from "../../store/recipe/RecipeActionCreators"
import { RootState } from "../../store/RootReducer"
import { CountryUtils } from "../../utils/CountryUtils"

const mapState = (state: RootState) => ({
  recipePreviews: state.recipe.recipePreviews
})

const mapDispatch = {
  initialiseCountryPage: RecipeActionCreators.initialiseCountryPage
}

const connector = connect(mapState, mapDispatch)

interface RouterProps {
  country: string
}

type CountryPageProps = ConnectedProps<typeof connector> & RouteComponentProps<RouterProps>

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
        <div>Country page for country {this.props.match.params.country}</div>
      )
    } else {
      return (<Redirect to="/kenya" />)
    }
  }
}

export default connector(CountryPage)