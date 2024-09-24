import Movie from "../models/Movie.js";

export const getAllMovies = async () => {
  try {
    const movies = await Movie.find();
    return movies;
  } catch (error) {
    console.error("Error al obtener las películas:", error);
    throw new Error("Error al obtener las películas"); // Lanza un error más específico
  }
};

export const createMovie = async (movieData) => {
  try {
    const newMovie = await Movie.create(movieData);
    return newMovie;
  } catch (error) {
    console.error("Error al crear la película:", error);
    throw new Error("Error al crear la película"); // Lanza un error más específico
  }
};
