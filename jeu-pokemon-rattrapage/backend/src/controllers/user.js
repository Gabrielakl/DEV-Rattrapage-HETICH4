import { HTTP_STATUS_CODE } from "../constants/http.js";
import * as authenticationHelpers from "../helpers/authentication.js";
import * as userRepository from "../repositories/user.js";

/**
 * Retrieves a user by ID.
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const getOneUser = async (req, res) => {
    try {
      const user = await userRepository.getUserById(req.user.id);
      res.status(HTTP_STATUS_CODE.OK).json({
        "id": user.id,
        "name": user.name,
        "email": user.email
      });
    } catch (error) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ message: "User not found" });
    }
};

/**
 * Creates a new user.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.name - The name of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const createUser = async (req, res) => {
    try {
      const user = await userRepository.addUser({
        "name": req.body.name,
        "password": await authenticationHelpers.hashPassword(req.body.password),
        "email":  req.body.email,
      });
      res.status(HTTP_STATUS_CODE.CREATED).json(user);
    } catch (error) {
      console.log(error)
      res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "User not created" });
    }
};

/**
 * Updates an existing user.
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the user.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.name - The name of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const updateUser = async (req, res) => {
    try {
      const user = await userRepository.updateUser(req.user.id, req.body);
      res.status(HTTP_STATUS_CODE.OK).json(user);
    } catch (error) {
      res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "User not updated" });
    }
};

/**
 * Deletes a user by ID.
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const deleteUser = async (req, res) => {
    try {
      await userRepository.deleteUser(req.user.id);
      res.status(HTTP_STATUS_CODE.NO_CONTENT).json();
    } catch (error) {
      res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "User not deleted" });
    }
};

export { getOneUser, createUser, updateUser, deleteUser };
  