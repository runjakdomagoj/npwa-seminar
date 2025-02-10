import express, { response } from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import validation from "../middlewares/validation.js";
import Joi from "joi";
import checkJwt from "../middlewares/validateJwtToken.js";

// Get all
router.get("/", userController.getAllUsers);

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

// Update user data
router.put(
  "/change-password/:userName",
  checkJwt,
  validation.body({
    password: Joi.string().required(),
    newPassword: Joi.string().required().min(4),
  }),
  validation.params({
    userName: Joi.string().required(),
  }),
  userController.changeUserPassword
);

export default router;
