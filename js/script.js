//#region classes
const pokemonName = document.querySelector('.pokemon_name');
const pokemonId = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonType1 = document.querySelector('.pokemon_type1');
const pokemonType2 = document.querySelector('.pokemon_type2');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;
//#endregion

//#region chamada API
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toString().toLowerCase()}`);

  if (APIResponse.status === 200){
    const dados = await APIResponse.json();
    return dados;
  }
  return 'erro';
}
//#endregion

//#region obtém dados da API
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  const dados = await fetchPokemon(pokemon);
  
  if (dados != "erro"){
    pokemonName.innerHTML = dados.name;
    pokemonId.innerHTML = dados.id + ' - ';
    pokemonType1.innerHTML = dados.types[0].type.name;
    pokemonType2.innerHTML = dados.types[1].type.name;
    pokemonImage.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonImage.style.display = 'block';
    input.value = '';
    searchPokemon = dados.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Não encontrado :c';
    pokemonId.innerHTML = '';
  }
}
//#endregion

//#region Eventos
form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value);
});

buttonPrev.addEventListener('click', (event) => {
  event.preventDefault();
  if (searchPokemon > 1)
    renderPokemon(--searchPokemon);
});

buttonNext.addEventListener('click', (event) => {
  event.preventDefault();
  renderPokemon(++searchPokemon);
});
//#endregion

renderPokemon(searchPokemon);