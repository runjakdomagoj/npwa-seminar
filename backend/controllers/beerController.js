import mongoose from "mongoose";
import beerRepo from "../repo/beerRepo.js";
import manufacturerRepo from "../repo/manufacturerRepo.js";

const getAllBeers = async (request, response) => {
  try {
    const beers = await beerRepo.getAllBeers();
    return response.json(beers);
  } catch (error) {
    return response.json(`Error in getting beers: ${error}`);
  }
};

const getBeersById = async (request, response) => {
  const beerId = request.params.beerId;
  try {
    const beer = await beerRepo.getBeersById(beerId);
    return response.json(beer);
  } catch (error) {
    return response.json(`Error in getting beer with id: ${error}`);
  }
};

const createBeer = async (request, response) => {
  const beerData = request.body;

  try {
    if (response.locals.user.role != "admin") {
      throw new Error("You are not authorized for this operation");
    }
    const manufacturer = await manufacturerRepo.getManufacturerById(
      beerData.manufacturer
    );
    if (manufacturer == undefined)
      throw new Error("Invalid manufacturer object id");

    const newBeer = await beerRepo.createBeer(
      beerData.name,
      beerData.description,
      beerData.price,
      beerData.alcoholPercentage,
      beerData.ingredients,
      beerData.imageUrl,
      beerData.manufacturer
    );
    return response.json(newBeer);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(`Validation errors in createBeer: ${validationErrors}`);
      return response.json(
        `Validation errors in createBeer: ${validationErrors}`
      );
    }

    return response.json(`Error in getting beers: ${error}`);
  }
};

const updateBeerById = async (request, response) => {
  const beerId = request.params.beerId;
  const beerData = request.body;
  console.log(beerData);
  try {
    if (response.locals.user.role != "admin") {
      throw new Error("You are not authorized for this operation");
    }
    const manufacturer = await manufacturerRepo.getManufacturerById(
      beerData.manufacturer
    );
    if (manufacturer == undefined)
      throw new Error("Invalid manufacturer object id");
    const updatedBeerById = await beerRepo.updateBeerById(
      beerId,
      beerData.name,
      beerData.description,
      beerData.price,
      beerData.alcoholPercentage,
      beerData.ingredients,
      beerData.imageUrl,
      beerData.manufacturer
    );
    return response.json(updatedBeerById);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(`Validation errors in updateBeerById: ${validationErrors}`);
      return response.json(
        `Validation errors in updateBeerById: ${validationErrors}`
      );
    }

    return response.json(`Error in updating beer: ${error}`);
  }
};

const deleteBeerById = async (request, response) => {
  const beerId = request.params.beerId;
  try {
    if (response.locals.user.role != "admin") {
      throw new Error("You are not authorized for this operation");
    }
    const deletedCount = await beerRepo.deleteBeerById(beerId);
    return response.json(deletedCount);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(`Validation errors in deleteBeerById: ${validationErrors}`);
      return response.json(
        `Validation errors in deleteBeerById: ${validationErrors}`
      );
    }

    return response.json(`Error in deleting beers: ${error}`);
  }
};

export default {
  getAllBeers,
  getBeersById,
  createBeer,
  updateBeerById,
  deleteBeerById,
};
