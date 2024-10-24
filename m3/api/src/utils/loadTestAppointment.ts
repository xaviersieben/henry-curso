import { Request, Response } from "express";
import { createAppointment } from "../controllers/appointmentController";

export const loadTestAppointment = async () => {
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
      } as Request;

      // Crear el response simulado
      const res = {
        status: (statusCode: number) => ({
          json: (data: any) => {
            console.log(
              `Appointment de prueba cargado con éxito: ${JSON.stringify(data)}`
            );
          },
        }),
      } as unknown as Response;

      // Llamar al controlador de registro
      await createAppointment(req, res);
    } catch (error) {
      console.error("Error cargando appointment de prueba:", error);
    }
  }
};
