import React from "react"
import { Redirect, RouteComponentProps } from "react-router-dom"
import { CountryUtils } from "../../utils/CountryUtils"

interface RouterProps {
  country: string
}

interface CountryPageProps extends RouteComponentProps<RouterProps> {

}

class CountryPage extends React.PureComponent<CountryPageProps> {

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

export default CountryPage