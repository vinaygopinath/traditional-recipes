import { Box } from "grommet";
import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { KnownEffect as KnownEffectModel } from '../../../../models/KnownEffect'
import { TextUtils } from "../../../../utils/TextUtils";
import "./KnownEffect.scss"

type KnownEffectProps = {
  effect: KnownEffectModel
} & WithTranslation

class KnownEffect extends React.PureComponent<KnownEffectProps> {

  getString(key: string): string {
    return TextUtils.getHarmfulIngredientString(this.props, key)
  }

  showCitations() {
    return this.props.effect.citations.map((citation, index) => {
      if (citation.link) {
        return <span className="citation" key={index}>
          <a href={citation.link} target="_blank" rel="noreferrer">{citation.authors}</a>
        </span>
      } else {
        return <span className="citation" key={index}>{citation.authors}</span>
      }
    })
  }

  render() {
    const { effect } = this.props
    return (
      <Box>
        <h4 className="title">{this.getString(effect.name)}</h4>
        <span className="description">{this.getString(effect.description)}</span>
        <Box pad={{top: 'small'}}>
        {this.showCitations()}
        </Box>
      </Box>
    )
  }
}

export default withTranslation(['harmful-ingredients'])(KnownEffect)