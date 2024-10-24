import { appointmentService } from "../services/appointmentService";
import { Request, Response } from "express";

export const getAllAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const appointment = await appointmentService.getAllAppointment();
    res.json(appointment);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { date, time, description, userId } = req.body;

  if (!date || !time || !description || !userId) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }
  try {
    const appointment = await appointmentService.createAppointment({
      date,
      time,
      description,
      userId,
    });
    res.status(201).json(appointment);
  } catch (error) {
    console.error("Error registering appointment:", error);
    res.status(400).json({ message: "Invalid data" });
  }
};

export const cancelAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);

  try {
    const cancelledAppointment = await appointmentService.statusAppointment(id);

    if (cancelledAppointment) {
      res.json(cancelledAppointment);
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
};

export const getAppointmentDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const appointmentId = parseInt(req.params.id);

  if (isNaN(appointmentId)) {
    res.status(400).json({ message: "Invalid appointment ID" });
    return;
  }
  try {
    const appointment = await appointmentService.getAppointmentDetails(
      appointmentId
    );
    if (!appointment) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }
    res.json(appointment);
  } catch (error) {
    console.error(`Appointment not found`, error);
    res.status(500).json({ message: "Internal server error" });
  }
};
