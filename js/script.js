//#region classes
const pokemonName = document.querySelector('.pokemon_name');
const pokemonId = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonType1 = document.querySelector('.pokemon_type1');
const pokemonType2 = document.querySelector('.pokemon_type2');
const pokedex = document.querySelector('.main_pokedex');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonList = document.querySelector('.btn-list');

let searchPokemon = 1;
//#endregion

//#region call the API
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toString().toLowerCase()}`);

  if (APIResponse.status === 200){
    const dados = await APIResponse.json();
    return dados;
  }
  return 'error';
}
//#endregion

//#region get data from the API
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  const dados = await fetchPokemon(pokemon);

  if (dados != "error"){
    let tipoPokemon = dados.types[0].type.name;
    let tipoPokemon2;
    if (dados.types.length > 1)
      tipoPokemon2 = dados.types[1].type.name;

    pokemonName.innerHTML = dados.name;
    pokemonId.innerHTML = dados.id + ' - ';
    pokemonType1.innerHTML = dados.types[0].type.name;
    
    if (dados.types.length > 1)
      pokemonType2.innerHTML = dados.types[1].type.name;
    else {
      pokemonType2.innerHTML = '';
      pokemonType2.classList.remove(tipoPokemon2);
    }

    if (pokemonType1.classList.toString().includes('tipo')){
      pokemonType1.classList.remove(pokemonType1.classList[2]);
    }
    if (pokemonType2.classList.toString().includes('tipo')){
      pokemonType2.classList.remove(pokemonType2.classList[2]);
    }

    pokemonType1.classList.add(`tipo${tipoPokemon}`);
    pokemonType2.classList.add(`tipo${tipoPokemon2}`);

    if (dados.id > 649)
      pokemonImage.src = dados['sprites']['versions']['generation-v']['black-white']['front_default'];
    else
      pokemonImage.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    pokemonImage.style.display = 'block';
    input.value = '';

    searchPokemon = dados.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonId.innerHTML = '';
    pokemonType1.innerHTML = '';
    pokemonType2.innerHTML = '';
    pokemonType1.classList.remove(pokemonType1.classList[2]);
    pokemonType2.classList.remove(pokemonType2.classList[2]);
    input.value = '';
  }
}
//#endregion

function pokemonList () {
  pokedex.style.display = 'none';
}


//#region Events
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

buttonList.addEventListener('click', (event) => {
  event.preventDefault();
  pokemonList();
});
//#endregion

renderPokemon(searchPokemon);