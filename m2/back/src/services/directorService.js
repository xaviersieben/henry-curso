import Director from "../models/Director.js";

export const getAllDirectors = async () => {
  try {
    const director = await Director.find();
    return director;
  } catch (error) {
    console.error("Error al obtener los directores", error);
    throw new Error("Error al obtener los directores");
  }
};
export const createDirectors = async (directorData) => {
  try {
    const newDirector = await Director.create(directorData);
    return newDirector;
  } catch (error) {
    console.error("Error al crear los directores", error);
    throw new Error("Error al crear los directores");
  }
};
