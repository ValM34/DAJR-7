function homePageComponents() {
  function getRecipesCards(recipes) {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    const recipeImgContainer = document.createElement("div");
    recipeImgContainer.classList.add("recipe-img-container");
    const recipeImg = document.createElement("img");
    recipeImg.src = `images/recipes/${recipes.image}`;
    recipeImgContainer.appendChild(recipeImg);
    const recipeTime = document.createElement("div");
    recipeTime.classList.add("recipe-time");
    recipeTime.textContent = `${recipes.time} min`;
    recipeImgContainer.appendChild(recipeTime);

    const recipeCardContent = document.createElement("div");
    recipeCardContent.classList.add("recipe-card-content");
    const recipeTitle = document.createElement("div");
    recipeTitle.classList.add("recipe-title");
    recipeTitle.textContent = recipes.name;
    recipeCardContent.appendChild(recipeTitle);
    const recipeDescriptionContainer = document.createElement("div");
    recipeDescriptionContainer.classList.add("recipe-description-container");
    const recipeDescriptionTitle = document.createElement("div");
    recipeDescriptionTitle.classList.add("recipe-description-title");
    recipeDescriptionTitle.textContent = "Recette";
    recipeDescriptionContainer.appendChild(recipeDescriptionTitle);
    recipeCardContent.appendChild(recipeDescriptionContainer);
    const recipeDescriptionText = document.createElement("p");
    recipeDescriptionText.classList.add("recipe-description-text");
    recipeDescriptionText.textContent = recipes.description;
    recipeDescriptionContainer.appendChild(recipeDescriptionText);
    const recipeIngredients = document.createElement("div");
    recipeIngredients.classList.add("recipe-ingredients");
    const recipeIngredientsTitle = document.createElement("div");
    recipeIngredientsTitle.classList.add("recipe-ingredients-title");
    recipeIngredientsTitle.textContent = "Ingrédients";
    recipeIngredients.appendChild(recipeIngredientsTitle);
    recipeCardContent.appendChild(recipeIngredients);
    const recipeIngredientsGrid = document.createElement("div");
    recipeIngredientsGrid.classList.add("recipe-ingredients-grid");
    recipeIngredients.appendChild(recipeIngredientsGrid);
    for (const ingredient of recipes.ingredients) {
      const recipeIngredientsItem = document.createElement("div");
      recipeIngredientsItem.classList.add("recipe-ingredients-item");
      const recipeIngredientsItemName = document.createElement("div");
      recipeIngredientsItemName.classList.add("recipe-ingredients-item-name");
      recipeIngredientsItemName.textContent = ingredient.ingredient;
      recipeIngredientsItem.appendChild(recipeIngredientsItemName);
      const recipeIngredientsItemQuantity = document.createElement("div");
      recipeIngredientsItemQuantity.classList.add(
        "recipe-ingredients-item-quantity"
      );
      recipeIngredientsItemQuantity.textContent = `${(ingredient.quantity ?? "")} ${ingredient.unit ?? ""}`;
      recipeIngredientsItem.appendChild(recipeIngredientsItemQuantity);
      recipeIngredientsGrid.appendChild(recipeIngredientsItem);
    }

    recipeCard.appendChild(recipeImgContainer);
    recipeCard.appendChild(recipeCardContent);

    return recipeCard;
  }

  function getFilter(ingredient, id) {
    const ingredientElement = document.createElement("div");
    ingredientElement.textContent = ingredient;
    ingredientElement.id = id;
    ingredientElement.classList.add('active');

    return ingredientElement;
  }

  function getSearchItem(filter, type) {
    const divElement = document.createElement("div");
    divElement.className = "search-item";
    divElement.setAttribute('data-' + type, filter.id);
    divElement.setAttribute('data-type', type);

    const pElement = document.createElement("p");
    pElement.className = "search-item-name";
    pElement.textContent = filter.textContent;

    const imgElement = document.createElement("img");
    imgElement.className = "search-item-" + type + "-close";
    imgElement.id = "search_item_close";
    imgElement.src = "./icons/cross.svg";
    imgElement.setAttribute('data-' + type, filter.id);

    divElement.appendChild(pElement);
    divElement.appendChild(imgElement);

    return divElement;
  }

  function getRecipesNumber (recipes) {
    const div = document.createElement('div');
    if (recipes.length === 1) {
      div.textContent = recipes.length + ' recette';
    } else {
      div.textContent = recipes.length + ' recettes';
    }
    div.classList.add('recipes-number');

    return div;
  }

  return { getRecipesCards, getFilter, getSearchItem, getRecipesNumber };
}

homePageComponents();

export { homePageComponents };
