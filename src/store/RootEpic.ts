import { combineEpics } from "redux-observable"
import { RecipeEpics } from "./recipe/RecipeEpics"

export class RootEpic {

  public static getCombinedEpic() {
    return combineEpics(
      RecipeEpics.getEpics()
    )
  }
}