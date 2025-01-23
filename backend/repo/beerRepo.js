import Beer from "../models/Beer.js";

async function getAllBeers() {
  const beers = await Beer.find({}).populate("manufacturer");

  return beers;
}

async function getBeersById(beerId) {
  const beer = await Beer.findOne({ _id: beerId });
  return beer;
}

async function createBeer(
  name,
  description,
  price,
  alcoholPercentage,
  ingredients,
  imageUrl,
  manufacturer
) {
  const newBeer = new Beer({
    name,
    description,
    price,
    alcoholPercentage,
    ingredients,
    imageUrl,
    manufacturer,
  });

  await newBeer.save();
  return newBeer;
}

async function updateBeerById(
  beerId,
  name,
  description,
  price,
  alcoholPercentage,
  ingredients,
  imageUrl,
  manufacturer
) {
  const updatedBeerById = await Beer.findOneAndUpdate(
    { _id: beerId },
    {
      name,
      description,
      price,
      alcoholPercentage,
      ingredients,
      imageUrl,
      manufacturer,
    },
    { new: true }
  );
  return updatedBeerById;
}

async function deleteBeerById(beerId) {
  const deletedCount = await Beer.deleteOne({ _id: beerId });
  return deletedCount;
}

async function findBeerByManufacturerId(manufacturerId) {
  const beers = await Beer.find({ manufacturerId: manufacturerId });
  return beers;
}

export default {
  getAllBeers,
  getBeersById,
  createBeer,
  updateBeerById,
  deleteBeerById,
  findBeerByManufacturerId,
};
