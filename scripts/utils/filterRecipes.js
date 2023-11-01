import { recipes } from '../../data/recipes.js'

function filterRecipesByIngredients(ingredientsSelected) {
  let recipesFiltered = [];
    
  recipes.forEach((recipe) => {

    let countTheIngredientsThatMatch = 0;

    recipe.ingredients.forEach((ingredient) => {
      ingredientsSelected.forEach((ingredientSelected) => {
        if(ingredient.ingredient === ingredientSelected.textContent){
          countTheIngredientsThatMatch += 1;
        }
      })
    })
    if(countTheIngredientsThatMatch === ingredientsSelected.length){
      recipesFiltered.push(recipe)
    }
  })

  return recipesFiltered;
}

function filterRecipesByUstensils(ustensilsSelected, recipesByIngredients) {
  let recipesFiltered = [];
  
  recipesByIngredients.forEach((recipe) => {
    let countTheUstensilsThatMatch = 0;

    recipe.ustensils.forEach((ustensil) => {
      ustensilsSelected.forEach((ingredientSelected) => {
        if(ustensil === ingredientSelected.textContent){
          countTheUstensilsThatMatch += 1;
        }
      })
    })
    if(countTheUstensilsThatMatch === ustensilsSelected.length){
      recipesFiltered.push(recipe)
    }
  })

  return recipesFiltered;
}

function filterRecipesByAppliances(appliancesSelected, recipesByUstensils) {
  let recipesFiltered = [];
  
  recipesByUstensils.forEach((recipe) => {
    let countTheAppliancesThatMatch = 0;

    appliancesSelected.forEach((ingredientSelected) => {
      if(recipe.appliance === ingredientSelected.textContent){
        countTheAppliancesThatMatch += 1;
      }
    })

    if(countTheAppliancesThatMatch === appliancesSelected.length){
      recipesFiltered.push(recipe)
    }
  })

  return recipesFiltered;
}

function filterRecipes(filtersSelected) {
  let ingredientsElements = [];
  let ustensilsElements = [];
  let appliancesElements = [];

  filtersSelected.forEach((filterSelected) => {
    if(filterSelected.getAttribute('data-type') === 'ingredient'){
      ingredientsElements.push(filterSelected);
    } else if (filterSelected.getAttribute('data-type') === 'ustensil'){
      ustensilsElements.push(filterSelected);
    } else if (filterSelected.getAttribute('data-type') === 'appliance'){
      appliancesElements.push(filterSelected);
    }
  })

  let recipesByIngredients = filterRecipesByIngredients(ingredientsElements) ?? recipes;
  let recipesByUstensils = filterRecipesByUstensils(ustensilsElements, recipesByIngredients) ?? recipes;
  let recipesByAppliances = filterRecipesByAppliances(appliancesElements, recipesByUstensils);

  return recipesByAppliances;
}

export { filterRecipes }