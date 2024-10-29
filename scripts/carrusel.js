let currentSlide = 0;
const recipes = []; // Array to save the recipes
const slideInterval = 5000; // Time to show the slide

async function fetchRecipes(query) {
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`);
    if (!response.ok) {
        throw new Error('Error: ' + response.statusText);
    }
    const data = await response.json();
    return data.results;
}

function displayCarousel(recipes) {
    const carouselInner = document.getElementById('carousel-inner');
    carouselInner.innerHTML = '';

    recipes.forEach(recipe => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('carousel-item');
        itemDiv.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}" style="width: 100%; border-radius: 10px;">
        `;
        carouselInner.appendChild(itemDiv);
    });

    updateCarousel();
}

function updateCarousel() {
    const carouselInner = document.getElementById('carousel-inner');
    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function moveSlide(direction) {
    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = recipes.length - 1;
    } else if (currentSlide >= recipes.length) {
        currentSlide = 0;
    }
    updateCarousel();
}

function autoMoveSlide() {
    moveSlide(1);
}


async function initCarousel() {
    const fetchedRecipes = await fetchRecipes('chicken');
    recipes.push(...fetchedRecipes.slice(0, 6));
    displayCarousel(recipes);

    setInterval(autoMoveSlide, slideInterval);
}

initCarousel();