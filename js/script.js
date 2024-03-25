document.addEventListener('DOMContentLoaded', () => {
  const cocktailList = document.getElementById('cocktail-list');
  const searchForm = document.querySelector('form');

  function searchCocktails(query) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
      .then(response => response.json())
      .then(data => {
        cocktailList.innerHTML = ''; // Limpar a lista antes de adicionar novos itens

        const cocktails = data.drinks;

        cocktails.forEach(cocktail => {
          const cocktailItem = document.createElement('div');
          cocktailItem.classList.add('cocktail-item');

          const cocktailName = document.createElement('h2');
          cocktailName.textContent = cocktail.strDrink;

          const cocktailImage = document.createElement('img');
          cocktailImage.src = cocktail.strDrinkThumb;
          cocktailImage.alt = cocktail.strDrink;

          const cocktailInstructions = document.createElement('p');
          cocktailInstructions.textContent = cocktail.strInstructions;

          cocktailItem.appendChild(cocktailName);
          cocktailItem.appendChild(cocktailImage);
          cocktailItem.appendChild(cocktailInstructions);

          cocktailList.appendChild(cocktailItem);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar os coquetéis:', error);
      });
  }

  searchForm.addEventListener('submit', event => {
    event.preventDefault(); // Evitar o comportamento padrão do formulário

    const searchTerm = searchForm.querySelector('input').value.trim();
    if (searchTerm !== '') {
      searchCocktails(searchTerm);
    }
  });
});
