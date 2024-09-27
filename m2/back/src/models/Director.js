import { model, Schema } from "mongoose";

const directorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  yearOfBirth: {
    type: Number,
    required: true,
  },
});

const Director = model("Director", directorSchema);

export default Director;
