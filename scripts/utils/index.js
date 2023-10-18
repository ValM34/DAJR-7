import { recipes } from '../../data/recipes.js'

function filterIngredientsWhenInput(inputValue) {
  let newIngredientListAfterFiltered = [];

  let ingredientsList = getAllIngredients();

  console.log(ingredientsList)

  ingredientsList.forEach((ingredient) => {
    if(ingredient.toLowerCase().includes(inputValue.toLowerCase())){
      newIngredientListAfterFiltered.push(ingredient)
    }
  })

  return newIngredientListAfterFiltered;
}

function getAllIngredients(){

  let ingredientslist = [];
  
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const isInIngredientsList = ingredientslist.find(ingredientName => ingredientName === ingredient.ingredient)
      if(isInIngredientsList === undefined){
        ingredientslist.push(ingredient.ingredient)
      }
    })
  })

  return ingredientslist;
}

function getAllUstensils(){

  let ustensilsList = [];

  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      const isInUstensilsList = ustensilsList.find(ustensilName => ustensilName === ustensil)
      if(isInUstensilsList === undefined){
        ustensilsList.push(ustensil)
      }
    })
  })

  return ustensilsList;
}

function getFiltersList(type) {
  if(type === 'ingredient') {
    return getAllIngredients();
  } else if(type === 'ustensil') {
    return getAllUstensils();
  }
}

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

function filterRecipes(filtersSelected, type) {
  console.log(filtersSelected[0])
  console.log(type)
  let ingredientsElements = [];
  let ustensilsElements = [];

  filtersSelected.forEach((filterSelected) => {
    if(filterSelected.getAttribute('data-type') === 'ingredient'){
      ingredientsElements.push(filterSelected);
    } else if (filterSelected.getAttribute('data-type') === 'ustensil'){
      ustensilsElements.push(filterSelected);
    }
  })

  let recipesByIngredients = filterRecipesByIngredients(ingredientsElements) ?? recipes;
  let recipesByUstensils = filterRecipesByUstensils(ustensilsElements, recipesByIngredients);

  return recipesByUstensils;
}

function filterIngredientsFiltersByRecipes(recipesSelected, contentFilters) {
  let ingredientsList = [];

  recipesSelected.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if(!ingredientsList.includes(ingredient.ingredient)){
        ingredientsList.push(ingredient.ingredient)
      }
    })
  })

  contentFilters.forEach((ingredientEl) => {
    ingredientEl.classList.remove('active');
    if (ingredientsList.includes(ingredientEl.textContent)) {
      ingredientEl.classList.add('active');
    }
  })
}

function filterUstensilsFiltersByRecipes(recipesSelected, contentFilters) {
  let ustensilsList = [];

  recipesSelected.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      if(!ustensilsList.includes(ustensil)){
        ustensilsList.push(ustensil)
      }
    })
  })

  contentFilters.forEach((ustensilEl) => {
    ustensilEl.classList.remove('active');
    if (ustensilsList.includes(ustensilEl.textContent)) {
      ustensilEl.classList.add('active');
    }
  })
}

function filterFiltersByRecipes(filterSelected, contentFilter, type) {
  if(type === 'ingredient') {
    filterIngredientsFiltersByRecipes(filterSelected, contentFilter);
  } else if(type === 'ustensil') {
    filterUstensilsFiltersByRecipes(filterSelected, contentFilter);
  }
}

export { filterIngredientsWhenInput, filterIngredientsFiltersByRecipes, filterUstensilsFiltersByRecipes, getFiltersList, filterRecipes }