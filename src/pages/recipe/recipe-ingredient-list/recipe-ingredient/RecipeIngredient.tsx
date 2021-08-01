import { Box, Grid } from "grommet";
import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import IngredientIcon from "../../../../common-components/ingredient-icon/IngredientIcon";
import { RecipeIngredient as RecipeIngredientModel } from "../../../../models/RecipeIngredient";
import { TextUtils } from "../../../../utils/TextUtils";
import "./RecipeIngredient.scss";

type RecipeIngredientProps = {
  recipeIngredient: RecipeIngredientModel
  recipeId: string
} & WithTranslation

class RecipeIngredient extends React.PureComponent<RecipeIngredientProps> {

  getIngredientDetails(): string {
    const { recipeIngredient, recipeId } = this.props
    let noteTranslationKey = recipeIngredient.note
    const ingredientName = TextUtils.getIngredientString(this.props, recipeIngredient.ingredient.name)
    const recipeQuantity = TextUtils.getRecipeString(this.props, recipeIngredient.quantity, recipeId)
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

  render() {
    const { ingredient } = this.props.recipeIngredient
    return (
      <Grid columns={["1/4", "3/4"]} rows="full" height="xsmall" gap="small" pad={{bottom: 'xsmall'}}>
        <Box className="ingredient-image-container">
          <IngredientIcon url={ingredient.image.url} />
        </Box>
        <Box alignContent="start" alignSelf="center">
          <div>{this.getIngredientDetails()}</div>
        </Box>
      </Grid>
    )
  }
}

export default withTranslation(['ingredients'])(RecipeIngredient)