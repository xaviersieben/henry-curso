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
  },
  directorRef: {
    type: Schema.Types.ObjectId,
    ref: "Director",
    default: null,
  },
});

const Movie = model("Movie", movieSchema);

export default Movie;
