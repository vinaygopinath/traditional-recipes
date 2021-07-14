import { CountryUtils } from "./CountryUtils"

describe('CountryUtils', () => {

  describe('isKnownCountry', () => {

    it('should return true when country is Kenya regardless of case', () => {
      const areAllCountriesValid = ['Kenya', 'kenya', 'kEnYa']
        .map(countryName => CountryUtils.isKnownCountry(countryName))
        .every(it => it)

      expect(areAllCountriesValid).toBeTruthy()
    })

    it('should return false when country is null', () => {
      const isCountryValid = CountryUtils.isKnownCountry(null)

      expect(isCountryValid).toBeFalsy()
    })

    it('should return false when country is unknown', () => {
      const isCountryValid = CountryUtils.isKnownCountry('Uganda')
      expect(isCountryValid).toBeFalsy()
    })
  })

})