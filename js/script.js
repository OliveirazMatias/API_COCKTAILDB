document.addEventListener('DOMContentLoaded', () => {
  const cocktailList = document.getElementById('cocktail-list');
  const searchForm = document.querySelector('form');
  const randomDrinkBtn = document.getElementById('random-drink-btn');

  function searchCocktails(query) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
          .then(response => response.json())
          .then(data => {
              cocktailList.innerHTML = '';

              const cocktails = data.drinks;

              cocktails.forEach(cocktail => {
                  const cocktailItem = createCocktailItem(cocktail);
                  cocktailList.appendChild(cocktailItem);
              });
          })
          .catch(error => {
              console.error('Erro ao carregar os coquetéis:', error);
          });
  }

  function createCocktailItem(cocktail) {
      const cocktailItem = document.createElement('div');
      cocktailItem.classList.add('col-md-4', 'col-lg-3', 'mb-4');

      const cocktailCard = document.createElement('div');
      cocktailCard.classList.add('card');

      const cocktailImage = document.createElement('img');
      cocktailImage.src = cocktail.strDrinkThumb;
      cocktailImage.classList.add('card-img-top');
      cocktailImage.alt = cocktail.strDrink;

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      const cocktailName = document.createElement('h5');
      cocktailName.classList.add('card-title');
      cocktailName.textContent = cocktail.strDrink;

      const cocktailInstructions = document.createElement('p');
      cocktailInstructions.classList.add('card-text');
      cocktailInstructions.textContent = cocktail.strInstructions;

      cardBody.appendChild(cocktailName);
      cardBody.appendChild(cocktailInstructions);

      cocktailCard.appendChild(cocktailImage);
      cocktailCard.appendChild(cardBody);

      cocktailItem.appendChild(cocktailCard);

      return cocktailItem;
  }

  function getRandomDrink() {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
          .then(response => response.json())
          .then(data => {
              cocktailList.innerHTML = ''; 
              const randomDrink = data.drinks[0];
              const randomDrinkItem = createCocktailItem(randomDrink);
              cocktailList.appendChild(randomDrinkItem);
          })
          .catch(error => {
              console.error('Erro ao carregar o drink aleatório:', error);
          });
  }

  searchForm.addEventListener('submit', event => {
      event.preventDefault(); 

      const searchTerm = searchForm.querySelector('input').value.trim();
      if (searchTerm !== '') {
          searchCocktails(searchTerm);
      }
  });

  randomDrinkBtn.addEventListener('click', getRandomDrink);
});
