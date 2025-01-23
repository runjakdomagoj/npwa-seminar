import Beer from "../models/Beer.js";
import mongoose from "mongoose";
import { beers } from "./beers.js";
import { manufacturers } from "./manufacturers.js";
import { users } from "./users.js";
import userRepo from "../repo/userRepo.js";
import Manufacturer from "../models/Manufacturer.js";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.mongoDBURL, {dbName: "beersDB"})
  .then(async () => {
    await Beer.collection.drop();

    for (const beerData of beers) {
      const beer = new Beer(beerData);
      await beer.save();
    }

    await Manufacturer.collection.drop();

    for (const manufacturerData of manufacturers) {
      const manufacturer = new Manufacturer(manufacturerData);
      await manufacturer.save();
    }

    await User.collection.drop();

    for (const userData of users) {
      userData.password = await userRepo.getPasswordHash(
        userData.password,
        3,
      );

      const user = new User(userData);
      await user.save();
    }

    console.log("Script successfully seeded!:)");

    mongoose.disconnect();
  })
  .catch((error) => {
    console.log(error);
  });
