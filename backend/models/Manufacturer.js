import mongoose from "mongoose";
const { Schema } = mongoose;

const ManufacturerSchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyAddress: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  yearEstablished: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Manufacturer = mongoose.model("Manufacturer", ManufacturerSchema);

export default Manufacturer;
