import express from "express";
import { jwtVerifyToken } from "../middlewares/jwt.js";
import * as userController from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get('/', [jwtVerifyToken], (req, res) => {
  userController.getOneUser(req, res)
});

userRouter.post('/', (req, res) => {
  userController.createUser(req, res)
});

userRouter.put('/', [jwtVerifyToken], (req, res) => {
  userController.updateUser(req, res)
});

userRouter.delete('/', [jwtVerifyToken], (req, res) => {
  userController.deleteUser(req, res)
});

export { userRouter };