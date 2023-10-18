import { homePageComponents } from "../factories/index.js";
import { recipes } from "../../data/recipes.js";
import {
  filterIngredientsWhenInput,
  filterIngredientsFiltersByRecipes,
  filterUstensilsFiltersByRecipes,
  getFiltersList,
  filterRecipes,
} from "../utils/index.js";

async function displayData(recipes) {
  const recipeModel = homePageComponents();

  // Display recipe cards at the loading of the page
  const mainSection = document.querySelector("#recipes_container");
  recipes.forEach((recipe) => {
    const userCardDOM = recipeModel.getRecipesCards(recipe);
    mainSection.appendChild(userCardDOM);
  });

  // DOM Element for filters
  const contentIngredientsFilters = document.querySelectorAll(
    "#ingredients_content_filter > div"
  );

  const contentUstensilsFilters = document.querySelectorAll(
    "#ustensils_content_filter > div"
  );

  function handleDropdownFilter(type) {
    // DOM elements
    const selectFilter = document.querySelector(`#select_${type}s_filter`);
    const selectFilterContainer = document.querySelector(
      `#select_${type}s_filter_container`
    );
    const contentFilter = document.querySelector(`#${type}s_content_filter`);

    // Open/close dropdown
    selectFilter.addEventListener("click", () => {
      selectFilterContainer.classList.toggle("active");
      let filter = getFiltersList(type);
      contentFilter.textContent = "";

      if (selectFilterContainer.classList.contains("active")) {
        for (let i = 0; i < filter.length; i++) {
          const filterDOM = recipeModel.getFilter(
            filter[i],
            `${type}_${i + 1}`
          );
          contentFilter.appendChild(filterDOM);
        }
      }

      // Régénère les recipesCards avec les ingrédients filtrés
      const contentFilters = document.querySelectorAll(
        "#" + type + "s_content_filter > div"
      );

      contentFilters.forEach((ingredientEl) => {
        ingredientEl.addEventListener("click", () => {
          const searchItemsDOM = recipeModel.getSearchItem(ingredientEl, type);
          const searchItemsContainer = document.querySelector(
            "#search_items_container"
          );
          searchItemsContainer.appendChild(searchItemsDOM);

          let recipesFiltered = filterRecipes(
            document.querySelectorAll(".search-item"),
            type
          );
          mainSection.textContent = "";

          recipesFiltered.forEach((recipe) => {
            const userCardDOM = recipeModel.getRecipesCards(recipe);
            mainSection.appendChild(userCardDOM);
          });

          // Filtre les filtres en fonction des recettes restantes
          filterIngredientsFiltersByRecipes(recipesFiltered, contentFilters);
          const contentUstensilsFilters = document.querySelectorAll(
            "#ustensils_content_filter > div"
          );
          filterUstensilsFiltersByRecipes(
            recipesFiltered,
            contentUstensilsFilters
          );
          if (type === "ingredient") {
            filterIngredientsFiltersByRecipes(recipesFiltered, contentFilters);
            const contentUstensilsFilters = document.querySelectorAll(
              "#ustensils_content_filter > div"
            );
            filterUstensilsFiltersByRecipes(
              recipesFiltered,
              contentUstensilsFilters
            );
          } else if (type === "ustensil") {
            filterUstensilsFiltersByRecipes(recipesFiltered, contentFilters);
            const contentIngredientsFilters = document.querySelectorAll(
              "#ingredients_content_filter > div"
            );
            filterIngredientsFiltersByRecipes(
              recipesFiltered,
              contentIngredientsFilters
            );
          }

          // Régénère les recipe card quand on supprime un ingrédient
          let searchItemCloseArrayElements = document.querySelectorAll(
            ".search-item-" + type + "-close"
          );

          searchItemCloseArrayElements.forEach((searchItemClose) => {
            searchItemClose.addEventListener("click", () => {
              document
                .querySelector(
                  "[data-" +
                    type +
                    "=" +
                    searchItemClose.getAttribute("data-" + type) +
                    "]"
                )
                .remove(); // @TODO écrire ça proprement

              let recipesFiltered = filterRecipes(
                document.querySelectorAll(".search-item"),
                type
              );
              mainSection.textContent = "";
              recipesFiltered.forEach((recipe) => {
                const userCardDOM = recipeModel.getRecipesCards(recipe);
                mainSection.appendChild(userCardDOM);
              });

              if (type === "ingredient") {
                filterIngredientsFiltersByRecipes(
                  recipesFiltered,
                  contentFilters
                );
                filterUstensilsFiltersByRecipes(
                  recipesFiltered,
                  contentUstensilsFilters
                );
              } else if (type === "ustensil") {
                filterUstensilsFiltersByRecipes(
                  recipesFiltered,
                  contentFilters
                );
                filterIngredientsFiltersByRecipes(
                  recipesFiltered,
                  contentIngredientsFilters
                );
              }
            });
          });
        });
      });
    });
  }

  handleDropdownFilter("ingredient");
  handleDropdownFilter("ustensil");

  // filter search when input in the search bar
  const miniSearchBarUstensil = document.querySelector(
    "#mini_search_bar_ustensil"
  );
  miniSearchBarUstensil.addEventListener("keyup", () => {
    const ustensilsfiltered = filterIngredientsWhenInput(
      //@TODO a créer/modifier
      miniSearchBarUstensil.value
    );
    const contentFilter = document.querySelector("#ustensils_content_filter");
    contentFilter.textContent = "";
    for (let i = 0; i < ustensilsfiltered.length; i++) {
      const filterDOM = recipeModel.getFilter(
        ustensilsfiltered[i],
        `ustensil_${i + 1}`
      );
      contentFilter.appendChild(filterDOM);
    }
  });
}

async function init() {
  // Récupère les datas des photographes
  displayData(recipes);
}

init();

/*
  const test = getRecipesCards(recipes)

  const mainSection = document.querySelector("#recipes_container");
  mainSection.appendChild(test);
  */

//@todo
//   affiner les filtres en fonction des recettes restantes
// La recherche sur la barre principale prend en compte les filtres déjà présents
// Voir pour utiliser filter
// Mettre à jour la liste de filtres en fonction des autres filtres
