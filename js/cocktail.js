// Load Data call the API
const loadCocktailData = async(search) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayCocktailData(data.drinks);
}
// Display Drinks by Json
const displayCocktailData = drinks => {
    const cocktailContainer = document.getElementById('cocktail-container');
    cocktailContainer.innerHTML = ``;

    // Not Found Message
    const noDrinks = document.getElementById('not-found-message');
    if(drinks === null){
        noDrinks.classList.remove('d-none');
    }else{
        noDrinks.classList.add('d-none');
    }

    drinks.forEach(drink => {
        const drinkDiv = document.createElement('div');
        drinkDiv.classList.add('ab-drink-area');
        drinkDiv.innerHTML = `
            <img class="object-cover w-full h-48" src="${drink.strDrinkThumb}" alt="Flower and sky" />
            <div class="p-4">
                <h3 class="text-base md:text-xl font-medium text-gray-800">${drink.strDrink}</h3>
                <p class="my-4 text-base md:text-lg text-gray-600">${drink.strInstructions.slice(0, 100)}</p>
                <label onclick="displayDrinksDetails(${drink.idDrink})" for="my-modal-3" class="btn btn-accent text-white">Details</label>
            </div>
        `;
        cocktailContainer.appendChild(drinkDiv);
    }) 
}

// Search Drinks by Name
const searchField = document.getElementById('search-value');
searchField.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        const searchValue = searchField.value;
        loadCocktailData(searchValue);
        searchField.value = '';
    }
})


// Load and Display Drinks Details with Modal
const displayDrinksDetails = async id => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayCocktailDetails(data.drinks[0]);
}
const displayCocktailDetails = drinks => {
    const {strDrink, strCategory, strDrinkThumb, strInstructions} = drinks;
    const cocktailDetails = document.getElementById('modal-body');
    cocktailDetails.innerHTML = `
        <img class="object-cover rounded-t w-full h-48" src="${strDrinkThumb}" alt="Flower and sky" />
        <div class="p-4">
            <h3 class="text-base md:text-xl font-medium text-gray-800">${strDrink}</h3>
            <p class="mt-4 text-[11px] uppercase badge badge-accent text-white font-medium p-3">${strCategory}</p>
            <p class="my-2 text-base md:text-lg text-gray-600">${strInstructions}</p>
        </div>
        
    `;
}

loadCocktailData('');