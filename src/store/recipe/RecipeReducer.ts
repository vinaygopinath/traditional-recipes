import { RecipePreview } from "../../models/RecipePreview";
import { RecipeActions } from "./RecipeActions";
import { RecipeActionType } from "./RecipeActionType";
import { RecipeState } from "./RecipeState";


export class RecipeReducer {

  public static RECIPE_INITIAL_STATE: RecipeState = {
    country: null,
    recipePreviews: [],
    recipe: null
  }

  public static getReducer(state = RecipeReducer.RECIPE_INITIAL_STATE, action: RecipeActions): RecipeState {
    switch (action.type) {
      case RecipeActionType.SET_RECIPE_PREVIEWS: return RecipeReducer.mutateRecipePreviews(state, action.payload)
      default: return state
    }
  }

  private static mutateRecipePreviews(state: RecipeState, recipePreviews: RecipePreview[]): RecipeState {
    return {
      ...state,
      recipePreviews
    }
  }
}