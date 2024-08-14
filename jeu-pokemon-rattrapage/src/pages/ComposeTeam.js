import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ComposeTeam() {
    const [pokemons, setPokemons] = useState([]);  // Stocke les Pokémon disponibles
    const [team, setTeam] = useState([]);  // Stocke l'équipe de Pokémon sélectionnés par l'utilisateur
    const navigate = useNavigate();  // Hook pour la navigation

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Récupérer les Pokémon disponibles pour la sélection
        axios.get('http://localhost:3001/base-pokemons', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setPokemons(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des Pokémon', error);
            });

        // Récupérer l'équipe existante de l'utilisateur
        axios.get('http://localhost:3001/pokemon', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setTeam(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération de l\'équipe', error);
            });
    }, []);

    const addToTeam = (pokemon) => {
        if (team.length >= 3) {
            alert("Vous ne pouvez ajouter que 3 Pokémon à votre équipe.");
            return;
        }

        const token = localStorage.getItem('token');
        axios.post('http://localhost:3001/pokemon', {
            basePokemonId: pokemon.id,
            health: pokemon.health,
            attack: pokemon.attack
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                const addedPokemon = {
                    ...response.data,
                    basePokemon: {
                        name: pokemon.name,
                        type: pokemon.type,
                        sprite: pokemon.sprite
                    }
                };
                setTeam([...team, addedPokemon]);
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout du Pokémon à l\'équipe', error);
            });
    };

    const removeFromTeam = (pokemonId) => {
        const token = localStorage.getItem('token');

        axios.delete(`http://localhost:3001/pokemon/${pokemonId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                setTeam(team.filter(pokemon => pokemon.id !== pokemonId));  // Supprimer le Pokémon de l'équipe locale
            })
            .catch(error => {
                console.error('Erreur lors de la suppression du Pokémon de l\'équipe', error);
            });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Composez votre équipe Pokémon</h1>
            <div className="grid grid-cols-3 gap-4">
                {pokemons.map(pokemon => (
                    <div key={pokemon.id} className="p-4 bg-white rounded shadow-md">
                        <img src={pokemon.sprite} alt={pokemon.name} className="w-20 h-20 mx-auto" />
                        <h2 className="text-xl font-bold text-gray-700">{pokemon.name}</h2>
                        <p>Type: {pokemon.type}</p>
                        <p>HP: {pokemon.health}</p>
                        <p>Attaque: {pokemon.attack}</p>
                        <button
                            onClick={() => addToTeam(pokemon)}
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            disabled={team.some(p => p.basePokemonId === pokemon.id)}
                        >
                            {team.some(p => p.basePokemonId === pokemon.id) ? "Ajouté" : "Ajouter à l'équipe"}
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800">Votre équipe</h2>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {team.map(pokemon => (
                        <div key={pokemon.id} className="p-4 bg-green-100 rounded shadow-md">
                            <img src={pokemon.basePokemon.sprite} alt={pokemon.basePokemon.name} className="w-20 h-20 mx-auto" />
                            <h2 className="text-xl font-bold text-gray-700">{pokemon.basePokemon.name}</h2>
                            <p>Type: {pokemon.basePokemon.type}</p>
                            <p>HP: {pokemon.health}</p>
                            <p>Attaque: {pokemon.attack}</p>
                            <button
                                onClick={() => removeFromTeam(pokemon.id)}
                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Retirer de l'équipe
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={() => navigate('/pokemon')}
                className="mt-8 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
                Retour à l'équipe Pokémon
            </button>
        </div>
    );
}

export default ComposeTeam;
