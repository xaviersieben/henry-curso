import * as movieService from "../services/movieService.js";

export const getMovies = async (req, res) => {
  try {
    const movies = await movieService.getAllMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las películas",
      error: error.message,
    });
  }
};

export const createMovie = async (req, res) => {
  try {
    const { title, year, director, rate } = req.body;

    // Validación de campos obligatorios
    if (!title || !year || !director || !rate) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios." });
    }

    // Creación de la película usando el servicio
    const movieData = { title, year, director, rate };
    const newMovie = await movieService.createMovie(movieData);

    res.status(201).json(newMovie);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la película", error: error.message });
  }
};
