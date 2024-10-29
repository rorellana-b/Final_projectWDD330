const apiKey = '435c0a70bf084c31a4a7aa322d138450';
const recipesContainer = document.getElementById('recipes-container');
const searchButton = document.getElementById('search-button');
const foodGroupButtons = document.querySelectorAll('.food-group');

searchButton.addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    const recipes = await fetchRecipes(query);
    displayRecipes(recipes);
});

// Adding a button event per recipe
foodGroupButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const group = button.getAttribute('data-group'); ``
        const recipes = await fetchRecipes(group);
        displayRecipes(recipes);
    });
});

async function fetchRecipes(query) {
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`);
    if (!response.ok) {
        throw new Error('Error: ' + response.statusText);
    }
    const data = await response.json();
    return data.results;
}

function displayRecipes(recipes) {
    recipesContainer.innerHTML = '';
    if (recipes.length === 0) {
        recipesContainer.innerHTML = '<p>Recipes not found.</p>';
        return;
    }
    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}">
            <a href="recipe.html?id=${recipe.id}">See more</a>

        `;
        recipesContainer.appendChild(recipeDiv);
    });
}