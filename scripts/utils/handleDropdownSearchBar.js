import { recipes } from '../../data/recipes.js'
import { filterFiltersByRecipes } from "./filterFiltersByRecipes.js";
import { filterRecipes } from "./filterRecipes.js";


function filterIngredientsWhenInput(inputValue, type, ustensilsList) {
  let newIngredientListAfterFiltered = [];

  //let ustensilsList2 = document.querySelectorAll(`#${type}s_content_filter > div.active`);

  ustensilsList.forEach((ingredient) => {
    if(ingredient.textContent.toLowerCase().includes(inputValue.toLowerCase())){
      newIngredientListAfterFiltered.push(ingredient.textContent)
    }
  })

  return newIngredientListAfterFiltered;
}

export { filterIngredientsWhenInput }
