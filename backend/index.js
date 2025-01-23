import express, { request, response } from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import manufacturerRoute from "./routes/manufacturerRoutes.js";
import beerRoute from "./routes/beerRoutes.js";

import cors from "cors";
import userRoute from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/manufacturers", manufacturerRoute);
app.use("/beers", beerRoute);
app.use("/users", userRoute);

mongoose
  .connect(process.env.mongoDBURL, { dbName: "beersDB" })
  .then(() => {
    console.log("App connected to database");
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

export default app;
