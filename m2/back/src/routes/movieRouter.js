// Importar dependencias y controladores usando ES Modules
import { Router } from "express";
import {
  getMovies,
  createMovie,
  getMovieById,
  addDirector,
} from "../controllers/movieController.js";
import { validateMovie } from "../middleware/validateMovie.js";

const router = Router();

// Definir rutas con sus respectivos controladores y middleware
router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", validateMovie, createMovie);
router.put("/", addDirector);

// Exportar el router
export default router;
