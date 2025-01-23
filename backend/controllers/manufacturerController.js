import mongoose from "mongoose";
import manufacturerRepo from "../repo/manufacturerRepo.js";
import beerRepo from "../repo/beerRepo.js";

const getAllManufacturers = async (request, response) => {
  try {
    const manufacturers = await manufacturerRepo.getAllManufacturers();
    return response.json(manufacturers);
  } catch (error) {
    return response.json(`Error in getting manufacturers: ${error}`);
  }
};

const getManufacturerById = async (request, response) => {
  const manufacturerId = request.params.manufacturerId;
  try {
    const manufacturer =
      await manufacturerRepo.getManufacturerById(manufacturerId);
    return response.json(manufacturer);
  } catch (error) {
    return response.json(`Error in getting manufacturer with id: ${error}`);
  }
};

const createManufacturer = async (request, response) => {
  const manufacturerData = request.body;
  try {
    if (response.locals.user.role != "admin") {
      throw new Error("You are not authorized for this operation");
    }
    const newManufacturer = await manufacturerRepo.createManufacturer(
      manufacturerData.companyName,
      manufacturerData.companyAddress,
      manufacturerData.description,
      manufacturerData.yearEstablished,
      manufacturerData.imageUrl
    );
    return response.json(newManufacturer);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(
        `Validation errors in createManufacturer: ${validationErrors}`
      );
      return response.json(
        `Validation errors in createManufacturer: ${validationErrors}`
      );
    }
    return response.json(`Error in createManufacturer`);
  }
};

const updateManufacturerById = async (request, response) => {
  const manufacturerId = request.params.manufacturerId;
  const manufacturerData = request.body;
  try {
    if (response.locals.user.role != "admin") {
      throw new Error("You are not authorized for this operation");
    }
    const updatedManufacturerById =
      await manufacturerRepo.updateManufacturerById(
        manufacturerData.companyName,
        manufacturerData.companyAddress,
        manufacturerData.description,
        manufacturerData.yearEstablished,
        manufacturerData.imageUrl,
        manufacturerId
      );
    return response.json(updatedManufacturerById);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(
        `Validation errors in updateManufacturerById: ${validationErrors}`
      );
      return response.json(
        `Validation errors in updateManufacturerById: ${validationErrors}`
      );
    }

    return response.json(`Error in updating manufacturer: ${error}`);
  }
};

const deleteManufacturerById = async (request, response) => {
  const manufacturerId = request.params.manufacturerId;
  try {
    if (response.locals.user.role != "admin") {
      throw new Error("You are not authorized for this operation");
    }
    const connectedBeers =
      await beerRepo.findBeerByManufacturerId(manufacturerId);
    if (connectedBeers.length != 0)
      throw new Error(
        "Manufacturer object id exists in table Beers so it cannot be deleted"
      );

    const deletedCount =
      await manufacturerRepo.deleteManufacturerById(manufacturerId);
    return response.json(deletedCount);
  } catch (error) {
    return response.json(`Error in deleting manufacturers: ${error}`);
  }
};

export default {
  getAllManufacturers,
  getManufacturerById,
  createManufacturer,
  updateManufacturerById,
  deleteManufacturerById,
};
