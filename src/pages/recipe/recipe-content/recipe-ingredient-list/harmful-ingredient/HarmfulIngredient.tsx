import React from "react"
import { Box, Grid } from "grommet";
import { HarmfulIngredient as HarmfulIngredientModel } from "../../../../../models/HarmfulIngredient"
import { TextUtils } from "../../../../../utils/TextUtils";
import { withTranslation, WithTranslation } from "react-i18next";
import { RandomUtils } from "../../../../../utils/RandomUtils";
import "./HarmfulIngredient.scss";
import IngredientIcon from "../../../../../common-components/ingredient-icon/IngredientIcon";

type HarmfulIngredientProps = {
  harmfulIngredient: HarmfulIngredientModel,
  recipeId: string
} & WithTranslation

class HarmfulIngredient extends React.PureComponent<HarmfulIngredientProps> {

  getIngredientDetails(): string {
    return TextUtils.getHarmfulIngredientString(
      this.props,
      this.props.harmfulIngredient.name
    )
  }

  getBarb(): string {
    if (this.props.harmfulIngredient.barbs.length > 0) {
      const barbKey = RandomUtils.getRandomElement(
        this.props.harmfulIngredient.barbs
      )
      return TextUtils.getHarmfulIngredientString(this.props, barbKey)
    }

    return ""
  }

  render() {
    return (
      <Grid columns={["1/4", "3/4"]} rows="full" height="xsmall" gap="small">
        <Box className="ingredient-image-container">
          <IngredientIcon url={this.props.harmfulIngredient.image.url} />
        </Box>
        <Box alignContent="start" alignSelf="center">
          <div className="ingredient-title">{this.getIngredientDetails()}</div>
          <div className="max-width-90 ingredient-barb">{this.getBarb()}</div>
        </Box>
      </Grid>
    )
  }
}

export default withTranslation(['harmful-ingredients'])(HarmfulIngredient)