import { Router } from "express";
import { Request, Response } from "express";
import {
  cancelAppointment,
  createAppointment,
  getAllAppointment,
  getAppointmentDetails,
} from "../controllers/appointmentController";

const router = Router();

router.get("/", getAllAppointment);
router.post("/", createAppointment);
router.put("/status/:id", cancelAppointment);
router.get("/:id", getAppointmentDetails);

export default router;
