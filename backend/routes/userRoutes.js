import express, { response } from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import validation from "../middlewares/validation.js";
import Joi from "joi";
import checkJwt from "../middlewares/validateJwtToken.js";

// Get all
router.get("/", userController.getAllUsers);

// Get used by id
router.get(
  "/:userId",
  validation.params({
    userId: Joi.string().hex().length(24).required(),
  }),
  userController.getUsersById,
);

// Sign up
router.post(
  "/signup",
  validation.body({
    userName: Joi.string().min(3).required(),
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string(),
  }),
  userController.signUpUser
);

// Login
router.post(
  "/login",
  validation.body({
    userName: Joi.string().required(),
    password: Joi.string().required(),
  }),
  userController.logInUser
);

// Update user by id
router.put(
  "/:userId",
  checkJwt,
  validation.params({
    userId: Joi.string().hex().length(24).required(),
  }),
  validation.body({
    userName: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    role: Joi.string().required(),
  }),
  userController.updateUserById,
);

export default router;
