const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

function getPokemon() {
  const pokemonInput = document.getElementById('pokemonInput');
  const levelInput = document.getElementById('levelInput');

  const pokemonName = pokemonInput.value.toLowerCase();
  const pokemonLevel = parseInt(levelInput.value);

  fetch(apiUrl + pokemonName)
    .then(response => response.json())
    .then(data => displayPokemon(data, pokemonLevel))
    .catch(error => console.error('Error:', error));
}

function displayPokemon(data, level) {
  const pokemonStats = document.getElementById('pokemonStats');
  const staticSprite = document.getElementById('staticSprite');
  const typePills = document.getElementById('typePills');
  const pokemonName = document.getElementById('pokemonName');
  const pokemonLevel = document.getElementById('pokemonLevel');
  const statsList = document.getElementById('statsList');
  const movesContainer = document.getElementById('movesContainer');

  // Display static sprite
  staticSprite.src = data.sprites.front_default;

  // Display types
  typePills.innerHTML = '';
  data.types.forEach(type => {
    const typePill = document.createElement('div');
    typePill.classList.add('type-pill', `type-${type.type.name}`);
    typePill.innerText = type.type.name;
    typePills.appendChild(typePill);
  });

  // Display Pokemon name and level
  pokemonName.innerText = capitalizeFirstLetter(data.name);
  pokemonLevel.innerText = `Level: ${level}`;

  // Display stats
  statsList.innerHTML = '';
  for (const stat of data.stats) {
    const statItem = document.createElement('li');
    statItem.innerText = `${stat.stat.name}: ${stat.base_stat}`;
    statsList.appendChild(statItem);
  }

  // Display moves
  const moves = data.moves.map(move => move.move.name);
  const randomMoves = getRandomMoves(moves, 4);
  displayMoves(randomMoves);

  // Show the Pokemon stats box
  pokemonStats.style.display = 'block';
}

function getRandomMoves(moves, count) {
  const shuffledMoves = moves.sort(() => 0.5 - Math.random());
  return shuffledMoves.slice(0, count);
}

function displayMoves(moves) {
  const movesGrid = document.getElementById('movesGrid');
  movesGrid.innerHTML = ''; // Clear previous moves

  for (let i = 0; i < 4; i++) {
    const moveTile = document.createElement('div');
    moveTile.classList.add('move-tile');

    // Fetch move type data dynamically
    fetch(`https://pokeapi.co/api/v2/move/${moves[i].toLowerCase()}/`)
      .then(response => response.json())
      .then(data => {
        const moveType = data.type.name;
        moveTile.style.backgroundColor = getTypeColor(moveType);
        moveTile.innerText = moves[i];
        moveTile.addEventListener('click', () => openMoveModal(data));
        movesGrid.appendChild(moveTile);
      })
      .catch(error => console.error('Error fetching move type:', error));
  }
}

function openMoveModal(moveData) {
  // ... (previous code)

  // Populate modal content
  moveModalTitle.innerText = moveName;
  moveModalDescription.innerHTML = `
    <p>${effectString}</p>
    <p><strong>Power:</strong> ${movePower}</p>
    <p><strong>Accuracy:</strong> ${moveAccuracy}</p>
    <p><strong>PP:</strong> ${movePP}</p>
    <button id="changeAbilityBtn" onclick="changePokemonAbility()">Change Ability</button>
  `;

  moveModal.style.display = 'block';
}

function changePokemonAbility() {
  const selectedPokemon = document.getElementById('pokemonName').innerText;
  const abilityModal = document.getElementById('abilityModal');
  const abilityModalContent = document.getElementById('abilityModalContent');

  // Fetch available abilities for the selected Pokemon
  fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon.toLowerCase()}/`)
    .then(response => response.json())
    .then(data => {
      const abilities = data.abilities.map(ability => ability.ability.name);

      // Build ability selection options
      const abilityOptions = abilities.map(ability => `<option value="${ability}">${ability}</option>`).join('');

      // Create the ability selection modal
      abilityModalContent.innerHTML = `
        <label for="abilitySelect">Select Ability:</label>
        <select id="abilitySelect">${abilityOptions}</select>
        <button onclick="updatePokemonAbility()">Change Ability</button>
      `;

      abilityModal.style.display = 'block';
    })
    .catch(error => console.error('Error fetching abilities:', error));
}

function fetchMoveData() {
  const selectedPokemon = document.getElementById('pokemonName').innerText;
  const selectedAbility = document.getElementById('abilityModalContent').innerText.split(': ')[1];

  // Fetch move data for the selected Pokemon and ability
  fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon.toLowerCase()}/`)
    .then(response => response.json())
    .then(data => {
      const moves = data.moves.map(move => move.move.name);
      displayMoves(moves);
    })
    .catch(error => console.error('Error fetching moves:', error));
}

function updatePokemonAbility() {
  const selectedAbility = document.getElementById('abilitySelect').value;
  const abilityModal = document.getElementById('abilityModal');

  // Update the ability in the main modal
  document.getElementById('abilityModalContent').innerText = `Selected Ability: ${selectedAbility}`;

  // Fetch and update move data for the selected Pokemon
  fetchMoveData();
  
  abilityModal.style.display = 'none';
}





function closeModal() {
  const moveModal = document.getElementById('moveModal');
  moveModal.style.display = 'none';
}

function getTypeColor(type) {
  // Define colors for each move type (add more as needed)
  const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
    // Add more types as needed
  };

  // Return the color for the specified type or a default color
  return typeColors[type] || '#999999';
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function goBack() {
  const pokemonStats = document.getElementById('pokemonStats');
  const pokemonInput = document.getElementById('pokemonInput');

  pokemonInput.value = ''; // Clear the input field
  pokemonStats.style.display = 'none'; // Hide the Pokemon stats box
}


