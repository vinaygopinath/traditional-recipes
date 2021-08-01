import { Box } from "grommet"
import React from "react"
import { WithTranslation, withTranslation } from "react-i18next";
import "./Step.scss"

type StepProps = {
  step: string
  number: number
} & WithTranslation

class Step extends React.PureComponent<StepProps> {

  getLocaleString(translationKey: string): string {
    return this.props.t(translationKey)
  }

  render() {
    return (
      <Box className="step">
        <h4 className="title">{`${this.getLocaleString('recipe_page_step')} ${this.props.number}`}</h4>
        <span className="max-width-90">{this.props.step}</span>
      </Box>
    )
  }
}

export default withTranslation(['recipe-page'])(Step)