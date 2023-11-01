import { recipes } from '../../data/recipes.js'

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
  console.log(contentFilters)

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

function filterAppliancesFiltersByRecipes(recipesSelected, contentFilters) {
  let appliancesList = [];

  recipesSelected.forEach((recipe) => {
      if(!appliancesList.includes(recipe.appliance)){
        appliancesList.push(recipe.appliance)
      }
  })

  contentFilters.forEach((applianceEl) => {
    applianceEl.classList.remove('active');
    if (appliancesList.includes(applianceEl.textContent)) {
      applianceEl.classList.add('active');
    }
  })
}

function filterFiltersByRecipes(filterSelected, contentFilter, type) {
  if(type === 'ingredient') {
    filterIngredientsFiltersByRecipes(filterSelected, contentFilter);
    const contentUstensilsFilters = document.querySelectorAll(
      "#ustensils_content_filter > div"
    );
    filterUstensilsFiltersByRecipes(
      filterSelected,
      contentUstensilsFilters
    );
    const contentAppliancesFilters = document.querySelectorAll(
      "#appliances_content_filter > div"
    );
    filterAppliancesFiltersByRecipes(
      filterSelected,
      contentAppliancesFilters
    );
  } else if(type === 'ustensil') {
    filterUstensilsFiltersByRecipes(filterSelected, contentFilter);
    const contentAppliancesFilters = document.querySelectorAll(
      "#appliances_content_filter > div"
    );
    filterAppliancesFiltersByRecipes(
      filterSelected,
      contentAppliancesFilters
    );
    const contentIngredientsFilters = document.querySelectorAll(
      "#ingredients_content_filter > div"
    );
    filterIngredientsFiltersByRecipes(
      filterSelected,
      contentIngredientsFilters
    );
  } else if(type === 'appliance') {
    filterAppliancesFiltersByRecipes(filterSelected, contentFilter);
    const contentIngredientsFilters = document.querySelectorAll(
      "#ingredients_content_filter > div"
    );
    filterIngredientsFiltersByRecipes(
      filterSelected,
      contentIngredientsFilters
    );
    const contentUstensilsFilters = document.querySelectorAll(
      "#ustensils_content_filter > div"
    );
    filterUstensilsFiltersByRecipes(
      filterSelected,
      contentUstensilsFilters
    );
  }
}

export { filterFiltersByRecipes }
