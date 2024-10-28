"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentController_1 = require("../controllers/appointmentController");
const router = (0, express_1.Router)();
router.get("/", appointmentController_1.getAllAppointment);
router.post("/", appointmentController_1.createAppointment);
router.put("/status/:id", appointmentController_1.cancelAppointment);
router.get("/:id", appointmentController_1.getAppointmentDetails);
exports.default = router;