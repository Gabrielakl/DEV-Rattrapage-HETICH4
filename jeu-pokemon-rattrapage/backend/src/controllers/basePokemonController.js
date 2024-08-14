import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Récupère tous les Pokémon de la base BasePokemon.
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>}
 */
export const getAllBasePokemons = async (req, res) => {
    try {
        const basePokemons = await prisma.basePokemon.findMany();
        res.status(200).json(basePokemons);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des Pokémon.' });
    }
};

/**
 * Récupère un Pokémon aléatoire de la base BasePokemon.
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>}
 */
export const getRandomBasePokemon = async (req, res) => {
    try {
        const pokemons = await prisma.basePokemon.findMany({
            include: { technics: true },
        });
        const randomIndex = Math.floor(Math.random() * pokemons.length);
        const randomPokemon = pokemons[randomIndex];
        res.status(200).json(randomPokemon);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération du Pokémon ennemi" });
    }
};
