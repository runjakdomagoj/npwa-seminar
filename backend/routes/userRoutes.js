import express, { response } from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import validation from "../middlewares/validation.js";
import Joi from "joi";

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

// Get all users that are not admins
router.get("/non-admins", userController.getAllNonAdminUsers);

export default router;
