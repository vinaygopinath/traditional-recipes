export class CountryUtils {

  private static KNOWN_COUNTRIES = [
    "kenya"
  ]

  public static isKnownCountry(countryName: string | null): boolean {
    const lowercaseCountry = countryName?.toLocaleLowerCase()
    return lowercaseCountry != null && this.KNOWN_COUNTRIES.includes(lowercaseCountry)
  }
}