import Manufacturer from "../models/Manufacturer.js";

async function getAllManufacturers() {
  const manufacturers = await Manufacturer.find({});
  return manufacturers;
}

async function getManufacturerById(manufacturerId) {
  const manufacturer = await Manufacturer.findOne({ _id: manufacturerId });
  return manufacturer;
}

async function createManufacturer(
  companyName,
  companyAddress,
  description,
  yearEstablished,
  imageUrl
) {
  const newManufacturer = new Manufacturer({
    companyName,
    companyAddress,
    description,
    yearEstablished,
    imageUrl,
  });
  await newManufacturer.save();
  return newManufacturer;
}

async function updateManufacturerById(
  companyName,
  companyAddress,
  description,
  yearEstablished,
  imageUrl,
  manufacturerId
) {
  const updatedManufacturerById = await Manufacturer.findOneAndUpdate(
    { _id: manufacturerId },
    {
      companyName,
      companyAddress,
      description,
      yearEstablished,
      imageUrl,
    },
    { new: true }
  );
  return updatedManufacturerById;
}

async function deleteManufacturerById(manufacturerById) {
  const deletedCount = await Manufacturer.deleteOne({ _id: manufacturerById });
  return deletedCount;
}

export default {
  getAllManufacturers,
  getManufacturerById,
  createManufacturer,
  updateManufacturerById,
  deleteManufacturerById,
};
