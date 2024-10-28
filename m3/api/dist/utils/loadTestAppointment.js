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
exports.loadTestAppointment = void 0;
const appointmentController_1 = require("../controllers/appointmentController");
const loadTestAppointment = () => __awaiter(void 0, void 0, void 0, function* () {
    const testAppointment = [
        {
            date: "2020-05-12",
            time: "02:00:00",
            description: "ir al medico",
            userId: 2,
        },
        {
            date: "2020-05-12",
            time: "02:00:00",
            description: "trabajo",
            userId: 1,
        },
        {
            date: "2020-05-12",
            time: "02:00:00",
            description: "ir al cine",
            userId: 3,
        },
    ];
    for (const appointment of testAppointment) {
        try {
            // Crear el request simulado
            const req = {
                body: appointment,
            };
            // Crear el response simulado
            const res = {
                status: (statusCode) => ({
                    json: (data) => {
                        console.log(`Appointment de prueba cargado con éxito: ${JSON.stringify(data)}`);
                    },
                }),
            };
            // Llamar al controlador de registro
            yield (0, appointmentController_1.createAppointment)(req, res);
        }
        catch (error) {
            console.error("Error cargando appointment de prueba:", error);
        }
    }
});
exports.loadTestAppointment = loadTestAppointment;
