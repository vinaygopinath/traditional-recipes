# Models

Ingredient
* name: string
* image: string

HarmfulIngredient extends Ingredient
* knownEffects: string[]
* barbs: string[]

Recipe
* images: string[], only one of which will be displayed at random
* countries: SupportedCountry[], used to decide the recipes to be displayed in a screen
* title: string
* subtitle: string or null
* description: string
* ingredients: Ingredient[], a collection of regular ingredients, like tomato, rice etc
* harmfulIngredients: HarmfulIngredient[], a collection of harmful ingredients, only one of which will be displayed