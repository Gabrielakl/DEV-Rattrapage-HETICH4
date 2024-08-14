import { HTTP_STATUS_CODE } from "../constants/http.js";
import * as pokemonRepository from "../repositories/pokemon.js";

/**
 * Get one Pokemon by ID.
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - ID of the Pokemon.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const getOnePokemon = async (req, res) => {
  try {
    const pokemon = await pokemonRepository.getPokemon(req.params.id);
    res.status(HTTP_STATUS_CODE.OK).json(pokemon);
  } catch (error) {
    res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ message: "Pokemon not found" });
  }
};

/**
 * Get every pokemons from a specific user.
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - ID of the user.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const getAllPokemonsFromUser = async (req, res) => {
  try {
    const pokemons = await pokemonRepository.getAllPokemonsFromUser(req.user.id, {
      include: {
        basePokemon: true,  // Inclure les informations de BasePokemon
      },
    });
    res.status(HTTP_STATUS_CODE.OK).json(pokemons);
  } catch (error) {
    res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ message: "Pokemon not found" });
  }
};


/**
 * Create a new Pokemon.
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body.
 * @param {string} req.body.name - Name of the Pokemon.
 * @param {string} req.body.type - Type of the Pokemon.
 * @param {string} req.body.health - Health of the Pokemon.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const createPokemon = async (req, res) => {
  const userPokemons = await pokemonRepository.getAllPokemonsFromUser(req.user.id);

  if (userPokemons.length >= 3) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "You already have 3 pokemons" });
  }

  try {
    const pokemon = await pokemonRepository.addPokemon({
      ...req.body,
      userId: req.user.id,
    });
    res.status(HTTP_STATUS_CODE.CREATED).json(pokemon);
  } catch (error) {
    console.log(error);
    res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "Pokemon not created" });
  }
};

/**
 * Updates a new Pokemon.
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body.
 * @param {string} req.body.name - Name of the Pokemon.
 * @param {string} req.body.type - Type of the Pokemon.
 * @param {string} req.body.health - Health of the Pokemon.
 * @param {string} req.body.technics - Technics of the Pokemon.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const updatePokemon = async (req, res) => {
  try {
    const pokemon = await pokemonRepository.updatePokemon(req.params.id, req.body);
    res.status(HTTP_STATUS_CODE.OK).json(pokemon);
  } catch (error) {
    console.log(error);
    res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "Pokemon not updated" });
  }
};

/**
 * Delete a Pokemon by ID.
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - ID of the Pokemon.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const deletePokemon = async (req, res) => {
  try {
    await pokemonRepository.deletePokemon(req.params.id);
    res.status(HTTP_STATUS_CODE.NO_CONTENT).json();
  } catch (error) {
    res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "Pokemon not deleted" });
  }
};

export {
  getOnePokemon,
  getAllPokemonsFromUser,
  createPokemon,
  updatePokemon,
  deletePokemon
};
