import React from "react"
import { RecipePreview as RecipePreviewModel } from "../../../models/RecipePreview"
import { withTranslation, WithTranslation } from "react-i18next"
import { Card, CardBody, Grid, Image, ResponsiveContext } from "grommet"
import './RecipePreview.scss'

type RecipePreviewProps = WithTranslation & {
  recipePreview: RecipePreviewModel
}

type RecipePreviewState = {
  isTranslationReady: boolean
}

class RecipePreview extends React.PureComponent<RecipePreviewProps, RecipePreviewState> {

  state: RecipePreviewState = {
    isTranslationReady: false
  }

  namespacePromise: Promise<void> | null = null

  componentDidMount() {
    this.props.i18n.loadNamespaces(`recipe-${this.props.recipePreview.internalName}`, () => {
      this.setState({
        isTranslationReady: true
      })
    })
  }

  getLayoutColumnsForSize(size: string): string[] {
    switch (size) {
      case "xsmall":
      case "small":
        // Phone screens have a single full-width column
        return ["full"]
      default:
        // Tablet and desktop screens have two columns
        // thumbnail in the first, and content in the second
        return ["1/3", "2/3"]
    }
  }

  getLayoutRowsForSize(size: string): string[] {
    switch (size) {
      case "xsmall":
      case "small":
        return ["auto", "auto"]
      default:
        return ["auto"]
    }
  }

  getLayoutGridAreasForSize(
    size: string
    ): { name?: string; start?: number[]; end?: number[] }[] {
      switch (size) {
        case "xsmall":
        case "small":
          return [
            /**
             * Small screens have two full-width rows
             */
            { name: "thumbnail", start: [0, 0], end: [0, 0] },
            { name: "content", start: [0, 1], end: [0, 1] }
          ]
        default:
          /**
           * Medium, large and xlarge screens use a single row + two columns
           */
          return [
            { name: "thumbnail", start: [0, 0], end: [0, 0] },
            { name: "content", start: [1, 0], end: [1, 0] }
          ]
      }
    }
  render() {
    const recipePreview = this.props.recipePreview
    if (!this.state.isTranslationReady) {
      return (
      <Card animation="fadeIn" className="preview" height="auto" width="full">

      </Card>
      )
    }
    return (
      <Card animation="fadeIn" className="preview" height="auto" width="full">
        <ResponsiveContext.Consumer>
          {(size) => (
            <Grid
              columns={this.getLayoutColumnsForSize(size)}
              rows={this.getLayoutRowsForSize(size)}
              areas={this.getLayoutGridAreasForSize(size)}
            >
            <Image className="thumbnail" fit="contain" src={recipePreview.images[0].url}  />
            <div>
              <h2 className="title">
              {this.getLocaleStringOrPlaceholder(
                `${this.props.recipePreview.title}`
              )}
              </h2>
              <span className="subtitle">{this.getLocaleStringOrPlaceholder(
                `${this.props.recipePreview.subtitle}`
              )}</span>
              <CardBody className="description" margin={{top: '3vh'}}>
                {this.getEllipsizedDescription(this.props.recipePreview)}
              </CardBody>
            </div>
            </Grid>
          )
          }
        </ResponsiveContext.Consumer>
</Card>
    )
  }

  getLocaleStringOrPlaceholder(translationKey: string, args: any = undefined, placeholder: string = "..."): string {
    if (this.state.isTranslationReady) {
      return this.props.t(`recipe-${this.props.recipePreview.internalName}:${translationKey}`, args)
    } else {
      return placeholder
    }
  }

  getEllipsizedDescription(recipePreview: RecipePreviewModel): string {
    const description = this.getLocaleStringOrPlaceholder(recipePreview.description)
    if (description.length > 80) {
      return `${description.slice(0, 80)}...`
    } else {
      return description
    }
  }
}

export default withTranslation()(RecipePreview)
