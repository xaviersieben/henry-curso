import { Router } from "express";
import {
  getAllUsers,
  getUserWithAppointments,
  loginUser,
  registerUser,
} from "../controllers/userController";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserWithAppointments);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
