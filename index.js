const APP_ID = '-';
const APP_KEY = '-';
const BASE_URL = "https://api.edamam.com/api/recipes/v2";

const searchButton = document.getElementById("search-button");
const searchResultContainer = document.getElementById(
  "search-result-container"
);
const searchInput = document.querySelector(".search-input");


function generateHTML(data) {
  console.log("🚀 ~ file: index.js ~ line 13 ~ generateHTML ~ data", data)
  let generatedHtml = ``;
  data.map((result) => {
    generatedHtml += `
    <div class="recipe-container">
      <figure>
         <img width="100%"
          src=${result.recipe.image}
          alt=${result.recipe.label}
      </figure>
      <div class="recipe-content">
        <h3>${result.recipe.label}</h3>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">${result.recipe.dietLabels.join(',')}</p>
        <ul class="macros-row">
          <li>Fat: ${parseFloat(Math.ceil(result.recipe.totalNutrients.FAT.quantity))}${result.recipe.totalNutrients.FAT.unit}</li>
          <li>Protein: ${parseFloat(Math.ceil(result.recipe.totalNutrients.PROCNT.quantity))}${result.recipe.totalNutrients.PROCNT.unit}</li>
          <li>Carbs: ${parseFloat(Math.ceil(result.recipe.totalNutrients.CHOCDF.quantity))}${result.recipe.totalNutrients.CHOCDF.unit}</li>
        </ul>
      </div>
    </div>
    `;
  });

  searchResultContainer.innerHTML = generatedHtml;
}

async function getRecipes(hit) {
  try {
    const requestUrl = `${BASE_URL}?type=public&q=${hit}&app_id=${APP_ID}&app_key=${APP_KEY}&imageSize=REGULAR
    `;
    const response = await fetch(requestUrl);
    const data = await response.json();
    generateHTML(data?.hits);
  } catch (error) {
    console.error(error);
  }
}


function handleSearchClick() {
  const searchHit = searchInput.value;
  getRecipes(searchHit);
}

searchButton.addEventListener("click", handleSearchClick);
