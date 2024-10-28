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
exports.appointmentService = void 0;
const data_source_1 = require("../config/data-source");
exports.appointmentService = {
    getAllAppointment() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield data_source_1.appointmentModel.find({
                    relations: ["user"],
                    order: { date: "ASC" },
                });
            }
            catch (error) {
                console.error("appointment no find", error);
                throw new Error("appointment no find");
            }
        });
    },
    createAppointment(_a) {
        return __awaiter(this, arguments, void 0, function* ({ date, time, description, userId, }) {
            try {
                const newAppointment = data_source_1.appointmentModel.create({
                    date,
                    time,
                    description,
                });
                const user = yield data_source_1.userModel.findOneBy({ id: userId });
                if (!user)
                    throw new Error("User not find");
                newAppointment.user = user;
                return yield data_source_1.appointmentModel.save(newAppointment);
            }
            catch (error) {
                console.error("Error creating appointment:", error);
                throw new Error("Appointment creation failed");
            }
        });
    },
    statusAppointment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield data_source_1.appointmentModel.findOneBy({ id });
            try {
                if (appointment) {
                    appointment.status = appointment.status === "active" ? "cancelled" : "active";
                    return yield data_source_1.appointmentModel.save(appointment);
                }
                throw new Error("Appointment update failed");
            }
            catch (error) {
                console.error("Error update appointment:", error);
                throw new Error("Appointment update failed");
            }
        });
    },
    getAppointmentDetails(appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield data_source_1.appointmentModel.findOne({
                    where: { id: appointmentId },
                    relations: ["user"],
                });
            }
            catch (error) {
                console.error(`Error fetching user with appointments for user ID: ${appointmentId}`, error);
                throw new Error("Failed to fetch user with appointments");
            }
        });
    },
};
