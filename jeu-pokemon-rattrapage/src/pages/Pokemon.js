import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Pokemon() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('/pokemon', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setPokemons(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des Pokémon', error);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Mon équipe Pokémon</h1>

            {pokemons.length === 0 ? (
                <div className="text-center">
                    <p className="text-lg text-gray-700 mb-4">Vous n'avez encore aucun Pokémon dans votre équipe.</p>
                    <Link to="/compose-team" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Composer mon équipe
                    </Link>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                        {pokemons.map(pokemon => (
                            <div key={pokemon.id} className="bg-white rounded-lg shadow-lg p-6 text-center">
                                <img src={pokemon.basePokemon.sprite} alt={pokemon.basePokemon.name} className="w-24 h-24 mx-auto mb-4" />
                                <h2 className="text-2xl font-semibold text-gray-800">{pokemon.basePokemon.name}</h2>
                                <p className="text-gray-600">Type: {pokemon.basePokemon.type}</p>
                                <p className="text-gray-600">HP: {pokemon.health}</p>
                                <p className="text-gray-600">Attaque: {pokemon.attack}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center space-x-4">
                        <Link to="/compose-team" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Composer mon équipe
                        </Link>
                        <Link to="/battle" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                            Combattre
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default Pokemon;
