import React from "react"
import { Box } from "grommet";
import { PadType } from "grommet/utils";
import './Separator.scss';

interface SeparatorProps {
  pad?: PadType,
  thickness?: string
}

export default class Separator extends React.PureComponent<SeparatorProps> {

  render() {
    return (
      <Box pad={this.props.pad}>
        <div className="separator" style={{height: this.props.thickness || '1px' }}/>
      </Box>
    )
  }
}