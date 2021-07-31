import { Recipe } from "../../models/Recipe";
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
      case RecipeActionType.SET_RECIPE_PREVIEWS: return RecipeReducer.updateRecipePreviews(state, action.payload)
      case RecipeActionType.LOAD_RECIPE: return RecipeReducer.clearRecipe(state)
      case RecipeActionType.SET_RECIPE: return RecipeReducer.setRecipe(state, action.payload)
      default: return state
    }
  }

  private static updateRecipePreviews(state: RecipeState, recipePreviews: RecipePreview[]): RecipeState {
    return {
      ...state,
      recipePreviews
    }
  }

  private static clearRecipe(state: RecipeState): RecipeState {
    return {
      ...state,
      recipe: null
    }
  }

  private static setRecipe(state: RecipeState, recipe: Recipe): RecipeState {
    return {
      ...state,
      recipe
    }
  }
}