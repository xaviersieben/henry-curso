import Director from "../models/Director.js";
import Movie from "../models/Movie.js";

export const getAllMovies = async () => {
  try {
    const movies = await Movie.find().populate("director");
    return movies;
  } catch (error) {
    console.error("Error al obtener las películas:", error);
    throw new Error("Error al obtener las películas"); // Lanza un error más específico
  }
};

export const getMovieById = async (id) => {
  try {
    const movieId = await Movie.findById(id);
    return movieId;
  } catch (error) {
    console.error("Error al obtener la película", error);
    throw new Error("Error al obtener las películas");
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

export const addDirector = async ({ directorId, movieId }) => {
  try {
    const movie = await Movie.findById(movieId);
    movie.directorRef = directorId;
    await movie.save();
    return movie;
  } catch (error) {
    console.error("Error al asignar el director", error);
    throw new Error("Error al asignar el director");
  }
};
