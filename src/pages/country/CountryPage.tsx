import React from "react"
import { RouteComponentProps } from "react-router-dom"

interface RouterProps {
  country: string
}

interface CountryPageProps extends RouteComponentProps<RouterProps> {

}

class CountryPage extends React.PureComponent<CountryPageProps> {

  render() {
    return (
      <div>Country page for country {this.props.match.params.country}</div>
    )
  }
}

export default CountryPage