import { RootState, rootReducer } from "./RootReducer"
import { createStore, compose, applyMiddleware } from "redux"
import { createEpicMiddleware } from "redux-observable"
import { RootEpic } from './RootEpic';
import { RecipeReducer } from "./recipe/RecipeReducer";

const DEFAULT_STATE: RootState = {
  recipe: RecipeReducer.RECIPE_INITIAL_STATE
}

function configureSiteStore(preloadedState: RootState) {
  const middlewares = []
  const epicMiddleware = createEpicMiddleware();
  const epics = RootEpic.getCombinedEpic()
  middlewares.push(epicMiddleware)

  if (process.env.NODE_ENV === 'development') {
    const { createLogger } = require('redux-logger');

    middlewares.push(createLogger({
      collapsed: true
    }))
  }
  const enhancers = compose(applyMiddleware(...middlewares))

  const store = createStore(rootReducer, preloadedState, enhancers)

  epicMiddleware.run(epics)

  return store
}

export const store = configureSiteStore(DEFAULT_STATE)