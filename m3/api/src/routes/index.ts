import { Router } from "express";
import Appointment from './appointments'
import User from './user'

const router = Router();

router.use("/appointments", Appointment);
router.use("/user",User);

export default router;
