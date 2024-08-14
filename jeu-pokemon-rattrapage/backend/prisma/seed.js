import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function fetchPokemonData() {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50');
        return response.data.results;
    } catch (error) {
        console.error('Erreur lors de la récupération des données Pokémon', error);
        throw error;
    }
}

async function main() {
    const pokemons = await fetchPokemonData();

    for (const pokemon of pokemons) {
        const details = await axios.get(pokemon.url);

        const createdBasePokemon = await prisma.basePokemon.create({
            data: {
                name: details.data.name,
                type: details.data.types[0].type.name,
                health: details.data.stats.find(stat => stat.stat.name === 'hp').base_stat,
                attack: details.data.stats.find(stat => stat.stat.name === 'attack').base_stat,
                sprite: details.data.sprites.front_default,
            },
        });

        // Ajout des mouvements (techniques) directement à BasePokemon
        for (const move of details.data.moves.slice(0, 4)) {
            await prisma.technics.create({
                data: {
                    name: move.move.name,
                    attack: 50,  // Valeur par défaut pour l'exemple
                    type: details.data.types[0].type.name,
                    basePokemonId: createdBasePokemon.id  // Lier à BasePokemon
                },
            });
        }
    }

    console.log('Seed des données BasePokemon et Technics réussie');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error('Erreur lors de la seed:', error);
        await prisma.$disconnect();
        process.exit(1);
    });
