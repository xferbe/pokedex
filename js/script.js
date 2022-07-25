//#region classes
const pokemonName = document.querySelector('.pokemon_name');
const pokemonId = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonImageModal = document.querySelector('.pokemon_image_modal');
const pokemonType1 = document.querySelector('.pokemon_type1');
const pokemonType2 = document.querySelector('.pokemon_type2');
const pokedex = document.querySelector('.main_pokedex');
const listPokedex = document.querySelector('.main_list_pokedex');
const pokeCards = document.querySelector('.poke_Cards');
const modal_container = document.querySelector('#modal_container');
const body = document.querySelector('.body');

const form = document.querySelector('.form');
const formList = document.querySelector('.form-list');
const input = document.querySelector('.input_search');
const inputList = document.querySelector('.input_search_list');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonList = document.querySelector('.btn-list');
const buttonBack = document.querySelector('.btn-backPokedex');
const buttonClose = document.querySelector('#close');

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
    pokemonId.innerHTML = '#' + dados.id.toString().padStart(3,'0') + ' - ';
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

//#region List of all pokemons
async function pokemonList () {
  pokedex.style.display = 'none';
  listPokedex.style.display = 'inline-block';
  for(let i = 1; i < 899; i++){
    await getList(i);
  }
}

const getList = async id => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const data = await fetch(url);
  const pokemonList = await data.json();
  createCardList(pokemonList);
}

function createCardList(pokemonList) {  
  const pokemonDivList = document.createElement('div');
  pokemonDivList.classList.add('pokemon');
  const poke_typeList = pokemonList.types[0].type.name;
  const name = pokemonList.name[0].toUpperCase() + pokemonList.name.slice(1);
  pokemonDivList.classList.add('tipo' + poke_typeList);
  pokemonDivList.classList.add('openModal');
  pokemonDivList.setAttribute('id', pokemonList.id);

  const pokeInnerHTML = `
    <div class="img-containerList">
      <img src = ${pokemonList['sprites']['other']['home']['front_default']}
    </div>

    <div class="infoList">
      <span class="numberList">#${pokemonList.id.toString().padStart(3, '0')}</span>
      <h3 class="nameList">${name}</h3>
      <small class="typeList">Type: <span class="${poke_typeList}">${poke_typeList}</span></small>
    </div>
  `;

  pokemonDivList.innerHTML = pokeInnerHTML;
  pokeCards.appendChild(pokemonDivList);

  pokemonDivList.addEventListener('click', (event) => {
    event.preventDefault();
    infoPokemonModal(pokemonDivList.id);
  })
}

async function infoPokemonModal(id) {
  inputList.value = '';
  modal_container.classList.add('show');
  body.classList.add('show');
  buttonBack.classList.add('disabled');
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const data = await fetch(url);
  const pokemonList = await data.json();
  //if (pokemonList.id > 649)
    pokemonImageModal.src = pokemonList['sprites']['other']['home']['front_default'];
  //else
  //  pokemonImageModal.src = pokemonList['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];  
}

function mainPokedex() {
  pokedex.style.display = 'inline-block';
  listPokedex.style.display = 'none';
}

//#endregion

//#region Events
form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value);
});

formList.addEventListener('submit', (event) => {
  event.preventDefault();
  infoPokemonModal(inputList.value);
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

buttonBack.addEventListener('click', (event) => {
  event.preventDefault();
  mainPokedex();
});

buttonClose.addEventListener('click', (event) => {
  event.preventDefault();
  modal_container.classList.remove('show');
  body.classList.remove('show');
  buttonBack.classList.remove('disabled');
  pokemonImageModal.src = '';
});

//#endregion

renderPokemon(searchPokemon);