import express from "express";
import * as authenticationController from "../controllers/authentication.js";

const authRouter = express.Router()

authRouter.post('/', (req, res) => {
  authenticationController.login(req, res)
});

export { authRouter };