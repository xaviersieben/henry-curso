import { Router } from "express";
import {
  createDirectors,
  getDirectors,
} from "../controllers/directorController.js";
import { validateDirector } from "../middleware/validateDirector.js";

const router = Router();

router.get("/", getDirectors);
router.post("/", validateDirector, createDirectors);

export default router;
