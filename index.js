// Hash code = 1530de2cd26f5e11d34d062cfb952ef7
// Public API = 9b4ba214347a8aa5026223be1b759e44
// Private key = 3a96d084d4b4ccf0d9b77e044ac83939d8509dd5

// This is loader which show until data not fetch
const loader = document.querySelector(".loader");
const loaderOut = () => {
  console.log(loader);
  // loader.classList.remove("loader")
  document.body.removeChild(loader);
};

console.log(loader);

const url =
  "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=9b4ba214347a8aa5026223be1b759e44&hash=1530de2cd26f5e11d34d062cfb952ef7";

// Data fetching from the server using fetch API
window.onload = async () => {
  try {
    let response = await fetch(url);
    let data = await response.json();
    let characters = data.data.results;

    console.log(characters);

    let charactersContainer = ``;
    let searchInput = document.getElementById("search");
    searchInput.addEventListener("input", handleSearch);

    characters.forEach((character) => {
      const imageSrc =
        character.thumbnail.path +
        (character.thumbnail.extension === "jpg"
          ? "/portrait_medium.jpg"
          : "/portrait_medium.gif");

      charactersContainer += `
      <div class="card" style="width: 18rem">
            <img src=${imageSrc} class="card-img-top" alt="..." />
            <h5 class="card-title">${character.name}</h5>
            <div class="card-body">
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Hero ID: ${character.id}</li>
              <li class="list-group-item">Comics available: ${character.comics.available} <a href="${character.urls[1].url}">click</a></li>
              <li class="list-group-item">Series available: ${character.series.available}</li>
            </ul>
            <div class="card-body">
              <button class="btn btn-danger favbtn" type="button" data-hero="${character.id}">
                ADD TO FAVORITE
              </button>
            </div>
            
        </div>`;
    });

    document.getElementById("characters-container").innerHTML =
      charactersContainer;

    // Add event listener for each favorite button
    document.querySelectorAll(".favbtn").forEach((btn) => {
      btn.addEventListener("click", addToFavorite);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  loaderOut();
};

function addToFavorite() {
  const button = this;
  const heroId = button.dataset.hero;

  console.log("Hero ID:", heroId);

  let favoriteHeroes = JSON.parse(localStorage.getItem("favoriteHeroes")) || [];

  if (button.innerText === "ADD TO FAVORITE") {
    favoriteHeroes.push(heroId);
    button.innerText = "REMOVE FROM FAVORITE";

    localStorage.setItem("favoriteHeroes", JSON.stringify(favoriteHeroes));
  } else {
    const index = favoriteHeroes.indexOf(heroId);

    if (index !== -1) {
      favoriteHeroes.splice(index, 1);
      button.innerText = "ADD TO FAVORITE";
      localStorage.setItem("favoriteHeroes", JSON.stringify(favoriteHeroes));
    }
  }
}

// Move the handleSearch function outside of the addToFavorite function
function handleSearch() {
  let searchInput = document.getElementById("search");
  let searchText = searchInput.value.toLowerCase();
  let cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    let cardTitle = card.querySelector(".card-title").innerText.toLowerCase();

    if (cardTitle.includes(searchText)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
