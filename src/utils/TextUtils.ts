import { WithTranslation } from "react-i18next";

export class TextUtils {

  public static getString(
    props: WithTranslation,
    translationKey: string,
    args: any = undefined
  ): string {
    return props.t(translationKey, args)
  }

  public static getStringOrPlaceholder(
    props: WithTranslation,
    translationKey: string,
    placeholder: string
  ): string {
    const localizedString = props.t(translationKey)
    if (!localizedString || localizedString === translationKey) {
      return placeholder
    } else {
      return localizedString
    }
  }

  public static getIngredientString(
    props: WithTranslation,
    translationKey: string
  ): string {
    return this.getString(
      props,
      `ingredients:${translationKey}`
    )
  }

  public static getHarmfulIngredientString(
    props: WithTranslation,
    translationKey: string
  ): string {
    return this.getString(
      props,
      `harmful-ingredients:${translationKey}`
    )
  }

  public static getHarmfulIngredientStringWithArgs(
    props: WithTranslation,
    translationKey: string,
    args: { [key: string]: any }
  ): string {
    return this.getString(
      props,
      `harmful-ingredients:${translationKey}`,
      args
    )
  }

  public static getRecipeString(
    props: WithTranslation,
    translationKey: string,
    recipeId: string
  ): string {
    return this.getString(
      props,
      `recipe-${recipeId}:${translationKey}`
    )
  }


}