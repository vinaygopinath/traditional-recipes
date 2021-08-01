import { Image } from "grommet"
import React from "react"

type IngredientIconProps = {
  url: string
}

export default class IngredientIcon extends React.PureComponent<IngredientIconProps> {

  render() {
    return <Image fit="contain" className="ingredient-icon" src={this.props.url} />
  }
}