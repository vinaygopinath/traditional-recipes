import { combineReducers } from "redux"
import { RecipeReducer } from "./recipe/RecipeReducer"

export const rootReducer = combineReducers(
  {
    recipe: RecipeReducer.getReducer
  }
)

export type RootState = ReturnType<typeof rootReducer>