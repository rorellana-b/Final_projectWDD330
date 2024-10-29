const axios = require('axios');
const fs = require('fs');

const apiKey = '435c0a70bf084c31a4a7aa322d138450'; // Tu clave API
const query = 'chicken'; // Cambia esto según sea necesario

async function fetchRecipes() {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`);
        const recipes = response.data.results;

        // Guardar el JSON en un archivo
        fs.writeFileSync('recipes.json', JSON.stringify(recipes, null, 2));
        console.log('Datos guardados en recipes.json');
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
    }
}

fetchRecipes()