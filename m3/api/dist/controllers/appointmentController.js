"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointmentDetails = exports.cancelAppointment = exports.createAppointment = exports.getAllAppointment = void 0;
const appointmentService_1 = require("../services/appointmentService");
const getAllAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield appointmentService_1.appointmentService.getAllAppointment();
        res.json(appointment);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllAppointment = getAllAppointment;
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, time, description, userId } = req.body;
    if (!date || !time || !description || !userId) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        const appointment = yield appointmentService_1.appointmentService.createAppointment({
            date,
            time,
            description,
            userId,
        });
        res.status(201).json(appointment);
    }
    catch (error) {
        console.error("Error registering appointment:", error);
        res.status(400).json({ message: "Invalid data" });
    }
});
exports.createAppointment = createAppointment;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const cancelledAppointment = yield appointmentService_1.appointmentService.statusAppointment(id);
        if (cancelledAppointment) {
            res.json(cancelledAppointment);
        }
        else {
            res.status(404).json({ message: "Appointment not found" });
        }
    }
    catch (error) {
        res.status(400).json({ message: "Invalid data" });
    }
});
exports.cancelAppointment = cancelAppointment;
const getAppointmentDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = parseInt(req.params.id);
    if (isNaN(appointmentId)) {
        res.status(400).json({ message: "Invalid appointment ID" });
        return;
    }
    try {
        const appointment = yield appointmentService_1.appointmentService.getAppointmentDetails(appointmentId);
        if (!appointment) {
            res.status(404).json({ message: "Appointment not found" });
            return;
        }
        res.json(appointment);
    }
    catch (error) {
        console.error(`Appointment not found`, error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAppointmentDetails = getAppointmentDetails;
