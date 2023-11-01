import { recipes } from '../../data/recipes.js'

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

function getAllAppliances() {
  let appliancesList = [];

  recipes.forEach((recipe) => {
    
    const isInAppliancesList = appliancesList.find(applianceName => applianceName === recipe.appliance)
    if(isInAppliancesList === undefined){
      appliancesList.push(recipe.appliance);
    }
  })

  return appliancesList;
}

function getFiltersList(type) {
  if(type === 'ingredient') {
    return getAllIngredients();
  } else if(type === 'ustensil') {
    return getAllUstensils();
  } else if(type === 'appliance') {
    return getAllAppliances();
  }
}

export { getFiltersList }