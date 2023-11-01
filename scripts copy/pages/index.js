import { homePageComponents } from "../factories/index.js";
import { recipes } from "../../data/recipes.js";
import { getFiltersList } from "../utils/getFilters.js";
import { filterRecipes } from "../utils/filterRecipes.js";
import { filterFiltersByRecipes } from "../utils/filterFiltersByRecipes.js";
import { filterIngredientsWhenInput } from "../utils/handleDropdownSearchBar.js";
import { searchRecipes } from "../utils/handleMainSearchBar.js";

async function displayData(recipes) {
  const recipeModel = homePageComponents();

  // Display recipe cards at the loading of the page
  const mainSection = document.querySelector("#recipes_container");
  recipes.forEach((recipe) => {
    const userCardDOM = recipeModel.getRecipesCards(recipe);
    mainSection.appendChild(userCardDOM);
  });

  const numberRecipesDOM = recipeModel.getRecipesNumber(recipes);
  const numberRecipesSection = document.querySelector('#recipes_number');
  numberRecipesSection.appendChild(numberRecipesDOM);


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

      let recipesFiltered = filterRecipes(
        document.querySelectorAll(".search-item")
      );

      filterFiltersByRecipes(recipesFiltered, contentFilters, type);

      const numberRecipesDOM = recipeModel.getRecipesNumber(recipesFiltered);
      const numberRecipesSection = document.querySelector('#recipes_number');
      numberRecipesSection.textContent = "";
      numberRecipesSection.appendChild(numberRecipesDOM);

      contentFilters.forEach((ingredientEl) => {
        ingredientEl.addEventListener("click", () => {
          const searchItemsDOM = recipeModel.getSearchItem(ingredientEl, type);
          const searchItemsContainer = document.querySelector(
            "#search_items_container"
          );
          searchItemsContainer.appendChild(searchItemsDOM);

          let recipesFiltered = filterRecipes(
            document.querySelectorAll(".search-item")
          );
          mainSection.textContent = "";

          const numberRecipesDOM = recipeModel.getRecipesNumber(recipesFiltered);
          const numberRecipesSection = document.querySelector('#recipes_number');
          numberRecipesSection.textContent = "";
          numberRecipesSection.appendChild(numberRecipesDOM);

          recipesFiltered.forEach((recipe) => {
            const userCardDOM = recipeModel.getRecipesCards(recipe);
            mainSection.appendChild(userCardDOM);
          });

          filterFiltersByRecipes(recipesFiltered, contentFilters, type);

          // Régénère les recipe card quand on supprime un ingrédient
          let searchItemCloseArrayElements = document.querySelectorAll(
            ".search-item-" + type + "-close"
          );

          searchItemCloseArrayElements.forEach((searchItemClose) => {
            searchItemClose.addEventListener("click", () => {
              let closeElement =
                document.querySelector(
                  "[data-" +
                    type +
                    "=" +
                    searchItemClose.getAttribute("data-" + type) +
                    "]"
                ) ?? null;
              if (closeElement !== null) {
                closeElement.remove();
              }

              let recipesFiltered = filterRecipes(
                document.querySelectorAll(".search-item")
              );
              mainSection.textContent = "";
              const numberRecipesDOM = recipeModel.getRecipesNumber(recipesFiltered);
              const numberRecipesSection = document.querySelector('#recipes_number');
              numberRecipesSection.textContent = "";
              numberRecipesSection.appendChild(numberRecipesDOM);
              recipesFiltered.forEach((recipe) => {
                const userCardDOM = recipeModel.getRecipesCards(recipe);
                mainSection.appendChild(userCardDOM);
              });

              filterFiltersByRecipes(recipesFiltered, contentFilters, type);
            });
          });
        });
      });
    });
  }

  handleDropdownFilter("ingredient");
  handleDropdownFilter("ustensil");
  handleDropdownFilter("appliance");


  function handleMiniSearchBar (type) {
    const miniSearchBar = document.querySelector(
      "#mini_search_bar_" + type
    );
  
    miniSearchBar.addEventListener("keyup", (e) => {
      let recipesFiltered = filterRecipes(
        document.querySelectorAll(".search-item")
      );
      const contentFilters = document.querySelectorAll(
        "#" + type + "s_content_filter > div"
      );
      filterFiltersByRecipes(recipesFiltered, contentFilters, type);
      console.log(recipesFiltered)
      console.log(contentFilters)
  
      const filtersList = [];
      contentFilters.forEach((filter) => {
        if (filter.classList.contains('active')){
          filtersList.push(filter)
        }
      })
  
      console.log(filtersList)
  
      const newFiltersList = filterIngredientsWhenInput(miniSearchBar.value, type, filtersList);
      console.log(newFiltersList)
  
      let newArray = [];
  
      contentFilters.forEach((contentFilter) => {
        contentFilter.classList.remove('active')
      })
  
      contentFilters.forEach ((contentFilter) => {
        newFiltersList.forEach((filter) => {
          if (contentFilter.textContent === filter) {
            contentFilter.classList.add('active')
            newArray.push(contentFilter)
          }
        })
      })
      console.log(newArray)
    });
  }

  handleMiniSearchBar("ingredient");
  handleMiniSearchBar("ustensil");
  handleMiniSearchBar("appliance");








  const mainSearchBar = document.querySelector("#search");
  function handleMainSearchBar() {
    mainSearchBar.addEventListener("keypress", (e) => {
      console.log(mainSearchBar.value);

      // Récupérer la liste des recettes restantes
      let recipesFiltered = filterRecipes(
        document.querySelectorAll(".search-item")
      );
      const numberRecipesDOM = recipeModel.getRecipesNumber(recipesFiltered);
      const numberRecipesSection = document.querySelector('#recipes_number');
      numberRecipesSection.textContent = "";
      numberRecipesSection.appendChild(numberRecipesDOM);
      // Pour l'instant j'utilise toutes les recettes
      if (e.key === "Enter") {
        let result = searchRecipes(mainSearchBar.value, recipesFiltered);
        mainSection.textContent = "";
        result.forEach((recipe) => {
          const userCardDOM = recipeModel.getRecipesCards(recipe);
          mainSection.appendChild(userCardDOM);
        });
        const numberRecipesDOM = recipeModel.getRecipesNumber(result);
        const numberRecipesSection = document.querySelector('#recipes_number');
        numberRecipesSection.textContent = "";
        numberRecipesSection.appendChild(numberRecipesDOM);
      }
      // Appeler la fonction pour récupérer les recettes restances après la recherche
    });
  }

  handleMainSearchBar();
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

//@todo RESTE à FAIRE : 
// dropdown
// // ajouter la croix et son fonctionnement
// // Modifier la couleur des filtres dans la recherche s'ils sont sélectionnés, permettre de les supprimer directement depuis la recherche
// // Ajouter le logo de recherche dans la mini search bar
// Réaliser l'algorithme des deux manières différentes demandées.