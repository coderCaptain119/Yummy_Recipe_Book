const searchBtn = document.querySelector('#search-btn');
const mealList = document.querySelector('#meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.querySelector('#recipe-close-btn');
const msgIcon = document.querySelector('#msg-me');
const closeReview = document.querySelector('#close-review-btn');

// Fetch Meal List from API and render it
const getMealList = () => {
    let searchInput = document.querySelector('#search-input').value.trim();
    
    // Fetching data from API
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then(response => response.json())
    .then(data => {
        let html = '';
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="food-item">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        }
        else {
            html = `Sorry, we didn't find any meal!`;
            mealList.classList.add('notFound');
        }
        mealList.innerHTML = html;
    })
}

// Fetch Recipe from API
const getMealRecipe = (e) => {
    e.preventDefault();
    // console.log(e.target);
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// Render Recipe
const mealRecipeModal = (meal) => {
    meal = meal[0];
    // console.log(meal);

    let html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instructions : </h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-meal-image">
            <img src="${meal.strMealThumb}" alt="food">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;

    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

// Close Recipe
const closeMealRecipe = () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
}

// Display & Hide Review Form
const getReviewForm = () => {
    document.querySelector('#review-page').classList.toggle('active');
    msgIcon.classList.toggle('active');
}

// Event Listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', closeMealRecipe);
msgIcon.addEventListener('click', getReviewForm);
closeReview.addEventListener('click', getReviewForm);