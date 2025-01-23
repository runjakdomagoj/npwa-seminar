import express, { response } from "express";
import checkJwt from "../middlewares/validateJwtToken.js";
const router = express.Router();
import manufacturerController from "../controllers/manufacturerController.js";
import validation from "../middlewares/validation.js";
import Joi from "joi";

// Get all
router.get("/", manufacturerController.getAllManufacturers);

// Get one
router.get(
  "/:manufacturerId",
  validation.params({
    manufacturerId: Joi.string().hex().length(24).required(),
  }),
  manufacturerController.getManufacturerById
);

// Create
router.post(
  "/",
  checkJwt,
  validation.body({
    companyName: Joi.string().required(),
    companyAddress: Joi.string().required(),
    description: Joi.string().required(),
    yearEstablished: Joi.number().required(),
    imageUrl: Joi.string().required(),
  }),
  manufacturerController.createManufacturer
);

// Update
router.put(
  "/:manufacturerId",
  checkJwt,
  validation.params({
    manufacturerId: Joi.string().hex().length(24).required(),
  }),
  validation.body({
    companyName: Joi.string().required(),
    companyAddress: Joi.string().required(),
    description: Joi.string().required(),
    yearEstablished: Joi.number().required(),
    imageUrl: Joi.string().required(),
  }),
  manufacturerController.updateManufacturerById
);

// Delete
router.delete(
  "/:manufacturerId",
  checkJwt,
  validation.params({
    manufacturerId: Joi.string().hex().length(24).required(),
  }),
  manufacturerController.deleteManufacturerById
);

export default router;
