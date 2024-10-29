const axios = require('axios');
const fs = require('fs');

const apiKey = '435c0a70bf084c31a4a7aa322d138450';
const query = 'chicken';

async function fetchRecipes() {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`);
        const recipes = response.data.results;

        //Save the JSON file
        fs.writeFileSync('recipes.json', JSON.stringify(recipes, null, 2));
        console.log('Saved in recipes.json');
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchRecipes()