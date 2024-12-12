import { useState, useEffect } from 'react';
import './App.css';
import { getPokemon } from './Api';
import PokemonCard from './PokemonCard.jsx';


function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPokemons = async () => {
    setLoading(true);
    let pokemonNames = ['pikachu', 'bulbasaur', 'charmander', 'squirtle'];
    const data = await Promise.all(
      pokemonNames.map((name) => getPokemon(name))
    );
    
    console.log(data);
    setPokemonData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPokemons = pokemonData.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Pokedex</h1>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={searchTerm}
        onChange={handleSearch}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="pokemon-list">
          {filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
