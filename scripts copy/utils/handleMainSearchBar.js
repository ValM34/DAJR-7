import { recipes } from '../../data/recipes.js'

function searchRecipes(inputValue, recipes) {
  let recipesFiltered = [];
  recipes.forEach((recipe) => {
    if(recipe.name.toLowerCase().includes(inputValue.toLowerCase()) || recipe.description.toLowerCase().includes(inputValue.toLowerCase())){
      recipesFiltered.push(recipe)
    }
  })

  return recipesFiltered;
}

export { searchRecipes }