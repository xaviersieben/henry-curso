import * as directorService from "../services/directorService.js";

export const getDirectors = async (req, res) => {
  try {
    const directors = await directorService.getAllDirectors();
    res.json(directors);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los directores",
      error: error.message,
    });
  }
};

export const createDirectors = async (req, res) => {
  try {
    const { name, yearOfBirth } = req.body;
    const directorData = { name, yearOfBirth };

    const newDirector = await directorService.createDirectors(directorData);
    res.status(201).json(newDirector);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el director",
      error: error.message,
    });
  }
};
