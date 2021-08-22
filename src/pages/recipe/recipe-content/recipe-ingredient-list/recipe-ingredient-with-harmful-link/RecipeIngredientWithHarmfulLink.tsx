import { Box, Grid } from "grommet";
import IngredientIcon from "../../../../../common-components/ingredient-icon/IngredientIcon";
import React from "react"
import { WithTranslation, withTranslation } from "react-i18next"
import { RecipeIngredientWithHarmfulLink as RecipeIngredientWithHarmfulLinkModel } from "../../../../../models/RecipeIngredientWithHarmfulLink"
import { TextUtils } from "../../../../../utils/TextUtils"
import "./RecipeIngredientWithHarmfulLink.scss"

type RecipeIngredientWithHarmfulLinkProps = {
  recipeIngredientWithHarmfulLink: RecipeIngredientWithHarmfulLinkModel,
  recipeId: string
} & WithTranslation

class RecipeIngredientWithHarmfulLink extends React.PureComponent<RecipeIngredientWithHarmfulLinkProps> {

  getIngredientDetails(): string {
    const { recipeIngredientWithHarmfulLink, recipeId } = this.props
    let noteTranslationKey = recipeIngredientWithHarmfulLink.note
    const ingredientName = TextUtils.getIngredientString(this.props, recipeIngredientWithHarmfulLink.ingredient.name)
    const recipeQuantity = TextUtils.getRecipeString(this.props, recipeIngredientWithHarmfulLink.quantity, recipeId)
    const ingredientAndQuantity = `${ingredientName} - ${recipeQuantity}`
    let note: string | null = null
    if (noteTranslationKey) {
      note = TextUtils.getRecipeString(this.props, noteTranslationKey, recipeId)
    }
    if (note) {
      return `${ingredientAndQuantity} (${note})`
    } else {
      return ingredientAndQuantity
    }
  }

  getBonusLabel(): string {
    return TextUtils.getString(
      this.props,
      "recipe-page:recipe_page_recipe_ingredient_bonus"
    )
  }

  getBonusIngredientString(): string {
    const { harmfulIngredientName : getHarmfulIngredientKey } = this.props.recipeIngredientWithHarmfulLink

    return TextUtils.getHarmfulIngredientString(
      this.props,
      getHarmfulIngredientKey
    )
  }

  render() {
    const { recipeIngredientWithHarmfulLink } = this.props
    return (
      <Grid columns={["1/4", "3/4"]} rows="full" height="xsmall" gap="small" pad={{bottom: 'xsmall'}}>
        <Box className="ingredient-image-container">
          <IngredientIcon url={recipeIngredientWithHarmfulLink.ingredient.image.url} />
        </Box>
        <Box alignContent="start" alignSelf="center">
          <div className="ingredient-detail">{this.getIngredientDetails()}</div>
          <div className="bonus-container">
            <span className="bonus-label">{this.getBonusLabel()}</span>
            <span>{this.getBonusIngredientString()}</span>
          </div>
        </Box>
      </Grid>
    )
  }
}

export default withTranslation(['ingredients'])(RecipeIngredientWithHarmfulLink)
