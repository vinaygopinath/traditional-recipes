import { SupportedCountry } from "../models/SupportedCountry"

export class CountryUtils {

  public static isKnownCountry(countryName: string | null): countryName is SupportedCountry {
    const lowercaseCountry = countryName?.toLocaleLowerCase()
    return lowercaseCountry != null && Object.values(SupportedCountry)
      .some((country: string) => country === lowercaseCountry)
  }
}