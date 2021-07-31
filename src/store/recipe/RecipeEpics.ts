import { combineEpics, StateObservable, ofType, Epic } from "redux-observable";
import { Observable } from "rxjs";
import { mergeMap } from 'rxjs/operators'
import { Action } from "../../models/Action";
import { RecipeUtils } from "../../utils/RecipeUtils";
import { RootState } from "../RootReducer";
import { InitialiseCountryPageAction, LoadRecipeAction, RecipeActions } from "./RecipeActions";
import { RecipeActionCreators } from "./RecipeActionCreators";
import { RecipeActionType } from "./RecipeActionType";
export class RecipeEpics {

  public static getEpics(): Epic {
    return combineEpics(
      this.fetchRecipePreviews,
      this.fetchRecipe
    )
  }

  public static fetchRecipePreviews(
    action$: Observable<Action<RecipeActionType>>,
    state: StateObservable<RootState>
  ): Observable<RecipeActions> {
    return action$.pipe(
      ofType(RecipeActionType.INITIALISE_COUNTRY_PAGE),
      mergeMap(async (action, index) => {
        const recipeAction = action as InitialiseCountryPageAction
        const recipePreviews = await RecipeUtils.getRecipePreviewsForCountry(recipeAction.payload)

        return Promise.resolve(
          RecipeActionCreators.setRecipePreviews(recipePreviews)
        )
      })
    )
  }

  public static fetchRecipe(
    action$: Observable<Action<RecipeActionType>>,
    state: StateObservable<RootState>
  ): Observable<RecipeActions> {
    return action$.pipe(
      ofType(RecipeActionType.LOAD_RECIPE),
      mergeMap(async (action, index) => {
        const recipeAction = action as LoadRecipeAction
        const { recipeId, country} = recipeAction.payload
        const recipe = await RecipeUtils.fetchRecipe(country, recipeId)

        return Promise.resolve(
          RecipeActionCreators.setRecipe(recipe)
        )
      })
    )
  }
}