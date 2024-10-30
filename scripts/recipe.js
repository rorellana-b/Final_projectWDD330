const apiKey = '435c0a70bf084c31a4a7aa322d138450';
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id'); // getting the ID form the URL

async function fetchRecipe(id) {
    const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
    if (!response.ok) {
        throw new Error('Error: ' + response.statusText);
    }
    return await response.json(); // return the recipe data
}

document.addEventListener('DOMContentLoaded', () => {
    const recipeId = new URLSearchParams(window.location.search).get('id');
    if (recipeId) {
        displayRecipe(recipeId);
    } else {
        console.error('Recipe ID not found in URL.');
    }
});

async function displayRecipe(id) {
    try {
        const recipe = await fetchRecipe(id);

        document.getElementById('recipe-image').src = recipe.image;
        document.getElementById('recipe-image').alt = recipe.title;

        const ingredientsList = document.getElementById('ingredients-list');
        recipe.extendedIngredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient.original;
            ingredientsList.appendChild(li);
        });

        const instructionsList = document.getElementById('instructions-list');
        recipe.analyzedInstructions[0].steps.forEach(step => {
            const li = document.createElement('li');
            li.textContent = step.step;
            instructionsList.appendChild(li);
        });

        document.getElementById('prep-time').textContent = `Prep Time: ${recipe.readyInMinutes} minutes`;
        document.getElementById('servings').textContent = `Servings: ${recipe.servings}`;
    } catch (error) {
        console.error('Error fetching recipe:', error);
    }
}
