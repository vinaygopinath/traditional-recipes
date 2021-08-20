import { Box, Grid, Image } from "grommet"
import React from "react"
import { HarmfulIngredient } from "../../../models/HarmfulIngredient"
import KnownEffect from "./known-effect/KnownEffect"
import "./HarmfulIngredientDetail.scss"
import { withTranslation, WithTranslation } from "react-i18next"
import { TextUtils } from "../../../utils/TextUtils"
import { RandomUtils } from "../../../utils/RandomUtils"

type HarmfulIngredientDetailProps = {
  size: string,
  harmfulIngredient: HarmfulIngredient
} & WithTranslation

class HarmfulIngredientDetail extends React.PureComponent<HarmfulIngredientDetailProps> {
  getColumnsForSize(): string[] {
    switch (this.props.size) {
      case "xsmall":
      case "small":
        return ["full"]
      default:
        return ["1/3", "1/3", "1/3"]
    }
  }

  getRowsForSize(): string[] {
    switch (this.props.size) {
      case "xsmall":
      case "small":
        return ["auto", "auto", "auto"]
      default:
        return ["auto"]
    }
  }

  getGapBySize() {
    switch (this.props.size) {
      case "xsmall":
      case "small":
        return "none"
      default:
        return "large"
    }
  }

  getString(key: string, args: { [key: string]: any }): string {
    return this.props.t(key, args)
  }

  getHarmfulIngredientName(): string {
    return TextUtils.getHarmfulIngredientString(this.props, this.props.harmfulIngredient.name).toLowerCase()
  }

  getHarmfulIngredientIntro(): string {
    const randomIntro = `recipe_page_harmful_ingredient_intro${RandomUtils.getRandomElement([1, 2, 3])}`
    return this.getString(
      randomIntro,
      { harmfulIngredientName: this.getHarmfulIngredientName() }
    )
  }

  showKnownEffects() {
    return this.props.harmfulIngredient.knownEffects.map((knownEffect, index) => {
      return (
        <KnownEffect effect={knownEffect} key={index} />
      )
    })
  }

  getEUBanMessage() {
    return TextUtils.getHarmfulIngredientStringWithArgs(
      this.props,
      `harmful_ingredient_eu_not_approved_message`,
      { harmfulIngredientName: this.getHarmfulIngredientName() }
    )
  }

  getEUBanTitle() {
    return TextUtils.getHarmfulIngredientString(
      this.props,
      `harmful_ingredient_eu_not_approved_title`
    )
  }

  getEUColumnsForSize(): string[] {
    switch (this.props.size) {
      case "xsmall":
      case "small":
        return ["full"]
      default:
        return ["auto", "flex"]
    }
  }

  showEUBan() {
    if (this.props.harmfulIngredient.isBannedInEU) {
      return (
          <Grid columns={this.getEUColumnsForSize()} pad={{vertical: '2rem'}} gap="medium">
            <Image style={{maxWidth: '10rem'}} fit="contain" src="/harmful-ingredients/images/eu-ban.svg"/>
            <Box>
              <h3 className="eu-ban-title">{this.getEUBanTitle()}</h3>
              <span className="description max-width-90">{this.getEUBanMessage()}</span>
            </Box>
          </Grid>
      )
    }
  }

  getEffectHeading(): string {
    return TextUtils.getHarmfulIngredientStringWithArgs(
      this.props,
      'harmful_ingredient_effects_heading',
      { harmfulIngredientName: this.getHarmfulIngredientName() }
    )
  }

  render() {
    return (
      <Box className="harmful-ingredient-detail">
        <h2 className="title">{this.getHarmfulIngredientIntro()}</h2>
        <span className="description">{TextUtils.getHarmfulIngredientString(this.props, this.props.harmfulIngredient.description)}</span>
        {this.showEUBan()}
        <h3 className="title">{this.getEffectHeading()}</h3>
        <Grid
        rows={this.getRowsForSize()}
        columns={this.getColumnsForSize()}
        gap={this.getGapBySize()}
      >
        {this.showKnownEffects()}
      </Grid>
      </Box>
    )
  }
}

export default withTranslation(['recipe-page'])(HarmfulIngredientDetail)
