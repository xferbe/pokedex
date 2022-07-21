const pokemonName = document.querySelector('.pokemon_name');
const pokemonId = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const dados = await APIResponse.json();
  return dados;
}

const renderPokemon = async (pokemon) => {
  const dados = await fetchPokemon(pokemon);

  pokemonName.innerHTML = dados.name;
  pokemonId.innerHTML = dados.id;
  pokemonImage.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
}

renderPokemon('25');