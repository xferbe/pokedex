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
const imgPokedex = document.querySelector('.pokedex');

const modal = document.querySelector('.modal');
const nameModal = document.querySelector('.name_modal');
const weightPokemon = document.querySelector('.weight_pokemon');
const heightPokemon = document.querySelector('.height_pokemon');
const hpModal = document.querySelector('.hp_modal');
const defenseModal = document.querySelector('.defense_modal');
const attackModal = document.querySelector('.attack_modal');
const type1Modal = document.querySelector('.type1_modal');
const type2Modal = document.querySelector('.type2_modal');
const barGreen = document.querySelector('.green');
const barRed = document.querySelector('.red');

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

    switch (tipoPokemon){
      case 'fire':
        imgPokedex.src = './images/Pokedex-Fire.png';
        break;
      case 'water':
        imgPokedex.src = './images/Pokedex-Water.png';
        break;
      case 'flying':
        imgPokedex.src = './images/Pokedex-Flying.png';
        break;
      case 'ground':
        imgPokedex.src = './images/Pokedex-desert.png';
        break;
      case 'rock':
        imgPokedex.src = './images/Pokedex-Cave.png';
        break;
      case 'steel':
        imgPokedex.src = './images/Pokedex-Cave.png';
        break;        
      case 'dark':
        imgPokedex.src = './images/Pokedex-Dark.png';
        break;
      case 'ghost':
        imgPokedex.src = './images/Pokedex-Dark.png';
        break;
      case 'ice':
        imgPokedex.src = './images/Pokedex-Ice.png';
        break;
      default:
        imgPokedex.src = './images/Pokedex.png';
    }

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
  const url = `https://pokeapi.co/api/v2/pokemon/${id.toString().toLowerCase()}`;
  const data = await fetch(url);
  if (data.status === 200){
    modal_container.classList.add('show');
    body.classList.add('show');
    buttonBack.classList.add('disabled');
    const pokemonList = await data.json();
    modal.classList.add(`modal${pokemonList['types'][0]['type']['name']}`)
    pokemonImageModal.src = pokemonList['sprites']['other']['home']['front_default'];
    nameModal.innerHTML = pokemonList['name'];
    hpModal.innerHTML = `HP ${Math.floor(Math.random() * pokemonList['stats'][0]['base_stat']) + 1} /${pokemonList['stats'][0]['base_stat']}`;
    type1Modal.innerHTML = pokemonList['types'][0]['type']['name'];
    if (pokemonList['types'].length > 1)
      type2Modal.innerHTML = ` / ${pokemonList['types'][1]['type']['name']}`;
    else
      type2Modal.innerHTML = '';
    weightPokemon.innerHTML = `${Math.floor(Math.random() * pokemonList['weight']) + 1}kg`;
    heightPokemon.innerHTML = `${Math.floor(Math.random() * pokemonList['height']) + 1}m`;

    let randomHp = hpModal.innerHTML.split('/');
    randomHp = parseFloat(randomHp[0].replace(/[^0-9]/g,''));
    let maxHp = parseFloat(pokemonList['stats'][0]['base_stat']);
    barGreen.style.width = (100 * randomHp) / maxHp + '%'; 
    barRed.style.width = 100 - (parseFloat((100 * randomHp) / maxHp)) + '%';
  } else {
    inputList.value = '';
  }
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
  body.classList.remove('body-main');
});

buttonBack.addEventListener('click', (event) => {
  event.preventDefault();
  body.classList.add('body-main');
  mainPokedex();
});

buttonClose.addEventListener('click', (event) => {
  event.preventDefault();
  modal_container.classList.remove('show');
  body.classList.remove('show');
  buttonBack.classList.remove('disabled');
  pokemonImageModal.src = '';
  modal.classList.remove(modal.classList[1]);
});

//#endregion

imgPokedex.src = './images/Pokedex.png';
renderPokemon(searchPokemon);