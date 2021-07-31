import { RouteComponentProps } from "react-router-dom"
import { CountryProp } from "../models/CountryProp"
import { SupportedCountry } from "../models/SupportedCountry"

export class CountryUtils {

  public static isKnownCountry(countryName: string | null): countryName is SupportedCountry {
    const lowercaseCountry = countryName?.toLowerCase()
    return lowercaseCountry != null && Object.values(SupportedCountry)
      .some((country: string) => country === lowercaseCountry)
  }

  public static getCountryNameFromProp(props: RouteComponentProps<CountryProp>): string {
    return props.match.params.country.toLowerCase()
  }

  public static isKnownCountryInProp(props: RouteComponentProps<CountryProp>): boolean {
    const countryName = CountryUtils.getCountryNameFromProp(props)
    return CountryUtils.isKnownCountry(countryName)
  }
}