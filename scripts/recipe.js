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

function displayRecipe(recipe) {
    document.getElementById('recipe-title').textContent = recipe.title;

    // Show the picture of the recipe
    const recipeImage = document.getElementById('recipe-image');
    recipeImage.src = recipe.image;

    const ingredientsList = document.getElementById('ingredients-list');
    ingredientsList.innerHTML = '';
    recipe.extendedIngredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`;
        ingredientsList.appendChild(li);
    });

    const instructionsList = document.getElementById('instructions-list');
    instructionsList.innerHTML = '';
    recipe.analyzedInstructions[0].steps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step.step;
        instructionsList.appendChild(li);
    });

    document.getElementById('prep-time').textContent = `Preparation Time: ${recipe.readyInMinutes} minutes`;
    document.getElementById('servings').textContent = `Servings: ${recipe.servings}`;
}

fetchRecipe(recipeId)
    .then(displayRecipe)
    .catch(error => console.error('Error:', error));