import * as movieService from "../services/movieService.js";

export const getMovies = async (req, res) => {
  try {
    const movies = await movieService.getAllMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movieById = await movieService.getMovieById(id);
    res.json(movieById);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const createMovie = async (req, res) => {
  try {
    const { title, year, director, rate } = req.body;

    // Creación de la película usando el servicio
    const movieData = { title, year, director, rate };
    const newMovie = await movieService.createMovie(movieData);

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addDirector = async (req, res) => {
  try {
    const { directorId, movieId } = req.body;
    await movieService.addDirector({ directorId, movieId });
    res.json({ message: "todo correcto" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
