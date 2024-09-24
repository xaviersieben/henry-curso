import { Schema, model } from "mongoose";

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  }
});

const Movie = model("Movie", movieSchema);

export default Movie;