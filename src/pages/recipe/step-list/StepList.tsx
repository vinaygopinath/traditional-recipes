import React from "react"
import { Recipe } from "../../../models/Recipe"
import Step from "./step/Step"

type StepListProps = {
  recipe: Recipe
}

class StepList extends React.PureComponent<StepListProps> {

  showSteps() {
    return this.props.recipe.steps.map((step, index) => {
      return <Step key={index} step={step} number={index + 1} />
    })
  }

  render() {
    return (
      <div>
        {this.showSteps()}
      </div>
    )
  }
}

export default StepList