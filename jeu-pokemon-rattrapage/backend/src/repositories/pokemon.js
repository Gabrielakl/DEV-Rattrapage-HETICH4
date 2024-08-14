import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPokemon = async (id) => {
    try {
        const pokemon = await prisma.pokemon.findUnique({ where: { id } });
        return pokemon;
    } catch (error) {
        throw new Error(error);
    }
}


const getAllPokemonsFromUser = async (userId) => {
    try {
        const pokemons = await prisma.pokemon.findMany({
            where: { userId },
            include: {
                basePokemon: {  // Inclure le modèle BasePokemon
                    include: {
                        technics: true  // Inclure les technics depuis BasePokemon
                    }
                },
                user: true,  // Si tu veux inclure l'utilisateur également
            },
        });
        return pokemons;
    } catch (error) {
        throw new Error(error);
    }
}

const addPokemon = async (pokemon) => {
    try {
        const newPokemon = await prisma.pokemon.create({ data: pokemon });
        return newPokemon;
    } catch (error) {
        throw new Error(error);
    }
};

const updatePokemon = async (id, technics) => {
    try {
        const pokemon = await prisma.pokemon.findUnique({
            where: { id },
            include: { technics: true }
        });

        if (!pokemon) {
            throw new Error("Pokemon not found");
        };

        let technicsToAdd = [];

        for (const technic of pokemon.technics) {
            if (!technics.find(t => t.id === technic.id)) {
                await prisma.technics.delete({ where: { id: technic.id } });
            }
            if (technics.find(t => t.id === technic.id)) {
                continue;
            }
        }

        for (const technic of technics) {
            if (!pokemon.technics.find(t => t.id === technic.id)) {
                technicsToAdd.push(technic);
            }
        }


        const result = []
        for (const technic of technicsToAdd) {
            const createdTechnic = await prisma.technics.create({
                data: {
                    ...technic,
                    pokemonId: id
                }
            });
            result.push(createdTechnic);
        }

        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const deletePokemon = async (id) => {
    try {
        const deletedPokemon = await prisma.pokemon.delete({ where: { id } });
        return deletedPokemon;
    } catch (error) {
        throw new Error(error);
    }
}

export {
    getPokemon,
    getAllPokemonsFromUser,
    addPokemon,
    updatePokemon,
    deletePokemon,
}