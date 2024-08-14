import express from "express";
import { jwtVerifyToken } from "../middlewares/jwt.js";
import * as pokemonController from "../controllers/pokemon.js";

const pokemonRouter = express.Router();

pokemonRouter.get('/:id', [jwtVerifyToken], (req, res) => {
  pokemonController.getOnePokemon(req, res);
});

pokemonRouter.get('/', [jwtVerifyToken], (req, res) => {
  pokemonController.getAllPokemonsFromUser(req, res);
});

pokemonRouter.post('/', [jwtVerifyToken], (req, res) => {
  pokemonController.createPokemon(req, res);
});

pokemonRouter.put('/:id', [jwtVerifyToken], (req, res) => {
  pokemonController.updatePokemon(req, res);
});

pokemonRouter.delete('/:id', [jwtVerifyToken], (req, res) => {
  pokemonController.deletePokemon(req, res);
});

export { pokemonRouter };
