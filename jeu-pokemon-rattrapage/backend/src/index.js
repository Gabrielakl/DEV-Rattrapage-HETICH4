import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import { pokemonRouter } from './routes/pokemon.js'
import { userRouter } from './routes/user.js'
import { authRouter } from './routes/authentication.js'
import { basePokemonRouter } from './routes/basePokemonRoutes.js';
dotenv.config();

const app = express()

app.use(express.json());
app.use(cors());

app.use('/pokemon', pokemonRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/base-pokemons', basePokemonRouter);

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Pokemon backend app listening on port ${port}`)
})
