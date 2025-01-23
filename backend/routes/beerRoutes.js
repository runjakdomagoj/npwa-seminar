import express, { response } from "express";
import checkJwt from "../middlewares/validateJwtToken.js";
const router = express.Router();
import beerController from "../controllers/beerController.js";
import validation from "../middlewares/validation.js";
import Joi from "joi";

// Get all
router.get("/", beerController.getAllBeers);

// Get one
router.get(
  "/:beerId",
  validation.params({
    beerId: Joi.string().hex().length(24).required(),
  }),
  beerController.getBeersById
);

// Create
router.post(
  "/",
  checkJwt,
  validation.body({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    alcoholPercentage: Joi.number().positive().required(),
    ingredients: Joi.array().items(Joi.string()),
    imageUrl: Joi.string().required(),
    manufacturer: Joi.string().hex().length(24).required(),
  }),
  beerController.createBeer
);

// Update
router.put(
  "/:beerId",
  checkJwt,
  validation.params({
    beerId: Joi.string().hex().length(24).required(),
  }),
  validation.body({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    alcoholPercentage: Joi.number().positive().required(),
    ingredients: Joi.array().items(Joi.string()),
    imageUrl: Joi.string().required(),
    manufacturer: Joi.string().hex().length(24).required(),
  }),
  beerController.updateBeerById
);

// Delete
router.delete(
  "/:beerId",
  checkJwt,
  validation.params({
    beerId: Joi.string().hex().length(24).required(),
  }),
  beerController.deleteBeerById
);

export default router;
