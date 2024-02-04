// public/script.js
async function getPokemon() {
    const inputElement = document.getElementById('pokemonInput');
    const levelElement = document.getElementById('levelInput');
    const pokemonName = inputElement.value.toLowerCase();
    const level = parseInt(levelElement.value, 10);
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (response.ok) {
        const adjustedStats = adjustStats(data.stats, level);
        displayPokemonStats(data.name, data.sprites.front_default, level, adjustedStats, data.types);
        showPokemonStats(); // Show the stats box after successful search
      } else {
        alert(`Error: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data. Please try again.');
    }
  }
  
  function adjustStats(baseStats, level) {
    const adjustedStats = [];
    for (const stat of baseStats) {
      const adjustedStat = Math.floor((2 * stat.base_stat * level) / 100 + 5);
      adjustedStats.push(adjustedStat);
    }
    return adjustedStats;
  }
  
  function displayPokemonStats(name, sprite, level, stats, types) {
    const pokemonNameElement = document.getElementById('pokemonName');
    const pokemonLevelElement = document.getElementById('pokemonLevel');
    const statsListElement = document.getElementById('statsList');
    const staticSpriteElement = document.getElementById('staticSprite');
    const typePillsElement = document.getElementById('typePills');
  
    staticSpriteElement.src = sprite;
  
    const typePillsHTML = types.map(type => `<div class="type-pill type-${type.type.name}">${type.type.name}</div>`).join('');
    typePillsElement.innerHTML = typePillsHTML;
  
    // Capitalizing the Pokemon name
    const capitalizedPokemonName = name.charAt(0).toUpperCase() + name.slice(1);
    pokemonNameElement.textContent = `${capitalizedPokemonName} (Level ${level})`;
    pokemonLevelElement.textContent = '';
    statsListElement.innerHTML = `
      <li>HP: ${stats[0]}</li>
      <li>Attack: ${stats[1]}</li>
      <li>Defense: ${stats[2]}</li>
      <li>Special Attack: ${stats[3]}</li>
      <li>Special Defense: ${stats[4]}</li>
      <li>Speed: ${stats[5]}</li>`;
  }
  
  function showPokemonStats() {
    const searchBox = document.getElementById('searchBox');
    const pokemonStats = document.getElementById('pokemonStats');
  
    // Hide the search box and show the Pokemon stats box
    searchBox.style.display = 'none';
    pokemonStats.style.display = 'block';
  }
  
  
function goBack() {
    const searchBox = document.getElementById('searchBox');
    const pokemonStats = document.getElementById('pokemonStats');
  
    // Show the search box and hide the Pokemon stats box
    searchBox.style.display = 'block';
    pokemonStats.style.display = 'none';
  }

// Fetch Pokemon names for autocomplete
async function fetchPokemonNames() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1118');
      const data = await response.json();
  
      if (response.ok) {
        const pokemonNames = data.results.map(pokemon => pokemon.name);
        populatePokemonList(pokemonNames);
      } else {
        console.error(`Error fetching Pokemon names: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error fetching Pokemon names:', error);
    }
  }
  
  // Populate datalist with Pokemon names
  function populatePokemonList(names) {
    const datalist = document.getElementById('pokemonList');
    datalist.innerHTML = names.map(name => `<option value="${name}"></option>`).join('');
  }
  
  // Fetch Pokemon names when the page loads
  fetchPokemonNames();