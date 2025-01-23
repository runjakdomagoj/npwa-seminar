import mongoose from "mongoose";
const { Schema } = mongoose;

const BeerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  alcoholPercentage: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manufacturer",
    required: true,
  },
});

const Beer = mongoose.model("Beer", BeerSchema);

export default Beer;
