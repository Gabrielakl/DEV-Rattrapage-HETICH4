import express from 'express';
import { jwtVerifyToken } from '../middlewares/jwt.js';
import { getAllBasePokemons, getRandomBasePokemon } from '../controllers/basePokemonController.js';

const basePokemonRouter = express.Router();

// Route pour récupérer tous les Pokémon de BasePokemon
basePokemonRouter.get('/', jwtVerifyToken, (req, res) => {
    getAllBasePokemons(req, res);
});

// Route pour récupérer un Pokémon aléatoire
basePokemonRouter.get('/random', jwtVerifyToken, (req, res) => {
    getRandomBasePokemon(req, res);
});

export { basePokemonRouter };
